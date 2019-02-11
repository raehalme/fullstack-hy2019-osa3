const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

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

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "045-1236543"
  },
  {
    id: 2,
    name: "Arto Järvinen",
    number: "041-21423123"
  },
  {
    id: 3,
    name: "Lea Kutvonen",
    number: "040-4323234"
  },
  {
    id: 4,
    name: "Martti Tienari",
    number: "045-1236543"
  }
]

app.get('/info', (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" })
  res.write("<html><body>" + 
    `<p>Puhelinluettelossa ${persons.length} henkilön tiedot</p>` + 
    `<p>${new Date()}</p>` +
    "</body></html>")
    res.end()
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    res.json(person)
  } 
  else {
    res.status(404).end()
  }
})

app.post('/api/persons', (req, res) => {
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

  const existingPerson = persons.find(p => p.name === newName)
  if (existingPerson) {
    return res.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  const person = {
    name: newName,
    number: newNumber,
    id: Math.round(Math.random() * 1000000)
  }

  persons = persons.concat(person)

  res.json(person)  
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter(person => person.id !== id);
  res.status(204).end();
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
