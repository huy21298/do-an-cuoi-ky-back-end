const mongoose = require("mongoose");

function connectDB() {
  mongoose.connect(
    "mongodb+srv://anhthi:Aa@123123@cluster0-kazzw.mongodb.net/testingproject?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      if (err) {
        throw new Error("Cannot access db");
      }
      console.log("Access db successfully");
    }
  );
}

module.exports = connectDB;