import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/connectDB";
import authRoutes from "./routes/authRoutes";
import messageRoutes from "./routes/messageRoutes";

dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (_, res) => {
  res.send("HiddenInbox backend running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
