const mongoose = require("mongoose");

let isConnected = false;

const connectDatabase = async () => {
  if (isConnected) {
    console.log("=> Using existing database connection");
    return;
  }

  console.log("=> Creating new database connection...");
  try {
    const db = await mongoose.connect(process.env.DB_URL);
    isConnected = db.connections[0].readyState === 1;
    console.log(`mongod connected with server: ${db.connection.host}`);
  } catch (err) {
    console.error(`Database connection error: ${err.message}`);
    throw err;
  }
};

module.exports = connectDatabase;
