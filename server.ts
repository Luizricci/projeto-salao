require("dotenv").config();
const express = require("express");
const cors = require("cors");
import userRoutes from "./src/routes/userRoutes";
import authRoutes from "./src/routes/authRoutes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
