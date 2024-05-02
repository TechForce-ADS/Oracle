const {registerPartner} = require('../../data/repositories/PartnerRepository.js');

class RegisterPartnerUC {
  constructor(email,nameFantasia,nameResponsavel,cnpj,password) {
    this.email = email;
    this.nameFantasia = nameFantasia;
    this.nameResponsavel = nameResponsavel;
    this.cnpj = cnpj;
    this.password = password;
  }

  async create() {
    try {
      const partnerData = {
        email: this.email,
        nameFantasia:this.nameFantasia,
        nameResponsavel:this.nameResponsavel,
        cnpj:this.cnpj,
        password:this.password,
     
      };
      
      return await registerPartner(partnerData);
    } catch (error) {
      console.error('Error registering partner:', error);
      throw new Error('Failed to register partner');
    }
  }
}

module.exports = RegisterPartnerUC;