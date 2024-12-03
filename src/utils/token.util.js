import jwt from "jsonwebtoken";
import envUtil from "./env.util.js";
const { SECRET_KEY } = envUtil;

function createTokenUtil(data) {
  const token = jwt.sign(data, SECRET_KEY, { expiresIn: 60 * 60 * 24 * 7 });
  return token;
}

function finishTokenUtil(data) {
  const token = jwt.sign(data, SECRET_KEY, { expiresIn: 1 });
  return token;
}

function verifyTokenUtil(token) {
  const verifyData = jwt.verify(token, SECRET_KEY);
  return verifyData;
}

export { createTokenUtil, finishTokenUtil, verifyTokenUtil };
