const {registerAdmin} = require('../../data/repositories/UserRepository.js');

class RegisterAdminUC {
  constructor(email, password,username,isAdmin) {
    this.email = email;
    this.password = password;
    this.username = username;
    this.isAdmin = isAdmin;
  }

  async create() {
    try {
      const adminData = {
        email: this.email,
        password: this.password,
        username:this.username,
        isAdmin:this.isAdmin
      };
      
      return await registerAdmin(adminData);
    } catch (error) {
      console.error('Error registering admin:', error);
      throw new Error('Failed to register admin');
    }
  }
}

module.exports = RegisterAdminUC;