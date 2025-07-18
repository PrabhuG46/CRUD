const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let employeeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  empno: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true 
  },
  department: {
    type: String,
    required: true
  }
}, {
  collection: 'employees'
});

module.exports = mongoose.model('Employee', employeeSchema);