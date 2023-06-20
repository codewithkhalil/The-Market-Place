const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler');
const cloudinary = require('../config/cloudinaryConfig');
const User = require('../models/userModel');
const Notification = require('../models/notificationModel');

// @desc Create a new Product
// @route Post /api/products/
// @access Private
const addNewProduct = asyncHandler(async(req, res) => {
    const newProduct = await Product.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        age: req.body.age,
        images: req.body.images,
        billAvailable: req.body.billAvailable,
        warrantyAvailable: req.body.warrantyAvailable,
        accessoriesAvailable: req.body.accessoriesAvailable,
        boxAvailable: req.body.boxAvailable,
        seller: req.user.id
    })

    if (newProduct) {
        // send notification to the admin
        const admins = await User.find({ role: "admin"})
        admins.forEach(async (admin) => {
            await Notification.create({
                user: admin._id,
                title: 'New Product Added',
                message: admin `New product added by ${req.user.name}`,
                onClick: '/admin/products',
                read: false
            })
        })
        res.status(201).json({message: "Product added successfully"})
    }else {
        res.status(404)
        throw new Error("Internal Server Error")
    }
})

// @desc Get all Product
// @route Post /api/products/getProducts
// @access Private
const getAllProducts = asyncHandler( async(req, res) => {
    const { seller, category = [], age = [], status, search } = req.body

    let filters = {}
    if (seller) {
        filters.seller = seller
    }
    if (status) {
        filters.status = status
    }
    // filter by category
    if (category.length > 0) {
        filters.category = { $in: category};
    }
    // filter by age
    if (age.length > 0) {
        age.forEach(item => {
            const fromAge = item.split('-')[0];
            const toAge = item.split('-')[1];
            filters.age = { $gte: fromAge, $lte: toAge}
        });
    }
    // filter by search
    const nameFilter = {};
    if (search) {
        nameFilter.name = { $regex: search, $options: 'i' };
    }
    const products = await Product.find({...filters, ...nameFilter}).populate('seller', 'name').sort({ createdAt: -1});

    res.status(200).json({data: products});
})

// @desc Get product by ID
// @route Get /api/products/:id
// @access Private
const getProductById = asyncHandler(async(req, res) => {
    const {id} = req.params

    const product = await Product.findById(id).populate('seller')

    if (!product) {
        res.status(404)
        throw new Error('Product not found')
    } else(
        res.status(200).json({data: product})
    )


})

// @desc Edit a Product
// @route PUT /api/products/
// @access Private
const editProduct = asyncHandler( async(req, res) => {
    const { id } = req.params;

    const product = await Product.findById(id);

    if ( product.seller._id.toString() !== req.user.id.toString() ) {
        res.status(401)
        throw new Error('User unauthorized to perform this action');
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body);

    if (!updatedProduct) {
        res.status(404)
        throw new Error('Product not found')
    }else {
        res.status(201).json({message: 'Product updated successfully'})
    }
})

// @desc Delete a Product
// @route Delete /api/products/
// @access Private
const deleteProduct = asyncHandler(async(req, res) => {
    const { id } = req.params

    const product = await Product.findById(id)

    if (!product) {
        res.status(404)
        throw new Error('Product not found')
    }

    if ( product.seller._id.toString() !== req.user.id.toString() ) {
        res.status(401)
        throw new Error('User unauthorized to perform this action');
    }
    
    const result = await product.deleteOne();

    if (result) {
        res.status(200).json({message: 'Product deleted successfully'}) 
    } else {
        res.status(500)
        throw new Error('Internal server error')
    }
})

// @desc Upload product image to cloudinary
// @route Post /api/products/upload
// @access Private
const uploadImageToProducts = asyncHandler(async(req, res) => {
    try {
        const { productId } = req.body
        const result = await cloudinary.uploader.upload(req.file.path,{
            folder: "tmp"
        });
    
        await Product.findByIdAndUpdate(productId, {
            $push: { images: result.secure_url },
        }); 

        res.status(201).json({message: 'Product Image uploaded successfully', result, data: result.secure_url}); 
    } catch (error) {
        res.status(500)
        throw new Error(error)
    }
})

// @desc Update product status
// @route PUT /api/products/update-status
// @access Private
const updateProductStatus = asyncHandler(async(req, res) => {
    try {
        const  {status} = req.body;

        if (req.user.role !== 'admin') {
            throw new Error('You are not allowed to carry out this action')
        } 

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {status});

        // send notification to user
        await Notification.create({
            user: updatedProduct.seller,
            title: ' Your Product Status Updated',
            message:  `Your product ${updatedProduct.name} has been ${status}`,
            onClick: '/profile',
            read: false
        })

        res.status(201).json({message: 'Product status updated successfully'})
    } catch (error) {
        res.status(404)
        throw new Error(error)
    }
})


module.exports = {
    addNewProduct,
    getAllProducts,
    editProduct,
    deleteProduct,
    uploadImageToProducts,
    updateProductStatus,
    getProductById
}