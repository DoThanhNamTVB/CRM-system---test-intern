const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

const connectDB = asyncHandler(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
        console.log('Connected with database');
    } catch (error) {
        throw new Error(`Connnect database failed : ${error}`);
    }
});

module.exports = { connectDB };
