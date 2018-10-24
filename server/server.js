const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const port = 5002

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var data = []

app.get('/api/user', (req, res) => res.send(data))
app.post('/api/user', (req, res) => {
  data.push(req.body)
  res.send(data)
})
app.post('/api/deleteuser', (req, res) => {
  let arr = data.filter(item => {
    if (item.id !== req.body.id) {
      return item
    }
  })
  data = arr
  res.send(data)
})
app.post('/api/edituser', (req, res) => {
  data.forEach(e => {
    if (e.id = req.body.id) {
      e.id = req.body.id
      e.name = req.body.name
      e.email = req.body.email
    }
  })
  res.send(data)
})
app.listen(port, () => console.log(`listening on port ${port}!`))