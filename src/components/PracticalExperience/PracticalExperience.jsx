import './PracticalExperience.css';
import { motion } from 'framer-motion';
import { FaDownload } from 'react-icons/fa';
import { useEffect, useState } from 'react';

function PracticalExperience() {
  const [experiences, setExperiences] =
    useState([]);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const response = await fetch(
        '`${API_BASE_URL}/api/experience'
      );

      const data = await response.json();

      if (data.success) {
        setExperiences(data.experiences);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return null;

  const activeExperiences = experiences;

  const featuredExperience =
    activeExperiences.find(
      (item) =>
        item.experienceDisplayType ===
        'featured'
    );

  const standardExperiences =
    activeExperiences.filter(
      (item) =>
        item.experienceDisplayType !==
        'featured'
    );

  const normalizeSkills = (skills) => {
    if (Array.isArray(skills))
      return skills;

    if (typeof skills === 'string')
      return skills
        .split(',')
        .map((s) => s.trim());

    return [];
  };

  return (
    <section
      className="experience-section"
      id="experience"
    >
      <div className="experience-container">
        <motion.div
          className="experience-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
          }}
        >
          <p className="section-tag">
            PRACTICAL EXPERIENCE
          </p>

          <h2>
            Hands-On Industry Experience
          </h2>

          <p>
            Practical internship
            experience across AI,
            cloud technologies,
            and enterprise-oriented
            product development.
          </p>
        </motion.div>

        {featuredExperience && (
          <motion.div
            className="featured-experience-card"
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
            }}
          >
            <img
             src={featuredExperience.logoImage}
              alt=""
            />

            <div>
              <h3>
                {
                  featuredExperience.title
                }
              </h3>

              <p className="experience-subtitle">
                {
                  featuredExperience.subtitle
                }
              </p>

              <p className="experience-description">
                {
                  featuredExperience.description
                }
              </p>

              <div className="experience-tags">
                {normalizeSkills(
                  featuredExperience.skills
                ).map(
                  (
                    skill,
                    idx
                  ) => (
                    <span
                      key={idx}
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>

              <a
                href={featuredExperience.certificatePdf}
                target="_blank"
                rel="noreferrer"
                className="experience-btn"
              >
                <FaDownload />
                {
                  featuredExperience.buttonText
                }
              </a>
            </div>
          </motion.div>
        )}

        <div className="experience-grid">
          {standardExperiences.map(
            (
              item,
              index
            ) => (
              <motion.div
                key={item._id}
                className="experience-card"
                initial={{
                  opacity: 0,
                  y: 50,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration:
                    0.6 +
                    index * 0.1,
                }}
              >
                <img
                  src={item.logoImage}
                  alt=""
                />

                <h3>
                  {item.title}
                </h3>

                <p className="experience-subtitle">
                  {item.subtitle}
                </p>

                <p className="experience-description">
                  {
                    item.description
                  }
                </p>

                <div className="experience-tags">
                  {normalizeSkills(
                    item.skills
                  ).map(
                    (
                      skill,
                      idx
                    ) => (
                      <span
                        key={idx}
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>

                <a
                  href={item.certificatePdf}
                  rel="noreferrer"
                  className="experience-btn"
                >
                  <FaDownload />
                  {
                    item.buttonText
                  }
                </a>
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
}

export default PracticalExperience;