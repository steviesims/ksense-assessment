import axios, { AxiosInstance } from "axios";
import { BASE_URL, API_RETRY_DELAY, API_RETRY_ATTEMPTS } from "@src/constants";

export class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: BASE_URL,
      timeout: 10000, // 10 seconds timeout
    });
  }

  /**
   * Fetch data from the API
   */
  async fetch() {}
}
