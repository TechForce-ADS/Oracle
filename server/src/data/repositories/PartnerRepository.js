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

module.exports = {
    registerPartner
};