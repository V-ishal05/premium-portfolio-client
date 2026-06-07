const BASE_URL =
  "http://localhost:5000/api/social-links";

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
      };
    }
  };