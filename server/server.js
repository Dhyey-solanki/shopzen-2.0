import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://YOUR-FRONTEND.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("ShopZen backend is live 🚀");
});

app.use("/auth", authRoutes);
app.use("/products", productRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});