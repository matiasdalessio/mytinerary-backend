const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userController = {
  newUser: async (req, res) => {
    var { firstName, lastName, email, password, country, img } = req.body;
    const existentMail = await User.findOne({ email });
    var respuesta;
    var error;
    var createdUser;
    password = bcryptjs.hashSync(password, 10);
    if (!existentMail) {
      try {
        createdUser = new User({
          firstName,
          lastName,
          email,
          password,
          country,
          img,
          loggedWithGoogle: country === "null",
        });
        await createdUser.save();
        const token = jwt.sign({ ...createdUser }, process.env.SECRET_OR_KEY);
        respuesta = token;
      } catch {
        error = "There was an error in the register.";
      }
    } else {
      error = "The E-mail is already in use";
    }
    res.json({
      success: !error ? true : false,
      respuesta: !error
        ? {
            token: respuesta,
            img: createdUser.img,
            firstName: createdUser.firstName,
            id: createdUser._id,
          }
        : null,
      error: error,
    });
  },
  logIn: async (req, res) => {
    const { email, password, country } = req.body;
    var respuesta;
    var error;
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      if (
        (!userExist.loggedWithGoogle && !country) ||
        (userExist.loggedWithGoogle && country === "null")
      ) {
        const passwordMatch = bcryptjs.compareSync(
          password,
          userExist.password
        );
        if (passwordMatch) {
          const token = jwt.sign({ ...userExist }, process.env.SECRET_OR_KEY);
          respuesta = token;
        } else {
          error = "Invalid User or Password";
        }
      } else if (!userExist.loggedWithGoogle && country === "null") {
        error =
          "Users Registered without Google cannot log in with Google. Complete the fields to log in.";
      } else {
        error =
          "Users Registered with Google can only log in with Google button";
      }
    } else {
      error = "Invalid User or Password";
    }
    res.json({
      success: !error ? true : false,
      respuesta: !error
        ? {
            token: respuesta,
            img: userExist.img,
            firstName: userExist.firstName,
            id: userExist._id,
          }
        : null,
      error: error,
    });
  },
  forcedLogin: (req, res) => {
    res.json({
      success: true,
      respuesta: {
        img: req.user.img,
        firstName: req.user.firstName,
        id: req.user._id,
      },
    });
  },
};

module.exports = userController;
