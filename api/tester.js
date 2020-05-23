const axios = require('axios');
let token;
const url = 'http://localhost:8080/';
axios.post(url + 'login', {
    email: 'jlueiza@gmail.com',
    password: 'value2'
  })
  .then(function (response) {
    token = response.data.token;
    console.log("TOKEN", token)
    return axios.post(url + 'suma', {
        n1: 1,
        n2: 2,
        token: token
      });
  })
  .then((response) => {
      const suma = response.data.suma;
      console.log("SUMA", suma);
      return axios.post(url + 'logout', {
        token: token
      });
  })
  .then((response) => {
      console.log("LOGOUT", response.status)
  })
  .catch(function (error) {
    console.log(error);
  });