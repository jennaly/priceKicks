const express = require('express');
const router = express.Router();
const productController = require('../controllers/product')
const { ensureAuth, ensureGuest } = require('../middleware/auth');


router.get('/', ensureAuth, productController.getFavoriteProducts, productController.getStockXProduct, productController.getGoatProduct, productController.getPrices);

router.post('/', productController.saveFavoriteProduct)

router.delete('/:id', productController.removeFavoriteProduct)


module.exports = router