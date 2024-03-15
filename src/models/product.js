const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        productCode: {
            type: String,
            unique: true,
            required: true
        },
        productName: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
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

// productSchema.index({ productCode: 1 }, { unique: true });

module.exports = mongoose.model('Product', productSchema);
