const express = require('express');
const router = express.Router();
const { User, validate } = require('../models/users');
const lodash = require('lodash'); // to laod the content 
const bcrypt = require('bcrypt'); // to becrypt the password
const Joi = require('joi')


// login the users

router.post('/', async (req, res) => {

    // check the fields are valid?
    const { error } = validateUser(req.body);
    if (error) res.status(400).send(error.details[0].message);

    // check the user existed??
    let user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send('Invalid Email or Password!');

    // check the password valid or not?
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid Email or Password!')

    //generate the token...
    const token = user.getAuthToken();

    //revert back the response
    res.header('x-auth-token',token).send({code : 200 , data : lodash.pick(user, ['_id','name','email']), 'token' : token} )
})



// register the users
router.post('/', async (req, res) => {

    // To check the user fields are valid with requirement
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // To check the User unique or not

    // let user = new User.findOne({ email: req.body.email })
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(405).send('User already existed!');

    // encrypt the password
    user = new User(lodash.pick(req.body, ['name', 'email', 'password', 'isAdmin']))
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    // Create the authentication token
    const token = user.getAuthToken();

    await user.save();
    res.header('x-auth-token',token).send({code : 200 , data : lodash.pick(user, ['_id','name','email', 'isAdmin']), 'token' : token} )

})

// To validate the login user feilds
function validateUser(user) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
    });

    return schema.validate(user);
}

module.exports = router;