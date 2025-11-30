import { Router } from "express";
import { callMCP } from "../services/mcpClient";

const router = Router();

router.get("/profile/:id", async (req, res) => {
  const response = await callMCP("get_user_profile", { userId: req.params.id });
  res.json(response);
});

router.post("/schedule", async (req, res) => {
  const response = await callMCP("save_schedule", req.body);
  res.json(response);
});

export default router;
