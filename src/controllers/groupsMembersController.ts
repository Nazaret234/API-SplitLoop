import { getGroupsMembers } from "../services/serviceLocator/composer";
import { AddMemberDTO } from "../types/groupsMembers.types";

async function addGroupMember(data: AddMemberDTO) {
  const client = getGroupsMembers();
  return await client.addMember(data);
}

// async function promoteGroupMember(data: AddMemberDTO) {
//   const client = getGroupsMembers();
//   return await client.promoteMember(data);
// }

export default {
  addGroupMember,
};
