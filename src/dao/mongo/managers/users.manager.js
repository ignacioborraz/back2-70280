import User from "../models/user.model.js";
import Manager from "./manager.js";

const usersManager = new Manager(User)
export default usersManager
//const { create, read, readByEmail, readById, update, destroy } = usersManager

//export { create, read, readByEmail, readById, update, destroy }