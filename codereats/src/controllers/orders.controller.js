import Controller from "./index.js";
import { ordersService, eatsService } from "../services/index.js";

class OrdersController extends Controller {
  constructor(service) {  super(service) }
  addEats = async (req, res) => {
    const message = "Created!";
    const { eats } = req.body;
    const user_id = req.user._id;
    let total = 0;
    for (let eat of eats) {
      const one = await eatsService.readOne(eat.eat_id);
      total = total + one.price * eat.quantity;
    }
    const data = { eats, user_id, total };
    const response = await this.service.createOne(data);
    return res.json201(response, message);
  };
  readByUser = async (req, res) => {
    const message = "Found!";
    const user_id = req.user._id;
    const response = await this.service.readAll({ user_id });
    if (response.length > 0) {
      return res.json200(response, message);
    } else {
      return res.json404();
    }
  };
  updateOneEat = async (req, res) => {
    const message = "Updated!";
    const { orderId, eatId, quantity } = req.params;
    const order = await this.service.readOne(orderId);
    const eatIndex = order?.eats.findIndex(
      (eat) => eat.eat_id._id.toString() === eatId
    );
    if (!order || eatIndex === -1) {
      return res.json404();
    }
    order.eats[eatIndex].quantity = quantity;
    let total = 0;
    for (let eat of order.eats) {
      const one = await eatsService.readOne(eat.eat_id);
      total = total + one.price * eat.quantity;
    }
    order.total = total;
    const response = await order.save();
    if (response) {
      return res.json200(response, message);
    } else {
      return res.json404();
    }
  };
  removeOneEat = async (req, res) => {
    const message = "Deleted!";
    const { orderId, eatId } = req.params;
    const order = await this.service.readOne(orderId);
    const eatIndex = order?.eats.findIndex(
      (eat) => eat.eat_id._id.toString() === eatId
    );
    if (!order || eatIndex === -1) {
      return res.json404();
    }
    order.eats = order.eats.filter(
      (eat) => eat.eat_id._id.toString() !== eatId
    );
    let total = 0;
    for (let eat of order.eats) {
      const one = await eatsService.readOne(eat.eat_id);
      total = total + one.price * eat.quantity;
    }
    order.total = total;
    const response = await order.save();
    if (response) {
      return res.json200(response, message);
    } else {
      return res.json404();
    }
  };
}

const controller = new OrdersController(ordersService);
const { addEats, readByUser, updateOneEat, removeOneEat } = controller;
export { addEats, readByUser, updateOneEat, removeOneEat };
