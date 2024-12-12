import crypto from "crypto";
import argsUtil from "../utils/args.util.js";

const { persistence } = argsUtil;

class ProductsDTO {
  constructor(data) {
    persistence !== "mongo" &&
      (this._id = crypto.randomBytes(12).toString("hex"));
    this.title = data.title;
    this.description = data.description || "description";
    this.price = data.price || 10;
    this.stock = data.stock || 10;
    this.category = data.category || "computadoras";
    persistence !== "mongo" && (this.createdAt = new Date());
    persistence !== "mongo" && (this.updatedAt = new Date());
  }
}

export default ProductsDTO