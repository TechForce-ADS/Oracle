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
  password: {
    type: String,
    required: true,
  },

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
  nivel: {
    type: String,
    required: true,
    default: 'Iniciante',
  },
  observation: {
    type: String,
  },
  token: {
    type: String,
    default: false
  },
  emailConfirmed: {
    type: Boolean,
    default: false
  }
});

  

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
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
  isConsultant: {
    type: Boolean,
    default: false
  },
});

const trackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

});


const expertiseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  }

});



const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
  },
  conclusion: {
    type: Boolean,
    required: true,
    default: false,
  },
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


const trackRegistrationSchema = new mongoose.Schema({//registro expertise na track
  expertiseName: {
    type: String,
    required: true
  },
  expertiseCompleted: {
    type: Boolean,
    default: false
  },
  track: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Track',
    required:true,
  },
});


const expertiseRegistrationSchema = new mongoose.Schema({
  partner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Partner'
  },
  expertise: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Expertise"
  },
  expertiseCompleted: {
    type: Boolean,
    default: false
  }
});

const ExpertiseRegistration = mongoose.model('ExpertiseRegistration', expertiseRegistrationSchema);

const CourseRegistration = mongoose.model('CourseRegistration', courseRegistrationSchema);

const TrackRegistration = mongoose.model('TrackRegistration', trackRegistrationSchema);

const Track = mongoose.model('Track', trackSchema);

const Expertise = mongoose.model('Expertise', expertiseSchema);

const Admin = mongoose.model('Admin', adminSchema);

const Partner = mongoose.model('Partner', partnerSchema);

const Task = mongoose.model('Task', taskSchema);


module.exports = {
  User, userSchema,
  Partner, partnerSchema,
  Admin, adminSchema,
  Track, trackSchema,
  CourseRegistration, courseRegistrationSchema,
  TrackRegistration, trackRegistrationSchema,
  Expertise, expertiseSchema,
  Task, taskSchema,
  ExpertiseRegistration, expertiseRegistrationSchema
};