const mongoose = require('mongoose');

const taskModel = mongoose.model('Task', new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    comment : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default: Date.now,
        required : true
    }

}));

module.exports = taskModel;