import Controller from "./index.js";
import { companiesService } from "../services/index.js";

const controller = new Controller(companiesService);
const { createOne, readOne, readAll, updateOne, destroyOne } = controller;
export { createOne, readOne, readAll, updateOne, destroyOne };
