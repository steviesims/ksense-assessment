import axios, { AxiosInstance } from "axios";
import axiosRetry from "axios-retry";
import {
  BASE_URL,
  API_RETRY_DELAY,
  API_RETRY_ATTEMPTS,
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
} from "./constants";

import type { TPatient, TResponse } from "./types";

export class ApiClient {
  private client: AxiosInstance;

  constructor(headers: Record<string, string>) {
    this.client = axios.create({
      baseURL: BASE_URL,
      timeout: 10000, // 10 seconds timeout
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });

    // Configure axios-retry
    axiosRetry(this.client, {
      retries: API_RETRY_ATTEMPTS,
      retryDelay: (retryCount, error) => {
        const { response } = error;
        const { status } = response || {};
        if (status === 429) {
          const delay = API_RETRY_DELAY * retryCount;
          console.warn(`Rate limit exceeded. Retrying after ${delay}ms...`);
          return delay;
        }

        if (status && status >= 500) {
          const delay = API_RETRY_DELAY * retryCount;
          console.warn(`Server error. Retrying after ${delay}ms...`);
          return delay;
        }

        console.warn(`Retrying request due to error: ${error.message}`);
        return API_RETRY_DELAY;
      },
      retryCondition: (error) => {
        const { response } = error;
        return (
          axiosRetry.isNetworkError(error) ||
          [429, 500, 503].includes(response?.status || 0) // Retry on rate limit and server errors
        );
      },
    });
  }

  /**
   * Fetch data from the API
   */
  async fetch(): Promise<TPatient[]> {
    const patients: TPatient[] = [];
    let page = DEFAULT_PAGE_INDEX;
    let limit = DEFAULT_PAGE_SIZE;
    let hasNext = true;

    while (hasNext) {
      try {
        const response = (
          await this.client.get<TResponse>("/patients", {
            params: { page, limit },
          })
        ).data;

        const { data } = response;
        if (Array.isArray(data)) {
          if (data.length === 0) hasNext = false;
          else {
            patients.push(...data);
            page++;

            await this.delay(200);
          }
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Error fetching data:", error.message);
        } else {
          console.error("Unexpected error:", error);
        }
      }
    }

    return patients;
  }

  delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
