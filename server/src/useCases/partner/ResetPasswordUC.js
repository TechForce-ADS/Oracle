class ResetPasswordUC {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(email, newPassword, confirmPassword, token) {
    if (newPassword !== confirmPassword) {
      return { success: false, message: 'A nova senha e a confirmação de senha não coincidem.' };
    }

    const user = await this.userRepository.findPartnerByEmailAndToken(email, token);
    if (!user) {
      return { success: false, message: 'Email e/ou token inválidos.' };
    }

    await this.userRepository.updatePartnerPassword(email, newPassword);
    return { success: true, message: 'Senha resetada com sucesso!' };
  }
}

module.exports = ResetPasswordUC;
