const PartnerRepository = require('../data/repositories/PartnerRepository');
const mongoose = require('mongoose');

class PartnerUseCase {
  static async registerPartnerInExpertise(partnerId, expertiseId) {
    if (!mongoose.Types.ObjectId.isValid(partnerId) || !mongoose.Types.ObjectId.isValid(expertiseId)) {
      throw new Error('Invalid partnerId or expertiseId');
    }
    await PartnerRepository.registerPartnerInExpertise(partnerId, expertiseId);
  }

  static async getPartnerExpertises(partnerId) {
    if (!mongoose.Types.ObjectId.isValid(partnerId)) {
      throw new Error('Invalid partnerId');
    }
    const partner = await PartnerRepository.getPartnerExpertises(partnerId);
    if (!partner) {
      throw new Error('Parceiro não encontrado.');
    }
    return partner.expertise_ids;
  }
}

module.exports = PartnerUseCase;
