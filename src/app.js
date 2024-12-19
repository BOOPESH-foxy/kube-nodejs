const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, Node.js CI/CD Pipeline!');
});

const PORT = 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = { app, server };

