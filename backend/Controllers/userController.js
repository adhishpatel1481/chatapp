const User = require("../models/userModel");
const bcrypt = require("bcrypt");
module.exports.register = async (req, resp, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      resp.json({ msg: "Username already exist", status: false });
    }
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      resp.json({ msg: "email already exist", status: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    delete user.password;
    console.log(user);
    resp.json({ status: true, user });
  } catch (err) {
    next(err);
  }
};

module.exports.login = async (req, resp, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      resp.json({ msg: "wrong username or password", status: false });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      resp.json({ msg: "wrong username or password", status: false });
    }
    delete user.password;
    console.log(user);
    resp.json({ status: true, user });
  } catch (err) {
    next(err);
  }
};

module.exports.setAvatar = async (req, resp, next) => {
  try {
    const { image } = req.body;
    const userId=req.params.id
    const user = await User.findByIdAndUpdate(userId,{
        isProfImgSet:true,
        profImg:image,
    });
    console.log("setavatar",user);
    return resp.json({isSet:true,image:user.profImg})
  } catch (err) {
    next(err);
  }
};

module.exports.getAllUsers = async (req, resp, next) => {
    try {
       const users=await User.find({_id:{$ne:req.params.id}}).select([
        "email",
        "username",
        "profImg",
        "_id",
       ]);
       console.warn("contacts",users);
       return resp.json({users});
    }catch(err){
        next(err);
    }
};