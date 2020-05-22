const express = require('express');
const users = require('./controllers/users')
// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/register', users.register);
const server = app.listen(PORT, HOST);

console.log(`Running on http://${HOST}:${PORT}`);

module.exports = server;