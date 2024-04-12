const {registerAdmin} = require('../../data/repositories/UserRepository.js');

class RegisterAdminUC {
  constructor(email,password,name,lastName,sexo,number,cpf,address,isAdmin) {
    this.email = email;
    this.password = password;
    this.name = name;
    this.lastName = lastName;
    this.sexo = sexo;
    this.number = number;
    this.cpf = cpf;
    this.address = address;
    this.isAdmin = isAdmin;
  }

  async create() {
    try {
      const adminData = {
        email: this.email,
        password: this.password,
        name:this.name,
        lastName:this.lastName,
        sexo:this.sexo,
        number:this.number,
        cpf:this.cpf,
        address:this.address,
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