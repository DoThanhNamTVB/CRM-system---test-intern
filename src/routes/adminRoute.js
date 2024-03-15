const express = require('express');
const {
    customRegisterAcc,
    handlerValidationResult,
    customLogin
} = require('../middlware/validateData/adminValidation');
const { register, login, logout } = require('../controllers/adminController');
require('dotenv').config();
const endPoint = process.env.END_POINT_ADMIN;
const router = express.Router();

router.post(
    `/register/${endPoint}`,
    customRegisterAcc,
    handlerValidationResult,
    register
);
router.post('/login', customLogin, handlerValidationResult, login);
router.post('/logout', logout);

module.exports = router;
