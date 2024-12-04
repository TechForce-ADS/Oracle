const {registerAdmin} = require('../../data/repositories/AdminRepository.js');

class RegisterAdminUC {
  constructor(name, email,password,isAdminMain,isConsultant) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.isAdminMain = isAdminMain;
    this.isConsultant = isConsultant;
  }

  async create() {
    try {
      const adminData = {
        name: this.name,
        email: this.email,
        password: this.password,
        isAdminMain:this.isAdminMain,
        isConsultant:this.isConsultant,
      };
      
      return await registerAdmin(adminData);
    } catch (error) {
      console.error('Error registering admin:', error);
      throw new Error('Failed to register admin');
    }
  }
}

module.exports = RegisterAdminUC;