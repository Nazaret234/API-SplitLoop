import { getUsers } from "../services/serviceLocator/composer";
import { NewUser } from "../types/users.types";

async function newUser(data: NewUser) {
  const client = getUsers();
  return await client.createUser({ ...data, image: null });
}

async function getUserById(id: string) {
  const client = getUsers();
  return await client.getUserById(id);
}

export default {
  newUser,
  getUserById,
};
