import { Router } from "express";
import {
  create,
  read,
  update,
  destroy,
} from "../../data/mongo/managers/products.manager.js";
import passport from "../../middlewares/passport.mid.js";

const productsApiRouter = Router();

productsApiRouter.get("/", readProducts);
productsApiRouter.post(
  "/",
  passport.authenticate("admin", { session: false }),
  createProduct
);
productsApiRouter.put(
  "/:id",
  passport.authenticate("admin", { session: false }),
  updateProduct
);
productsApiRouter.delete(
  "/:id",
  passport.authenticate("admin", { session: false }),
  destroyProduct
);

export default productsApiRouter;

async function createProduct(req, res, next) {
  try {
    const message = "PRODUCT CREATED";
    const data = req.body;
    const response = await create(data);
    return res.status(201).json({ response, message });
  } catch (error) {
    return next(error);
  }
}
async function readProducts(req, res, next) {
  try {
    const message = "PRODUCTS FOUND";
    const response = await read();
    return res.status(200).json({ response, message });
  } catch (error) {
    return next(error);
  }
}
async function updateProduct(req, res, next) {
  try {
    const { id } = req.params;
    const data = req.body;
    const message = "PRODUCT UPDATED";
    const response = await update(id, data);
    return res.status(200).json({ response, message });
  } catch (error) {
    return next(error);
  }
}
async function destroyProduct(req, res, next) {
  try {
    const { id } = req.params;
    const message = "PRODUCT DELETED";
    const response = await destroy(id);
    return res.status(200).json({ response, message });
  } catch (error) {
    return next(error);
  }
}
