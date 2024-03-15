const Product = require('../models/product');
const asyncHandler = require('express-async-handler');

//POST /api/products: Create new product
const createProduct = asyncHandler(async (req, res) => {
    try {
        const { productCode, productName, description, price, quantity } =
            req.body;

        const checkProductCode = await Product.findOne({
            productCode: productCode
        });

        if (checkProductCode) {
            return res
                .status(400)
                .json({ message: 'Product code already exits' });
        }

        const productNew = await Product.create({
            productCode: productCode,
            productName: productName,
            description: description,
            price: price,
            quantity: quantity
        });

        return res.status(201).json({
            message: 'Create product successful',
            data: productNew
        });
    } catch (error) {
        throw new Error(error);
    }
});

//GET /api/products/get-all: get all product
const getAllProduct = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json({
            message: 'Get data successful',
            data: products
        });
    } catch (error) {
        throw new Error(error);
    }
});

//GET /api/products/{productCode}: get detail product by id
const getProductByCode = asyncHandler(async (req, res) => {
    try {
        const { productCode } = req.params;

        const product = await Product.findOne({ productCode: productCode });
        if (!product) {
            return res.status(404).json({ message: 'Not found product' });
        }
        return res.status(200).json({
            message: 'Get product data successful',
            data: product
        });
    } catch (error) {
        throw new Error(error);
    }
});

//PUT /api/products/{productCode}: Update product by id
const updateProductByCode = asyncHandler(async (req, res) => {
    try {
        const { productCode } = req.params;

        const { productName, description, price, quantity } = req.body;

        const checkProduct = await Product.findOne({
            productCode: productCode
        });

        if (!checkProduct) {
            return res.status(404).json({
                message: 'Not found product'
            });
        }
        //assign data
        checkProduct.productName = productName || checkProduct.productName;
        checkProduct.description = description || checkProduct.description;
        checkProduct.price = price || checkProduct.price;
        checkProduct.quantity = quantity || checkProduct.quantity;
        //save data
        await checkProduct.save();
        return res.status(200).json({
            message: 'Product updated',
            data: checkProduct
        });
    } catch (error) {
        throw new Error(error);
    }
});

//DELETE /api/products/{productCode}: Delete product by id
const deleteProductByCode = asyncHandler(async (req, res) => {
    try {
        const { productCode } = req.params;
        const productDelete = await Product.findOneAndDelete({
            productCode: productCode
        });
        if (!productDelete) {
            return res.status(404).json({
                message: 'Not found product delete'
            });
        }
        return res.status(200).json({
            message: 'Product deleted',
            data: productDelete
        });
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = {
    createProduct,
    getAllProduct,
    getProductByCode,
    updateProductByCode,
    deleteProductByCode
};
