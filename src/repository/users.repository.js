//esta capa SOLO SE ENCARGA DE CONECTARSE CON LA PERSISTENCIA
//e implementar DTO (transformar objetos) antes de llegar a DAO
import UserDTO from "../dto/user.dto.js"
import dao from "../dao/index.factory.js"
const { UsersManager } = dao

class UsersRepository {
  createRepository = async (data) => {
    data = new UserDTO(data)
    return await UsersManager.create(data);
  }
  readRepository = async () => await UsersManager.read();
  updateRepository = async (id, data) => await UsersManager.update(id, data);
  destroyRepository = async (id) => await UsersManager.destroy(id);
}

const repository = new UsersRepository();
const { createRepository, readRepository, updateRepository, destroyRepository } = repository;
export { createRepository, readRepository, updateRepository, destroyRepository };
