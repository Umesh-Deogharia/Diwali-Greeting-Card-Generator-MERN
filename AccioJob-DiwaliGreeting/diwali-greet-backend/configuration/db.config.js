const mongoose = require("mongoose");

function dbConfig() {

  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("db is running");
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = { dbConfig };