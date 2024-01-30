const mongoose = require('mongoose');
const express = require('express')
const router = express.Router();
const { Task, validate } = require('../models/tasks');
const auth = require('../middleware/auth');



router.get('/',  async (req, res) => {
  const tasks = await Task.find().skip(req.query.page).limit(req.query.limit).sort('name');
  const count = await Task.countDocuments();

  const response = {
    data: tasks,
    count: count, // Total count of items
  };
  res.status(200).json(response)
})

// Create Tasks
router.post('/', [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let task = new Task({ name: req.body.name, comment: req.body.comment });
  task = await task.save();
  res.send(task);
});

// http://localhost:3003/tasks/65ae407df24de52b2d78cd97
router.put('/:id', [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let task = await Task.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    comment: req.body.comment
  }, { new: true });
  if (!task) return res.status(404).send('The Task with the given ID was not found.');
  res.send(task);

})

router.delete('/:id', [auth], async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);

  if (!task) return res.status(404).send('The Task with the given ID was not found.');

  // res.send(task);  // To Know which record is deleted!
  res.send({ message: "Successfully, Deleted..." });
});


module.exports = router;