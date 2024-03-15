const Customers_Products = require('../models/customer_product');
const asyncHandler = require('express-async-handler');
const customer = require('../models/customer');
const product = require('../models/product');

//GET /api/customer-products/getproducts/{customerId} : get list product was bought by customer
const getProductsByCustomerId = asyncHandler(async (req, res) => {
    try {
        const { customerId } = req.params;

        const customerProducts = await Customers_Products.find({
            customerId: customerId
        }).populate('productId');

        if (customerProducts.length <= 0) {
            return res.status(404).json({ message: 'Not found customer' });
        }
        return res.status(200).json({
            message: 'Get data successful',
            data: customerProducts
        });
    } catch (error) {
        throw new Error(error);
    }
});

//POST /api/customer-products : create  product was bought by customer
const createProductCustomer = asyncHandler(async (req, res) => {
    try {
        const { customerId, productId, quantity } = req.body;

        //check exit customerId, productId
        let checkExitId = true;
        const exitsCustomerId = await customer.findById(customerId);
        const exitsProductId = await product.findById(productId);
        if (!exitsCustomerId || !exitsProductId) {
            checkExitId = false;
        }

        if (checkExitId === false) {
            return res.status(404).json({
                message: 'customerId, productId is not found'
            });
        }

        //check quantityproduct sold and product remaining
        const getQuantityRemaining = await product.findById(productId);
        if (+quantity > +getQuantityRemaining?.quantity || +quantity < 0) {
            return res.status(400).json({
                message: `Quantity product invalid , remaining is ${+getQuantityRemaining?.quantity} `
            });
        }

        // execute create document
        const checkExitsCP = await Customers_Products.findOne({
            customerId: customerId,
            productId: productId
        });

        let dataNew;
        if (!checkExitsCP) {
            const createNew = await Customers_Products.create({
                customerId: customerId,
                productId: productId,
                quantity: quantity
            });
            dataNew = createNew;
        } else {
            checkExitsCP.quantity += +quantity;
            await checkExitsCP.save();
            dataNew = checkExitsCP;
        }

        return res.status(200).json({
            message: 'Successfull',
            data: dataNew
        });
    } catch (error) {
        throw new Error(error);
    }
});

//DeLETE /api/customer-products : delete product and customer
const deleteProduct = asyncHandler(async (req, res) => {
    try {
        const { customerId, productId } = req.body;
        const deleteDoc = await Customers_Products.findOneAndDelete({
            customerId: customerId,
            productId: productId
        });
        if (!deleteDoc) {
            return res.status(404).json({ message: 'Not found documnet' });
        }
        return res.status(200).json({
            message: 'Document deleted',
            data: deleteDoc
        });
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = {
    getProductsByCustomerId,
    createProductCustomer,
    deleteProduct
};
