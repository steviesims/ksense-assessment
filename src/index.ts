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

  // console.log(patients);

  const processor = new Processor(patients);
  const output = processor.getOutput();

  // console.log("Processed Output:", output);

  /**
   * Submit the assessment results to the API
   */
  fetch("https://assessment.ksensetech.com/api/submit-assessment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.API_KEY || "",
    },
    body: JSON.stringify(output),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Assessment Results:", data);
    });
})();
