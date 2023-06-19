const express = require('express');
const multer = require('multer');
const mysql = require('mysql');
const app = express();
const fs = require('fs');
const PORT = process.env.PORT || 3000;
const db = require('./auth/student.js');
const path = require('path');
const bodyparser = require('body-parser');
const readXlsxFile = require('read-excel-file/node');
app.use(bodyparser.json());

const session = require('express-session');
const mysqlStore = require('express-mysql-session')(session);

const studentRoute = require('./routes/studentRoute.js');
const adminRoute = require('./routes/adminRoute.js');

app.use(bodyparser.json());

app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'public')));

//setting the templating view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// storing session in mysqli db

// connecting to mysql database
const database = require('./lib/database');

app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);

app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);

// using multer library to upload excel sheet
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + '/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
  },
});
const uploadFile = multer({ storage: storage });

app.post('/import-excel', uploadFile.single('import-excel'), (req, res) => {
  importFileToDb(__dirname + '/uploads/' + req.file.filename);
  res.redirect('/adminDashboard');

  function importFileToDb(exFile) {
    readXlsxFile(exFile).then((rows) => {
      rows.shift();
      sql =
        'INSERT INTO `questions`(`sn`, `question`, `option_a`, `option_b`, `option_c`, `option_d`, `ans`, `score`) VALUES ?';
      database.query(sql, [rows], (error, res) => {
        console.log(error || res);
      });
    });
  }
});

// conneting to the router
app.use(studentRoute);
app.use(adminRoute);
//running the app on port 3000
let nodeServer = app.listen(PORT, function () {
  let port = nodeServer.address().port;
  let host = nodeServer.address().address;
  console.log('App working on: ', host, port);
});
