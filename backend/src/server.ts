import express from "express";
import cors from "cors";
import aiRoutes from "./routes/aiRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/ai", aiRoutes);
app.use("/user", userRoutes);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
