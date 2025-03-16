import mongoose from 'mongoose';
import { DB_URL } from '../config/config';

const connectToMongoDB = async (): Promise<void> => {
  try {
    await mongoose.connect(DB_URL); // Use process.env and non-null assertion
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

export default connectToMongoDB;