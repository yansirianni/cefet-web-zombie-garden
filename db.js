let mysql = require('mysql');
let connection = mysql.createConnection({
  host: '127.0.0.1',
  database: 'zombies',
  user: 'root',
  password: '123456',
  port: 3309,
  multipleStatements: true
});

connection.connect();

module.exports = connection;
