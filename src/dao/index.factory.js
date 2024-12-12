import dbConnect from "../utils/dbConnect.util.js";
import argsUtil from "../utils/args.util.js";

const { persistence } = argsUtil;
//console.log(persistence);

/*
// la importacion condicionada "tradicional" NO FUNCIONAAA!!!
if(MODE==="MONGO") {
    import productsManager from "./memory/ProductsManager.memory.js";
}
 */

// en base a esta variable me voy a conectar a la persistencia que corresponda
// en base a la persistencia que me voy a conectar
// voy a llenar el objeto dao con las importaciones dinamicas correspondientes a la persistencia que se necesite

let dao = {};

switch (persistence) {
  case "memory":
    console.log("connected to memory system");
    // si la persistencia es la memoria tengo que llenar dao con las importaciones de los managers de la memoria
    const { default: ProductsManagerMemory } = await import(
      "./memory/ProductsManager.memory.js"
    );
    const { default: UsersManagerMemory } = await import(
      "./memory/UsersManager.memory.js"
    );
    const { default: CartsManagerMemory } = await import(
      "./memory/CartsManager.memory.js"
    );
    dao = {
      ProductsManager: ProductsManagerMemory,
      UsersManager: UsersManagerMemory,
      CartsManager: CartsManagerMemory,
    };
    break;
  case "fs":
    console.log("connected to file system");
    // si la persistencia es fs tengo que llenar dao con las importaciones de los managers de fs
    const { default: ProductsManagerFS } = await import(
      "./fs/ProductsManager.fs.js"
    );
    const { default: UsersManagerFS } = await import("./fs/UsersManager.fs.js");
    const { default: CartsManagerFS } = await import("./fs/CartsManager.fs.js");
    dao = {
      ProductsManager: ProductsManagerFS,
      UsersManager: UsersManagerFS,
      CartsManager: CartsManagerFS,
    };
    break;
  default:
    console.log("connected to mongo database");
    //sacamos la conexion de mongo del archivo de configuracion principal del servidor
    //DEBIDO A QUE SOLO TENEMOS QUE CONECTARNOS A MONGO SI LA PERSISTENCIA SELECCIONADA ES MONGO
    dbConnect();
    // si la persistencia es mongo tengo que llenar dao con las importaciones de los managers de mongo
    const { default: ProductsManagerMongo } = await import(
      "./mongo/managers/products.manager.js"
    );
    const { default: UsersManagerMongo } = await import(
      "./mongo/managers/users.manager.js"
    );
    const { default: CartsManagerMongo } = await import(
      "./mongo/managers/carts.manager.js"
    );
    dao = {
      ProductsManager: ProductsManagerMongo,
      UsersManager: UsersManagerMongo,
      CartsManager: CartsManagerMongo,
    };
    break;
}

export default dao;
//dao ahora es consumido por la capa superior correspondiente
//servicios
//controlador