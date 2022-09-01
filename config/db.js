const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('<enter_your_connection_string_here>', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
module.exports = connectDB;
