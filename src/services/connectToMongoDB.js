const mongoose = require('mongoose');

module.exports = async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useFindAndModify: false,
    });

    console.log('MongoDB connection established successfully');
  } catch (err) {
    console.error(`Failed to connect to MongoDB: ${err.message}`);
  }
};
