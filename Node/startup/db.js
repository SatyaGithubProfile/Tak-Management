const mongoose = require('mongoose');

module.exports = function () {
    mongoose.connect('mongodb://localhost/fullStack').then(() => {
        console.log('Mongoose connected......')
    })
}