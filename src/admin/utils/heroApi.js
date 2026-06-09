import { getAdminToken } from "./adminAuth";

const BASE_URL = "${API_BASE_URL}/api/hero";

// =========================
// PUBLIC HERO
// =========================

export const getHero = async () => {
  try {
    const response = await fetch(BASE_URL);

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Get Hero Error:", error);

    return {
      success: false,
      message: "Failed to fetch hero",
    };
  }
};

// =========================
// ADMIN HERO
// =========================

export const getAdminHero = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/admin`,
      {
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(
      "Get Admin Hero Error:",
      error
    );

    return {
      success: false,
      message: "Failed to fetch hero",
    };
  }
};

// =========================
// UPDATE HERO
// =========================

export const updateHero = async (
  heroData
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/admin`,
      {
        method: "PUT",
        headers: {
          "Content-Type":
            "application/json",
          Authorization: `Bearer ${getAdminToken()}`,
        },
        body: JSON.stringify(heroData),
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(
      "Update Hero Error:",
      error
    );

    return {
      success: false,
      message: "Hero update failed",
    };
  }
};

// =========================
// UPLOAD HERO IMAGE
// =========================

export const uploadHeroImage =
  async (imageFile) => {
    try {
      const formData =
        new FormData();

      formData.append(
        "profileImage",
        imageFile
      );

      const response =
        await fetch(
          `${BASE_URL}/admin/image`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${getAdminToken()}`,
            },
            body: formData,
          }
        );

      const data =
        await response.json();

      return data;
    } catch (error) {
      console.error(
        "Hero Image Upload Error:",
        error
      );

      return {
        success: false,
        message:
          "Image upload failed",
      };
    }
  };