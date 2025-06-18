import { PrismaClient } from "@prisma/client";
import {
  UpdateUserDTO,
  CreateUserDTO,
  User,
  UserWithRelations,
} from "../../types/users.types";

class Users {
  constructor(private readonly prisma: PrismaClient) {}

  async createUser(data: CreateUserDTO): Promise<UserWithRelations> {
    return this.prisma.users.create({
      data,
      include: {
        groupMembers: true,
        expensesPaid: true,
        expensesOwed: true,
      },
    });
  }

  async getUserById(id: string): Promise<UserWithRelations | null> {
    return this.prisma.users.findUnique({
      where: { id },
      include: {
        groupMembers: true,
        expensesPaid: true,
        expensesOwed: true,
      },
    });
  }

  async getUserByEmailSecure(email: string): Promise<UserWithRelations | null> {
    return this.prisma.users.findUnique({
      where: { email },
      include: {
        groupMembers: true,
        expensesPaid: true,
        expensesOwed: true,
      },
    });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.prisma.users.findUnique({
      where: { email },
      include: {
        groupMembers: true,
        expensesPaid: true,
        expensesOwed: true,
      },
    });
  }

  async listUsers(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      this.prisma.users.findMany({
        skip,
        take: limit,
        include: {
          groupMembers: true,
          expensesPaid: true,
          expensesOwed: true,
        },
      }),
      this.prisma.users.count(),
    ]);

    return {
      users,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async updateUser(
    id: string,
    data: UpdateUserDTO
  ): Promise<UserWithRelations> {
    return this.prisma.users.update({
      where: { id },
      data,
      include: {
        groupMembers: true,
        expensesPaid: true,
        expensesOwed: true,
      },
    });
  }

  async deleteUser(id: string): Promise<boolean> {
    const res = await this.prisma.users.delete({
      where: { id },
    });
    return !!res;
  }
}

export default Users;
