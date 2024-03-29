const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
    product : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Product'
    },
    seller : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    buyer : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    bidAmount : {
        type: Number,
        required: true
    },
    message : {
        type: String,
        required: true
    },
    mobile : {
        type: Number,
    },
}, {timestamps: true})

module.exports = mongoose.model('Bid', bidSchema);