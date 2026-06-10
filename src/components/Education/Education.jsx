import './Education.css';
import { motion } from 'framer-motion';
import {
    FaDownload,
    FaGraduationCap,
    FaSchool,
    FaAward,
} from 'react-icons/fa';
import { useEffect, useState } from 'react';
import API_BASE_URL from "../../config/api";
function Education() {
    const [education, setEducation] =
        useState([]);

    const [highlights, setHighlights] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        fetchEducation();
        fetchHighlights();
    }, []);

    const fetchEducation = async () => {
        try {
            const response = await fetch(
                '`${API_BASE_URL}/api/education'
            );

            const data = await response.json();

            if (data.success) {
                console.log("Education API:", data.education);
                setEducation(data.education);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchHighlights = async () => {
        try {
            const response = await fetch(
                '`${API_BASE_URL}/api/education/highlights'
            );

            const data = await response.json();

            if (data.success) {
                setHighlights(data.highlights);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const featuredEducation =
        education.find(
            (item) =>
                item.educationType ===
                "featured"
        );

    const standardEducation =
        education.filter(
            (item) =>
                item.educationType !==
                "featured"
        );

    const formatScore = (item) => {
        if (
            item.scoreType === "Percentage"
        ) {
            return `${item.scoreValue}%`;
        }

        return item.scoreValue;
    };

    const getButtonText = (title) => {
        if (
            title.toLowerCase().includes(
                "secondary"
            )
        ) {
            return "View Marksheet";
        }

        return "View Transcript";
    };

    if (loading) return null;

    return (
        <section
            className="education-section"
            id="education"
        >
            <div className="education-container">
                <motion.div
                    className="education-header"
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
                    <p className="section-tag">
                        ACADEMIC JOURNEY
                    </p>

                    <h2>
                        Education & Academic
                        Credentials
                    </h2>

                    <p>
                        A strong academic
                        foundation powering full
                        stack engineering,
                        cybersecurity exploration,
                        and AI-driven product
                        development.
                    </p>
                </motion.div>

                {featuredEducation && (
                    <motion.div
                        className="featured-education-card"
                        initial={{
                            opacity: 0,
                            y: 60,
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                        }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.8,
                        }}
                    >
                        <div className="featured-left">
                            <img
                               src={featuredEducation.logoImage}
                                alt={
                                    featuredEducation.title
                                }
                            />
                        </div>

                        <div className="featured-right">
                            <span className="featured-badge">
                                {
                                    featuredEducation.statusLabel
                                }
                            </span>

                            <h3>
                                {
                                    featuredEducation.title
                                }
                            </h3>

                            <p className="featured-university">
                                {
                                    featuredEducation.institutionName
                                }
                            </p>

                            <p className="featured-location">
                                {
                                    featuredEducation.location
                                }
                            </p>

                            <div className="featured-meta">
                                <span>
                                    <FaGraduationCap />
                                    {
                                        featuredEducation.completionText
                                    }
                                </span>

                                <span>
                                    <FaAward />
                                    {
                                        featuredEducation.scoreType
                                    }
                                    :{" "}
                                    {formatScore(
                                        featuredEducation
                                    )}
                                </span>
                            </div>

                            <a
                                href={featuredEducation.documentPdf}
                                rel="noreferrer"
                                className="education-btn"
                            >
                                <FaDownload />
                                {getButtonText(
                                    featuredEducation.title
                                )}
                            </a>
                        </div>
                    </motion.div>
                )}

                <div className="education-grid">
                    {standardEducation.map(
                        (item, index) => (
                            <motion.div
                                key={item._id}
                                className="education-card"
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
                                />

                                <h3>{item.title}</h3>

                                {item.affiliation && (
                                    <p>
                                        {item.affiliation}
                                    </p>
                                )}

                                {item.programOrStream && (
                                    <p>
                                        {
                                            item.programOrStream
                                        }
                                    </p>
                                )}

                                <p>
                                    {
                                        item.institutionName
                                    }
                                </p>

                                <p>{item.location}</p>

                                <div className="edu-tags">
                                    <span>
                                        {formatScore(item)}
                                    </span>

                                    <span>
                                        {item.year}
                                    </span>
                                </div>

                                <a
                                    href={item.documentPdf}
                                    rel="noreferrer"
                                    className="education-btn"
                                >
                                    <FaDownload />
                                    {getButtonText(
                                        item.title
                                    )}
                                </a>
                            </motion.div>
                        )
                    )}

                    <motion.div
                        className="education-card"
                        initial={{
                            opacity: 0,
                            y: 50,
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                        }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.8,
                        }}
                    >
                        <FaSchool className="highlight-icon" />

                        <h3>
                            Academic Highlights
                        </h3>

                        <ul>
                            {highlights
                                .filter(
                                    (item) =>
                                        item.isActive
                                )
                                .map((item) => (
                                    <li key={item._id}>
                                        {
                                            item.highlightText
                                        }
                                    </li>
                                ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default Education;