const User = require('../models/userModel');
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// @desc Create a new user
// @route POST /api/users
// @access Public
const createUser = asyncHandler(async(req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please fill all necessary fields')
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    //save user       
    const user = User.create({name, email, password});
    
    if (user) {
        res.status(201).json({message: 'User created successfully', success: true})  
    }else{
        res.status(400);
        throw new Error('Invalid user data');
    }
})

// @desc Login a user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler( async(req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if (!user) {
        res.status(403)
        throw new Error('User not found')
    }

    if (user.status !== 'active') {
        res.status(403)
        throw new Error('Your account has beeen blocked, kindly contact admin')
    }

    // check password
    const validPassword = await bcrypt.compare(password,user.password);

    if (!validPassword) {
        res.status(404)
        throw new Error('Invalid password')
    } else{
        // create and assign token
        const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET_TOKEN, {expiresIn: "1d"})
        res.status(201).json({message: `User ${user.name} has been logged in successfully`, data: token, success: true})
    }
})

// @desc Get a user
// @route Get /api/users/
// @access Private
const getUser = asyncHandler(async(req, res) => {
    const { id } = req.user;
    
    const user = await User.findById(id);

    if (!user) {
        res.status(404)
        throw new Error('User not found')
    }else{
        res.status(201).json({data: user, success: true})
    }

})

// @desc Get all users
// @route Get /api/users/all
// @access Private
const getAllUsers = asyncHandler(async(req, res) => {
    
    const users = await User.find();

    if (!users) {
        res.status(404)
        throw new Error('Users not found')
    }else{
        res.status(201).json({data: users})
    }

})

// @desc Update user status
// @route PUT /api/users/update-status
// @access Private
const updateUserStatus = asyncHandler(async(req, res) => {
    try {
        if (req.user.role !== 'admin') {
            throw new Error('You are not allowed to carry out this action')
        } 
        await User.findByIdAndUpdate(req.params.id, req.body);

        res.status(201).json({message: 'User status updated successfully'})
    } catch (error) {
        res.status(404)
        throw new Error(error)
    }
})

module.exports = {
    createUser,
    loginUser,
    getUser,
    getAllUsers,
    updateUserStatus
}