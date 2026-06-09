import "./CertificationVault.css";
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  FaExternalLinkAlt,
} from "react-icons/fa";

function CertificationVault() {
  const [activeFilter, setActiveFilter] =
    useState("All");

  const [selectedCert, setSelectedCert] =
    useState(null);

  const [certifications, setCertifications] =
    useState([]);

  const [stats, setStats] = useState({
    verifiedCredentials: "0",
    domainsCovered: "0",
    industryPlatforms: "0",
    learningAcceleration: "0",
  });

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setSelectedCert(null);
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  useEffect(() => {
    fetchCertifications();
    fetchStats();
  }, []);

  const fetchCertifications = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/certifications`
      );

      const data = await response.json();

      if (data.success) {
        setCertifications(data.certifications);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/certifications/stats`
      );

      const data = await response.json();

      if (data.success) {
        setStats(data.settings);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const featuredCert =
    certifications.find(
      (cert) => cert.isFeatured
    ) || null;

  const categories = useMemo(() => {
    const uniqueCategories =
      certifications
        .filter(
          (cert) =>
            cert.isActive &&
            !cert.isFeatured
        )
        .map((cert) => cert.category);

    return [
      "All",
      ...new Set(uniqueCategories),
    ];
  }, [certifications]);

  const filteredCerts =
    activeFilter === "All"
      ? certifications.filter(
        (cert) =>
          cert.isActive &&
          !cert.isFeatured
      )
      : certifications.filter(
        (cert) =>
          cert.isActive &&
          !cert.isFeatured &&
          cert.category === activeFilter
      );

  return (
    <section
      id="certifications"
      className="certification-vault"
    >
      <div className="certification-container">
        <motion.div
          className="cert-header"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <p className="section-tag">
            CERTIFICATION VAULT
          </p>

          <h2>
            Verified Learning &
            <span className="gradient-text">
              {" "}
              Industry Credentials
            </span>
          </h2>

          <p>
            Professional certifications,
            simulations, and technical
            learning validating
            cybersecurity, cloud, AI,
            and engineering
            capabilities.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="cert-stats">
          <div className="cert-stat-card">
            <h3>
              {stats.verifiedCredentials}
            </h3>
            <p>Verified Credentials</p>
          </div>

          <div className="cert-stat-card">
            <h3>{stats.domainsCovered}</h3>
            <p>Domains Covered</p>
          </div>

          <div className="cert-stat-card">
            <h3>
              {stats.industryPlatforms}
            </h3>
            <p>Industry Platforms</p>
          </div>

          <div className="cert-stat-card">
            <h3>
              {stats.learningAcceleration}
            </h3>
            <p>Learning Acceleration</p>
          </div>
        </div>

        {/* Featured */}
        {featuredCert && (
          <motion.div
            className="featured-cert"
            initial={{
              opacity: 0,
              scale: 0.96,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="featured-cert-content">
              <div className="featured-logo">
                <img
                  src={featuredCert.logoImage}
                  alt={featuredCert.issuedBy}
                />
              </div>

              <div className="featured-info">
                <div className="featured-badge">
                  FEATURED CREDENTIAL
                </div>

                <h3>
                  {
                    featuredCert.certificateTitle
                  }
                </h3>
                <div className="featured-meta">
                  <span>
                    {featuredCert.issuedBy} • {featuredCert.platform} • {featuredCert.year}
                  </span>
                </div>
                <p>
                  {
                    featuredCert.shortDescription
                  }
                </p>
                <div className="featured-skills">
                  {featuredCert.skillsLearned
                    ?.slice(0, 5)
                    .map((skill, index) => (
                      <span key={index}>
                        {skill}
                      </span>
                    ))}
                </div>

                <button
                  onClick={() =>
                    setSelectedCert(
                      featuredCert
                    )
                  }
                >
                  <FaExternalLinkAlt />
                  Explore Credential
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Filters */}
        <div className="cert-filters">
          {categories.map((filter) => (
            <button
              key={filter}
              className={
                activeFilter === filter
                  ? "active-filter"
                  : ""
              }
              onClick={() =>
                setActiveFilter(filter)
              }
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="cert-grid">
          {filteredCerts.map(
            (cert, index) => (
              <motion.div
                key={cert._id}
                className="cert-card"
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.45,
                  delay:
                    index * 0.08,
                }}
                viewport={{ once: true }}
                onClick={() =>
                  setSelectedCert(cert)
                }
              >
                <div className="cert-logo">
                  <img
                    src={cert.logoImage}
                    alt={cert.issuedBy}
                  />
                </div>

                <h3>{cert.issuedBy}</h3>

                <h4>
                  {
                    cert.certificateTitle
                  }
                </h4>

                <p>
                  {cert.platform} •{" "}
                  {cert.year}
                </p>

                <span className="explore-text">
                  ↗ Explore Credential
                </span>
              </motion.div>
            )
          )}
        </div>

        {/* Modal */}
        {selectedCert && (
          <div
            className="cert-modal-overlay"
            onClick={() =>
              setSelectedCert(null)
            }
          >
            <motion.div
              className="cert-modal"
              initial={{
                opacity: 0,
                scale: 0.88,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.3,
              }}
              onClick={(e) =>
                e.stopPropagation()
              }
            >
              <div className="cert-modal-header">
                <img
                  src={selectedCert.logoImage}
                  alt={selectedCert.issuedBy}
                />

                <h2>
                  {
                    selectedCert.certificateTitle
                  }
                </h2>
              </div>

              <div className="verified-badge">
                ✔ Verified Credential
              </div>

              <p className="cert-description">
                {
                  selectedCert.shortDescription
                }
              </p>

              <div className="cert-details">
                <p>
                  <strong>
                    Issued By:
                  </strong>{" "}
                  {
                    selectedCert.issuedBy
                  }
                </p>

                <p>
                  <strong>
                    Platform:
                  </strong>{" "}
                  {
                    selectedCert.platform
                  }
                </p>

                <p>
                  <strong>Year:</strong>{" "}
                  {selectedCert.year}
                </p>

                <p>
                  <strong>
                    Category:
                  </strong>{" "}
                  {
                    selectedCert.category
                  }
                </p>
              </div>

              <div className="skill-tags">
                {selectedCert.skillsLearned?.map(
                  (skill, i) => (
                    <span key={i}>
                      {skill}
                    </span>
                  )
                )}
              </div>

              <div className="cert-modal-actions">
                <a
                  href={selectedCert.credentialPdf}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaExternalLinkAlt />
                  View Credential
                </a>

                <button
                  onClick={() =>
                    setSelectedCert(null)
                  }
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}

export default CertificationVault;