import { Router } from "express";
import { callMCP } from "../services/mcpClient";

const router = Router();

router.post("/extract", async (req, res) => {
  const response = await callMCP("extract_prescription_from_image", req.body);
  res.json(response);
});

router.post("/normalize", async (req, res) => {
  const response = await callMCP("normalize_medication_instructions", req.body);
  res.json(response);
});

router.post("/schedule", async (req, res) => {
  const response = await callMCP("generate_med_schedule", req.body);
  res.json(response);
});

router.post("/refill", async (req, res) => {
  const response = await callMCP("estimate_refill_date", req.body);
  res.json(response);
});

export default router;
