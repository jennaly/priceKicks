const express = require('express');
const router = express.Router();
const productController = require('../controllers/product')
const { ensureAuth, ensureGuest } = require('../middleware/auth');

router.get('/', ensureAuth, productController.getStockXProduct);
router.post('/', productController.saveProduct )

router.get('/goat', ensureAuth, productController.getGoatProduct);

module.exports = router