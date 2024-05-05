const {loginAdmin} = require('../../data/repositories/AdminRepository.js');

class LoginAdminUC {
  constructor(email, password) {
    this.email = email;
    this.password = password;
    
  }

  async login() {
    try {
      const adminData = {
        email: this.email,
        password: this.password
      };
      
      return await loginAdmin(adminData);
    } catch (error) {
      console.error('Error logging admin:', error);
      throw new Error('Failed to login admin');
    }
  }
}

module.exports = LoginAdminUC;