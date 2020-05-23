const db = require('../clients/db');
const validates = require('../utils/validates');
const crypter = require('../utils/crypter');

const register = async(req, res) => {
    const data = req.body;

    //validate data
    if(!validates.registerData(data)) {
        res.status(400).send();
        return;
    }

    const email = data.email;
    try {
        //validate exist user
        await db.userNotExist(email)
    }
    catch(e) {
        res.status(409).send();
        return;
    }
    
    try {
        //register
        await db.registerUser([data.email, crypter.crypt(data.password), data.name, data.last_name]);
        await db.insertAction(email,1);
        res.status(201).send();
    }
    catch(e) {
        res.status(500).send();
    }
    return;
};

const login = async(req, res) => {
    const data = req.body;

    //validate data
    if(!validates.loginData(data)) {
        res.status(400).send();
        return;
    }
    try {
        const userData = await db.login(data.email, crypter.crypt(data.password));
        const token = crypter.createToken({email:data.email, name:userData.name, last_name:userData.last_name})
        await db.insertAction(data.email,2);
        res.status(200).send({token});
    }
    catch(e) {
        res.status(403).send();
    }
    return;
}

const sum = async(req, res) => {
    const data = req.body;
    const email = crypter.getEmailFromToken(data.token);
    try {
        await db.insertAction(email,3);
        res.status(200).send({suma: data.n1 + data.n2});
    }
    catch(e) {
        res.status(500).send();
    }
    
}

const logout = async(req, res) => {
    const data = req.body;
    const email = crypter.getEmailFromToken(data.token);
    //validate data
    if(!validates.logoutData(data)) {
        res.status(400).send();
        return;
    }
    try {
        crypter.deleteToken(data.token)
        await db.insertAction(email,5);
        res.status(200).send();
    }
    catch(e) {
        res.status(403).send();
    }
    return;
}

const history = async(req, res) => {
    const email = req.query.email;

    //validate data
    if(!validates.historyData({email})) {
        res.status(400).send();
        return;
    }
    try {
        const history = await db.getHistoryByEmail(email);
        await db.insertAction(email,4);
        res.status(200).send({history});
    }
    catch(e) {
        console.log("TUTO", e)
        res.status(403).send();
    }
    return;
}


module.exports = {register, login, sum, logout, history};