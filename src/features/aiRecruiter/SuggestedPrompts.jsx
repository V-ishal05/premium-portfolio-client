import React from "react";

const prompts = [
  "Why should I hire Vishal?",
  "Evaluate backend engineering fit",
  "Compare AI and backend strengths",
  "Show cybersecurity profile",
  "Summarize leadership experience",
  "Tell me about his projects",
  "Is he suitable for full stack roles?",
  "Analyze job description match",
  "Summarize candidate in 30 seconds",
  "Show ATS strength snapshot",
];

function SuggestedPrompts({ onPromptClick }) {
  return (
    <div className="suggested-prompts">
      {prompts.map((prompt, index) => (
        <button
          key={index}
          onClick={() => onPromptClick(prompt)}
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}

export default SuggestedPrompts;