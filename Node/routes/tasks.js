const mongoose = require('mongoose');
const express = require('express')
const router = express.Router();
const Task =  require('../models/tasks')



router.post('/', async (req, res) => {
    console.log(req.body)
    let task = new Task({ name: req.body.name, comment : req.body.comment  });
    task = await task.save();

    res.send(task);
})
module.exports = router;