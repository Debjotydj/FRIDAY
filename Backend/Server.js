import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import { Messages } from "openai/resources/chat/completions.js";
import chatRoutes from "./routes/chat.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());
app.use("/api", chatRoutes);


app.listen(PORT, () => {
  console.log(`Server Listening on ${PORT}`);
  connectDB();
});

// connecting  mongoDB
const connectDB = async() => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected with database !")
  }catch(err){
    console.log("Failed to connect With Database !", err)
  }
}

// app.post("/test", async (req, res) => {
    
// });
