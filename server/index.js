const express = require('express');
const app = express();
const PORT = 3001;
const { connect } = require('./src/data/database');
const cors = require('cors');
const RegisterAdminUC = require('./src/useCases/admin/RegisterAdminUC')
const bcrypt = require('bcrypt')
require('dotenv').config();


app.use(express.json());


app.use(cors());


connect()
  .then(() => {

    const coursesController = require('./src/controllers/CoursesController');
    app.use('/api/courses', coursesController);

    const userController = require('./src/controllers/UserController');
    app.use('/api/users', userController);

    const partnerController = require('./src/controllers/PartnerController');
    app.use('/api/partners', partnerController);

    const adminController = require('./src/controllers/AdminController');
    app.use('/api/admin', adminController)

    const expertiseController = require ('./src/controllers/ExpertiseController');
    app.use('/api/expertise', expertiseController);
    
    const expertiseRegisterController = require('./src/controllers/ExpertiseController');
    app.use('/api/expertiseRegistration', expertiseRegisterController)
    

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to the database:', error);
  });


async function createPreBuiltAdmins() {
  try {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(process.env.password, salt);

    const admin = new RegisterAdminUC('Chico','adm@gmail.com', password, true);
    const Admin = await admin.create();

    if (Admin) {
      console.log('pre built admins created successfully.');
    }

  } catch (error) {
    console.error('error creating pre built admins: ', error);
  }
}


createPreBuiltAdmins();