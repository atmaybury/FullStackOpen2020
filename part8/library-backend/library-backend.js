const {
	ApolloServer,
	gql,
	UserInputError,
	AuthenticationError
} = require('apollo-server-express')
const express = require('express')
const cors = require('cors')
const { createServer } = require('http')
const { execute, subscribe } = require('graphql')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { SubscriptionServer } = require('subscriptions-transport-ws')
const { PubSub } = require('graphql-subscriptions')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const config = require('./utils/config')
const User = require('./models/user')
const Book = require('./models/book')
const Author = require('./models/author')

const pubsub = new PubSub()
const JWT_SECRET = 'password'

// connect to mongoose db                                    
const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true })
  .then(() => {
      console.log('connected to MongoDB')
    })
    .catch((error) => {
      console.log('error connecting to MongoDB', error.message)
    })

const typeDefs = gql`
	type User {
		username: String!
		favoriteGenre: String!
		id: ID!
	}
	type Token {
		value: String!
	}
	type Book {
		title: String!
		published: String!
		author: Author!
		id: ID!
		genres: [String!]!
	}
	type Author {
		name: String!
		born: String
		bookCount: Int!
	}
  type Query {
		me: User
		bookCount: Int!
		authorCount: Int!
		allBooks(author: String, genre: String): [Book!]!
		allAuthors: [Author!]!
  }
	type Mutation {
		createUser(
			username: String!
			favoriteGenre: String!
		): User
		login(
			username: String!
			password: String!
		): Token
		addBook(
			title: String!
			author: String!
			published: Int!
			genres: [String!]!
		): Book
		editAuthor(
			name: String!
			born: Int!
		): Author
	}
	type Subscription {
		bookAdded: Book!
	}
`

const resolvers = {

  Query: {
		me: (_, __, context) => context.currentUser,
		bookCount: () => Book.count({}),
		authorCount: () => Author.count({}),
		allBooks: async (_, args) => {
			if (!args.author && !args.genre) {
				return Book.find({}).populate('author')
			} 
			if (args.author && args.genre) {
				const author = await Author.findOne({ name: args.author })
				let response = await Book.find({ author: author._id }).populate('author')
				return response.filter(b => b.genres.includes(args.genre))
			}
			if (args.genre) {
				return await Book.find({ genres: { $in: [ args.genre ] } }).populate('author')
			}
			if (args.author) {
				const author = await Author.findOne({ name: args.author })
				return await Book.find({ author: author._id }).populate('author')
			}
		},
		allAuthors: () => Author.find({})
  },

	Author: {
		bookCount: (root) => root.books.length
	},

	Mutation: {
		createUser: async (_, args) => {
			user = new User({ ...args, id: uuid() })
			try {
				return user.save()
			} catch (err) {
				throw new UserInputError('Could not create user')
			}
		},

		login: async (_, args) => {
			const user = await User.findOne({ username: args.username })
			if (!user || args.password !== 'password') {
				throw new UserInputError('Could not find this user')
			}
			// make token
			const userForToken = {
				username: user.username,
				id: user._id
			}
			return { value: jwt.sign(userForToken, JWT_SECRET) }
		},

		addBook: async (_, args, context) => {
			if (!context.currentUser) {
				throw new AuthenticationError('Not authenticated')
			}
			if (args.author.length < 2) {
				throw new UserInputError('Author name needs to be at least 2 characters long')
			}
			if (args.title.length < 2) {
				throw new UserInputError('Title needs to be at least 2 characters long')
			}
			// find or create author
      let author = await Author.findOne({ name: args.author })
			if (!author) {
        author = new Author({ name: args.author })
        try {
          await author.save()     
        } catch (err) {
          throw new UserInputError(err.message, {
            invalidArgs: args
          })
        }
			}
			// create book obj
			const book = new Book({ ...args, author: author, id: uuid() })
      try {
				book.save()
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args
        })
      }
			// add book to author's books array
			author.books = author.books.concat(book)
			try {
				author.save()
			} catch (err) {
				throw new UserInputError('Could not update user books array')
			}
			// publish subscription and return book
			pubsub.publish('BOOK_ADDED', { bookAdded: book })
			return book
		},

		editAuthor: async (_, args, context) => {
			if (!context.currentUser) {
				throw new AuthenticationError('Not authenticated')
			}
			const author = await Author.findOne({ name: args.name })
			if (!author) {
				return null
			}
			author.born = args.born
			try {
				return author.save()
			} catch (err) {
				throw new UserInputError(err)
			}
		}
	},

	Subscription: {
		bookAdded: {
			subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
		}
	}
}

const startApolloServer = async (typeDefs, resolvers) => {
	const app = express()
	app.use(cors())
	const httpServer = createServer(app)

	const schema = makeExecutableSchema({ typeDefs, resolvers })
	const server = new ApolloServer({
		schema,
		context: async ({ req }) => {
			const auth = req ? req.headers.authorization : null
			if (auth && auth.toLowerCase().startsWith('bearer')) {
				const decodedToken = jwt.verify(
					auth.substring(7), JWT_SECRET
				)
				const currentUser = await User.findById(decodedToken.id)
				return { currentUser }
			}
		}
	})

	await server.start()
	server.applyMiddleware(({
		app,
		path: '/'
	}))

	SubscriptionServer.create(
		{ schema, execute, subscribe },
		{ server: httpServer, path: server.graphqlPath }
	)

	const PORT = 4000
	httpServer.listen(PORT, () => {
		console.log(`server ready at http://localhost:${PORT}`)
		console.log(`subscriptions ready at http://localhost:${PORT}${server.graphqlPath}`)
	})
}

startApolloServer(typeDefs, resolvers)
