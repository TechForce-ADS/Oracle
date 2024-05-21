const { Partner } = require('../../models/models');
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')

async function registerPartner(partnerData) {
    try {
      const existingPartner = await Partner.findOne({ cnpj: partnerData.cnpj});
      if (existingPartner) {
        return false
      }
      const newPartner = new Partner(partnerData);
      
      await newPartner.save();
  
      return newPartner;
    } catch (error) {
      console.error('Error registering partner:', error);
      throw new Error('Failed to register partner');
    }
  }

  async function listPartners() {
    try {
      const partners = await Partner.find({});
      return partners;
    } catch (error) {
      console.error('Error listing partners:', error);
      throw new Error('Failed to list partners');
    }
  }

  async function listOnePartner(id) {
    try {
      const partner = await Partner.findOne({_id: id});
      return partner;
    } catch (error) {
      console.error('Error finding partner:', error);
      throw new Error('Failed to find partner');
    }
  }
  
  async function deletePartner(partnerId) {
    try {
      // Tentar encontrar e excluir o parceiro pelo ID
      const result = await Partner.deleteOne({ _id: partnerId });
  
    
      if (result.deletedCount === 0) {
        throw new Error('Parceiro não encontrado');
      }
  
      // Retornar uma mensagem de sucesso
      return { message: "Parceiro removido com sucesso" };
    } catch (error) {
      // Se ocorrer um erro, logar o erro e retornar um erro 500
      console.error('Erro ao deletar parceiro:', error);
      throw new Error('Erro interno do servidor');
    }
  }
  


  async function updatePartner(partnerId, updatedData) {
    try {
      // Atualizar o parceiro pelo ID usando os dados fornecidos
      const result = await Partner.findByIdAndUpdate(partnerId, updatedData, { new: true });
  
      if (!result) {
        throw new Error('Parceiro não encontrado');
      }
  
      // Retornar o parceiro atualizado
      return result;
    } catch (error) {
      // Logar o erro e retornar um erro 500
      console.error('Erro ao atualizar parceiro:', error);
      throw new Error('Erro interno do servidor');
    }
  }
  
async function loginPartner(partnerData) {
  try {
    const partner = await Partner.findOne({ email: partnerData.email })
    if(partner){
      if (await bcrypt.compare(partnerData.password,partner.password)){
        return partner
      }else{
        return false
      }
    }else{
      return false
    }
  } catch (error) {
    console.error('Error logging partner:', error);
    throw new Error('Failed to login partner');
  }
}

async function getPartnerCount() {
  try {
    return await Partner.countDocuments({});
  } catch (error) {
    console.error('Error listing partners:', error);
    throw new Error('Failed to list partners');
  }
}


async function updatePartnerExpertise(partnerId, expertiseKey, value) {
  try {
    // Primeiro, verifique se a expertiseKey é válida
    if (!['Expertise1', 'Expertise2', 'Expertise3', 'Expertise4'].includes(expertiseKey)) {
      throw new Error('Expertise inválida');
    }

    // Atualize o parceiro pelo ID com a expertise fornecida
    const result = await Partner.findByIdAndUpdate(
      partnerId,
      { $set: { [expertiseKey]: value } },
      { new: true }
    );

    if (!result) {
      throw new Error('Parceiro não encontrado');
    }

    // Retorne o parceiro atualizado
    return result;
  } catch (error) {
    // Registre o erro e retorne um erro 500
    console.error('Erro ao atualizar expertise do parceiro:', error);
    throw new Error('Erro interno do servidor');
  }
}


async function findPartnerByEmail(email) {
  try {
    return await Partner.findOne({ email });
  } catch (error) {
    console.error('Error finding partner by email:', error);
    throw new Error('Failed to find partner by email');
  }
}

async function saveResetToken(partner, token) {
  try {
    partner.token = token;
    await partner.save();
  } catch (error) {
    console.error('Error saving reset token:', error);
    throw new Error('Failed to save reset token');
  }
}

async function sendResetEmail(partner, token) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'brenertestando@gmail.com',
      pass: 'bkrbnkfcqydvnapa',
    },
  });

  const resetUrl = `myapp://resetarSenhaPartner?token=${token}`;

  const mailOptions = {
    from: 'brenertestando@gmail.com',
    to: partner.email,
    subject: 'Recuperação de senha',
    text: `Para redefinir sua senha, acesse o seguinte link: ${resetUrl}`,
  };

  return transporter.sendMail(mailOptions);
}

async function findPartnerByIdAndToken(partnerId, token) {
  try {
    return await Partner.findOne({ _id: partnerId, token });
  } catch (error) {
    console.error('Error finding partner by id and token:', error);
    throw new Error('Failed to find partner by id and token');
  }
}

async function updatePassword(partner, newPassword) {
  try {
    const salt = await bcrypt.genSalt(10);
    partner.senha = await bcrypt.hash(newPassword, salt);
    partner.token = null;
    await partner.save();
  } catch (error) {
    console.error('Error updating password:', error);
    throw new Error('Failed to update password');
  }
}


  
module.exports = {
    registerPartner,
    getPartnerCount,
    listPartners,
    updatePartner,
    deletePartner,
    loginPartner,
    updatePartnerExpertise,
    listOnePartner,
    findPartnerByEmail,
    saveResetToken,
    sendResetEmail,
    findPartnerByIdAndToken,
    updatePassword,
};