var express = require("express");
const { UserModel } = require("../models/user.model");
var userRouter = express.Router();

userRouter.post("/createUser", (req, res) => {
  try {
    UserModel.create(req.body)
      .then((response) => {
        res.status(201).json({
          Message: "User is created successfully",
          Status: "success",
          data: response,
        });
      })
      .catch((error) => {
        res.status(500).json({
          Message: "Something went Wrong",
          Status: `error ${error}`,
        });
      });
  } catch (error) {
    res
      .status(500)
      .json({ Message: "Something went Wrong", Status: `error ${error}` });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        success: false,
        message: "Email and password are required"
      });
    }
    const user = await UserModel.findOne({ email });
    if (!(user && (await user.comparePassword(password)))) {
      return res.status(401).json({ Message: "Email or password do not match" });
    }
    const token = await user.generateJWTToken();
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(200).json({
      Message: "User logged in successfully",
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ Message: "Something went Wrong", Status: `error ${error}` });
  }
});

userRouter.post("/logout", (req, res) => {
  res.cookie("token", null, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    expires: new Date(Date.now()),
  });

  res.send("Logout Successfull !!!");
})

module.exports = { userRouter };
