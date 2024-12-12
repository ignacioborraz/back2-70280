import dao from "../dao/index.factory.js"
const { UsersManager } = dao

async function register(req, res, next) {
  const { _id } = req.user;
  const message = "User Registered!";
  //return res.status(201).json({ message, user_id: _id });
  return res.json201(_id, message);
}
async function login(req, res, next) {
  const { token } = req.user;
  const opts = { maxAge: 60 * 60 * 24 * 7, httpOnly: true };
  const message = "User logged in!";
  const response = "OK";
  return res.cookie("token", token, opts).json200(response, message);
}
function signout(req, res, next) {
  const message = "User signed out!";
  const response = "OK";
  return res.clearCookie("token").json200(response, message);
}
async function online(req, res, next) {
  const { user_id } = req.session;
  const one = await UsersManager.readById(user_id);
  if (req.session.user_id) {
    const message = one.email + " is online";
    const response = true;
    return res.json200(response, message);
  } else {
    const message = "User is not online";
    return res.json400(message);
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

export { register, login, signout, onlineToken, google };
