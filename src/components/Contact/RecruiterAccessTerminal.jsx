import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./RecruiterAccessTerminal.css";
import {
  X,
  ShieldCheck,
  Briefcase,
  AlertCircle,
} from "lucide-react";

function RecruiterAccessTerminal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    corporateEmail: "",
    opportunityType: "",
    jobRole: "",
    urgency: "",
    message: "",
  });

  const opportunityTypes = [
    "Full-Time Role",
    "Internship",
    "Freelance / Contract",
    "Collaboration",
    "Technical Discussion",
  ];

  const urgencyLevels = ["Low", "Medium", "High", "Immediate"];

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const selectOption = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
    setError("");
  };

  const nextStep = () => {
    if (step === 1 && !formData.opportunityType) {
      setError("Please select an engagement intent.");
      return;
    }

    if (step === 2) {
      if (
        !formData.fullName ||
        !formData.company ||
        !formData.corporateEmail
      ) {
        setError("Please fill in all required fields before continuing.");
        return;
      }

      if (!isValidEmail(formData.corporateEmail)) {
        setError("Please enter a valid corporate email address.");
        return;
      }
    }

    setError("");
    setStep((prev) => prev + 1);
  };

  const submitRecruiterInquiry = async () => {
    if (!formData.jobRole || !formData.urgency || !formData.message) {
      setError("Please complete all required fields before transmitting.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/recruiter/inquiry`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Submission failed");
      }

      setStep(4);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const prevStep = () => {
    setError("");
    setStep((prev) => prev - 1);
  };

  const closeTerminal = () => {
    setStep(1);
    setError("");
    setLoading(false);

    setFormData({
      fullName: "",
      company: "",
      corporateEmail: "",
      opportunityType: "",
      jobRole: "",
      urgency: "",
      message: "",
    });

    onClose();
  };

  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;
    const root = document.getElementById("root");

    if (isOpen) {
      body.style.overflow = "hidden";
      html.style.overflow = "hidden";

      if (root) {
        root.style.overflow = "hidden";
        root.style.height = "100vh";
      }
    } else {
      body.style.overflow = "auto";
      html.style.overflow = "auto";

      if (root) {
        root.style.overflow = "auto";
        root.style.height = "auto";
      }
    }

    return () => {
      body.style.overflow = "auto";
      html.style.overflow = "auto";

      if (root) {
        root.style.overflow = "auto";
        root.style.height = "auto";
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="terminal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="grid-bg"></div>
        <div className="glow-orb glow-1"></div>
        <div className="glow-orb glow-2"></div>

        <motion.div
          className="terminal-container"
          initial={{ scale: 0.92, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.45 }}
        >
          <button className="close-btn" onClick={closeTerminal}>
            <X size={24} />
          </button>

          <div className="terminal-header">
            <ShieldCheck size={34} />
            <h1>RECRUITER ACCESS TERMINAL</h1>
            <p>Secure Opportunity Channel Established</p>
          </div>

          <div className="step-indicator">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className={step >= item ? "active-step" : ""}
              ></div>
            ))}
          </div>

          {step === 1 && (
            <motion.div
              className="terminal-step"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2>Select Engagement Intent</h2>

              <div className="option-grid">
                {opportunityTypes.map((item) => (
                  <button
                    key={item}
                    className={`option-card ${
                      formData.opportunityType === item ? "selected-card" : ""
                    }`}
                    onClick={() => selectOption("opportunityType", item)}
                  >
                    <Briefcase size={22} />
                    {item}
                  </button>
                ))}
              </div>

              <div className="button-row right-align">
                {error && <p className="form-error">{error}</p>}
                <button className="terminal-action-btn" onClick={nextStep}>
                  Continue
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              className="terminal-step"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2>Identity Verification</h2>

              <div className="form-grid">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleInput}
                />

                <input
                  type="text"
                  name="company"
                  placeholder="Company Name"
                  value={formData.company}
                  onChange={handleInput}
                />

                <input
                  type="email"
                  name="corporateEmail"
                  placeholder="Corporate Email"
                  value={formData.corporateEmail}
                  onChange={handleInput}
                  className={
                    error === "Please enter a valid corporate email address."
                      ? "input-error"
                      : ""
                  }
                />
              </div>

              <div className="button-row">
                {error && <p className="form-error">{error}</p>}
                <button className="secondary-btn" onClick={prevStep}>
                  Back
                </button>
                <button className="terminal-action-btn" onClick={nextStep}>
                  Continue
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              className="terminal-step"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2>Opportunity Brief</h2>

              <input
                type="text"
                name="jobRole"
                placeholder="Job Role"
                value={formData.jobRole}
                onChange={handleInput}
              />

              <h3>Urgency Level</h3>

              <div className="option-grid small-grid">
                {urgencyLevels.map((item) => (
                  <button
                    key={item}
                    className={`option-card ${
                      formData.urgency === item ? "selected-card" : ""
                    }`}
                    onClick={() => selectOption("urgency", item)}
                  >
                    <AlertCircle size={18} />
                    {item}
                  </button>
                ))}
              </div>

              <textarea
                name="message"
                placeholder="Describe the opportunity..."
                value={formData.message}
                onChange={handleInput}
              />

              <div className="button-row">
                {error && <p className="form-error">{error}</p>}

                <button className="secondary-btn" onClick={prevStep}>
                  Back
                </button>

                <button
                  className="terminal-action-btn"
                  onClick={submitRecruiterInquiry}
                  disabled={loading}
                >
                  {loading ? "Transmitting..." : "Transmit"}
                </button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              className="terminal-step success-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <ShieldCheck size={64} />
              <h2>Transmission Successful</h2>
              <p>Your recruiter inquiry has been securely delivered.</p>

              <button className="terminal-action-btn" onClick={closeTerminal}>
                Close Portal
              </button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default RecruiterAccessTerminal;