const express = require('express');
const app = express();
const PORT = 3001;
const { connect } = require('./src/data/database');
const cors = require('cors');
const RegisterAdminUC = require('./src/useCases/user/RegisterAdminUC')
const bcrypt = require('bcrypt')
require('dotenv').config();


app.use(express.json());


app.use(cors());


connect()
  .then(() => {
   
    const userController = require('./src/controllers/UserController');
    app.use('/api/users', userController);

    const partnerController = require('./src/controllers/PartnerController');
    app.use('/api/partners', partnerController);

   
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


    const admin1 = new RegisterAdminUC('micaeladm@email.com', password, 'Micael', 'Carvalho', 'Masculino', '123456789', '123456789', 'endereço', true);
    const Admin1 = await admin1.create();

    const admin2 = new RegisterAdminUC('breneradm@email.com', password, 'Brener', 'Freire', 'Masculino', '123456789', '123456789', 'endereço', true);
    const Admin2 = await admin2.create();

    if (Admin1 || Admin2) {
      console.log('pre built admins created successfully.');
    }

  } catch (error) {
    console.error('error creating pre built admins: ', error);
  }
}


createPreBuiltAdmins();