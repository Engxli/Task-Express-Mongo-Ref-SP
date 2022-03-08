const dotenv = require("dotenv");

dotenv.config();

const mongoose = require("mongoose");
const connectDB = async () => {
  const PASSWORD = process.env.PASSWORD;
  const DATABASE_NAME = process.env.DATABASE_NAME;
  const CONNECTION_URL = `mongodb+srv://admin:${PASSWORD}@coded.89rty.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`;
  const conn = await mongoose.connect(CONNECTION_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log(`mongo connected: ${conn.connection.host}`);
};
module.exports = connectDB;
