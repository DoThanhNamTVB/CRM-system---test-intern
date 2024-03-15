const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true
        },
        fullName: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            unique: true,
            required: true
        },
        address: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

// add index feild
// customerSchema.index({ email: 1, phoneNumber: 1 }, { unique: true });

module.exports = mongoose.model('Customer', customerSchema);
