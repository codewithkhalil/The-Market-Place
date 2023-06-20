const { createUser, loginUser, getUser, getAllUsers, updateUserStatus } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = require('express').Router();


router.route('/')
    .post(createUser)
    .get(protect,getUser)
router.route('/all').get(protect,getAllUsers)
router.route('/update-status/:id').put(protect,updateUserStatus)

router.route('/login').post(loginUser)

module.exports = router