import axios from "axios";

const MCP_URL = "http://localhost:3005";

export async function callMCP(toolName: string, payload: any) {
  try {
    const response = await axios.post(`${MCP_URL}/tools/${toolName}`, payload);
    return response.data;
  } catch (err: any) {
    return { error: err.message };
  }
}
