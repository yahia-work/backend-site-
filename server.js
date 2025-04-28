const dotenv = require('dotenv');
const express = require('express');
const app = express();
dotenv.config();
app.use(express.json());


const sheetRoutes = require('./Routes/SheetRoutes');

app.use('/read', sheetRoutes);

app.get('/', (req, res) => {
  res.send('Hello yahia');
});


app.get('/verceltest', (req, res) => {
    res.send('Hello Vercel from Express!');
  });

// Export pour Vercel 
module.exports = app;