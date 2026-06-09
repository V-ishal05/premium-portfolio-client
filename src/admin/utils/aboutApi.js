import { getAdminToken } from "./adminAuth";

const BASE_URL =
  "${API_BASE_URL}/api/about";

// =========================
// PUBLIC ABOUT
// =========================

export const getAbout =
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
// ADMIN ABOUT
// =========================

export const getAdminAbout =
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
// UPDATE ABOUT
// =========================

export const updateAbout =
  async (aboutData) => {
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
              aboutData
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