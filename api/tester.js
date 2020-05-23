const axios = require('axios');
let token;

axios.post('http://localhost:8080/login', {
    email: 'jlueiza@gmail.com',
    password: 'value2'
  })
  .then(function (response) {
    token = response.data.token;
    console.log("TOKEN", token)
    return axios.post('http://localhost:8080/suma', {
        n1: 1,
        n2: 2,
        token: token
      });
  })
  .then((response) => {
      const suma = response.data.suma;
      console.log("SUMA", suma);
      return axios.post('http://localhost:8080/logout', {
        token: token
      });
  })
  .then((response) => {
      console.log("LOGOUT", response.status)
  })
  .catch(function (error) {
    console.log(error);
  });