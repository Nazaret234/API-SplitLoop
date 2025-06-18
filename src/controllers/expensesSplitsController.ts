import { getExpensesSplits } from "../services/serviceLocator/composer";
import { CreateExpenseSplitDTO } from "../types/expensesSplits.types";

async function newExpenseSplit(data: CreateExpenseSplitDTO) {
  const client = getExpensesSplits();
  return await client.createExpenseSplit(data);
}

async function getExpenseSplitsByExpenseId(expenseId: string) {
  const client = getExpensesSplits();
  return await client.getExpenseSplitsByExpenseId(expenseId);
}

export default {
  newExpenseSplit,
  getExpenseSplitsByExpenseId,
};
