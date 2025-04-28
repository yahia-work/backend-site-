const express = require('express');
const router = express.Router();
const { ReadSheet } = require('../Services/ReadSheet');

// Lire les données
router.post('/read', async (req, res) => {
  try {
    const data = await ReadSheet("code wilayas",{});
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
