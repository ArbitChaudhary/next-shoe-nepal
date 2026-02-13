import mongoose from "mongoose";

export async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI!);

    // eslint-disable-next-line
  } catch (error: any) {
    console.log("Error connecting to MongoDB", error);
  }
}
