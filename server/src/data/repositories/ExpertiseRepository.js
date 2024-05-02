const { Expertise } = require('../../models/models');


async function registerExpertise(expertiseData) {
    try {
      const existingExpertise = await Expertise.findOne({ title: expertiseData.title});
      if (existingExpertise) {
        return false
      }
      const newExpertise = new Expertise(expertiseData);
      
      await newExpertise.save();
  
      return newExpertise;
    } catch (error) {
      console.error('Error registering expertise:', error);
      throw new Error('Failed to register expertise');
    }
  }

  async function listExpertise(){
    try {
        const expertises = await Expertise.find({});
        return expertises;
    } catch (error) {
        console.error('Error listing expertises:', error);
        throw new Error('Failed to list expertises.');
    }
  }