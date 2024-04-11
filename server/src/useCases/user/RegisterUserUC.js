const {registerUser} = require('../../data/repositories/UserRepository.js');

class RegisterUserUC {
  constructor(email, password,username) {
    this.email = email;
    this.password = password;
    this.username = username;
  }

  async create() {
    try {
      const userData = {
        email: this.email,
        password: this.password,
        username:this.username
      };
      
      return await registerUser(userData);
    } catch (error) {
      console.error('Error registering user:', error);
      throw new Error('Failed to register user');
    }
  }
}

module.exports = RegisterUserUC;