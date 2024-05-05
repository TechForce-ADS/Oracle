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

  async function listAdmins() {
    try {
      const admins = await Admin.find({});
      return admins;
    } catch (error) {
      console.error('Error listing partners:', error);
      throw new Error('Failed to list partners');
    }
  }

  async function updateAdmin(adminId, updatedData) {
    try {
      // Atualizar o parceiro pelo ID usando os dados fornecidos
      const result = await Admin.findByIdAndUpdate(adminId, updatedData, { new: true });
  
      if (!result) {
        throw new Error('Admin não encontrado');
      }
  
      // Retornar o parceiro atualizado
      return result;
    } catch (error) {
      // Logar o erro e retornar um erro 500
      console.error('Erro ao atualizar parceiro:', error);
      throw new Error('Erro interno do servidor');
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
      throw new Error('Failed to login admin');
    }
  }

  module.exports = {
    registerAdmin,
    loginAdmin,
    getAdminCount,
    registerAdmin,
    listAdmins,
    updateAdmin,
    loginAdmin
}; 
