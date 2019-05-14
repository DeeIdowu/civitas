const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI"); //value of the default/MongoURI

//to connect to mongoose via asynch await via variable to call in serverjs:
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    }); //return of promise

    console.log("MongoDB connected...");
  } catch (err) {
    console.error(err.message);
    //Exit process with failure
    process.exit(1);
  }
};

//export the connection
module.exports = connectDB;
