const router = require('express').Router();
const { addNotification, getAllNotifications, deleteNotification, readAllNotifications } = require('../controllers/notificationController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, addNotification)
    .get(protect, getAllNotifications)
    .put(protect, readAllNotifications);

router.route('/:id')
    .delete(protect, deleteNotification)

module.exports = router;