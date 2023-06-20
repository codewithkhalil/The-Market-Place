const router = require('express').Router();
const multer = require('multer');
const { addNewProduct, getAllProducts, editProduct, deleteProduct, uploadImageToProducts, updateProductStatus, getProductById } = require('../controllers/productsController');
const { protect } = require('../middleware/authMiddleware');

// get image from pc
const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname);
    }
});

router.route('/')
    .post(protect, addNewProduct)
router.route('/getProducts')
    .post(protect, getAllProducts)
router.route('/:id')
    .get(protect, getProductById)
    .put(protect, editProduct)
    .delete(protect, deleteProduct)
router.route('/update-status/:id')
    .put(protect, updateProductStatus)
router.route('/upload')
    .post(protect, multer({ storage: storage }).single('file'), uploadImageToProducts)

module.exports = router;