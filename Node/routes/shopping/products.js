const express = require('express');
const router = express.Router();
const Product = require('../../models/shopping/products');
const lodash = require('lodash');


router.post('/', async (req, res) => {
   const result = await Product.create(lodash.pick(req.body, ['ProductID','ProductName','Price','Discount','ImageURL','Description','Stock'] ));
   res.send(result);

})

router.get('/', async (req, res) => {
    const result = await Product.findAll();
    res.send(result);
})



module.exports = router;