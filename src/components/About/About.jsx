import "./About.css";
import { motion } from "framer-motion";
import {
  useEffect,
  useState,
} from "react";

import { fetchAboutContent } from "../../utils/aboutApi";

function About() {
  const [about, setAbout] =
    useState(null);

  useEffect(() => {
    const loadAbout =
      async () => {
        const data =
          await fetchAboutContent();

        if (data) {
          setAbout(data);
        }
      };

    loadAbout();
  }, []);

  return (
    <section
      id="about"
      className="about"
    >
      
        <div className="about-header">
          <p className="section-tag">
            {about?.sectionTag || "ABOUT ME"}
          </p>
        </div>
        <div className="about-container">
        <motion.div
          className="about-left"
          initial={{
            opacity: 0,
            x: -80,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.9,
          }}
          viewport={{
            once: true,
          }}
        >

          <h2>
            {about?.heading ||
              "Building Secure, Intelligent &"}

            <span className="gradient-text">
              {" "}
              {about?.highlightText ||
                "Scalable Digital Products"}
            </span>
          </h2>

          <p className="about-description">
            {about?.description ||
              "I'm Vishal Kumar, a Full Stack Developer passionate about crafting premium digital experiences."}
          </p>

          <div className="stats-grid">

            <div className="stat-card">
              <h3>
                {about?.stats
                  ?.projects ?? 0}
                +
              </h3>

              <p>
                Projects Built
              </p>
            </div>

            <div className="stat-card">
              <h3>
                {about?.stats
                  ?.dsa ?? 0}
                +
              </h3>

              <p>
                DSA Problems
              </p>
            </div>

            <div className="stat-card">
              <h3>
                {about?.stats
                  ?.certifications ??
                  0}
                +
              </h3>

              <p>
                Certifications
              </p>
            </div>

          </div>
        </motion.div>

        <motion.div
          className="about-right"
          initial={{
            opacity: 0,
            x: 80,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.9,
          }}
          viewport={{
            once: true,
          }}
        >
          <div className="timeline-card">

            <h3>
              {about?.timelineTitle ||
                "Journey Snapshot"}
            </h3>

            {about?.timelineItems?.map(
              (
                item,
                index
              ) => (
                <div
                  key={index}
                  className="timeline-item"
                >
                  <span>
                    {item.tag}
                  </span>

                  <h4>
                    {item.title}
                  </h4>

                  <p>
                    {
                      item.description
                    }
                  </p>
                </div>
              )
            )}

          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default About;