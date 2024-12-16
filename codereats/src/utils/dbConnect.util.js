import { connect } from "mongoose";
const { MONGO_LINK } = process.env;

async function dbConnect() {
  try {
    connect(MONGO_LINK);
  } catch (error) {
    throw error;
  }
}

export default dbConnect;
