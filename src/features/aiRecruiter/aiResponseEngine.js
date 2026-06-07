import portfolioKnowledge from "./portfolioKnowledge";

function evaluateRole(role) {
  const lowerRole = role.toLowerCase();

  if (lowerRole.includes("frontend")) {
    return "Vishal is strongly suitable for frontend engineering roles due to expertise in React, responsive UI architecture, premium interface engineering, animation systems, and modern component-based development.";
  }

  if (lowerRole.includes("backend")) {
    return "Vishal is suitable for backend engineering roles with practical Node.js, Express, MongoDB, SQL, REST API, and application architecture experience.";
  }

  if (lowerRole.includes("full stack")) {
    return "Vishal is highly suitable for full-stack roles due to combined frontend engineering, backend architecture, API integration, and end-to-end application development experience.";
  }

  if (
    lowerRole.includes("ai") ||
    lowerRole.includes("machine learning")
  ) {
    return "Vishal has AI product exposure through MediaMind AI Platform, intelligent interface design, and AI-driven application thinking.";
  }

  if (
    lowerRole.includes("cybersecurity") ||
    lowerRole.includes("security")
  ) {
    return "Vishal demonstrates cybersecurity readiness through Google Cybersecurity learning, OWASP awareness, risk analysis understanding, and secure engineering thinking.";
  }

  return null;
}

function generateProjectResponse(index) {
  const project = portfolioKnowledge.projects[index];

  if (!project) {
    return "Project not found.";
  }

  return `${project.name}: ${project.description}`;
}

function generateAIResponse(query, conversationContext = {}) {
  const q = query.toLowerCase();
  // EXPERIENCE QUERIES
  if (
    q.includes("experience") ||
    q.includes("background") ||
    q.includes("work experience")
  ) {
    if (q.includes("ai")) {
      return portfolioKnowledge.recruiterFAQs.ai;
    }

    if (q.includes("backend")) {
      return portfolioKnowledge.recruiterFAQs.backend;
    }

    if (q.includes("frontend")) {
      return portfolioKnowledge.recruiterFAQs.frontend;
    }

    if (
      q.includes("security") ||
      q.includes("cybersecurity")
    ) {
      return portfolioKnowledge.recruiterFAQs.cybersecurity;
    }

    return `${portfolioKnowledge.profile.summary} Featured experience includes MediaMind AI Platform, Real-Time Weather Full-Stack Application, and Premium Portfolio Platform.`;
  }
  // GENERAL INTRO
  if (
    q.includes("tell me about him") ||
    q.includes("tell me about his") ||
    q.includes("about vishal")
  ) {
    return `${portfolioKnowledge.profile.summary} His featured work includes AI systems, full-stack applications, premium product engineering, and cybersecurity-focused technical development.`;
  }
  // FOLLOW-UP PROJECT MEMORY
  if (
    q.includes("first project") ||
    q.includes("1st project")
  ) {
    return generateProjectResponse(0);
  }

  if (
    q.includes("second project") ||
    q.includes("2nd project")
  ) {
    return generateProjectResponse(1);
  }

  if (
    q.includes("third project") ||
    q.includes("3rd project")
  ) {
    return generateProjectResponse(2);
  }

  // ROLE SUITABILITY
  // ROLE SUITABILITY
  if (
    q.includes("suitable") ||
    q.includes("fit for") ||
    q.includes("role")
  ) {
    if (q.includes("full stack")) {
      return evaluateRole("full stack");
    }

    if (
      q.includes("frontend") &&
      q.includes("backend")
    ) {
      return `${evaluateRole("frontend")} ${evaluateRole("backend")}`;
    }

    if (q.includes("frontend")) {
      return evaluateRole("frontend");
    }

    if (q.includes("backend")) {
      return evaluateRole("backend");
    }

    if (q.includes("ai")) {
      return evaluateRole("ai");
    }

    if (
      q.includes("cybersecurity") ||
      q.includes("security")
    ) {
      return evaluateRole("cybersecurity");
    }
  }

  // PROJECT COMPARISON
  if (
    q.includes("compare") &&
    q.includes("frontend") &&
    q.includes("backend")
  ) {
    return "Frontend strengths include React, premium UI engineering, responsive architecture, animations, and user experience design. Backend strengths include Node.js, Express, MongoDB, SQL, REST APIs, and system architecture.";
  }

  // PROJECTS
  if (q.includes("project")) {
    return portfolioKnowledge.projects
      .map(
        (project) =>
          `${project.name}: ${project.description}`
      )
      .join(" ");
  }

  // AI
  if (
    q.includes("ai") ||
    q.includes("machine learning")
  ) {
    return portfolioKnowledge.recruiterFAQs.ai;
  }

  // BACKEND
  if (
    q.includes("backend") ||
    q.includes("node") ||
    q.includes("api")
  ) {
    return portfolioKnowledge.recruiterFAQs.backend;
  }

  // FRONTEND
  if (
    q.includes("frontend") ||
    q.includes("react") ||
    q.includes("ui")
  ) {
    return portfolioKnowledge.recruiterFAQs.frontend;
  }

  // CYBERSECURITY
  if (
    q.includes("cybersecurity") ||
    q.includes("security")
  ) {
    return portfolioKnowledge.recruiterFAQs.cybersecurity;
  }

  // CERTIFICATIONS
  if (
    q.includes("certification") ||
    q.includes("certificate")
  ) {
    return `Certifications include: ${portfolioKnowledge.certifications.join(", ")}.`;
  }

  // EDUCATION
  if (
    q.includes("education") ||
    q.includes("degree")
  ) {
    return `${portfolioKnowledge.education.degree} in ${portfolioKnowledge.education.domain}.`;
  }

  return "I can help recruiters evaluate Vishal's projects, technical skills, certifications, AI experience, backend engineering, cybersecurity profile, and role suitability.";
}

export default generateAIResponse;