const asyncHandler = require('express-async-handler');
const Notification = require('../models/notificationModel')

// @desc Add a notification
// @route Post /api/notifications/
// @access Private
const addNotification = asyncHandler(async(req, res) => {
    const newNotification = await Notification.create(req.body)

    if (!newNotification) {
        res.status(403)
        throw new Error(' Internal Server Error')
    } else {
        res.status(200).json({message: "Notification added successfully"})
    }
})

// @desc Get all notifications for a user
// @route Get /api/notifications/
// @access Private
const getAllNotifications = asyncHandler(async(req,res) => {
    try {
        const notifications = await Notification.find({ user: req.user._id,}).sort({ createdAt: -1});

        res.status(200).json({ data: notifications })
    } catch (error) {
        res.status(404)
        throw new Error(error)
    }
})

// @desc Delete notification
// @route Delete /api/notifications/
// @access Private
const deleteNotification = asyncHandler(async (req, res) => {
    try {
        await Notification.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Notification deleted successfully" });
    } catch (error) {
        res.status(404)
        throw new Error(error)
    }
})

// @desc Read all notifications by user
// @route Put /api/notifications/
// @access Private
const readAllNotifications = asyncHandler(async(req, res) => {
    try {
        await Notification.updateMany(
            { user: req.user._id, read: false },
            { $set: { read: true } },
        )
        res.status(200).json({ message: "Notification marked as read successfully" });
    } catch (error) {
        res.status(404)
        throw new Error(error)
    }
})


module.exports = {
    addNotification,
    getAllNotifications,
    deleteNotification,
    readAllNotifications
}