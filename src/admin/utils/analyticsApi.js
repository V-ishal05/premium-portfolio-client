import { getAdminToken } from "./adminAuth";
import API_BASE_URL from "../../config/api";
const API_URL =
  `${API_BASE_URL}/api/analytics`;

export const getDashboardAnalytics =
  async () => {
    try {
      const response =
        await fetch(
          `${API_URL}/dashboard`,
          {
            headers: {
              Authorization: `Bearer ${getAdminToken()}`,
            },
          }
        );

      return await response.json();
    } catch (error) {
      console.error(error);

      return {
        success: false,
      };
    }
  };