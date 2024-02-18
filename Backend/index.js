import express from "express";
import connectionToMongoDB from "./database/db.js";
import dotenv from "dotenv";
import Routes from "./routes/userRoute.js";
import cors from "cors";

dotenv.config();
connectionToMongoDB(); // connect to database

const app = express();

const port = 5000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // middleware to use the json

app.use("/api", Routes);
app.use("/uploads", express.static("./uploads"));

// app.get('/',(req,res)=>{
//     res.send("Server Start");
// });

app.listen(port, () => {
  console.log(`Backend is running on the http://localhost:${port}`);
});
