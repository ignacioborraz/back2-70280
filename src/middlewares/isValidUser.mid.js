import { readByEmail } from "../data/mongo/managers/users.manager.js";

async function isValidUser(req, res, next) {
  const { email, password } = req.body;
  const one = await readByEmail(email);
  if (one) {
    return next();
  }
  const error = new Error("INVALID CREDENTIALS");
  error.statusCode = 401;
  throw error;
}

export default isValidUser;
