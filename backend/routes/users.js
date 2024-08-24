var express = require('express');
var router = express.Router();
var db = require('../models/db');  // Importiere die neuen DB-Funktionen

// Signup Route
router.post('/signup', async function(req, res, next) {
  const { username, password, company, address } = req.body;

  // Validierung der Eingabedaten (optional, du kannst auch weitere Validierungen hinzufügen)
  if (!username || !password || password.length < 8) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  const success = await db.signup(username, password, company, address);
  if (success) {
    res.status(201).json({ message: 'User created' });
  } else {
    res.status(400).json({ message: 'User already exists' });
  }
});

// Login Route
router.post('/login', async function(req, res, next) {
  const { username, password } = req.body;

  // Validierung der Eingabedaten (optional)
  if (!username || !password) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  const credentials = await db.login(username, password);
  if (credentials) {
    res.status(200).json(credentials);
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;
