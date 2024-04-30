const { Admin } = require('../../models/models');

async function registerAdmin(adminData) {
    try {
      const existingAdmin = await Admin.findOne({ email: adminData.email });
      if (existingAdmin) {
        return false
      }
      const newAdmin = new Admin(adminData);
      
      await newAdmin.save();
  
      return newAdmin;
    } catch (error) {
      console.error('Error registering admin:', error);
      throw new Error('Failed to register admin');
    }
  }

  module.exports = {
    registerAdmin
}; 