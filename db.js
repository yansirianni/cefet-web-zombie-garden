var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  database: 'zombies',
  user: 'root',
  password: 'oivalf'
});

connection.connect();

module.exports = connection;
