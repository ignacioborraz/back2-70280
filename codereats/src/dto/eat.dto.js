import crypto from "crypto";

const { PERSISTENCE } = process.env;

class EatDto {
  constructor(data) {
    PERSISTENCE !== "mongo" &&
      (this._id = crypto.randomBytes(12).toString("hex"));
    this.title = data.title;
    this.description = data.description || "";
    this.price = data.price || 10;
    this.stock = data.stock || 10;
    this.company_id = data.company_id;
    PERSISTENCE !== "mongo" && (this.createdAt = new Date());
    PERSISTENCE !== "mongo" && (this.updatedAt = new Date());
  }
}

export default EatDto;
