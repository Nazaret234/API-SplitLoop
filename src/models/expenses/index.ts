import { PrismaClient } from "@prisma/client";
import {
  CreateExpenseDTO,
  Expense,
  ExpenseWithRelations,
} from "../../types/expenses.types";

class Expenses {
  constructor(private readonly prisma: PrismaClient) {}

  async createExpense(data: CreateExpenseDTO): Promise<Expense> {
    const expense = await this.prisma.expenses.create({
      data,
    });

    return expense;
  }

  async getExpensesByGroupId(groupId: string): Promise<ExpenseWithRelations[]> {
    return await this.prisma.expenses.findMany({
      where: { groupId },
      include: {
        group: true,
        paidBy: true,
        splits: true,
      },
    });
  }
}

export default Expenses;
