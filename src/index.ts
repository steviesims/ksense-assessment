import { ApiClient } from "./api-client";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

(async function () {
  const apiClient = new ApiClient({
    "x-api-key": process.env.API_KEY || "",
  });

  const patients = await apiClient.fetch();
})();
