import Product from "../models/product.model.js";
import Manager from "./manager.js";

const productsManager = new Manager(Product)
export default productsManager
//const { create, read, readById, update, destroy } = productsManager

//export { create, read, readById, update, destroy }