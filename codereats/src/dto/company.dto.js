import crypto from "crypto";

const { PERSISTENCE } = process.env;

class CompanyDto {
  constructor(data) {
    PERSISTENCE !== "mongo" &&
      (this._id = crypto.randomBytes(12).toString("hex"));
    this.name = data.name;
    this.email = data.email || "";
    this.description = data.description || "";
    PERSISTENCE !== "mongo" && (this.createdAt = new Date());
    PERSISTENCE !== "mongo" && (this.updatedAt = new Date());
  }
}

export default CompanyDto;
