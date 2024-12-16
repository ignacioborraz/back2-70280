import { model, Schema, Types } from "mongoose";

const collection = "orders";
const schema = new Schema(
  {
    eats: [
      {
        eat_id: { type: Types.ObjectId, ref: "eats", required: true },
        quantity: { type: Number, default: 1 },
      },
    ],
    user_id: { type: Types.ObjectId, ref: "users", required: true },
    total: { type: Number, default: 1 },
  },
  { timestamps: true }
);

schema.pre(/^find/, function () {
  this.populate("eats.eat_id", "title price");
  this.populate("user_id", "email");
});

const Order = model(collection, schema);
export default Order;
