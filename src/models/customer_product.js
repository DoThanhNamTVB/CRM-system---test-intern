const mongoose = require('mongoose');

const customerProductSchema = new mongoose.Schema(
    {
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Customer'
        },
        productId: {
            type: String,
            required: true,
            ref: 'Product'
        },
        quantity: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Customers_Products', customerProductSchema);
