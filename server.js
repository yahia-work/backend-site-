const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sheetRoutes = require('./Routes/SheetRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


app.use('/read', sheetRoutes);

app.get('/', (req, res) => {
  res.send('Hello yahia');
});

app.get('/verceltest', (req, res) => {
    res.send('Hello Vercel from Express!');
});

module.exports = app; // Exporter l'application pour Vercel

