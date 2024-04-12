const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password:{
    type:String,
    required:true
  },
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  sexo: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false 
  }
});

const User = mongoose.model('User', userSchema);


const partnerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  sexo: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  }
});

const Partner = mongoose.model('Partner', partnerSchema);

module.exports = {User, userSchema,Partner, partnerSchema};
