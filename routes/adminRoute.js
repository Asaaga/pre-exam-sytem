const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/adminLogin', adminController.getAdminLogin);
router.post('/adminlogin', adminController.postAdminLogin);
router.get('/adminDashboard', adminController.getDashboard);
router.post('/logout', adminController.postLogout);

module.exports = router;
