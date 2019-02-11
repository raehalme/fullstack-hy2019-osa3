require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())
app.use(bodyParser.json())

morgan.token('body', function (req, res) {
  console.log(req.method)
  if (req.method !== 'POST') {
    return null
  }
  
  return JSON.stringify(req.body) 
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(express.static('build'))

app.get('/info', (req, res, next) => {
  Person.find({}).then(persons => {
      res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" })
      res.write("<html><body>" +
        `<p>Puhelinluettelossa ${persons.length} henkilön tiedot</p>` +
        `<p>${new Date()}</p>` +
        "</body></html>")
      res.end()
    })
    .catch(error => next(error))
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => res.json(persons.map(person => person.toJSON())))
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person.toJSON())
      } 
      else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  const newName = body.name
  const newNumber = body.number

  if (newName === undefined) {
    return res.status(400).json({ 
      error: 'name missing' 
    })
  }
  else if (newNumber === undefined) {
    return res.status(400).json({ 
      error: 'number missing' 
    })
  }

  const person = new Person({
    name: newName,
    number: newNumber,
  })
  
  person.save()
    .then(savedPerson => res.json(savedPerson.toJSON()))
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => res.json(updatedPerson.toJSON()))
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  persons = Person.findByIdAndRemove(req.params.id)
    .then(person => res.status(204).end())
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.name, error.kind, error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
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
