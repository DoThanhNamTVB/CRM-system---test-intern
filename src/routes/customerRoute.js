const express = require('express');
const router = express.Router();

//import controller
const {
    createCustomer,
    getAllCustomer,
    getCustomerById,
    updateCustomerById,
    deleteCustomerById
} = require('../controllers/customerController');

//import middleware
const {
    validateCreateCustomer,
    handlerValidationResult,
    customerIdValidate,
    customValidateOptional
} = require('../middlware/validateData/customerValidation');
const { isAdmin } = require('../middlware/authentication');

router.post(
    '/',
    isAdmin,
    validateCreateCustomer,
    handlerValidationResult,
    createCustomer
);

router.get('/get-all', getAllCustomer);

router
    .route('/:customerId')
    .get(customerIdValidate, handlerValidationResult, getCustomerById)
    .put(
        isAdmin,
        customerIdValidate,
        customValidateOptional,
        handlerValidationResult,
        updateCustomerById
    )
    .delete(
        isAdmin,
        customerIdValidate,
        handlerValidationResult,
        deleteCustomerById
    );

module.exports = router;
