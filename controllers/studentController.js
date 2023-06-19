const database = require('../lib/database');

exports.getIndex = (req, res, next) => {
  res.render('index', {
    pageTitle: 'Exam Test',
    path: '/',
  });
};
exports.getRegister = (req, res, next) => {
  res.render('students/register', {
    pageTitle: 'Register',
    path: '/register',
  });
};
exports.getLogin = (req, res, next) => {
  res.render('students/login', {
    pageTitle: 'Login',
    path: '/login',
  });
};
exports.postStudentLogin = (req, res, next) => {
  let email = req.body.email;
  if (email) {
    database.query(
      'SELECT * FROM users WHERE email= ?',
      [email],
      function (error, results, field) {
        if (error) throw error;
        // If the account exists
        if (results.length > 0) {
          // Authenticate the user
          req.session.loggedin = true;
          req.session.email = email;
          // Redirect to home page
          res.redirect('/dashboard');
        } else {
          res.send('Incorrect email!');
        }
      }
    );
  } else {
    res.flash('error', 'Please enter exam number!');
  }
};
// post student log out
exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect('/');
  });
};
// post student register
exports.postStudentRegister = (req, res, next) => {
  let matric = req.body.matric;
  let fullname = req.body.fullname;
  let email = req.body.email;
  let password = req.body.password;

  if (email) {
    database.query(
      'SELECT * FROM users WHERE email = ?',
      [email],
      function (error, results, field) {
        if (error) {
          req.flash('msg', 'Unable to register');
          res.render('student/register', {
            pageTitle: 'Register',
          });
        }
        if (results.length > 0) {
          // User with the given email already exists
          // Handle the appropriate error or redirect to a registration failure page
          req.flash('msg', 'User already exist');
          res.render('student/register', {
            pageTitle: 'Register',
          });
        } else {
          database.query(
            'INSERT INTO users (matric, name, email, password) VALUES (?, ?, ?, ?)',
            [matric, fullname, email, password],
            function (error, results, field) {
              if (error) {
                console.log('an error occure');
              } else {
                console.log('User successfully registered');
                res.redirect('/login');
              }
            }
          );
        }
      }
    );
  }
};
// get student dashboard
exports.getStudentDashboard = (req, res, next) => {
  if (req.session.loggedin) {
    // Assuming you are using a framework like Express.js for handling requests
    const currentPage = req.query.page ? parseInt(req.query.page) : 1; // Retrieve the current page number from the query parameters, defaulting to 1 if not provided

    const questionsPerPage = 1; // Adjust this value according to your desired number of questions per page

    // Calculate the OFFSET based on the current page number and the number of questions to be displayed per page
    const offset = (currentPage - 1) * questionsPerPage;

    // Modify the SQL query to include the LIMIT and OFFSET clauses
    const sqlQuery = `SELECT * FROM questions LIMIT ${questionsPerPage} OFFSET ${offset}`;

    database.query(sqlQuery, function (err, data) {
      if (err) {
        return err;
      }
      res.render('students/dashboard', {
        pageTitle: 'Student Dashboard',
        path: '/dashboard',
        data: data,
        page: currentPage,
        questionsPerPage: questionsPerPage,
        isLoggedin: req.session.loggedin,
        email: req.session.email,
        score: req.session.score,
      });
    });
  } else {
    res.redirect('/login');
  }
};
// student submit
exports.postStudentSubmit = (req, res, next) => {
  const selectedOption = req.body.selectedOption;
  const id = req.body.id;
  const buttonValue = parseInt(req.body.send);
  // Perform any necessary validation or sanitization of the input data
  if (buttonValue === -1) {
    // Submit the final answers and update the score
    database.query(
      `INSERT INTO answers (sn, ans) VALUES (?, ?)`,
      [id, selectedOption],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Internal Server Error');
        }

        // Fetch the correct answer from the questions table
        database.query(
          `SELECT ans FROM questions WHERE id = ?`,
          [id],
          (err, questionResult) => {
            if (err) {
              console.error(err);
              return res.status(500).send('Internal Server Error');
            }

            // Compare the selected answer with the correct answer
            const correctAnswer = questionResult[0].ans;
            const isCorrect = selectedOption === correctAnswer;

            if (isCorrect) {
              // Fetch the current score of the user
              database.query(
                `SELECT score FROM users WHERE email = ?`,
                [req.session.email],
                (err, userResult) => {
                  if (err) {
                    console.error(err);
                    return res.status(500).send('Internal Server Error');
                  }

                  // Update the score based on correctness
                  const currentScore = userResult[0].score;
                  const newScore = currentScore + 1;

                  // Update the score in the users table
                  database.query(
                    `UPDATE users SET score = ? WHERE email = ?`,
                    [newScore, req.session.email],
                    (err, updateResult) => {
                      if (err) {
                        console.error(err);
                        return res.status(500).send('Internal Server Error');
                      }

                      req.session.score = newScore; // Update the score in the session
                      res.redirect('/dashboard');
                    }
                  );
                }
              );
            } else {
              res.redirect('/dashboard');
            }
          }
        );
      }
    );
  } else {
    // Update the answer and redirect to the next page
    database.query(
      `INSERT INTO answers (sn, ans) VALUES (?, ?)`,
      [id, selectedOption],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Internal Server Error');
        }
        res.redirect(`/dashboard?page=${buttonValue}`);
      }
    );
  }
};
exports.getResultPage = async (req, res, next) => {
  try {
    const questions = await new Promise((resolve, reject) => {
      database.query('SELECT * FROM questions', function (error, questions) {
        if (error) {
          reject(error);
        } else {
          resolve(questions);
        }
      });
    });

    let totalScore = 0;

    for (const question of questions) {
      const answers = await new Promise((resolve, reject) => {
        database.query(
          `SELECT * FROM answers WHERE sn=${question.id}`,
          function (error, answers) {
            if (error) {
              reject(error);
            } else {
              resolve(answers);
            }
          }
        );
      });

      if (question.ans === answers[0].ans) {
        const newScore = question.score + 2;
        totalScore += newScore;

        await new Promise((resolve, reject) => {
          database.query(
            `UPDATE questions SET score = ${newScore} WHERE id = ${question.id}`,
            function (error, result) {
              if (error) {
                reject(error);
              } else {
                resolve();
              }
            }
          );
        });
      }
    }
    res.render('students/result', {
      path: '/result',
      pageTitle: 'Score Page',
      totalScore: totalScore,
      scores: questions.map((q) => q.score),
    });
  } catch (error) {
    console.log('Error fetching questions or updating scores:', error);
    // Handle the error appropriately
  }
};
// restart
exports.postRestart = (req, res, next) => {
  database.query('UPDATE questions SET score = NULL WHERE score IS NOT NULL', function(error, result) {
    if (error) {
      console.log('An error occurred:', error);
    } else {
      if (result.affectedRows > 0) {
        database.query('DELETE FROM answers', function(error, result) {
          if (error) {
            console.log('An error occurred:', error);
          } else {
            res.redirect('/dashboard');
          }
        });
      } else {
        res.redirect('/dashboard');
      }
    }
  });
};

