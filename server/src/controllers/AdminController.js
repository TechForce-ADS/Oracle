const express = require('express');
const RegisterAdminUC = require('../useCases/admin/RegisterAdminUC')
const {getAdminCount} = require('../data/repositories/AdminRepository.js');
const router = express.Router();

router.post('/register', async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
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

module.exports = router;