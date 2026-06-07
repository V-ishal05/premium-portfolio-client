import "./Contact.css";
import { motion } from "framer-motion";
import {
  useState,
  useEffect,
} from "react";

import {
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaShieldAlt,
} from "react-icons/fa";

import RecruiterAccessTerminal from "./RecruiterAccessTerminal";

import { getSocialLinks } from "../../utils/socialLinksApi";

function Contact() {
  const [isTerminalOpen, setIsTerminalOpen] =
    useState(false);

  const [socialLinks, setSocialLinks] =
    useState(null);

  useEffect(() => {
    const loadSocialLinks =
      async () => {
        const data =
          await getSocialLinks();

        if (data.success) {
          setSocialLinks(
            data.data
          );
        }
      };

    loadSocialLinks();
  }, []);

  return (
    <section
      id="contact"
      className="contact"
    >
      <motion.div
        className="contact-card"
        initial={{
          opacity: 0,
          y: 60,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
        }}
        viewport={{
          once: true,
        }}
      >
        <p className="section-tag">
          LET'S CONNECT
        </p>

        <h2>
          Let’s Build Something
          <span className="gradient-text">
            {" "}
            Exceptional
          </span>
        </h2>

        <p className="contact-description">
          Open to internships,
          collaborations,
          product discussions,
          and recruiter
          conversations.
        </p>

        <div className="availability">
          <span className="status-dot"></span>
          Available for
          opportunities
        </div>

        <div className="contact-buttons">

          <a
            href={`mailto:${
              socialLinks?.email || ""
            }`}
          >
            <FaEnvelope />
            Email Me
          </a>

          <a
            href={
              socialLinks?.linkedin ||
              "#"
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
            LinkedIn
          </a>

          <a
            href={
              socialLinks?.github ||
              "#"
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
            GitHub
          </a>

          <button
            type="button"
            onClick={() =>
              setIsTerminalOpen(
                true
              )
            }
          >
            <FaShieldAlt />
            Recruiter Access
          </button>

        </div>
      </motion.div>

      <RecruiterAccessTerminal
        isOpen={
          isTerminalOpen
        }
        onClose={() =>
          setIsTerminalOpen(
            false
          )
        }
      />
    </section>
  );
}

export default Contact;