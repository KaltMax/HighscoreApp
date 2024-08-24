var express = require('express');
var router = express.Router();
var db = require('../models/db'); // Verwende die neuen DB-Funktionen

// Middleware to authenticate using token
async function authenticate(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Authorization token required' });
  }
  const user = await db.getAuthUser(token);
  if (!user) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  req.user = user; // Add user info to request object
  next();
}

// Route zum Abrufen aller Highscores
router.get('/', authenticate, async function(req, res, next) {
  try {
    const highscores = await db.getHighscores();
    res.json(highscores);
  } catch (err) {
    next(err);
  }
});

// Route zum Hinzufügen eines neuen Highscores
router.post('/', authenticate, async function(req, res, next) {
  const { score } = req.body;

  // Validierung der Eingabedaten (optional, du kannst die Validierungslogik erweitern)
  if (typeof score !== 'number' || score < 0) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  try {
    await db.addHighscore(req.user.username, score); // Use authenticated user's username
    res.status(201).json({ message: 'Highscore added' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
