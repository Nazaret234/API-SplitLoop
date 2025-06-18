import { PrismaClient } from "@prisma/client";
import {
  CreateGroupDTO,
  GroupWithRelations,
  UpdateGroupDTO,
} from "../../types/groups.types";

class Groups {
  constructor(private readonly prisma: PrismaClient) {}

  async createGroup(data: CreateGroupDTO): Promise<GroupWithRelations> {
    return this.prisma.groups.create({
      data: {
        ...data,
        members: {
          create: {
            userId: data.createdById,
            role: "OWNER",
          },
        },
      },
      include: {
        members: true,
        expenses: true,
      },
    });
  }

  async getGroupById(id: string): Promise<GroupWithRelations | null> {
    return this.prisma.groups.findUnique({
      where: { id },
      include: {
        members: true,
        expenses: true,
      },
    });
  }

  async getGroupByUser(userId: string): Promise<GroupWithRelations[] | null> {
    return this.prisma.groups.findMany({
      where: {
        members: {
          some: {
            userId,
          },
        },
      },
      include: {
        members: true,
        expenses: true,
      },
    });
  }

  async listGroups(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [groups, total] = await Promise.all([
      this.prisma.groups.findMany({
        skip,
        take: limit,
        include: {
          members: true,
          expenses: true,
        },
      }),
      this.prisma.groups.count(),
    ]);

    return {
      groups,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  async updateGroup(
    id: string,
    data: UpdateGroupDTO
  ): Promise<GroupWithRelations | null> {
    return this.prisma.groups.update({
      where: { id },
      data,
      include: {
        members: true,
        expenses: true,
      },
    });
  }

  async deleteGroup(id: string): Promise<GroupWithRelations | null> {
    return this.prisma.groups.delete({
      where: { id },
      include: {
        members: true,
        expenses: true,
      },
    });
  }
}

export default Groups;
