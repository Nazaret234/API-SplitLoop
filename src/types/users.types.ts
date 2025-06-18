import { Prisma } from "@prisma/client";

// DTOs para entrada de datos
export type CreateUserDTO = {
  name: string;
  email: string;
  password: string;
  image?: string | null;
};

export type UpdateUserDTO = Partial<CreateUserDTO>;

// Tipos para respuestas (sin password)
export type UserSecure = Omit<Prisma.UsersGetPayload<{}>, "password">;

export type User = Prisma.UsersGetPayload<{}>;

// Tipo con relaciones incluidas (sin password)
export type UserWithRelations = Omit<
  Prisma.UsersGetPayload<{
    include: {
      groupMembers: true;
      expensesPaid: true;
      expensesOwed: true;
    };
  }>,
  "password"
>;

//tipos para controllers

export type NewUser = {
  name: string;
  email: string;
  password: string;
  image?: File | null;
};
