const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('syntax: node mongo.js <password> <name> <number>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@fullstack-hy2019-59xhm.mongodb.net/test?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length < 5) {
  Person.find({}).then(persons => {
    persons.forEach(person => console.log(`${person.name} ${person.number}`))
    mongoose.connection.close();
  })
}
else {
  const newName = process.argv[3]
  const newNumber = process.argv[4]

  const person = new Person({
    name: newName,
    number: newNumber,
  })

  person.save().then(response => {
    console.log('person saved!');
    mongoose.connection.close();
  })
}