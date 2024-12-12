import ProductsDTO from "../dto/product.dto.js"
import dao from "../dao/index.factory.js"
const { ProductsManager } = dao

async function createRepository(data) {
  data = new ProductsDTO(data)
  const response = await ProductsManager.create(data);
  return response;
}
async function readRepository() {
  const response = await ProductsManager.read();
  return response;
}
async function updateRepository(id, data) {
  const response = await ProductsManager.update(id, data);
  return response;
}

const destroyRepository = async (id) => await ProductsManager.destroy(id);

export { createRepository, readRepository, updateRepository, destroyRepository };
