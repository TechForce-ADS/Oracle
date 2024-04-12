const { User } = require('../../models/models');
const bcrypt = require('bcrypt')

async function registerUser(userData) {
  try {
    const existingUser = await User.findOne({ email: userData.email});
    if (existingUser) {
      return false
    }
    const newUser = new User(userData);
    
    await newUser.save();

    return newUser;
  } catch (error) {
    console.error('Error registering user:', error);
    throw new Error('Failed to register user');
  }
}

async function registerAdmin(adminData) {
  try {
    const existingAdmin = await User.findOne({ email: adminData.email });
    if (existingAdmin) {
      return false
    }
    const newUser = new User(adminData);
    
    await newUser.save();

    return newUser;
  } catch (error) {
    console.error('Error registering admin:', error);
    throw new Error('Failed to register admin');
  }
}

async function loginUser(userData) {
  try {
    const user = await User.findOne({ email: userData.email })
    if(user){
      if (await bcrypt.compare(userData.password,user.password)){
        return user
      }else{
        return false
      }
    }else{
      return false
    }
  } catch (error) {
    console.error('Error logging user:', error);
    throw new Error('Failed to login user');
  }
}

module.exports = {
    registerUser,
    loginUser,
    registerAdmin
};