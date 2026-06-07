import { getAdminToken } from "./adminAuth";

const API_URL =
  "http://localhost:5000/api/analytics";

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