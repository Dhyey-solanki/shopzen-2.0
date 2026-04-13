const app = require("./app");
const connectDB = require("./config/db");
const { env } = require("./config/env");
const { seedProductsIfEmpty } = require("./services/productService");

const startServer = async () => {
  try {
    await connectDB();
    await seedProductsIfEmpty();
    app.listen(env.port, () => {
      console.log(`Server running on port ${env.port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
