import { Router } from "express";
import { readById } from "../../data/mongo/managers/users.manager.js";
import passport from "../../middlewares/passport.mid.js";
import { verifyTokenUtil } from "../../utils/token.util.js";

const sessionsRouter = Router();
const opts = { session: false };

sessionsRouter.post(
  "/register",
  passport.authenticate("register", opts),
  register
);
sessionsRouter.post("/login", passport.authenticate("login", opts), login);
sessionsRouter.post(
  "/signout",
  passport.authenticate("signout", opts),
  signout
);
sessionsRouter.post(
  "/online",
  passport.authenticate("online", opts),
  onlineToken
);
// /api/sessions/google va a llamar a la pantalla de consentimiento y se encarga de autenticar en google
sessionsRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
// /api/sessions/google/cb va a llamar efectivamente a la estrategia encargada de register/login con google
sessionsRouter.get("/google/cb", passport.authenticate("google", opts), google);

export default sessionsRouter;

async function register(req, res, next) {
  try {
    const user = req.user;
    return res
      .status(201)
      .json({ message: "USER REGISTERED", user_id: user._id });
  } catch (error) {
    return next(error);
  }
}
async function login(req, res, next) {
  try {
    return res
      .status(200)
      .json({ message: "USER LOGGED IN", token: req.headers.token });
  } catch (error) {
    return next(error);
  }
}
function signout(req, res, next) {
  try {
    delete req.token;
    return res.status(200).json({ message: "USER SIGNED OUT" });
  } catch (error) {
    return next(error);
  }
}
async function online(req, res, next) {
  try {
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
  } catch (error) {
    return next(error);
  }
}
function google(req, res, next) {
  try {
    return res
      .status(200)
      .json({ message: "USER LOGGED IN", token: req.token });
  } catch (error) {
    return next(error);
  }
}
async function onlineToken(req, res, next) {
  console.log(req.token);
  
  try {
    const { token } = req.token;
    const data = verifyTokenUtil(token);
    const one = await readById(data.user_id);
    if (one) {
      return res.status(200).json({
        message: one.email.toUpperCase() + " IS ONLINE",
        online: true,
      });
    } else {
      return res
        .status(400)
        .json({ message: "USER IS NOT ONLINE", online: false });
    }
  } catch (error) {
    return next(error);
  }
}
