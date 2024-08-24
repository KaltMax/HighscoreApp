const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  company: {
    type: String,
    required: false
  },
  address: {
    street: {
      type: String,
      required: false
    },
    city: {
      type: String,
      required: false
    },
    zip: {
      type: String,
      required: false
    }
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;