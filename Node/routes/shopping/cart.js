const express = require('express');
const router = express.Router();
const Cart = require('../../models/shopping/cart');
const lodash = require('lodash');


router.post('/', async (req, res) => {
   const result = await Cart.create(lodash.pick(req.body, ['CustomerId','ProductID','Quantity','NetPrice','Discount','TotalPrice'] ));
   res.send(result);

})

router.get('/', async (req, res) => {
    const result = await Cart.findAll();
    res.send(result);
})



module.exports = router;