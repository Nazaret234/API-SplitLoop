import { Router, Response, Request } from "express";
import Controller from "../controllers/groupsController";

const router = Router();

async function newGroup(req: Request, res: Response) {
  const { name, description, createdById } = req.body;
  Controller.newGroup({ name, description, createdById })
    .then((group) => res.status(201).json(group))
    .catch((err) => {
      console.error("Error creating group:", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
}

async function getGroupById(req: Request, res: Response) {
  const { id } = req.params;
  Controller.getGroupById(id)
    .then((group) => {
      if (!group) {
        return res.status(404).json({ error: "Group not found" });
      }
      res.status(200).json(group);
    })
    .catch((err) => {
      console.error("Error fetching group:", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
}

router.post("/newGroup", newGroup);
router.get("/getGroupById/:id", getGroupById);

export default router;
