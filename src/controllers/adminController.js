const asyncHandler = require('express-async-handler');
const AdminModel = require('../models/admin');
const TokenSchema = require('../models/token');
const generateToken = require('../untils/generatoken');

//POST /api/user/register : create new admin account
const register = asyncHandler(async (req, res) => {
    try {
        const { email, userName, password, role } = req.body;

        //check email
        const checkEmail = await AdminModel.findOne({ email: email });

        if (checkEmail) {
            return res.status(400).json({
                message: ' Email already exits'
            });
        }

        const newAccount = await AdminModel.create({
            email: email,
            userName: userName,
            password: password,
            role: role
        });

        return res.status(201).json({
            message: 'Register successfull',
            data: newAccount
        });
    } catch (error) {
        throw new Error(error);
    }
});

//POST /api/user/login : login
const login = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;

        const findAdmin = await AdminModel.findOne({ email: email });
        if (!findAdmin) {
            return res.status(400).json({
                message: 'Not found account'
            });
        }
        if (findAdmin && (await findAdmin.checkPassword(password))) {
            let token = generateToken({
                _id: findAdmin._id,
                email: findAdmin.email,
                role: findAdmin.role
            });

            await TokenSchema.create({
                token: token,
                isExpired: false
            });

            return res.status(200).json({
                message: 'Login successful',
                token: token
            });
        } else {
            return res.status(400).json({
                message: 'Email or password is not correct'
            });
        }
    } catch (error) {
        throw new Error(error);
    }
});

//POST /api/user/logout : logout
const logout = asyncHandler(async (req, res) => {
    try {
        const bearerToken = req.headers?.authorization || req.body?.token;

        await TokenSchema.findOneAndUpdate(
            {
                token: bearerToken
            },
            {
                token: bearerToken,
                isExpired: true
            },
            { new: true, upsert: true }
        );
        if (!bearerToken) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        res.status(200).json({
            message: 'Lock token successful'
        });
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = { register, login, logout };
