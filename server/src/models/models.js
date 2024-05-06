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
  nameFantasia: {
    type: String,
    required: true,
  },
  nameResponsavel: {
    type: String,
    required: true,
  },
  cnpj: {
    type: String,
    required: true,
  },
  password:{
    type: String,
    required: true,
  },
  // -------------------------------
  lastName: {
    type: String,
    required: false,
  },
  number: {
    type: String,
    required: false,
  },
  sexo: {
    type: String,
    required: false,
  },
  cpf: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
// ----------------------------------

  Expertise1: {
    type: Boolean,
    required: true,
    default: false
  },
  Expertise2: {
    type: Boolean,
    required: true,
    default: false
  },
  Expertise3: {
    type: Boolean,
    required: true,
    default: false
  },
  Expertise4: {
    type: Boolean,
    required: true,
    default: false
  },

  nivel: {
    type: String,
    required: true,
    default: 'Iniciante',
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


const expertiseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  }
  
});



const tasksSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  date:{
    type:Date,
  },
  conclusion:{
    type: Boolean,
    required: true,
    default: false,
  }  ,
  expertise: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Expertise'
  },

});

const courseRegistrationSchema = new mongoose.Schema({
  partner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Partner'
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

const Expertise = mongoose.model('Expertise', expertiseSchema);

const Admin = mongoose.model('Admin', adminSchema);

const Partner = mongoose.model('Partner', partnerSchema);

const Task = mongoose.model('Task', tasksSchema);

module.exports = { User, userSchema, 
                   Partner, partnerSchema, 
                   Admin, adminSchema, 
                   Course, courseSchema, 
                   CourseRegistration, courseRegistrationSchema, 
                   Expertise, expertiseSchema,
                   Task, tasksSchema};

module.exports = { User, userSchema, Partner, partnerSchema, Admin, adminSchema, Course, courseSchema, CourseRegistration, courseRegistrationSchema, Expertise, expertiseSchema };

