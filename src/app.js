const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, Node.js CI/CD Pipeline!');
});

module.exports = app;
