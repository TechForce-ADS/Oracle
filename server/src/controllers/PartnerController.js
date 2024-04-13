const express = require('express');
const router = express.Router();
const {listPartners} = require('../data/repositories/PartnerRepository.js');
const {deletePartner} = require('../data/repositories/PartnerRepository.js');
const {updatePartner} = require('../data/repositories/PartnerRepository.js');

const RegisterPartnerUC = require('../useCases/partner/RegisterPartnerUC.js')

router.post('/register', async (req, res) => {
  try {
    const email = req.body.email;
    const name = req.body.name;
    const lastName = req.body.lastName;
    const sexo = req.body.sexo;
    const number = req.body.number;
    const cpf = req.body.cpf;
    const address = req.body.address;
    const registerUC = new RegisterPartnerUC(email,name,lastName,sexo,number,cpf,address); 
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


router.delete("/delete/:_id", async (req, res) => {
  try {
    const partnerId = req.params._id;
    
    // Chamar a função para deletar o parceiro
    const result = await deletePartner(partnerId);

    // Responder com a mensagem de sucesso
    res.status(200).json(result);
  } catch (error) {
    // Se ocorrer um erro, retornar um erro 500
    console.error(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});


router.put("/update/:_id", async (req, res) => {
  try {
    const partnerId = req.params._id;
    const updateData = req.body; // Dados que serão atualizados

    // Chamar a função para atualizar o parceiro
    const updatedPartner = await updatePartner(partnerId, updateData);

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



module.exports = router;