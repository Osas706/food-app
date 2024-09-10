import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://food-app:food-app@cluster0.wbuguuo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
      .then(() => console.log('Connected to database'))
};
