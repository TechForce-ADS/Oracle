const express = require('express');
const router = express.Router();
const RegisterUserUC = require('../useCases/user/RegisterUserUC')
const LoginUserUC = require('../useCases/user/LoginUserUC')
const bcrypt = require('bcrypt')

router.post('/register', async (req, res) => {
  const salt = await bcrypt.genSalt(10)
  try {
    const email = req.body.email;
    const password = await bcrypt.hash(req.body.password,salt)
    const name = req.body.name;
    const lastName = req.body.lastName;
    const sexo = req.body.sexo;
    const number = req.body.number;
    const cpf = req.body.cpf;
    const address = req.body.address;
    const registerUC = new RegisterUserUC(email,password,name,lastName,sexo,number,cpf,address); 
    const newUser = await registerUC.create();
    if (newUser){
      res.status(201).json(newUser);
    }
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  console.log("login route called")
  try {
    const {email, password} = req.body;
    const loginUserUC = new LoginUserUC(email, password); 
    const loggedUser = await loginUserUC.login();
    if (loggedUser){
      res.status(200).json(loggedUser);
    }
  } catch (error) {
    console.error('Error logging: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;