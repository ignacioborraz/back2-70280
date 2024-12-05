import {
  createService,
  readService,
  updateService,
  destroyService,
} from "../services/users.service.js";
async function createUser(req, res) {
  const message = "USER CREATED";
  const data = req.body;
  const response = await createService(data);
  return res.status(201).json({ response, message });
}
async function readUsers(req, res) {
  const message = "USERS FOUND";
  const response = await readService();
  return res.status(200).json({ response, message });
}
async function updateUser(req, res) {
  const { id } = req.params;
  const data = req.body;
  const message = "USER UPDATED";
  const response = await updateService(id, data);
  return res.status(200).json({ response, message });
}
async function destroyUser(req, res) {
  const { id } = req.params;
  const message = "USER DELETED";
  const response = await destroyService(id);
  return res.status(200).json({ response, message });
}

export { createUser, readUsers, updateUser, destroyUser };
