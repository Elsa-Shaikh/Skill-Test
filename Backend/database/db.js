import mongoose from "mongoose";

const connectionToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Successfully Connected to Mongodb!");
  } catch (error) {
    console.log("Failed to Connect Mongodb!", error);
  }
};

export default connectionToMongoDB;
