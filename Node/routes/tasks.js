const mongoose = require('mongoose');
const express = require('express')
const router = express.Router();
const { Task , validate} =  require('../models/tasks')


// Create Tasks
router.post('/', async (req, res) => {
    console.log(req.body);
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let task = new Task({ name: req.body.name, comment : req.body.comment  });
    task = await task.save();
    res.send(task);
})


module.exports = router;