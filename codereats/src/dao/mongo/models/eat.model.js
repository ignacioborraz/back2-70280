import { model, Schema, Types } from "mongoose";

const collection = "eats";
const schema = new Schema(
  {
    title: { type: String, required: true, index: true },
    description: { type: String, default: "" },
    price: { type: Number, default: 10 },
    stock: { type: Number, default: 10 },
    company_id: { type: Types.ObjectId, ref: "companies", required: true },
  },
  { timestamps: true }
);

schema.pre(/^find/, function () {
  this.populate("company_id", "name");
});

const Eat = model(collection, schema);
export default Eat;
