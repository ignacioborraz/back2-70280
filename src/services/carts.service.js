import { createRepository, readRepository, updateRepository, destroyRepository } from "../repository/carts.repository.js";

class CartsService {
  createService = async (data) => await createRepository(data);
  readService = async (user_id) => await readRepository({ user_id });
  updateService = async (id, data) => await updateRepository(id, data);
  destroyService = async (id) => await destroyRepository(id);
}

const service = new CartsService();
const { createService, readService, updateService, destroyService } = service;
export { createService, readService, updateService, destroyService };
