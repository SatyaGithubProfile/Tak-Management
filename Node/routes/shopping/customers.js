const express = require('express');
const router = express.Router();
const { Customers, validate } = require('../../models/shopping/customers');
const lodash = require('lodash');
const response = require('../../models/response');


router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(response(400, 'Error', error.details[0].message));
    try {
        const result = await Customers.create(lodash.pick(req.body, ['Email', 'Password', 'FirstName', 'LastName', 'MobileNumber', 'Address', 'Pincode']));
        res.send(response(200, 'Success', result));
    }
    catch (error) {
        console.log("error from db --->", error);
        res.status(400).send(response(400, 'Error', error.errors[0].message));
    }
})

router.get('/', async (req, res) => {
    const result = await Customers.findAll();
    res.send(response(200, 'Success', result));
})



module.exports = router;