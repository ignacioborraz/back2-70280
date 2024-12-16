import CustomRouter from "../../utils/CustomRouter.util.js";
import {
  createOne,
  readOne,
  readAll,
  updateOne,
  destroyOne,
  register,
  login,
  signout,
  onlineToken,
} from "../../controllers/sessions.controller.js";
import passportCb from "../../middlewares/passportCb.mid.js"

class SessionsRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/", ["ADMIN"], createOne);
    this.read("/:id", ["USER", "ADMIN"], readOne);
    this.read("/", ["USER", "ADMIN"], readAll);
    this.update("/:id", ["USER", "ADMIN"], updateOne);
    this.destroy("/:id", ["USER", "ADMIN"], destroyOne);
    this.create("/register", ["PUBLIC"], passportCb("register"), register);
    this.create("/login", ["PUBLIC"], passportCb("login"), login);
    this.create("/signout", ["USER", "ADMIN"], passportCb("signout"), signout);
    this.create("/online", ["USER", "ADMIN"], passportCb("online"), onlineToken);
  };
}

const sessionsRouter = new SessionsRouter();
export default sessionsRouter.getRouter();
