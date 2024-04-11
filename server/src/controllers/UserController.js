const express = require('express');
const router = express.Router();
const RegisterUserUC = require('../useCases/user/RegisterUserUC')
const LoginUserUC = require('../useCases/user/LoginUserUC')
const bcrypt = require('bcrypt')

router.post('/register', async (req, res) => {
  const salt = await bcrypt.genSalt(10)
  try {
    const email = req.body.email;
    const username = req.body.username;
    const password = await bcrypt.hash(req.body.password,salt)
    const registerUC = new RegisterUserUC(email, password,username); 
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
    res.status(200).json(loggedUser);
  } catch (error) {
    console.error('Error logging: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;