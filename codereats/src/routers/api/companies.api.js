import CustomRouter from "../../utils/CustomRouter.util.js";
import {
  createOne,
  readOne,
  readAll,
  updateOne,
  destroyOne,
} from "../../controllers/companies.controller.js";

class CompaniesRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/", ["ADMIN"], createOne);
    this.read("/:id", ["ADMIN"], readOne);
    this.read("/", ["PUBLIC"], readAll);
    this.update("/:id", ["ADMIN"], updateOne);
    this.destroy("/:id", ["ADMIN"], destroyOne);
  };
}

const companiesRouter = new CompaniesRouter();
export default companiesRouter.getRouter();
