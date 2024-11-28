import CustomRouter from "../../utils/CustomRouter.util.js";
import { readById } from "../../data/mongo/managers/users.manager.js";
import passportCb from "../../middlewares/passportCb.mid.js";

class SessionsApiRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/register", passportCb("register"), register);
    this.create("/login", passportCb("login"), login);
    this.create("/signout", passportCb("signout"), signout);
    this.create("/online", passportCb("online"), onlineToken);
    this.read("/google", passportCb("google", { scope: ["email", "profile"] }));
    this.read("/google/cb", passportCb("google"), google);
  };
}

const sessionsRouter = new SessionsApiRouter();
export default sessionsRouter.getRouter();

async function register(req, res, next) {
  const { _id } = req.user;
  return res.status(201).json({ message, user_id: _id });
}
async function login(req, res, next) {
  const { token } = req.user;
  const opts = { maxAge: 60 * 60 * 24 * 7, httpOnly: true };
  return res
    .status(200)
    .cookie("token", token, opts)
    .json({ message: "USER LOGGED IN" });
}
function signout(req, res, next) {
  return res
    .status(200)
    .clearCookie("token")
    .json({ message: "USER SIGNED OUT" });
}
async function online(req, res, next) {
  const { user_id } = req.session;
  const one = await readById(user_id);
  if (req.session.user_id) {
    return res.status(200).json({
      message: one.email.toUpperCase() + " IS ONLINE",
      online: true,
    });
  } else {
    return res
      .status(400)
      .json({ message: "USER IS NOT ONLINE", online: false });
  }
}
function google(req, res, next) {
  return res.status(200).json({ message: "USER LOGGED IN", token: req.token });
}
async function onlineToken(req, res, next) {
  return res.status(200).json({
    message: req.user.email.toUpperCase() + " IS ONLINE",
    online: true,
  });
}
