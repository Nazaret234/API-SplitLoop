import { PrismaClient } from "@prisma/client";
import {
  AddMemberDTO,
  DeleteMemberDTO,
  GroupsMembersWithRelations,
  PromoteMembersDTO,
} from "../../types/groupsMembers.types";

class GroupsMembers {
  constructor(private readonly prisma: PrismaClient) {}

  async addMember(data: AddMemberDTO): Promise<GroupsMembersWithRelations> {
    return this.prisma.groupsMembers.create({
      data,
      include: {
        user: true,
        group: true,
      },
    });
  }

  async promoteMember(
    data: PromoteMembersDTO
  ): Promise<GroupsMembersWithRelations> {
    return this.prisma.groupsMembers.update({
      where: {
        userId_groupId: {
          userId: data.userId,
          groupId: data.groupId,
        },
      },
      data: {
        role: data.role,
      },
      include: {
        user: true,
        group: true,
      },
    });
  }

  async getMembersByGroupId(
    groupId: string
  ): Promise<GroupsMembersWithRelations[]> {
    return this.prisma.groupsMembers.findMany({
      where: { groupId },
      include: {
        user: true,
        group: true,
      },
    });
  }

  async deleteMember(data: DeleteMemberDTO) {
    return this.prisma.groupsMembers.delete({
      where: {
        userId_groupId: {
          userId: data.userId,
          groupId: data.groupId,
        },
      },
      include: {
        user: true,
        group: true,
      },
    });
  }
}

export default GroupsMembers;
