const database = require('../lib/database');
//get admin login form
exports.getAdminLogin = (req, res, next) => {
  res.render('admin/login', {
    pageTitle: 'Admin Login',
    path: '/',
  });
};

// post admin login check admin data for login
exports.postAdminLogin = (req, res, next) => {
  // Capture the input fields
  let email = req.body.email;
  let password = req.body.password;
  // Ensure the input fields exists and are not empty
  if (email && password) {
    // Execute SQL query that'll select the account from the database based on the specified username and password
    database.query(
      'SELECT * FROM admin WHERE email = ? AND password = ?',
      [email, password],
      function (error, results, fields) {
        // If there is an issue with the query, output the error
        if (error) throw error;
        // If the account exists
        if (results.length > 0) {
          // Authenticate the user
          req.session.loggedin = true;
          req.session.email = email;
          // Redirect to home page
          res.redirect('/adminDashboard');
        } else {
          res.redirect('/adminLogin');  
        }
      }
    );
  } else {
    res.flash('error', 'Please enter Email and Password!');
    res.redirect('/admin/login');
  }
};
// get dashboard
exports.getDashboard = (req, res, next) => {
  res.render('admin/dashboard', {
    pageTitle: 'Admin Dashboard',
    path: 'admin_dashboard',
  });
};

// post admin logout
exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect('/');
  });
};
