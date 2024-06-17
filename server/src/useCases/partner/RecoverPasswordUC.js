const { findPartnerByEmail, saveResetToken, sendResetEmail } = require('../../data/repositories/PartnerRepository');

class RecoverPasswordUC {
  constructor(email) {
    this.email = email;
  }

  generateToken(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters[randomIndex];
    }
    return token;
  }

  async execute() {
    const partner = await findPartnerByEmail(this.email);

    if (!partner) {
      throw new Error('Usuário não encontrado');
    }

    const token = this.generateToken(10);

    await saveResetToken(partner, token);
    await sendResetEmail(partner, token);

    return { message: 'Token enviado para o e-mail' };
  }
}

module.exports = RecoverPasswordUC;
