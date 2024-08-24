const mongoose = require('mongoose');
const config = require('../config');

const User = require('./user');
const Token = require('./token');
const Highscore = require('./highscore');
const HighscoreList = require('./highscoreList');

mongoose.connect(config.mongoURI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to MongoDB");
});

const passwordHash = require('password-hash');
const randomToken = require('random-token');

async function signup(username, password, company, address) {
    let user = await User.findOne({ username: username });
    if (user) {
      return false;
    }
  
    const newUser = new User({ username, password: passwordHash.generate(password), company, address });
    await newUser.save();
    return true;
  }

async function login(username, password) {
  let user = await User.findOne({ username: username });
  if (user && passwordHash.verify(password, user.password)) {
    let credentials = {
      token: randomToken(64),
      username: user.username
    };

    const newToken = new Token(credentials);
    await newToken.save();
    return credentials;
  }

  return null;
}

async function deleteToken(authToken) {
  await Token.deleteOne({ token: authToken });
}

async function isAuthenticated(authToken) {
  let token = await Token.findOne({ token: authToken });
  return token != null;
}

async function getAuthUser(authToken) {
  return await Token.findOne({ token: authToken });
}

async function getHighscores() {
  const highscoreList = await HighscoreList.findOne({ listName: 'default' });
  if (highscoreList) {
    // Absteigend nach Punktzahl sortieren
    highscoreList.highscores.sort((a, b) => b.score - a.score);
  }
  return highscoreList ? highscoreList.highscores : [];
}

async function addHighscore(username, score) {
  const newHighscore = new Highscore({ username, score });
  await newHighscore.save();
  
  let highscoreList = await HighscoreList.findOne({ listName: 'default' });
  if (!highscoreList) {
    highscoreList = new HighscoreList({ listName: 'default', highscores: [] });
  }
  highscoreList.highscores.push(newHighscore);
  await highscoreList.save();
}

module.exports = {
  signup,
  login,
  deleteToken,
  isAuthenticated,
  getAuthUser,
  getHighscores,
  addHighscore
};
