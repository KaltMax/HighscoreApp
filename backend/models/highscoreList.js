const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Highscore = require('./highscore');

// HighscoreList Schema
const highscoreListSchema = new Schema({
  listName: {
    type: String,
    required: true
  },
  highscores: [Highscore.schema] // Ein Array von Highscore-Einträgen
});

const HighscoreList = mongoose.model('HighscoreList', highscoreListSchema);

module.exports = HighscoreList;