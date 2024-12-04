const {registerUser} = require('../../data/repositories/UserRepository.js');

class RegisterUserUC {
  constructor(email,password,name,lastName,sexo,number,cpf,address) {
    this.email = email;
    this.password = password;
    this.name = name;
    this.lastName = lastName;
    this.sexo = sexo;
    this.number = number;
    this.cpf = cpf;
    this.address = address;
  }

  async create() {
    try {
      const userData = {
        email: this.email,
        password: this.password,
        name:this.name,
        lastName:this.lastName,
        sexo:this.sexo,
        number:this.number,
        cpf:this.cpf,
        address:this.address
      };
      
      return await registerUser(userData);
    } catch (error) {
      console.error('Error registering user:', error);
      throw new Error('Failed to register user');
    }
  }
}

module.exports = RegisterUserUC;