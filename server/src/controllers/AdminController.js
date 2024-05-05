const express = require('express');
const RegisterAdminUC = require('../useCases/admin/RegisterAdminUC')
const LoginAdminUC = require('../useCases/admin/LoginAdminUC')
const {getAdminCount} = require('../data/repositories/AdminRepository.js');
const {updateAdmin} = require('../data/repositories/AdminRepository.js');
const router = express.Router();
const {listAdmins} = require('../data/repositories/AdminRepository.js');
const bcrypt = require('bcrypt')

router.post('/register', async (req, res) => {
  const salt = await bcrypt.genSalt(10)
    try {
      const name = req.body.name;
      const email = req.body.email;
      const password = await bcrypt.hash(req.body.password,salt)
      const isMainAdmin = req.body.isMainAdmin;
      const registerUC = new RegisterAdminUC(name,email,password,isMainAdmin); 
      const newAdmin= await registerUC.create();
      if (newAdmin){
        res.status(201).json(newAdmin);
      }
    } catch (error) {
      console.error('Error registering partner:', error);
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
    try {
      const { email, password } = req.body;
      const loginAdminUC = new LoginAdminUC(email, password); 
      const loggedAdmin = await loginAdminUC.login();
      if (loggedAdmin) {
        res.status(200).json(loggedAdmin); // Login bem-sucedido
      } else {
        res.status(400).json({ error: 'email ou senha incorretos' }); // Usuário ou senha incorretos
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      res.status(500).json({ error: 'Erro interno do servidor' }); // Erro interno do servidor
    }
});

router.get('/adminList', async (req, res) => {
  try {
    const admins = await listAdmins();
    res.status(200).json(admins);
  } catch (error) {
    console.error('Error listing partners:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put("/update/:_id", async (req, res) => {
  try {
    const adminId = req.params._id;
    const updatedData = req.body; // Dados que serão atualizados

    // Chamar a função para atualizar o parceiro
    const updatedAdmin = await updateAdmin(adminId, updatedData);

    // Responder com o parceiro atualizado
    if (updatedAdmin) {
      res.status(200).json(updatedAdmin);
    } else {
      // Se não encontrou o parceiro para atualizar
      res.status(404).json({ error: "Admin não encontrado" });
    }
  } catch (error) {
    // Se ocorrer um erro, retornar um erro 500
    console.error(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

module.exports = router;