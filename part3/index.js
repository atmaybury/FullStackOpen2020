const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(express.static('build'))
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] :response-time ms :body'))

morgan.token('body', (req, res) => JSON.stringify(req.body))

// model for Person in db
const Person = require('./models/person')

// return some db info
app.get('/api/info', (request, response) => {
  Person.count({})
    .then(count => response.send(`<p>Phonebook has info for ${count} people</p><p>${new Date()}</p>`))
})

// return all people
app.get('/api/persons', (request, response) => {
  Person.find({}).then(result => {
    response.json(result)
  })
})

// return person by id
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

// Add person to db
app.post('/api/persons', (request, response, next) => {
  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number
  })
  person.save().then(result => {
    console.log(`added ${body.name} number ${body.number} to phonebook`)
    response.json(person)
  })
    .catch(error => next(error))
})

// alter number for phonebook entry
app.put('/api/persons/:id', (request, response, next) => {

  const person = {
    number: request.body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      console.log(updatedPerson)
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

// delete user defined by id
app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then(response.status(204).end())
})

// handle any endpoint not defined above
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

// handle errors passed from routes
const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
