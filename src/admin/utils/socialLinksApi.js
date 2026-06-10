import { getAdminToken } from "./adminAuth";
import API_BASE_URL from "../../config/api";
const BASE_URL =
  `${API_BASE_URL}/api/social-links`;

/*
====================================
PUBLIC
====================================
*/

export const getSocialLinks =
  async () => {
    try {
      const response =
        await fetch(BASE_URL);

      const data =
        await response.json();

      return data;
    } catch (error) {
      console.error(
        "Get Social Links Error:",
        error
      );

      return {
        success: false,
        message:
          "Failed to fetch social links",
      };
    }
  };

/*
====================================
UPDATE SOCIAL LINKS
====================================
*/

export const updateSocialLinks =
  async (socialData) => {
    try {
      const response =
        await fetch(
          `${BASE_URL}/admin`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",

              Authorization: `Bearer ${getAdminToken()}`,
            },

            body: JSON.stringify(
              socialData
            ),
          }
        );

      const data =
        await response.json();

      return data;
    } catch (error) {
      console.error(
        "Update Social Links Error:",
        error
      );

      return {
        success: false,
        message:
          "Social links update failed",
      };
    }
  };