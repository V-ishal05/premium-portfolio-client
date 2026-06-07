export const fetchResumeLink = async () => {
  try {
    const res = await fetch(
      "http://localhost:5000/api/resume"
    );

    const data = await res.json();

    if (
      data.success &&
      data.resume
    ) {
      return data.resume.resumeUrl;
    }

    return "";
  } catch (error) {
    console.error(
      "Resume fetch failed:",
      error
    );
    return "";
  }
};
