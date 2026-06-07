import "./Skills.css";
import { motion } from "framer-motion";
import {
  useEffect,
  useState,
} from "react";

import {
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaShieldAlt,
  FaTools,
  FaRobot,
} from "react-icons/fa";

import { fetchSkillsContent } from "../../utils/skillsApi";

function Skills() {
  const [skills, setSkills] =
    useState(null);

  useEffect(() => {
    const loadSkills =
      async () => {
        const data =
          await fetchSkillsContent();

        if (data) {
          setSkills(data);
        }
      };

    loadSkills();
  }, []);

  const getSkillIcon = (
    iconName
  ) => {
    switch (iconName) {
      case "react":
        return <FaReact />;

      case "backend":
        return <FaNodeJs />;

      case "database":
        return <FaDatabase />;

      case "security":
        return <FaShieldAlt />;

      case "tools":
        return <FaTools />;

      case "ai":
        return <FaRobot />;

      default:
        return <FaReact />;
    }
  };

  return (
    <section
      id="skills"
      className="skills"
    >
      <div className="skills-container">

        <motion.div
          className="skills-header"
          initial={{
            opacity: 0,
            y: 40,
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
            {skills?.sectionTag ||
              "TECH STACK"}
          </p>

          <h2>
            {skills?.heading ||
              "Technologies Behind My"}

            <span className="gradient-text">
              {" "}
              {skills?.highlightText ||
                "Product Engineering"}
            </span>
          </h2>

          <p className="skills-subtitle">
            {skills?.subtitle ||
              "A hybrid combination of engineering, security, and AI-driven thinking."}
          </p>
        </motion.div>

        <div className="skills-grid">
          {skills?.skillCards?.map(
            (
              skill,
              index
            ) => (
              <motion.div
                key={index}
                className="skill-card"
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay:
                    index * 0.08,
                }}
                viewport={{
                  once: true,
                }}
              >
                <div className="skill-icon">
                  {getSkillIcon(
                    skill.icon
                  )}
                </div>

                <h3>
                  {skill.title}
                </h3>

                <p>
                  {skill.tech}
                </p>
              </motion.div>
            )
          )}
        </div>

        <motion.div
          className="proficiency-section"
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          transition={{
            duration: 1,
          }}
          viewport={{
            once: true,
          }}
        >
          <h3>
            {skills?.proficiencyTitle ||
              "Core Expertise"}
          </h3>

          {skills?.proficiency?.map(
            (
              item,
              index
            ) => (
              <div
                className="progress-item"
                key={index}
              >
                <div className="progress-label">
                  <span>
                    {item.name}
                  </span>

                  <span>
                    {item.level}%
                  </span>
                </div>

                <div className="progress-bar">
                  <motion.div
                    className="progress-fill"
                    initial={{
                      width: 0,
                    }}
                    whileInView={{
                      width: `${item.level}%`,
                    }}
                    transition={{
                      duration: 1.2,
                    }}
                    viewport={{
                      once: true,
                    }}
                  />
                </div>
              </div>
            )
          )}
        </motion.div>

      </div>
    </section>
  );
}

export default Skills;