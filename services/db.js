const mysql = require('mysql');
const dotenv = require("dotenv");

dotenv.config();

// MySQL Connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Routes

connection.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected');
});

module.exports = connection;
