// mcp-server/src/index.ts
import express from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import crypto from "crypto";
import { z } from "zod";
import { extractPrescription } from "./tools/extractPrescription";

const server = new McpServer({
  name: "medora-mcp-server",
  version: "1.0.0",
});

// Register tool
server.registerTool(
  "extract_prescription_from_image",
  {
    title: "Extract Prescription",
    description: "Reads a prescription image and extracts structured medication data.",
    inputSchema: z.object({
      base64Image: z.string(),
    }),
    outputSchema: z.any(),
  },
  extractPrescription
);

// HTTP layer
const app = express();
app.use(express.json());

app.post("/mcp", async (req, res) => {
  const transport = new StreamableHTTPServerTransport({
    enableJsonResponse: true,
    sessionIdGenerator: () => crypto.randomUUID(),
  });

  res.on("close", () => transport.close());
  await server.connect(transport);
  await transport.handleRequest(req, res, req.body);
});

app.listen(3005, () => {
  console.log("🚀 MCP Server running at http://localhost:3005/mcp");
});
