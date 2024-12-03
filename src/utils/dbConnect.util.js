import { connect } from "mongoose";
import envUtil from "./env.util.js";

async function dbConnect() {
  try {
    //console.log(envUtil.MONGO_LINK);
    connect(envUtil.MONGO_LINK);
    console.log("mongodb connected");
  } catch (error) {
    console.log(error);
  }
}

export default dbConnect;
