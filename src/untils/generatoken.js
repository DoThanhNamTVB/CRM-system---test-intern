require('dotenv').config();
const jwt = require('jsonwebtoken');

const generateToken = (data) => {
    const payload = {
        id: data._id,
        email: data.email,
        role: data.role
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '300d'
    });
    return `Bearer ${token}`;
};

module.exports = generateToken;
