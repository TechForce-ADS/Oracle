const mongoose = require('mongoose');


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
  completedTasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  }],
  expertise_ids: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TrackRegistration'
  }]
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

const TrackRegistration = mongoose.model('TrackRegistration', trackRegistrationSchema);

const Track = mongoose.model('Track', trackSchema);

const Admin = mongoose.model('Admin', adminSchema);

const Partner = mongoose.model('Partner', partnerSchema);

const Task = mongoose.model('Task', taskSchema);


module.exports = {
  Partner, partnerSchema,
  Admin, adminSchema,
  Track, trackSchema,
  TrackRegistration, trackRegistrationSchema,
  Task, taskSchema,
  ExpertiseRegistration, expertiseRegistrationSchema
};