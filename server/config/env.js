const dotenv = require("dotenv");

dotenv.config();

const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 5000,
  mongoUri:
    process.env.MONGO_URI || "mongodb://127.0.0.1:27017/shopzen",
  jwtSecret: process.env.JWT_SECRET || "shopzen-dev-secret",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
};

module.exports = { env };
