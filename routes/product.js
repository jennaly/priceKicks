const express = require('express');
const router = express.Router();
const productController = require('../controllers/product')
const { ensureAuth, ensureGuest } = require('../middleware/auth');

router.get('/', ensureAuth, productController.getStockXProduct);
router.post('/', productController.saveProduct )



module.exports = router