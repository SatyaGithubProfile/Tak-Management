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
    const customer = await Customers.findByPk(req.body.CustomerId);

    if (!customer) {
        res.status(400).send(response(400, 'Error', 'Customer not found with the given Id..'));
        return;
    }

    // check data validation
    const { error } = validate(lodash.pick(req.body, ['Email', 'Password', 'FirstName', 'LastName', 'MobileNumber', 'Address', 'Pincode']));
    if (error) return res.status(400).send(response(400, 'Error', error.details[0].message));
    try {
        await Customers.update(lodash.pick(req.body, [ 'Email' , 'Password', 'FirstName', 'LastName', 'MobileNumber', 'Address', 'Pincode', 'IsAdmin']), {
            where: { CustomerId: req.body.CustomerId }
        });

        //send the response
        res.send(response(200, 'Success', [], 1));
    }
    catch (error) {
        // send the error
        res.status(400).send(response(400, 'Error', error.errors[0].message));
    }
})

router.delete('/', async (req, res) => {
    // check the customer available with the customer
    const customer = await Customers.findByPk(req.params.id);
    if (!customer) {
        res.status(400).send(response(400, 'Error', 'Customer not found with the given Id..'));
        return;
    }

    // remove from the db 
    try {
        await Customers.destroy({
            where: { CustomerId: req.body.id }
        });
        res.send(response(200, 'Success', [], 1));
    }
    catch (error) {
        // error handle
        res.status(400).send(response(400, 'Error', error.errors[0].message));
    }

})


module.exports = router;