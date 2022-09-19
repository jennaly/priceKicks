const express = require('express');
const router = express.Router();
const productController = require('../controllers/product')
const favoriteController = require('../controllers/favorite')
const { ensureAuth, ensureGuest } = require('../middleware/auth');


router.get('/', ensureAuth, productController.getStockXProduct, productController.getGoatProduct, productController.getPrices);

router.post('/', favoriteController.saveProduct )


module.exports = router