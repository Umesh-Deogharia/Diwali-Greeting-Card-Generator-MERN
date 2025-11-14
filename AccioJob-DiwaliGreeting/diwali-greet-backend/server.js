var express = require("express");
var app = express();
var cors = require("cors");
var dotenv = require("dotenv");
const { dbConfig } = require("./configuration/db.config");
const { userRouter } = require("./routers/user.router");
const bodyParser = require("body-parser");
const { geminiRouter } = require("./routers/gemini.router");
var cookieParser = require("cookie-parser");

dotenv.config();

// middlwares
app.use(
  cors({
    origin: "https://diwali-greeting-card-generator-mern-r1ty.onrender.com",
    credentials: true,
  })
);

app.options("*", cors());  // 🔥 REQUIRED FOR DEPLOYED CORS

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/gemini", geminiRouter);

var PORT = process.env.PORT || 4000;

app.listen(PORT, async () => {
  await dbConfig();
  console.log(`Listening to the port ${PORT}`);
});
