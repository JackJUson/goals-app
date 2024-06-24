// import mongoose from 'mongoose';

// let isConnected = false;

// export const connectToDatabase = async () => {
//   mongoose.set('strictQuery', true);

//   if (isConnected) {
//     console.log('MongoDB is already connected');
//     return;
//   }

//   try {
//     await mongoose.connect(process.env.MONGODB_URI as string, {
//       dbName: 'goals',
//     });

//     isConnected = true;
//     console.log('MongoDB connected');
//   } catch (error) {
//     console.error('MongoDB connection error: ', error);
//   }
// };


import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const connectToDatabase = async () => {
  const connectionState = mongoose.connection.readyState;

  if (connectionState === 1) {
    console.log("Already connected");
    return;
  }

  if (connectionState === 2) {
    console.log("Connecting...");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI!, {
      dbName: "goals_typescript",
      bufferCommands: true,
    });
    console.log("Connected");
  } catch (err: any) {
    console.log("Error: ", err);
    throw new Error("Error: ", err);
  }
};

export default connectToDatabase;
