const express = require('express');
const tasks = require('../routes/tasks');
const users = require('../routes/users')


module.exports = function (app) {
    app.use(express.json());
    app.use('/user', users);
    app.use('/tasks', tasks);

}