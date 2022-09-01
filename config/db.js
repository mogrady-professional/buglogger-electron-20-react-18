const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // const conn = await mongoose.connect(process.env.MONGO_URI, {
    const conn = await mongoose.connect(
      'mongodb+srv://michael:RKfc7h6iyHyYxKjP@buglogger.hdfyze0.mongodb.net/bugLogger?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
module.exports = connectDB;
