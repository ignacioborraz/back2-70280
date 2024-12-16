import CompanyDto from "../dto/company.dto.js";
import EatDto from "../dto/eat.dto.js";
import OrderDto from "../dto/order.dto.js";
import UserDto from "../dto/user.dto.js";
import dao from "../dao/index.factory.js";
const { usersManager, companiesManager, eatsManager, ordersManager } = dao;

class Repository {
  constructor(manager, dto) {
    this.manager = manager;
    this.dto = dto;
  }
  createOne = async (data) => await this.manager.createOne(new this.dto(data));
  readOne = async (id) => await this.manager.readOne(id);
  readByEmail = async (email) => await this.manager.readByEmail(email);
  readAll = async (data) => await this.manager.readAll(data);
  updateOne = async (id, data) => await this.manager.updateOne(id, data);
  destroyOne = async (id) => await this.manager.destroyOne(id);
}

export default Repository;

const usersRepository = new Repository(usersManager, UserDto);
const companiesRepository = new Repository(companiesManager, CompanyDto);
const eatsRepository = new Repository(eatsManager, EatDto);
const ordersRepository = new Repository(ordersManager, OrderDto);

export { usersRepository, companiesRepository, eatsRepository, ordersRepository };
