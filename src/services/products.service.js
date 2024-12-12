import { createRepository, readRepository, updateRepository, destroyRepository } from "../repository/products.repository.js";

class ProductsService {
  createService = async (data) => await createRepository(data);
  readService = async (user_id) => await readRepository({ user_id });
  updateService = async (id, data) => await updateRepository(id, data);
  destroyService = async (id) => await destroyRepository(id);
}

const service = new ProductsService();
const { createService, readService, updateService, destroyService } = service;
export { createService, readService, updateService, destroyService }