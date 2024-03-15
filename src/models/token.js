const mongoose = require('mongoose');

const tokenShema = new mongoose.Schema(
    {
        token: {
            type: String,
            unique: true,
            required: true
        },
        isExpired: {
            type: Boolean
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Token', tokenShema);
