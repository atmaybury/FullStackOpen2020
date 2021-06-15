const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const dbConnect = () => {
  const password = process.argv[2]
  const url = `mongodb+srv://phonebook-backend:${password}@cluster0.uzff2.mongodb.net/phonebook-backend?retryWrites=true&w=majority`
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
}

const addPerson = () => {
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name: name,
    number: number
  })

  person.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}

if (process.argv.length === 3) {
  dbConnect()
  Person.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })

  // console log all entries in db
} else if (process.argv.length === 5) {
  dbConnect()
  addPerson()
} else {
  console.log('Format: node mongo.js <password> <name> <number>')
  process.exit(1)
}

