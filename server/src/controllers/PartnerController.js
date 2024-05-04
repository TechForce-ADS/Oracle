const express = require('express');
const router = express.Router();
const {listPartners} = require('../data/repositories/PartnerRepository.js');
const {deletePartner} = require('../data/repositories/PartnerRepository.js');
const {getPartnerCount} = require('../data/repositories/PartnerRepository.js');
const {updatePartner} = require('../data/repositories/PartnerRepository.js');
const {listOnePartner} = require('../data/repositories/PartnerRepository.js')
const {updatePartnerExpertise} = require('../data/repositories/PartnerRepository.js');
const LoginPartnerUC = require('../useCases/partner/LoginPartnerUC.js')
const bcrypt = require('bcrypt')

const RegisterPartnerUC = require('../useCases/partner/RegisterPartnerUC.js');
const { Partner, partnerSchema } = require('../models/models.js');

router.post('/updateExpertise/:_id', async (req, res) => {
  try {
    const partnerId = req.params._id;
    const { expertise, value } = req.body;

    const updatedPartner = await updatePartnerExpertise(partnerId, expertise, value);

    res.status(200).json(updatedPartner);
  } catch (error) {
    console.error('Error updating partner expertise:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/partnerListOne', async (req, res) => {
  try {
    const id = req.body._id;
    const partner = await listOnePartner(id);
    res.status(200).json(partner);
  } catch (error) {
    console.error('Error find partner:', error);
    res.status(500).json({error: 'Internal server error.'});
  }
});

router.post('/register', async (req, res) => {
  const salt = await bcrypt.genSalt(10)
  try {
    const email = req.body.email;
    const nameFantasia = req.body.nameFantasia;
    const nameResponsavel = req.body.nameResponsavel;
    const cnpj = req.body.cnpj;
    const password = await bcrypt.hash(req.body.password,salt)
    const registerUC = new RegisterPartnerUC(email,nameFantasia,nameResponsavel,cnpj,password); 
    const newPartner= await registerUC.create();
    if (newPartner){
      res.status(201).json(newPartner);
    }
  } catch (error) {
    console.error('Error registering partner:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/partnerList', async (req, res) => {
  try {
    const partners = await listPartners();
    res.status(200).json(partners);
  } catch (error) {
    console.error('Error listing partners:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/partnerCount', async (req, res) => {
  try {
    const partner = await getPartnerCount();
    res.status(200).json(partner);
  } catch (error) {
    console.error('Error listing admin:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete("/delete/:_id", async (req, res) => {
  try {
    const partnerId = req.params._id;
    
   
    const result = await deletePartner(partnerId);

  
    res.status(200).json(result);
  } catch (error) {
    
    console.error(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

router.put("/update/:_id", async (req, res) => {
  try {
    const partnerId = req.params._id;
    const nameFantasia = req.body.nameFantasia; 
    const nameResponsavel = req.body.nameResponsavel; 
    const email = req.body.email; 
   
    const updatedData = {
      nameFantasia: nameFantasia,
      nameResponsavel: nameResponsavel,
      email: email,
    }

    const updatedPartner = await updatePartner(partnerId, updatedData);

    // Responder com o parceiro atualizado
    if (updatedPartner) {
      res.status(200).json(updatedPartner);
    } else {
      // Se não encontrou o parceiro para atualizar
      res.status(404).json({ error: "Parceiro não encontrado" });
    }
  } catch (error) {
    // Se ocorrer um erro, retornar um erro 500
    console.error(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const loginPartnerUC = new LoginPartnerUC(email, password); 
    const loggedPartner = await loginPartnerUC.login();
    if (loggedPartner) {
      res.status(200).json(loggedPartner); // Login bem-sucedido
    } else {
      res.status(400).json({ error: 'Usuário ou senha incorretos' }); // Usuário ou senha incorretos
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ error: 'Erro interno do servidor' }); // Erro interno do servidor
  }
});
module.exports = router;