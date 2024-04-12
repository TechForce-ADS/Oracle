const { Partner } = require('../../models/models');

async function registerPartner(partnerData) {
    try {
      const existingPartner = await Partner.findOne({ cpf: partnerData.cpf});
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
  
  
module.exports = {
    registerPartner,
    listPartners,
    deletePartner
};