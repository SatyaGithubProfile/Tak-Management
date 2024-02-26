const express = require('express');
const tasks = require('../routes/tasks');
const users = require('../routes/users');
const cart = require('../routes/shopping/cart');
const products = require('../routes/shopping/products');


module.exports = function (app) {
    app.use(express.json());
    app.use('/user', users);
    app.use('/tasks', tasks);
    app.use('/cart', cart );  
    app.use('/products', products );  

}