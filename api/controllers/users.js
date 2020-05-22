const db = require('../clients/db');
const validates = require('../utils/validates');

const register = (req, res) => {
    const data = req.body;

    //validate data
    if(!validates.registerData(data)) {
        res.status(400).send();
    }

    const email = data.email;
    //validate exist user
    if(db.userExist(email)) {
        res.status(409).send();
    }
    
    try {
        //register
        db.registerUser(data);
        res.status(201).send();
    }
    catch(e) {
        res.status(500).send();
    }
    return;
}



module.exports = {register}