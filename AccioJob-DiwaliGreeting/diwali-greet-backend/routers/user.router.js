var express = require("express");
const jwt = require("jsonwebtoken");
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
    // res.cookie("token", token, {
    //   httpOnly: true,
    //   secure: false,      // ❗ localhost MUST have secure: false
    //   sameSite: "lax",    // ❗ localhost MUST NOT use "none"
    //   path: "/",
    //   maxAge: 7 * 24 * 60 * 60 * 1000,
    // });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,       // HTTPS requires true
      sameSite: "none",   // cross-domain cookie
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });


    // const myCookie = res.cookie;

    res.status(200).json({
      Message: "User logged in successfully",
      // token:token,
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ Message: "Something went Wrong", Status: `error ${error}` });
  }
});


userRouter.get("/verify", (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ authenticated: false });

  try {
    const decoded = jwt.verify(token, "123AccioJob");
    return res.status(200).json({ authenticated: true, user: decoded });
  } catch {
    return res.status(401).json({ authenticated: false });
  }
});


userRouter.post("/logout", (req, res) => {
  res.cookie("token", null, {
    // httpOnly: true,
    // secure: true,
    // sameSite: "none",
    expires: new Date(Date.now()),
  });

  res.send("Logout Successfull !!!");
})




module.exports = { userRouter };
