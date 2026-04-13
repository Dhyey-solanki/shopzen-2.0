const app = require("../server/app");
const connectDB = require("../server/config/db");
const { seedProductsIfEmpty } = require("../server/services/productService");

let readyPromise;

const ensureReady = () => {
  if (!readyPromise) {
    readyPromise = connectDB().then(seedProductsIfEmpty);
  }

  return readyPromise;
};

module.exports = async (req, res) => {
  await ensureReady();
  return app(req, res);
};
