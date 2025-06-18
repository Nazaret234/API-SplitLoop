import { Router, Request, Response } from "express";
import Controller from "../controllers/groupsMembersController";

const router = Router();

async function addMemberToGroup(req: Request, res: Response) {
  const { groupId, userId, role } = req.body;
  Controller.addGroupMember({ groupId, userId, role })
    .then((member) => res.status(201).json(member))
    .catch((err) => {
      console.error("Error adding member to group:", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
}

router.post("/addMemberToGroup", addMemberToGroup);

export default router;
