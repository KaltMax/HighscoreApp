const express = require('express');
const router = express.Router();
const db = require('../models/db'); // Importiere die neuen DB-Funktionen

// GET sessions
router.get('/', async function(req, res, next) {
  try {
    const tokens = await db.getTokens(); // Angenommen, du hast eine Funktion zum Abrufen aller Tokens
    if (tokens.length > 0) {
      res.json(tokens); // Senden Sie alle aktiven Sitzungen
    } else {
      res.status(404).json({ message: 'No active sessions found' }); // 404-Fehler, wenn keine aktiven Sitzungen gefunden wurden
    }
  } catch (err) {
    next(err);
  }
});

// Login
router.post('/', async function(req, res, next) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required' }); // Wenn die Eingaben fehlen, wird ein 400-Fehler gesendet
  }

  try {
    const credentials = await db.login(username, password); // Verwenden der login-Funktion aus db.js
    if (credentials) {
      res.json(credentials); // Wenn die Anmeldedaten gültig sind, wird sie als Antwort gesendet
    } else {
      res.status(401).json({ message: 'Invalid username or password' }); // Wenn die Anmeldedaten ungültig sind, wird ein 401-Fehler gesendet
    }
  } catch (err) {
    next(err);
  }
});

// Logout
router.delete('/', async function(req, res, next) {
  const authToken = req.headers['authorization']; // Extrahieren des Authentifizierungstoken aus den Anforderungsheadern

  if (!authToken) {
    return res.status(400).json({ message: 'Token required' }); // Fehlt das Token, wird ein 400-Fehler gesendet
  }

  try {
    await db.deleteToken(authToken); // Löschen des Tokens aus der Datenbank
    res.json({ message: 'Logged out' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
