const mongoose = require('mongoose');
const Joi = require('joi');

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


function validateTask(customer) {
    const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    comment: Joi.string().min(5).max(50).required()
  });

//   return schema.validate(customer, schema);
  return schema.validate(customer);
}

module.exports.Task = taskModel;
module.exports.validate = validateTask;