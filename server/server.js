const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const port = 5002
const app = express()

const user = require('./models/Users')

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const db = 'mongodb://localhost:27017/demouser'

mongoose.connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDb Connect..."))
  .catch(err => console.log(err))

app.get('/api/user', (req, res) => {
  user.find()
    .sort({ date: -1 })
    .then(item => res.json(item));
})

// insert User
app.post('/api/user', (req, res) => {
  const newUser = new user({
    name: req.body.name,
    email: req.body.email
  })
  newUser.save()
    .then(item => res.json(item))
})

app.listen(port, () => console.log(`listening on port ${port}!`))