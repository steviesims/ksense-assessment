import { ApiClient } from "./api-client";
import dotenv from "dotenv";
import { Processor } from "./processor";

// Load environment variables from .env file
dotenv.config();

(async function () {
  const apiClient = new ApiClient({
    "x-api-key": process.env.API_KEY || "",
  });

  const patients = await apiClient.fetch();

  const processor = new Processor(patients);
  const output = processor.getOutput();
  console.log("High Risk Patients:", output.high_risk_patients);
  console.log("Fever Patients:", output.fever_patients);
  console.log("Data Quality Issues:", output.data_quality_issues);
})();
