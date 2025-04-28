const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello yahia');
});


app.get('/verceltest', (req, res) => {
    res.send('Hello Vercel from Express!');
  });

// Export pour Vercel 
module.exports = app;