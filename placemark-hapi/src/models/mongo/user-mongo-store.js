import { User } from "./user.js";

export const userMongoStore = {
  async getAllUsers() {
    const users = await User.find().lean();
    return users;
  },

  async getUserById(id) {
    if (id) {
      const user = await User.findOne({ _id: id }).lean();
      return user;
    }
    return null;
  },

  async addUser(user) {
    user.role = "user";
    const newUser = new User(user);
    const userObj = await newUser.save();
    const u = await this.getUserById(userObj._id);
    return u;
  },

  async getUserByEmail(email) {
    const user = await User.findOne({ email: email }).lean();
    return user;
  },

  async deleteUserById(id) {
    try {
      await User.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAll() {
    await User.deleteMany({});
  },

  async changeUserMail(id, newMail){
    try{
      await User.updateOne({_id: id}, {email: newMail});
      const user  = await User.findOne({_id: id}).lean();
      return user;
    }catch(error){
      console.log("bad id");
      return null;
    }
    
  },

  async changeUserName(id, newFirst, newLast){
    try{
      await User.updateOne({_id: id}, {firstName: newFirst, lastName: newLast});
      const user = await User.findOne({_id: id}).lean();
      return user;
    }catch(error){
      console.log("bad id");
      return null;
    }
    
  },

  async changeUserPass(id, newPass){
    try{
      await User.updateOne({_id:  id}, {password: newPass});
      const user = User.findOne({_id : id}).lean();
      return user;
    }catch(error){
      console.log("bad id");
      return null;
    }
    
  },

  async getUserRolebyId(id){
    const user = await User.findOne({_id: id}).lean();
    return user.role;
  }
};