const express = require('express');
const router = express.Router();
const { User, validate } = require('../models/users');
const lodash = require('lodash'); // to laod the content 
const bcrypt = require('bcrypt'); // to becrypt the password



router.post('/', async (req, res) => {

    // To check the user fields are valid with requirement
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // To check the User unique or not

    // let user = new User.findOne({ email: req.body.email })
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(405).send('User already existed!');

    // encrypt the password
    user = new User(lodash.pick(req.body, ['name', 'email', 'password']))
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();
    res.send(lodash.pick(user, ['_id', 'name', 'email']));
})

module.exports = router;