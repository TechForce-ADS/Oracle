const express = require('express');
const RegisterAdminUC = require('../useCases/admin/RegisterAdminUC')
const {getAdminCount} = require('../data/repositories/AdminRepository.js');
const router = express.Router();
const bcrypt = require('bcrypt')

router.post('/register', async (req, res) => {
  const salt = await bcrypt.genSalt(10)  
  try {
      const email = req.body.email;
      const password = await bcrypt.hash(req.body.password,salt)
      const isAdminMain = req.body.isAdminMain;
      const registerUC = new RegisterAdminUC(email,password,isAdminMain); 
      const newAdmin= await registerUC.create();
      if (newAdmin){
        res.status(201).json(newAdmin);
      }
    } catch (error) {
      console.error('Error registering partner:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

router.get('/adminCount', async (req, res) => {
    try {
      const admin = await getAdminCount();
      res.status(200).json(admin);
    } catch (error) {
      console.error('Error listing admin:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.post('/login', async (req, res) => {
    console.log("login route called")
    try {
      const { email, password } = req.body;
      const loginAdminUC = new LoginAdminUC(email, password); 
      const loggedAdmin = await loginAdminUC.login();
      if (loggedAdmin) {
        res.status(200).json(loggedAdmin);
      } else {
        res.status(400).json({ error: 'Usuário ou senha incorretos' }); 
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      res.status(500).json({ error: 'Erro interno do servidor' }); 
    }
  });
  


module.exports = router;