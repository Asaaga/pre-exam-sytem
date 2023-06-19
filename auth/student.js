const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  password: process.env.DB_PASS,
  user: process.env.DB_USER,
  database: process.env.MYSQL_DB,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
});
let db = {};
db.getUser = (id) => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM users WHERE id= ?', [id], (error, user) => {
      if (error) {
        return reject(error);
      }
      return resolve(user);
    });
  });
};
db.getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM users email = ?', [email], (error, users) => {
      if (error) {
        return reject(error);
      }
      return resolve(users[0]);
    });
  });
};
db.insertUser = (matric, name, email, password) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'INSERT INTO users (matric, name, email, password) VALUES (?, ?, ?, ?)',
      [matric, name, email, password],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result.insertId);
      }
    );
  });
};
module.exports = db;
