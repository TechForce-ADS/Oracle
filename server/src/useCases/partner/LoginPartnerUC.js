const { loginPartner } = require('../../data/repositories/PartnerRepository.js');


class LoginPartnerUC {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  async login() {
    try {
      const partnerData = {
        email: this.email,
        password: this.password
      };
      
      return await loginPartner(partnerData);
    } catch (error) {
      console.error('Error logging user:', error);
      throw new Error('Failed to login user');
    }
  }
}

module.exports = LoginPartnerUC;