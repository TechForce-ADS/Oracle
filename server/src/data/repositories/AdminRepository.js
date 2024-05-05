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

  async function getAdminCount() {
    try {
      return await Admin.countDocuments({});
    } catch (error) {
      console.error('Error listing admin:', error);
      throw new Error('Failed to list admin');
    }
  }

  module.exports = {
    getAdminCount,
    registerAdmin
}; 