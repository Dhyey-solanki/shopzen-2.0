const jwt = require("jsonwebtoken");
const { env } = require("../config/env");

const generateToken = (id, role) =>
  jwt.sign({ id, role }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
  });

module.exports = generateToken;
