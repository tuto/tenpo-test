const { Pool} = require('pg')

const pool = new Pool({
  user: 'tenpo-api',
  host: 'localhost',
  database: 'tenpo-api',
  password: 'tenpo-api-pass',
  port: 5432,
})
let connection;

const getConnection = async() => {
  try {
    connection = await pool.connect()
    return connection;  
  } catch(err) {
    console.log(err.stack)
    throw err;  
  }
}

module.exports = {getConnection}