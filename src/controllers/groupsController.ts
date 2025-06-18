import { getGroups } from "../services/serviceLocator/composer";
import { CreateGroupDTO } from "../types/groups.types";

async function newGroup(data: CreateGroupDTO) {
  const client = getGroups();
  return await client.createGroup(data);
}

async function getGroupById(id: string) {
  const client = getGroups();
  return await client.getGroupById(id);
}

export default {
  newGroup,
  getGroupById,
};
