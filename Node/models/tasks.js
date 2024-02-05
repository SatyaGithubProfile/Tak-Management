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
    },
    EOD : {
        // task End of date
        type : Date,
        required:true
    },
    Status: {
        type : Number,
        required:true,
    },
    assignEmployee : {
        type : [mongoose.Schema.Types.ObjectId],
        required : true
    }

}));


function validateTask(customer) {
    const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    comment: Joi.string().min(5).max(250).required(),
    EOD : Joi.required(),
    Status : Joi.required(),
    assignEmployee : Joi.required()
  });

//   return schema.validate(customer, schema);
  return schema.validate(customer);
}

module.exports.Task = taskModel;
module.exports.validate = validateTask;