const mongoose = require("mongoose");
const env = require("./env");
const logger = require("../utils/logger");

async function connectDB() {
  try {
    const conn = await mongoose.connect(env.mongoURI);

    logger.info(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error("❌ MongoDB connection failed", {
      error: error.message,
    });
    process.exit(1);
  }
}

module.exports = connectDB;
