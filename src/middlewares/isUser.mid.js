import { readByEmail } from "../data/mongo/managers/users.manager.js";

async function isUser(req, res, next) {
  const { email } = req.body;
  const one = await readByEmail(email);
  if (one) {
    const error = new Error("User already exists");
    error.statusCode = 400;
    throw error;
  }
  return next();
}

export default isUser;
