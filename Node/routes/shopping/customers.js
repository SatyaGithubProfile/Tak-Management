const express = require('express');
const router = express.Router();
const Customers = require('../../models/shopping/customers');
const lodash = require('lodash');


router.post('/', async (req, res) => {
   const result = await Customers.create(lodash.pick(req.body, [ 'Email','Password','FirstName','LastName','MobileNumber','Address','Pincode'] ));
   res.send(result);

})

router.get('/', async (req, res) => {
    const result = await Customers.findAll();
    res.send(result);
})



module.exports = router;