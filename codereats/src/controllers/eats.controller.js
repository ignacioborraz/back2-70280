import Controller from "./index.js";
import { eatsService } from "../services/index.js";

const controller = new Controller(eatsService);
const { createOne, readOne, readAll, updateOne, destroyOne } = controller;
export { createOne, readOne, readAll, updateOne, destroyOne };
