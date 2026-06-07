export const fetchAboutContent = async () => {
  try {
    const response = await fetch(
      "http://localhost:5000/api/about"
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