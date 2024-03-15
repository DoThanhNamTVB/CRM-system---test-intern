const { body, param, validationResult } = require('express-validator');

const customerIdValidate = [
    param('customerId')
        .matches(/^[0-9a-fA-F]{24}$/)
        .withMessage('Invalid customerId')
];

const validateCreateProductCustomer = [
    body('customerId')
        .matches(/^[0-9a-fA-F]{24}$/)
        .withMessage('Invalid customerId'),
    body('productId')
        .matches(/^[0-9a-fA-F]{24}$/)
        .withMessage('Invalid customerId'),
    body('quantity')
        .notEmpty()
        .isInt()
        .withMessage('Quantity is number and not empty')
];

const validateDeleteProductCustomer = [
    body('customerId')
        .matches(/^[0-9a-fA-F]{24}$/)
        .withMessage('Invalid customerId'),
    body('productId')
        .matches(/^[0-9a-fA-F]{24}$/)
        .withMessage('Invalid customerId')
];

const handlerValidationResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    customerIdValidate,
    validateCreateProductCustomer,
    validateDeleteProductCustomer,
    handlerValidationResult
};
