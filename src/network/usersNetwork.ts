import { Router, Response, Request } from "express";
import Controller from "../controllers/usersController";

const router = Router();

async function newUser(req: Request, res: Response) {
  const { name, email, password, image } = req.body;
  Controller.newUser({ name, email, password, image })
    .then((user) => res.status(201).json(user))
    .catch((err) => {
      console.error("Error creating user:", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
}

async function getUserById(req: Request, res: Response) {
  const { id } = req.params;
  Controller.getUserById(id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json(user);
    })
    .catch((err) => {
      console.error("Error fetching user:", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
}

router.post("/newUser", newUser);
router.get("/getUserById/:id", getUserById);

export default router;
