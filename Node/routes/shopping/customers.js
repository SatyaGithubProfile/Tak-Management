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
        res.status(400).send(response(400, 'Error', error.errors[0].message));
    }
})

router.get('/', async (req, res) => {
    const result = await Customers.findAll();
    const count = await Customers.count();
    res.send(response(200, 'Success', result, count));
})

router.put('/', async (req, res) => {
    // check the Id existed or not db

    const customer = await Customers.findByPk(req.body.id);
    if (!customer) res.status(400).send(response(400, 'Error', 'Customer not found with the given Id..'));


    // check data validation
    const { error } = validate(req.body.data);
    if (error) return res.status(400).send(response(400, 'Error', error.details[0].message));

    //update to DB
    try {
        await Customers.update(req.body.data, {
            where: { CustomerId: req.body.id }
        });

        //send the response
        res.send(response(200, 'Success', [], 1));
    }
    catch (error) {
        // send the error
        res.status(400).send(response(400, 'Error', error.errors[0].message));
    }





})


module.exports = router;