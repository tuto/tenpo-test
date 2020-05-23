const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const password = 'password';

let tokenWhiteList = [];


const crypt = (text) => {
    return crypto.createHash("sha256").update(text, "binary").digest("base64");
};

const createToken = (data) => {
    const token = jwt.sign(data, password,{
        expiresIn: "300000" //token dura 5 minutos
    });
    tokenWhiteList.push(token);
    return token;
}

const validateToken = (token) => {
    try {
        if(isInWhitList(token)) {
            jwt.verify(token, password);
            return true;
        }
        return false;
    } catch(err) {
        removeFromWhiteList(token);
        return false;
    }
}

const removeFromWhiteList = (token) => {
    return tokenWhiteList.filter(function(ele){ return ele != token; });
};

const isInWhitList = (token) => {
    return tokenWhiteList.find((ele) => {
        return ele === token
    })
}

const getEmailFromToken = (token) => {
    const decoded = jwt.decode(token);
    return decoded.email;
}

module.exports = {crypt, createToken, validateToken, deleteToken: removeFromWhiteList, getEmailFromToken}