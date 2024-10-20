import { Router } from "express";
import { registerUser } from "../controllers/auth.controller";

const router = Router();

router.post("/register", (req, res) => {
  registerUser(req, res);
});

export default router;
