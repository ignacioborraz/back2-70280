import dbConnect from "../utils/dbConnect.util.js";

const { PERSISTENCE } = process.env;

let dao = {};

switch (PERSISTENCE) {
  default:
    console.log("connected to mongo database");
    dbConnect();
    const { usersManager, companiesManager, eatsManager, ordersManager } = await import("./mongo/index.js");
    dao = { usersManager, companiesManager, eatsManager, ordersManager }
    break;
}

export default dao;
