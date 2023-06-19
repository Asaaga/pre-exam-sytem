const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/', studentController.getIndex);
router.get('/register', studentController.getRegister);
router.get('/login', studentController.getLogin);
router.post('/login', studentController.postStudentLogin);
router.post('/register', studentController.postStudentRegister);
router.get('/dashboard', studentController.getStudentDashboard);
router.post('/submit', studentController.postStudentSubmit);
router.get('/result', studentController.getResultPage);
router.post('/reset', studentController.postRestart);
module.exports = router;
