export const fetchHeroContent = async () => {
  try {
    const response = await fetch(
      "http://localhost:5000/api/hero"
    );

    const data = await response.json();

    if (data.success) {
      return data.hero;
    }

    return null;
  } catch (error) {
    console.error(
      "Hero fetch failed:",
      error
    );

    return null;
  }
};