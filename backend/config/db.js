import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://food-app:food-app@cluster0.wbuguuo.mongodb.net/')
      .then(() => console.log('Connected to database'))
};
