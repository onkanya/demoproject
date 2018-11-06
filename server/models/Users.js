const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Users = new Schema({
  name: String,
  email: String
});

module.exports = user = mongoose.model('user', Users);
