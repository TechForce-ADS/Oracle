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
  
  
module.exports = {
    registerPartner,
    listPartners
};