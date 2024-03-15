const express = require('express');
const router = express.Router();

const {
    getAllProduct,
    createProduct,
    getProductByCode,
    updateProductByCode,
    deleteProductByCode
} = require('../controllers/productController');

const {
    validateCreateProduct,
    handlerValidationResult,
    validateProductOptional
} = require('../middlware/validateData/productValidation');
const { isAdmin } = require('../middlware/authentication');

router.post(
    '/',
    isAdmin,
    validateCreateProduct,
    handlerValidationResult,
    createProduct
);

router.get('/get-all', getAllProduct);
router
    .route('/:productCode')
    .get(getProductByCode)
    .put(
        isAdmin,
        validateProductOptional,
        handlerValidationResult,
        updateProductByCode
    )
    .delete(isAdmin, deleteProductByCode);

module.exports = router;
