const asyncHandler = require("express-async-handler");
const Bid = require('../models/bidModel');

// @desc Place a new bid
// @route Post /api/bids
// @access Private
const placeNewBid = asyncHandler(async(req, res) =>{
    try {
        await Bid.create(req.body)

        res.status(200).json({message: "Bid placed successfully"})
    } catch (error) {
        res.status(500)
        throw new Error(error)
    }
})

// @desc Get all bid
// @route Get /api/bids
// @access Private
const getAllBids = asyncHandler(async (req, res) =>{
    try {
        const { product, seller, buyer } = req.body;

        let filters = {}

        if (product) {
            filters.product = product
        }
        
        if (seller) {
            filters.seller = seller
        }
        if (buyer) {
            filters.buyer = buyer
        }

        const bids = await Bid.find(filters).populate("product").populate("buyer").populate("seller").sort({ createdAt: -1})

        res.status(200).json({ data: bids })
    } catch (error) {
        res.status(404)
        throw new Error(error)
    }
})


module.exports = {
    placeNewBid,
    getAllBids,
}