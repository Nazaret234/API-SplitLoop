import { Prisma } from "@prisma/client";

export type AddMemberDTO = {
  userId: string;
  groupId: string;
  role: "OWNER" | "MEMBER" | "ADMIN";
};

export type PromoteMembersDTO = AddMemberDTO;

export type GroupMember = Prisma.GroupsMembersGetPayload<{}>;

export type DeleteMemberDTO = Omit<AddMemberDTO, "role">;

export type GroupsMembersWithRelations = Prisma.GroupsMembersGetPayload<{
  include: {
    user: true;
    group: true;
  };
}>;
