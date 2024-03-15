const { body, validationResult } = require('express-validator');

const customRegisterAcc = [
    body('email').trim().notEmpty().isEmail().withMessage('Invalid email'),
    body('userName').trim().notEmpty().withMessage('Invalid userName'),
    body('password')
        .trim()
        .notEmpty()
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
        .withMessage(
            'Password invalid, hould contain at least one digit, one lower case,one upper case,8 from the mentioned characters'
        ),
    body('role')
        .trim()
        .notEmpty()
        .isIn(['Admin', 'Staff'])
        .withMessage('Invalid typre data Role')
];

const customLogin = [
    body('email').trim().notEmpty().isEmail().withMessage('Invalid email'),
    body('password')
        .trim()
        .notEmpty()
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
        .withMessage('Password invalid')
];

const handlerValidationResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    customRegisterAcc,
    customLogin,
    handlerValidationResult
};
