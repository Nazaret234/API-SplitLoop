import { Router, Request, Response } from "express";
import Controller from "../controllers/expensesSplitsController";

const router = Router();

async function newExpenseSplit(req: Request, res: Response) {
  const { expenseId, owedById, amount, status } = req.body;
  Controller.newExpenseSplit({
    expenseId,
    owedById,
    amount,
    status,
  })
    .then((expenseSplit) => res.status(201).json(expenseSplit))
    .catch((error) => {
      console.error("Error creating expense split:", error);
      res.status(500).json({ error: "Failed to create expense split" });
    });
}

async function getExpenseSplitsByExpenseId(req: Request, res: Response) {
  const { expenseId } = req.params;
  Controller.getExpenseSplitsByExpenseId(expenseId)
    .then((expenseSplits) => res.status(200).json(expenseSplits))
    .catch((error) => {
      console.error("Error fetching expense splits:", error);
      res.status(500).json({ error: "Failed to fetch expense splits" });
    });
}

router.post("/newExpenseSplit", newExpenseSplit);
router.get(
  "/getExpenseSplitsByExpenseId/:expenseId",
  getExpenseSplitsByExpenseId
);

export default router;
