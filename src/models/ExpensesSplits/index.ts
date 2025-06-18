import { PrismaClient } from "@prisma/client";
import {
  CreateExpenseSplitDTO,
  ExpenseSplitWithRelations,
} from "../../types/expensesSplits.types";

class ExpensesSplits {
  constructor(private readonly prisma: PrismaClient) {}

  async createExpenseSplit(
    data: CreateExpenseSplitDTO
  ): Promise<ExpenseSplitWithRelations> {
    const expenseSplit = await this.prisma.expensesSplits.create({
      data,
      include: {
        owedBy: true,
        expense: true,
      },
    });

    return expenseSplit;
  }

  async getExpenseSplitsByExpenseId(
    expenseId: string
  ): Promise<ExpenseSplitWithRelations[]> {
    return await this.prisma.expensesSplits.findMany({
      where: { expenseId },
      include: {
        owedBy: true,
        expense: true,
      },
    });
  }
}

export default ExpensesSplits;
