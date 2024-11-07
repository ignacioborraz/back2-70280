import Product from "../models/product.model.js";
import Manager from "./manager.js";

const productsManager = new Manager(Product)
const { create, read, update, destroy } = productsManager

export { create, read, update, destroy }