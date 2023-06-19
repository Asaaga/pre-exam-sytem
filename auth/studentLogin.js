const db = require('./student.js');

app.post('/login', async (req, res, next) => {
  try {
    const email = req.body.email;
    let password = req.body.password;
    user = await db.getUserByEmail(email);

    if (!user) {
      return res.send({
        message: 'Invalid email',
      });
    }
    if (user.password !== password) {
      return res.send({
        message: 'Invalid  password',
      });
    }

    req.session.userId = user.id;
    return res.redirect('/dashboard');
  } catch (e) {
    console.log(e);
  }
});
