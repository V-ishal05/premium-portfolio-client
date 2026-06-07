import './Recruiter.css';
import { Link } from 'react-router-dom';
import {
    FaDownload,
    FaEnvelope,
    FaGithub,
    FaLinkedin,
    FaGraduationCap,
    FaBriefcase,
    FaShieldAlt,
    FaPhoneAlt
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import {
    useState,
    useEffect
} from 'react';
import { getSocialLinks }
    from '../../utils/socialLinksApi';

import { fetchResumeLink } from '../../utils/resumeApi';

function Recruiter() {
    const [showCallCard, setShowCallCard] =
        useState(false);

    const [resumeUrl, setResumeUrl] =
        useState('');
    const [socialLinks, setSocialLinks] =
        useState(null);
    useEffect(() => {
        const loadResume =
            async () => {
                const url =
                    await fetchResumeLink();
                setResumeUrl(url);
            };

        loadResume();
    }, []);
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
        <section className="recruiter-page">
            <div className="recruiter-container">

                <motion.div
                    className="candidate-hero"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <p className="section-tag">
                        RECRUITER MODE
                    </p>

                    <h1>
                        Vishal{' '}
                        <span className="gradient-text">
                            Kumar
                        </span>
                    </h1>

                    <p className="hero-role">
                        Full Stack Developer • Cybersecurity Enthusiast • AI Product Builder
                    </p>

                    <div className="candidate-meta">
                        <span>
                            <FaGraduationCap /> B.Tech CSE — C. V. Raman Global University
                        </span>

                        <span>
                            <FaBriefcase /> 2027 Graduate
                        </span>

                        <span>
                            <FaShieldAlt /> Open to Opportunities
                        </span>
                        {socialLinks?.location && (
                            <span>
                                📍 {socialLinks.location}
                            </span>
                        )}
                    </div>

                    <div className="hero-actions">

                        {resumeUrl && (
                            <a
                                href={resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaDownload /> Resume
                            </a>
                        )}

                        <a
                            href={`mailto:${socialLinks?.email || ''
                                }`}
                        >
                            <FaEnvelope /> Email
                        </a>

                        <button
                            className="call-btn"
                            onClick={() =>
                                setShowCallCard(true)
                            }
                        >
                            <FaPhoneAlt /> Call
                        </button>

                        <a
                            href={
                                socialLinks?.github ||
                                '#'
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaGithub /> GitHub
                        </a>

                        <a
                            href={
                                socialLinks?.linkedin ||
                                '#'
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaLinkedin /> LinkedIn
                        </a>
                    </div>
                </motion.div>

                <div className="metrics-grid">
                    <div className="metric-card">
                        <h3>3+</h3>
                        <p>Projects Built</p>
                    </div>

                    <div className="metric-card">
                        <h3>400</h3>
                        <p>DSA Problems Solved</p>
                    </div>

                    <div className="metric-card">
                        <h3>10</h3>
                        <p>Certifications</p>
                    </div>

                    <div className="metric-card">
                        <h3>2027</h3>
                        <p>Graduation Year</p>
                    </div>
                </div>

                <div className="dashboard-grid">

                    <div className="dashboard-card">
                        <h2>Recruiter Snapshot</h2>

                        <ul>
                            <li>Strong full stack development foundation</li>
                            <li>Hands-on product building experience</li>
                            <li>Cybersecurity-aware engineering mindset</li>
                            <li>Problem-solving through DSA practice</li>
                            <li>AI-driven product exploration</li>
                        </ul>
                    </div>

                    <div className="dashboard-card">
                        <h2>Best Fit Roles</h2>

                        <div className="skill-tags">
                            <span>Frontend Developer</span>
                            <span>Full Stack Developer</span>
                            <span>Software Engineer</span>
                            <span>Product Engineer</span>
                            <span>Cybersecurity Analyst</span>
                        </div>
                    </div>

                    <div className="dashboard-card">
                        <h2>Core Technologies</h2>

                        <div className="skill-tags">
                            <span>React</span>
                            <span>Node.js</span>
                            <span>JavaScript</span>
                            <span>Java</span>
                            <span>PHP</span>
                            <span>MySQL</span>
                            <span>Cybersecurity</span>
                            <span>AI Concepts</span>
                        </div>
                    </div>

                    <div className="dashboard-card">
                        <h2>Featured Projects</h2>

                        <ul>
                            <li>MediaMind AI Platform</li>
                            <li>Real-Time Weather Full-Stack Application</li>
                            <li>Premium Portfolio Platform</li>
                        </ul>
                    </div>

                    <div className="dashboard-card">
                        <h2>Academic Credentials</h2>

                        <ul>
                            <li>B.Tech — C. V. Raman Global University</li>
                            <li>CGPA: 9.25 • Graduating 2027</li>
                            <li>Senior Secondary • CBSE • Science • 85.8% • 2022</li>
                            <li>Secondary • ICSE • 87.8% • 2020</li>
                        </ul>
                    </div>

                    <div className="dashboard-card">
                        <h2>Professional Strengths</h2>

                        <ul>
                            <li>Backend API Architecture</li>
                            <li>Database Design & Integration</li>
                            <li>Recruiter Workflow Engineering</li>
                            <li>Secure Development Mindset</li>
                            <li>Product-Oriented Engineering</li>
                        </ul>
                    </div>

                </div>

                {showCallCard && (
                    <div
                        className="call-modal-overlay"
                        onClick={() =>
                            setShowCallCard(false)
                        }
                    >
                        <motion.div
                            className="call-modal"
                            initial={{
                                opacity: 0,
                                scale: 0.85
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1
                            }}
                            transition={{
                                duration: 0.3
                            }}
                            onClick={(e) =>
                                e.stopPropagation()
                            }
                        >
                            <h2>
                                Connect with Vishal Kumar
                            </h2>

                            <p className="phone-number">
                                {socialLinks?.phone
                                    ? `+91 ${socialLinks.phone}`
                                    : 'Loading...'}
                            </p>

                            <p className="call-description">
                                Click below to open your calling app
                                and connect directly with Vishal.
                            </p>

                            <div className="call-modal-actions">
                                <a
                                    href={`tel:${socialLinks?.phone || ''
                                        }`}
                                >
                                    <FaPhoneAlt /> Call Now
                                </a>

                                <button
                                    onClick={() =>
                                        setShowCallCard(false)
                                    }
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}

                <Link
                    to="/"
                    className="back-btn"
                >
                    ← Back to Portfolio
                </Link>

            </div>
        </section>
    );
}

export default Recruiter;