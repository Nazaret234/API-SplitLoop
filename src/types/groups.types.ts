import { Prisma } from "@prisma/client";

export type CreateGroupDTO = {
  name: string;
  description: string;
  createdById: string;
};

export type UpdateGroupDTO = Partial<CreateGroupDTO>;

export type Group = Prisma.GroupsGetPayload<{}>;

export type GroupWithRelations = Prisma.GroupsGetPayload<{
  include: {
    members: true;
    expenses: true;
    // createdBy: true;
  };
}>;
