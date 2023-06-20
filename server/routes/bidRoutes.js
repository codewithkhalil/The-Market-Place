const { createUser, placeNewBid, getAllBids, } = require('../controllers/bidController');
const { protect } = require('../middleware/authMiddleware');

const router = require('express').Router();


router.route('/')
    .post(protect, placeNewBid)
router.route('/getAll')
    .post(protect, getAllBids)


module.exports = router