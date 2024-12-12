import { createRepository, readRepository, updateRepository, destroyRepository } from "../repository/users.repository.js";

class UsersService {
  createService = async (data) => await createRepository(data);
  readService = async (user_id) => await readRepository({ user_id });
  updateService = async (id, data) => await updateRepository(id, data);
  destroyService = async (id) => await destroyRepository(id);
}

const service = new UsersService();
const { createService, readService, updateService, destroyService } = service;
export { createService, readService, updateService, destroyService }