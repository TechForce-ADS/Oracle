const {registerPartner} = require('../../data/repositories/PartnerRepository.js');

class RegisterPartnerUC {
  constructor(email,name,lastName,sexo,number,cpf,address) {
    this.email = email;
    this.name = name;
    this.lastName = lastName;
    this.sexo = sexo;
    this.number = number;
    this.cpf = cpf;
    this.address = address;
  }

  async create() {
    try {
      const partnerData = {
        email: this.email,
        name:this.name,
        lastName:this.lastName,
        sexo:this.sexo,
        number:this.number,
        cpf:this.cpf,
        address:this.address
      };
      
      return await registerPartner(partnerData);
    } catch (error) {
      console.error('Error registering partner:', error);
      throw new Error('Failed to register partner');
    }
  }
}

module.exports = RegisterPartnerUC;