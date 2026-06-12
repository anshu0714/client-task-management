const app = require("./app");
const connectDB = require("./config/db");
const env = require("./config/env");
const logger = require("./utils/logger");
const PORT = env.port;

// Connect DB and start server
async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    logger.error("❌ Server failed to start", error);
    process.exit(1);
  }
}

startServer();
