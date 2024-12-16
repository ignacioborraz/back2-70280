import { model, Schema } from "mongoose";

const collection = "companies";
const schema = new Schema(
  {
    name: { type: String, required: true, index: true },
    email: { type: String, default: "" },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

const Company = model(collection, schema);
export default Company;
