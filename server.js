const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Exemple de route
app.get('/users', (req, res) => {
  res.json({ message: 'Bienvenue sur l\'API des utilisateurs' });
});

// Si on est en mode serverless sur Vercel
if (process.env.VERCEL) {
  module.exports = app; // Exporter l'application pour Vercel
} else {
  app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
  });
}
