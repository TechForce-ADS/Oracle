const express = require('express');
const router = express.Router();
const {completeTask, updatePartnerExpertise, getTrackParticipationPercentage, getTopPartners, listOnePartner,updatePartner,getPartnerCount, deletePartner, listPartners, registerPartnerInExpertise, getPartnerExpertises, findPartnerByEmailAndToken, updatePartnerPassword, authenticatePartner} = require('../data/repositories/PartnerRepository.js');
const RecoverPasswordUC = require('../useCases/partner/RecoverPasswordUC');
const ResetPasswordUC = require('../useCases/partner/ResetPasswordUC');
const LoginPartnerUC = require('../useCases/partner/LoginPartnerUC.js')
const bcrypt = require('bcrypt')
const RegisterPartnerUC = require('../useCases/partner/RegisterPartnerUC.js');

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

router.get('/trackParticipationPercentage', async (req, res) => {
  try {
    const percentageData = await getTrackParticipationPercentage();
    res.status(200).json(percentageData);
  } catch (error) {
    console.error('Error getting track participation percentage:', error);
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
  const salt = await bcrypt.genSalt(10);
  try {
    const { email, nameFantasia, nameResponsavel, cnpj, password } = req.body;

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, salt);

    // Criação de um novo parceiro
    const registerUC = new RegisterPartnerUC(email, nameFantasia, nameResponsavel, cnpj, hashedPassword);
    const registrationResult = await registerUC.create();

    // Verifica o resultado do registro
    if (registrationResult.success) {
      res.status(200).json({ message: 'Parceiro registrado com sucesso', partner: registrationResult.partner });
    } else {
      res.status(409).json({ error: registrationResult.error });
    }
  } catch (error) {
    console.error('Error registering partner:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
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
    const loginResult = await loginPartnerUC.login();

    if (loginResult.error) {
      // Se houver um erro específico, como token não validado
      res.status(400).json({ error: loginResult.error });
    } else if (loginResult) {
      // Se o login for bem-sucedido
      res.status(200).json(loginResult);
    } else {
      // Usuário ou senha incorretos
      res.status(400).json({ error: 'Usuário ou senha incorretos' });
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});



router.post('/recuperarSenhaPartner', async (req, res) => {
  const { email } = req.body;

  try {
    const recoverPasswordUC = new RecoverPasswordUC(email);
    const result = await recoverPasswordUC.execute();
    res.json(result);
  } catch (error) {
    console.error('Erro ao recuperar senha do parceiro:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.post('/resetPassword', async (req, res) => {
  const { email, newPassword, confirmPassword, token } = req.body;
  const userRepository = { findPartnerByEmailAndToken, updatePartnerPassword };
  const resetPasswordUC = new ResetPasswordUC(userRepository);

  try {
    const result = await resetPasswordUC.execute(email, newPassword, confirmPassword, token);
    if (result.success) {
      res.status(200).json({ success: true, message: result.message });
    } else {
      res.status(400).json({ success: false, error: result.message });
    }
  } catch (error) {
    console.error('Erro ao resetar a senha:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.post('/registerExpertise', async (req, res) => {
  const { partnerId, expertiseId } = req.body;
  try {
    await registerPartnerInExpertise(partnerId, expertiseId);
    res.status(200).send('Parceiro cadastrado na expertise com sucesso.');
  } catch (error) {
    console.error('Erro ao cadastrar parceiro na expertise:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para listar as expertises de um parceiro
router.get('/:partnerId/expertises', async (req, res) => {
  const { partnerId } = req.params;
  try {
    const expertises = await getPartnerExpertises(partnerId);
    res.status(200).json(expertises);
  } catch (error) {
    console.error('Erro ao buscar expertises do parceiro:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.post('/completeTask', async (req, res) => {
  const { partnerId, taskId } = req.body;
  try {
    await completeTask(partnerId, taskId);
    res.status(200).send('Tarefa completa.');
  } catch (error) {
    console.error('Erro ao completar tarefa', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.post('/authenticate', async (req, res) => {
  const { email, token } = req.body;
  try {
    const authenticated = await authenticatePartner(email, token);
    if (authenticated) {
      res.status(200).json({ success: true, message: 'Autenticação realizada com sucesso' });
    } else {
      res.status(400).json({ success: false, error: 'Email e/ou token inválidos' });
    }
  } catch (error) {
    console.error('Erro ao autenticar parceiro:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});


router.get('/topPartners', async (req, res) => {
  try {
    const topPartners = await getTopPartners();
    res.json(topPartners);
  } catch (error) {
    console.error('Error getting top partners:', error);
    res.status(500).json({ message: 'Erro ao obter top partners' });
  }
});

module.exports = router;