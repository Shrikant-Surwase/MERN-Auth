const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv").config();
const signup = async (req, res, next) => { //async function because async indicates return promises
  let { name, email, password } = req.body;

  try {
    let existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists! Login Instead" });
    }
    password = password.toString();
    const hashedPassword = await bcrypt.hash(password, 10); //await is used to temporarly suspend the function calling
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save(); //create new user
    return res.status(201).json({ message: user });
  } catch (err) {
    console.log(err);
  }
};
const login = async (req, res, next) => {
  const { email, password } = req.body; //1)destructure the email and password coz it will help to check the use in database
  let userData;
  try {
    userData = await User.findOne({ email: email }); //findone function is used to check the email is present or not
    if (!userData || !bcrypt.compareSync(password, userData.password)) {
      //bcrypt is used to compare the password which is hashed and reture boolean values (true/false)
      return res.status(401).json({ msg: "Invalid Email or Password" }); //if user is not match return error
    }
    const token = await jwt.sign(
      { id: userData._id,name:userData.name,email:userData.email}, //payload which is converted into token using jwt
      process.env.SECRETE_KEY,
      {
        expiresIn: "25s",

      }
    );
    res.cookie(String(userData._id),token,{
      path:'/',
      expires:new Date(Date.now()+1000*30),
      httpOnly:true,
      sameSite:"lax"
    })
    return res
      .status(200)
      .json({ msg: `Welcome ${userData.name}`, token: token }); //else retun the response with the name of the user
    console.log(token);
  } catch (err) {
    console.log(err);
  }
};
const verifyToken = (req,res,next)=>{
  let token = req.headers.cookie;
  
  token = token.split("=")[1];
  console.log(token)
  if(!token){
    return res.status(404).json({msg:"token is not generated!!"})
  }
  jwt.verify(String(token),process.env.SECRETE_KEY,(err,user)=>{
    if(err){
      return res.status(404).json({msg:"token is not mached!!"})
    }
    req.id = user.id
    console.log(req.id)
  })
  next();
}
const getUser = async (req, res, next) => {
  const userId = req.id;
  try {
    let user = await User.findById(userId,"-password")
    if(!user){
      return res.status(404).json({msg:"invalid user id"})
    }
    return res.status(200).json({user})
   
  } catch (error) {
    console.log(error)
  }
};


exports.signup = signup;
exports.login = login;
exports.verifyToken = verifyToken;
exports.getUser = getUser;


