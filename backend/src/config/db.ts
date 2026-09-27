import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/studara';

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000, // 5s timeout instead of hanging
    });
    console.log('✅ MongoDB connected successfully');
  } catch (error: any) {
    console.warn('⚠️  MongoDB connection warning:', error.message || error);
    console.warn('⚠️  Server will continue running. Ensure MongoDB is running or update MONGODB_URI in backend/.env');
  }
};

export default connectDB;
