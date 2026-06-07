import { useEffect, useState } from "react";
import "./Preloader.css";

const loadingMessages = [
  "Initializing Portfolio...",
  "Loading Projects...",
  "Loading Certifications...",
  "Loading Recruiter Experience...",
  "Access Granted ✓",
];

function Preloader({ onComplete }) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => {
        if (prev === loadingMessages.length - 1) {
          clearInterval(interval);

          setTimeout(() => {
            onComplete();
          }, 800);

          return prev;
        }

        return prev + 1;
      });
    }, 600);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="preloader">
      <div className="preloader-content">
        <h1 className="preloader-name">
          VISHAL KUMAR
        </h1>

        <p className="preloader-role">
          Full Stack Developer | AI Product Builder
        </p>

        <div className="preloader-line"></div>

        <p className="preloader-status">
          {loadingMessages[messageIndex]}
        </p>
      </div>
    </div>
  );
}

export default Preloader;