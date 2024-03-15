const { body, validationResult } = require('express-validator');

// use for create customer
const validateCreateProduct = [
    body('productCode')
        .trim()
        .notEmpty()
        .isString()
        .withMessage('Product code is not empty'),
    body('productName')
        .trim()
        .notEmpty()
        .isString()
        .withMessage('productName is not empty'),
    body('description')
        .trim()
        .notEmpty()
        .isString()
        .withMessage('description is not empty'),
    body('price')
        .trim()
        .notEmpty()
        .isNumeric()
        .withMessage('price is not empty')
        .custom((value) => {
            if (parseFloat(value) <= 0) {
                throw new Error('price not allow <= 0');
            }
            return true;
        }),
    body('quantity')
        .trim()
        .notEmpty()
        .isInt()
        .withMessage('quantity is not empty')
];

//use with validate update product
const validateProductOptional = [
    body('productName')
        .optional()
        .trim()
        .notEmpty()
        .isString()
        .withMessage('productName is not empty'),
    body('description')
        .optional()
        .trim()
        .notEmpty()
        .isString()
        .withMessage('description is not empty'),
    body('price')
        .optional()
        .trim()
        .notEmpty()
        .isNumeric()
        .withMessage('price is not empty')
        .custom((value) => {
            if (parseFloat(value) <= 0) {
                throw new Error('price not allow <= 0');
            }
            return true;
        }),
    body('quantity')
        .optional()
        .trim()
        .notEmpty()
        .isInt()
        .withMessage('quantity is not empty')
];

const handlerValidationResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    validateCreateProduct,
    validateProductOptional,
    handlerValidationResult
};
