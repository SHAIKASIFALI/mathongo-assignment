const { User } = require("../model/index");
const { authHelper } = require("../helper/index");
const httpSignupController = async (req, res) => {
  try {
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };
    const user = await User.create(newUser);
    return res.status(201).send({
      data: `new user with id ${user._id} created`,
      success: true,
      msg: `user created succesfully`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      err: `there was problem creating user in database`,
    });
  }
};

const httpSigninController = async (req, res) => {
  try {
    //first match the password
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.verifyPassword(password)))
      return res.status(401).json({
        err: `email or password is incorrect`,
      });

    // now generate the jwt token
    const jwtToken = await authHelper.generateJwtToken(user._id, email);
    // send the jwttoken in the req headers
    res.set(`x-access-token`, jwtToken);
    //return the jwt token
    return res.status(200).send({
      data: {
        token: jwtToken,
        userId: user._id,
      },
      sucess: true,
      msg: `sucessfully logged in the user and jwt token generated`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      err: `there was problem in signing in the user`,
    });
  }
};

const httpSignoutController = async (req, res) => {
  try {
    // return the res with authentication headers set as none
    res.set("x-access-token", null);
    return res.status(200).send({
      success: true,
      msg: `user logged out successfully`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      err: `there was problem in signing out the user`,
    });
  }
};

module.exports = {
  httpSigninController,
  httpSignoutController,
  httpSignupController,
};
