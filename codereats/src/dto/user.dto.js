import crypto from "crypto";

const { PERSISTENCE } = process.env;

class UserDto {
  constructor(data) {
    PERSISTENCE !== "mongo" &&
      (this._id = crypto.randomBytes(12).toString("hex"));
    this.email = data.email;
    this.password = data.password;
    this.role = data.role || "USER";
    PERSISTENCE !== "mongo" && (this.createdAt = new Date());
    PERSISTENCE !== "mongo" && (this.updatedAt = new Date());
  }
}

export default UserDto;
