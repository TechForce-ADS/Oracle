const { User } = require('../../models/models');
const bcrypt = require('bcrypt')

async function registerUser(userData) {
  try {
    const existingUser = await User.findOne({ $or: [{ email: userData.email }, { username: userData.username }] });
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
    const existingAdmin = await User.findOne({ $or: [{ email: adminData.email }, { username: adminData.username }] });
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
        throw new Error("incorrect password")
      }
    }else{
      throw new Error("user not found")
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