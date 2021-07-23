const _ = require('lodash')

const listWithManyBlogs = [
  { _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7, __v: 0 }, { _id: "5a422aa71b54a676234d17f8", title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5, __v: 0 }, { _id: "5a422b3a1b54a676234d17f9", title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, __v: 0 }, { _id: "5a422b891b54a676234d17fa", title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", likes: 10, __v: 0 }, { _id: "5a422ba71b54a676234d17fb", title: "TDD harms architecture", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", likes: 0, __v: 0 }, { _id: "5a422bc61b54a676234d17fc", title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", likes: 2, __v: 0 }
]

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

// return sum of likes for all blogs given
const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.map(blog => blog.likes).reduce((sum, item) => sum + item)
}

// return blog with highest amount of likes
const favoriteBlog = (blogs) => {
  return blogs.reduce((max, current) => {
    return current.likes > max.likes ? current : max
  }, blogs[0])
}

// return author who has most blogs
const mostBlogs = blogs => {
  
  // make array of author objects
  let authors = []
  _.uniq(blogs.map(blog => blog.author)).forEach(author => {
    authors.push({ name: author, blogs: 0 })
  })

  // iterate through all blogs, record number of blogs for each author
  blogs.forEach(blog => {
    const author = authors.find(auth => auth.name === blog.author)
    author.blogs += 1
  })

  // return author with highest blog number
  return authors.reduce((max, current) => {
    return current.blogs > max.blogs ? current : max
  }, authors[0])
}

// return author whose blogs have the most likes
const mostLikes = blogs => {

  // list to hold author objects
  let authors = []
  _.uniq(blogs.map(blog => blog.author)).forEach(author => {
    authors.push({ name: author, blogs: 0 })
  })

  // iterate through all blogs, record number of likes for each author
  blogs.forEach(blog => {
    const author = authors.find(auth => auth.name === blog.author)
    author.likes += blog.likes
  })

  // return author with highest blog number
  return authors.reduce((max, current) => {
    return current.likes > max.likes ? current : max
  }, authors[0])
}

module.exports = {
  listWithManyBlogs,
  listWithOneBlog,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
