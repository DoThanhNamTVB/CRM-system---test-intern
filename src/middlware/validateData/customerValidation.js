const { body, param, validationResult } = require('express-validator');

// middleware validate data from the request

// use with create new customer
const validateCreateCustomer = [
    body('fullName')
        .trim()
        .notEmpty()
        .isString()
        .withMessage('fullName is not empty'),
    body('email').trim().isEmail().withMessage('Invalid email'),
    body('phoneNumber')
        .isMobilePhone(['vi-VN'])
        .withMessage('Invalid phone-number'),
    body('address').notEmpty().withMessage('Address is not empty')
];

// use with validate id params
const customerIdValidate = [
    param('customerId')
        .matches(/^[0-9a-fA-F]{24}$/)
        .withMessage('Invalid customerId')
];

// use with validate update customer
const customValidateOptional = [
    body('fullName')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('fullName invalid'),
    body('phoneNumber')
        .optional()
        .trim()
        .isMobilePhone(['vi-VN'])
        .withMessage('Invalid phone-number'),
    body('address').optional().trim().notEmpty().withMessage('Address invalid')
];

//middleware process authentication results

const handlerValidationResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    validateCreateCustomer,
    customerIdValidate,
    customValidateOptional,
    handlerValidationResult
};
