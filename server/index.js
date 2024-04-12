const express = require('express');
const app = express();
const PORT = 3001;
const { connect } = require('./src/data/database');
const cors = require('cors');
const RegisterAdminUC = require('./src/useCases/user/RegisterAdminUC')
const bcrypt = require('bcrypt')

// Middleware
app.use(express.json());

//enable cors
app.use(cors());

// Connect to the database
connect()
  .then(() => {
    // Controllers
    const userController = require('./src/controllers/UserController');
    app.use('/api/users', userController);

    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to the database:', error);
  });

// Instantiate and create admins
async function createPreBuiltAdmins() {
  try {
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash('abc123456789',salt)
    const admin1 = new RegisterAdminUC('micaeladm@email.com', password, 'Micael','Carvalho','28','123456789','endereço', true);
    const Admin1 = await admin1.create();

    const admin2 = new RegisterAdminUC('breneradm@email.com', password, 'Brener','Freire','28','123456789','endereço', true);
    const Admin2 = await admin2.create();

    if(Admin1 || Admin2){
      console.log('pre built admins created successfully.');
    }
    
  } catch (error) {
    console.error('error creating pre built admins: ', error);
  }
}

// Call the function to create pre built admins
createPreBuiltAdmins();