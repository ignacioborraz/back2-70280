import { usersRepository, companiesRepository, eatsRepository, ordersRepository } from "../repositories/index.js";

class Service {
  constructor(repository) { this.repository = repository }
  createOne = async (data) => await this.repository.createOne(data);
  readOne = async (id) => await this.repository.readOne(id);
  readByEmail = async (email) => await this.repository.readByEmail(email);
  readAll = async (data) => await this.repository.readAll(data);
  updateOne = async (id, data) => await this.repository.updateOne(id, data);
  destroyOne = async (id) => await this.repository.destroyOne(id);
}

export default Service;

const usersService = new Service(usersRepository);
const companiesService = new Service(companiesRepository);
const eatsService = new Service(eatsRepository);
const ordersService = new Service(ordersRepository);

export { usersService, companiesService, eatsService, ordersService };
