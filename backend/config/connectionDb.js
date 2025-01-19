import mongoose from 'mongoose';

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

export default connectDb;