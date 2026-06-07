import "./Footer.css";
import {
  FaGithub,
  FaLinkedin,
  FaUserShield,
} from "react-icons/fa";

import { Link } from "react-router-dom";
import {
  useEffect,
  useState,
} from "react";

import { getSocialLinks } from "../../utils/socialLinksApi";

function Footer() {
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
    <footer className="footer">
      <div className="footer-container">

        <div>
          <h3>VK // Portfolio</h3>

          <p>
            Engineering premium
            digital experiences.
          </p>
        </div>

        <div className="footer-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#certifications">
            Certifications
          </a>
          <a href="#contact">
            Contact
          </a>
        </div>

        <div className="footer-social">

          <a
            href={
              socialLinks?.github ||
              "#"
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
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
          </a>

        </div>

      </div>

      <div className="footer-bottom">

        <p className="copyright">
          © 2026 Vishal Kumar.
          All rights reserved.
        </p>

       <a
  href="/admin/login"
  target="_blank"
  rel="noopener noreferrer"
  className="footer-admin-link"
  title="Portfolio Administration"
>
  <FaUserShield />
</a>

      </div>
    </footer>
  );
}

export default Footer;