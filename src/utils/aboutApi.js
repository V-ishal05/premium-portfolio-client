import API_BASE_URL from "../config/api";
export const fetchAboutContent = async () => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/about`
    );

    const data = await response.json();

    if (data.success) {
      return data.about;
    }

    return null;
  } catch (error) {
    console.error(
      "About fetch failed:",
      error
    );

    return null;
  }
};