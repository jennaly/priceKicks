const express = require('express');
const router = express.Router();
const productController = require('../controllers/product')
const { ensureAuth, ensureGuest } = require('../middleware/auth');


router.get('/', ensureAuth, productController.getStockXProduct, productController.getGoatProduct, productController.getPrices);

router.post('/', productController.saveProduct )


module.exports = router