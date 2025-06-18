import { Prisma } from "@prisma/client";

export type CreateExpenseSplitDTO = {
  expenseId: string;
  owedById: string;
  amount: number;
  status: "pending" | "paid" | "cancelled";
};

export type UpdateExpenseSplitDTO = Partial<
  Omit<CreateExpenseSplitDTO, "expenseId">
>;

export type ExpenseSplit = Prisma.ExpensesSplitsGetPayload<{}>;

export type ExpenseSplitWithRelations = Prisma.ExpensesSplitsGetPayload<{
  include: {
    owedBy: true;
    expense: true;
  };
}>;
