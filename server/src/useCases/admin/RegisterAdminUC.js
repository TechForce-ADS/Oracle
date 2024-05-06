const {registerAdmin} = require('../../data/repositories/AdminRepository.js');

class RegisterAdminUC {
  constructor(name, email,password,isMainAdmin) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.isMainAdmin = isMainAdmin;
  }

  async create() {
    try {
      const adminData = {
        name: this.name,
        email: this.email,
        password: this.password,
        isMainAdmin:this.isMainAdmin,
      };
      
      return await registerAdmin(adminData);
    } catch (error) {
      console.error('Error registering admin:', error);
      throw new Error('Failed to register admin');
    }
  }
}

module.exports = RegisterAdminUC;