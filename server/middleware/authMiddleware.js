const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
// const { cloudinary_js_config } = require('../config/cloudinaryConfig')
const User = require('../models/userModel')


const protect = asyncHandler(async(req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1]

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN)

            // Get user from the token
            req.user = await User.findById(decoded.userId).select('-password')
            // console.log(req.user);

            next()
        } catch (error) {
            console.log(error);
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

module.exports = { protect }