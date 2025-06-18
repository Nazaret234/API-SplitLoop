import { Router, Response, Request } from "express";
import Controller from "../controllers/expensesController";

const router = Router();

async function newExpense(req: Request, res: Response) {
  const { groupId, paidById, description, amount } = req.body;
  Controller.newExpense({
    groupId,
    paidById,
    description,
    amount,
  })
    .then((expense) => res.status(201).json(expense))
    .catch((error) => {
      console.error("Error creating expense:", error);
      res.status(500).json({ error: "Failed to create expense" });
    });
}

async function getExpensesByGroupId(req: Request, res: Response) {
  const { groupId } = req.params;
  Controller.getExpensesByGroupId(groupId)
    .then((expenses) => res.status(200).json(expenses))
    .catch((error) => {
      console.error("Error fetching expenses:", error);
      res.status(500).json({ error: "Failed to fetch expenses" });
    });
}

router.post("/newExpense", newExpense);
router.get("/getExpensesByGroupId/:groupId", getExpensesByGroupId);

export default router;
