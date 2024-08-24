const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Highscore Schema
const highscoreSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true,
    min: 0
  }
});

const Highscore = mongoose.model('Highscore', highscoreSchema);

module.exports = Highscore;