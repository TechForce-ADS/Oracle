const { findPartnerByEmail, saveResetToken, sendResetEmail } = require('../../data/repositories/PartnerRepository');
const jwt = require('jsonwebtoken');

class RecoverPasswordUC {
  constructor(email) {
    this.email = email;
  }

  async execute() {
    const partner = await findPartnerByEmail(this.email);

    if (!partner) {
      throw new Error('Usuário não encontrado');
    }

    const token = jwt.sign(
      { partnerId: partner._id },
      'd#7Hj&f$23sPc89!TqA',
      { expiresIn: '1h' }
    );

    await saveResetToken(partner, token);
    await sendResetEmail(partner, token);

    return { message: 'Token enviado para o e-mail' };
  }
}

module.exports = RecoverPasswordUC;
