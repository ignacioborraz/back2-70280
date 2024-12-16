import Company from "./models/company.model.js";
import Eat from "./models/eat.model.js";
import Order from "./models/order.model.js";
import User from "./models/user.model.js";

class Manager {
  constructor(model) {
    this.model = model;
  }
  createOne = async (data) => await this.model.create(data);
  readOne = async (id) => await this.model.findById(id);
  readByEmail = async (email) => await this.model.findOne({ email });
  readAll = async (data) => await this.model.find(data);
  updateOne = async (id, data) => await this.model.findByIdAndUpdate(id, data, { new: true });
  destroyOne = async (id) => await this.model.findByIdAndDelete(id);
}

export default Manager;

const usersManager = new Manager(User);
const companiesManager = new Manager(Company);
const eatsManager = new Manager(Eat);
const ordersManager = new Manager(Order);

export { usersManager, companiesManager, eatsManager, ordersManager };
