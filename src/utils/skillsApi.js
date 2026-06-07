export const fetchSkillsContent =
  async () => {
    try {
      const response =
        await fetch(
          "http://localhost:5000/api/skills"
        );

      const data =
        await response.json();

      if (data.success) {
        return data.skills;
      }

      return null;
    } catch (error) {
      console.error(
        "Skills fetch failed:",
        error
      );

      return null;
    }
  };