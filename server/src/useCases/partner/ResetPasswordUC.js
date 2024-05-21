const { findPartnerByIdAndToken, updatePassword } = require('../../data/repositories/PartnerRepository');
const jwt = require('jsonwebtoken');

class ResetPasswordUC {
  constructor(token, newPassword) {
    this.token = token;
    this.newPassword = newPassword;
  }

  async execute() {
    const decodedToken = jwt.verify(this.token, 'd#7Hj&f$23sPc89!TqA');

    const partner = await findPartnerByIdAndToken(decodedToken.partnerId, this.token);

    if (!partner) {
      throw new Error('Token inválido');
    }

    await updatePassword(partner, this.newPassword);

    return { message: 'Senha redefinida com sucesso' };
  }
}

module.exports = ResetPasswordUC;
