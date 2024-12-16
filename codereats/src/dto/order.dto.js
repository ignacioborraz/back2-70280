import crypto from "crypto";

const { PERSISTENCE } = process.env;

class OrderDto {
  constructor(data) {
    PERSISTENCE !== "mongo" &&
      (this._id = crypto.randomBytes(12).toString("hex"));
    this.eats = data.eats;
    this.user_id = data.user_id;
    this.total = data.total;
    PERSISTENCE !== "mongo" && (this.createdAt = new Date());
    PERSISTENCE !== "mongo" && (this.updatedAt = new Date());
  }
}

export default OrderDto;
