import { Prisma } from "@prisma/client";

export type CreateExpenseDTO = {
  groupId: string;
  paidById: string;
  description: string;
  amount: number;
};

export type UpdateExpenseDTO = Partial<
  Omit<CreateExpenseDTO, "groupId" | "paidById">
>;

export type Expense = Prisma.ExpensesGetPayload<{}>;

export type ExpenseWithRelations = Prisma.ExpensesGetPayload<{
  include: {
    group: true;
    paidBy: true;
    splits: true;
  };
}>;
