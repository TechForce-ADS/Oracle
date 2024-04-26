const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
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
  cnpj: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  nivel: {
    type: String,
    required: true,
  },
  observation: {
    type: String,
  }
});

const consultantSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
});

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  isAdminMain: {
    type: Boolean,
    default: false
  },
  adminConsultant: {
    type: Boolean,
    default: false
  },
});

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  time: {
    type: String
  },
  image: {
    type: String
  }
});

const courseRegistrationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  },
  courseCompleted: {
    type: Boolean,
    required: true
  },
});

const CourseRegistration = mongoose.model('CourseRegistration', courseRegistrationSchema);

const Course = mongoose.model('Course', courseSchema);

const Admin = mongoose.model('Admin', adminSchema);

const Partner = mongoose.model('Partner', partnerSchema);

module.exports = { User, userSchema, Partner, partnerSchema, Admin, adminSchema, Course, courseSchema, CourseRegistration, courseRegistrationSchema };
