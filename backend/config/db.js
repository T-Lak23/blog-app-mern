import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const dbConn = await mongoose.connect(process.env.MONGO_URI);
    if (dbConn) console.log("DB connected");
  } catch (error) {
    console.log(error);
  }
};
