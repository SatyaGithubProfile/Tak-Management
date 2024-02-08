const mongoose = require('mongoose');

const local = "mongodb://localhost/fullStack";
// const mongoCloud = 'mongodb+srv://teja151539:<loyjWqttlY2uzCs9>@cluster0.wlhjg3u.mongodb.net/?retryWrites=true&w=majority';

module.exports = function () {
    mongoose.connect(local).then(() => {
        console.log('Mongoose connected......')
    })
}