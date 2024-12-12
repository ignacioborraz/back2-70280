import CartDTO from "../dto/cart.dto.js";
import dao from "../dao/index.factory.js";
const { CartsManager } = dao;

class CartsRepository {
  createRepository = async (data) => {
    data = new CartDTO(data);
    return await CartsManager.create(data);
  };
  readRepository = async (user_id) => await CartsManager.read({ user_id });
  updateRepository = async (id, data) => await CartsManager.update(id, data);
  destroyRepository = async (id) => await CartsManager.destroy(id);
}

const repository = new CartsRepository();
const {
  createRepository,
  readRepository,
  updateRepository,
  destroyRepository,
} = repository;
export {
  createRepository,
  readRepository,
  updateRepository,
  destroyRepository,
};
