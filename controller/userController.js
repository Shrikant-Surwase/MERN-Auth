const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const signup = async (req, res, next) => {
  let { name, email, password } = req.body;

  try {
    let existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists! Login Instead" });
    }
    password = password.toString();
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();
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
      { id: userData._id },
      process.env.SECRETE_KEY,
      {
        expiresIn: "25min",
      }
    );
    return res.status(200).json({ msg: `Welcome ${userData.name}`,token:token}); //else retun the response with the name of the user
    console.log(token)
  } catch (err) {
    console.log(err);
  }
 
};
const getData = async (req, res, next) => {
  let data = await User.find();
  return res.status(200).json({ message: "success", data });
};
exports.getData = getData;
exports.signup = signup;
exports.login = login;
