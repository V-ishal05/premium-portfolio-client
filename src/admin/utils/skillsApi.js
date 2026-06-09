import { getAdminToken } from "./adminAuth";

const BASE_URL =
  `${API_BASE_URL}/api/skills`;

// =========================
// PUBLIC SKILLS
// =========================

export const getSkills =
  async () => {
    try {
      const response =
        await fetch(BASE_URL);

      return await response.json();
    } catch (error) {
      console.error(error);

      return {
        success: false,
      };
    }
  };

// =========================
// ADMIN SKILLS
// =========================

export const getAdminSkills =
  async () => {
    try {
      const response =
        await fetch(
          `${BASE_URL}/admin`,
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

// =========================
// UPDATE SKILLS
// =========================

export const updateSkills =
  async (skillsData) => {
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
              skillsData
            ),
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