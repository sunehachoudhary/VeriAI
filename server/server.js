require("dotenv").config();

const express = require("express");

const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");

const uploadRoutes=require("./routes/uploadRoutes");

const textRoutes =require("./routes/textRoutes");

connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/upload",uploadRoutes);
app.get("/", (req, res) => {
  res.send("Backend Running");
});


const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.use("/api/text", textRoutes );