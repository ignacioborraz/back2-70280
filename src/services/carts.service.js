import {
  create,
  read,
  update,
  destroy,
} from "../data/mongo/managers/carts.manager.js";

class CartsService {
  createService = async (data) => await create(data);
  readService = async (user_id) => await read({ user_id });
  updateService = async (id, data) => await update(id, data);
  destroyService = async (id) => await destroy(id);
}

const service = new CartsService();
const { createService, readService, updateService, destroyService } = service;
export { createService, readService, updateService, destroyService };
