const express = require('express');
const router = express.Router();
const WishList = require('../../models/shopping/wishlist');
const lodash = require('lodash');


router.post('/', async (req, res) => {
   const result = await WishList.create(lodash.pick(req.body, [ 'ProductIDs','CustomerId'] ));
   res.send(result);

})

router.get('/', async (req, res) => {
    const result = await WishList.findAll();
    res.send(result);
})



module.exports = router;