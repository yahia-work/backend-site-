const express = require('express');
const router = express.Router();
const { ReadSheet } = require('../Services/ReadSheet');

// Lire les données
router.post('/', async (req, res) => {
  try {
    const request = req.body;
    const sheet = request.sheet || "commandes"
    const filter = request.filter || {}

    const data = await ReadSheet(sheet,filter);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
