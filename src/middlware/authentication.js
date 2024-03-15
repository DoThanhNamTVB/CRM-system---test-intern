const jwt = require('jsonwebtoken');
const admin = require('../models/admin');
const TokenSchema = require('../models/token');

const isAuthentication = async (req, res, next) => {
    //get token
    const bearerToken = req.headers.authorization || req.body.token;
    const accessToken = bearerToken?.split(' ')[1];
    if (!accessToken) {
        return res.status(401).json({
            message: 'User not authenticated'
        });
    }

    //check token whitelist
    const checkWhiteList = await TokenSchema.findOne({
        bearerToken: bearerToken
    });

    if (checkWhiteList && checkWhiteList.isExpired === true) {
        return res
            .status(401)
            .json({ message: 'Access token unused , please login again' });
    }

    //check token expired
    jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({
                message: 'Access token is expired'
            });
        }

        req.user = user;
        next();
    });
};

const isAdmin = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const user = await admin.findById(_id);
        if (user && user.role === 'Admin') {
            next();
        }
        return res.status(401).json({ message: 'You are not admin' });
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = { isAuthentication, isAdmin };
