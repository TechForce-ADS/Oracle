const { Admin } = require('../../models/models');
const bcrypt = require('bcrypt')
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


  async function loginAdmin(adminData) {
    try {
      const admin = await Admin.findOne({ email: adminData.email })
      if(admin){
        if (await bcrypt.compare(adminData.password,admin.password)){
          return admin
        }else{
          return false
        }
      }else{
        return false
      }
    } catch (error) {
      console.error('Error logging admin:', error);
      throw new Error('Failed to login user');
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
    registerAdmin,
    loginAdmin,
    getAdminCount,

    

}; 