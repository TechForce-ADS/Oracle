const {registerAdmin} = require('../../data/repositories/AdminRepository.js');

class RegisterAdminUC {
  constructor(email,password,isAdminMain) {
    this.email = email;
    this.password = password;
    this.isAdminMain = isAdminMain;
  }

  async create() {
    try {
      const adminData = {
        email: this.email,
        password: this.password,
        isAdminMain:this.isAdminMain,
      };
      
      return await registerAdmin(adminData);
    } catch (error) {
      console.error('Error registering admin:', error);
      throw new Error('Failed to register admin');
    }
  }
}

module.exports = RegisterAdminUC;