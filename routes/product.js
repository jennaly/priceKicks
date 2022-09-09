const express = require('express');
const router = express.Router();
const productController = require('../controllers/product')
const { ensureAuth, ensureGuest } = require('../middleware/auth');

router.get('/fetch', ensureAuth, productController.getStockXProduct);
// router.get('/:sku', ensureAuth, (req, res) => {
//     res.header('Cache-Control', 'no-cache');
//     //fetching data from stockx

//     res.render('product', {
//         sku: req.params.sku,
//     });
// })



module.exports = router