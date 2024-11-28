import CustomRouter from "../../utils/CustomRouter.util.js";
import {
  create,
  read,
  update,
  destroy,
} from "../../data/mongo/managers/products.manager.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import verifyToken from "../../middlewares/verifyToken.mid.js";
import isAdmin from "../../middlewares/isAdmin.mid.js";

class ProductsApiRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/", ["ADMIN"], verifyToken, isAdmin, createProduct);
    this.read("/", ["PUBLIC"], readProducts);
    this.update("/:id", ["ADMIN"], passportCb("admin"), updateProduct);
    this.destroy("/:id", ["ADMIN"], passportCb("admin"), destroyProduct);
  };
}

const productsApiRouter = new ProductsApiRouter();
export default productsApiRouter.getRouter();

async function createProduct(req, res) {
  const message = "PRODUCT CREATED";
  const data = req.body;
  const response = await create(data);
  return res.json201(response, message);
}
async function readProducts(req, res) {
  const message = "PRODUCTS FOUND";
  const response = await read();
  if (response.length > 0) {
    return res.json200(response, message);
  }
  return res.json404();
}
async function updateProduct(req, res) {
  const { id } = req.params;
  const data = req.body;
  const message = "PRODUCT UPDATED";
  const response = await update(id, data);
  if (response) {
    return res.json200(response, message);
  }
  return res.json404();
}
async function destroyProduct(req, res) {
  const { id } = req.params;
  const message = "PRODUCT DELETED";
  const response = await destroy(id);
  if (response) {
    return res.json200(response, message);
  }
  return res.json404();
}
