const express = require('express');
const tasks = require('../routes/tasks');


module.exports = function (app) {
    app.use(express.json());
    app.use('/tasks', tasks);
}