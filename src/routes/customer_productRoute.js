const express = require('express');
const router = express.Router();

const {
    getProductsByCustomerId,
    createProductCustomer,
    deleteProduct
} = require('../controllers/customer_productController');
const {
    customerIdValidate,
    handlerValidationResult,
    validateCreateProductCustomer,
    validateDeleteProductCustomer
} = require('../middlware/validateData/customer_productValidation');
const { isAdmin } = require('../middlware/authentication');

router.get(
    '/:customerId',
    customerIdValidate,
    handlerValidationResult,
    getProductsByCustomerId
);

router
    .route('/')
    .post(
        isAdmin,
        validateCreateProductCustomer,
        handlerValidationResult,
        createProductCustomer
    )
    .delete(
        isAdmin,
        validateDeleteProductCustomer,
        handlerValidationResult,
        deleteProduct
    );

module.exports = router;
