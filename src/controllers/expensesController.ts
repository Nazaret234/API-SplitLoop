import { getExpenses } from "../services/serviceLocator/composer";
import { CreateExpenseDTO } from "../types/expenses.types";

async function newExpense(data: CreateExpenseDTO) {
  const client = getExpenses();
  return await client.createExpense(data);
}

async function getExpensesByGroupId(groupId: string) {
  const client = getExpenses();
  return await client.getExpensesByGroupId(groupId);
}

export default {
  newExpense,
  getExpensesByGroupId,
};
