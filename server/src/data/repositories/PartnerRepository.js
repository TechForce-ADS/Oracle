const { Partner } = require('../../models/models');
const bcrypt = require('bcrypt')

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


  
module.exports = {
    registerPartner,
    getPartnerCount,
    listPartners,
    updatePartner,
    deletePartner,
    loginPartner,
    updatePartnerExpertise
};