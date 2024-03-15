const Customer = require('../models/customer');
const asyncHandler = require('express-async-handler');

//POST /api/customers : create new customer
const createCustomer = asyncHandler(async (req, res) => {
    try {
        const { fullName, email, phoneNumber, address } = req.body;

        //validate data from database
        const checkData = await Customer.findOne({
            $or: [{ email: email }, { phoneNumber: phoneNumber }]
        });

        if (checkData) {
            return res.status(400).json({
                message: 'Customer already exits email or phone number'
            });
        }
        const newCustomer = await Customer.create({
            fullName: fullName,
            email: email,
            phoneNumber: phoneNumber,
            address: address
        });

        return res.status(201).json({
            message: 'Create customer sucessfull',
            data: newCustomer
        });
    } catch (error) {
        throw new Error(error);
    }
});

//GET /api/customers/get-all :  get all list data customers
const getAllCustomer = asyncHandler(async (req, res) => {
    try {
        const listCustomer = await Customer.find();
        res.status(200).json({
            message: 'Sucessfull',
            data: listCustomer
        });
    } catch (error) {
        throw new Error(error);
    }
});

//GET /api/customers/{customerId} :  get a customer info by id
const getCustomerById = asyncHandler(async (req, res) => {
    try {
        const { customerId } = req.params;

        const query = await Customer.findById(customerId);
        return res.status(200).json({
            message: 'Sucessfull',
            data: query
        });
    } catch (error) {
        throw new Error(error);
    }
});

//PUT /api/customers/{customerId} :  put a customer info by id
const updateCustomerById = asyncHandler(async (req, res) => {
    try {
        const { customerId } = req.params;
        const { fullName, phoneNumber, address } = req.body;
        const getInfo = await Customer.findById(customerId);
        if (!getInfo) {
            return res
                .status(404)
                .json({ message: 'Not found information user' });
        } else {
            getInfo.fullName = fullName || getInfo.fullName;
            getInfo.phoneNumber = phoneNumber || getInfo.phoneNumber;
            getInfo.address = address || getInfo.address;
            await getInfo.save();
            return res.status(200).json({
                message: 'Update sucessfull',
                data: getInfo
            });
        }
    } catch (error) {
        throw new Error(error);
    }
});

//delete customer by id
const deleteCustomerById = asyncHandler(async (req, res) => {
    try {
        const { customerId } = req.params;
        const deleteCustomer = await Customer.findByIdAndDelete(customerId);

        if (!deleteCustomer) {
            return res
                .status(404)
                .json({ message: 'Not found customer to delete' });
        } else {
            return res
                .status(200)
                .json({ message: 'Deleted Customer', data: deleteCustomer });
        }
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = {
    createCustomer,
    getAllCustomer,
    getCustomerById,
    updateCustomerById,
    deleteCustomerById
};
