const mongoose = require('mongoose');
const express = require('express')
const router = express.Router();
const { Task, validate } = require('../models/tasks');
const auth = require('../middleware/auth');
const lodash = require('lodash')



router.post('/', async (req, res) => {
  const count = await Task.countDocuments();
  const assignId = req.body.assignEmployee;
  const query = assignId.length > 0 ? {'assignEmployee' : { $in : assignId }}  :  {}
  let taskData = {
    pendingTasks: [],
    onGoingTasks: [],
    completedTasks: []
  }

  const tasks = await Task.find(query).skip(req.query.page).limit(req.query.limit).sort('name');

  tasks.forEach(
    (record) => {
      switch (record.Status) {
        case 1:
          taskData.pendingTasks.push(record)
          break;
        case 2:
          taskData.onGoingTasks.push(record)
          break;
        case 3:
          taskData.completedTasks.push(record)
          break;
        default:
          taskData.pendingTasks.push(record);
      }
    })


  const response = {
    data: taskData,
    count: count, // Total count of items
  };

  res.status(200).send(response)
})

// Create Tasks
router.post('/addTask', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // let task = new Task({ name: req.body.name, comment: req.body.comment });
  let task = new Task(lodash.pick(req.body, ['name', 'comment', 'EOD', 'Status', 'assignEmployee']));
  await task.save()
  res.send(task);
});

// http://localhost:3003/tasks/65ae407df24de52b2d78cd97
router.put('/:id', [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let task = await Task.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    comment: req.body.comment,
    assignEmployee:req.body.assignEmployee,
    Status : req.body.Status,
    EOD : req.body.EOD
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