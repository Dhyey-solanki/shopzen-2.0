const mongoose = require("mongoose");
const { env } = require("./env");

const connectDB = async () => {
  await mongoose.connect(env.mongoUri, {
    dbName: "shopzen",
  });

  console.log("MongoDB connected");
};

module.exports = connectDB;
