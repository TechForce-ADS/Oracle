const { loginPartner } = require('../../data/repositories/PartnerRepository.js');

class LoginPartnerUC {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  async login() {
    try {
      const loginResult = await loginPartner(this.email, this.password);

      if (typeof loginResult === 'string') {
        // Se loginResult for uma string, significa que há uma mensagem de erro
        return { error: loginResult };
      }

      return loginResult; // Retorna o parceiro logado
    } catch (error) {
      console.error('Error logging user:', error);
      throw new Error('Failed to login user');
    }
  }
}

module.exports = LoginPartnerUC;
