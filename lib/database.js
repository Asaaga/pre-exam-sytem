const mysql = require('mysql');

const database = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'examtest',
});
database.connect(function (err) {
  if (err) {
    return console.error('error: ' + err.message);
  }
  console.log('Database connected.');
});

module.exports = database;
