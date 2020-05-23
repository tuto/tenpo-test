const express = require('express');
const users = require('./controllers/users');
const crypter = require('./utils/crypter')
// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(express.json());

app.post('/register', users.register);

app.post('/login', users.login);

app.post('/suma', (req, res, next) => {
   if(req.body.token 
      && crypter.validateToken(req.body.token)) {
    next(); 
   }
   else {
     res.status(401).send();
   }
}, users.sum);

app.post('/logout', users.logout);
app.get('/history', users.history);

const server = app.listen(PORT, HOST);

console.log("**************")
console.log("* run server *")
console.log("**************")

module.exports = server;