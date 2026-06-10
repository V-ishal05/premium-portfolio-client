import './Projects.css';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
    FaExternalLinkAlt,
    FaRocket,
    FaGithub,
} from 'react-icons/fa';
import API_BASE_URL from "../../config/api";
function Projects() {
    const [activeFilter, setActiveFilter] = useState('All');
    const [selectedProject, setSelectedProject] = useState(null);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch('`${API_BASE_URL}/api/projects')
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setProjects(data.projects);
                }
            })
            .catch((err) => console.error(err));
    }, []);

    const categories = [
        'All',
        ...new Set(
            projects
                .filter((p) => !p.featured)
                .map((p) => p.category)
        ),
    ];

    const filteredProjects =
        activeFilter === 'All'
            ? projects.filter((p) => !p.featured)
            : projects.filter(
                (p) =>
                    p.category === activeFilter &&
                    !p.featured
            );

    const featuredProject = projects.find(
        (p) => p.featured
    );

    return (
        <section id="projects" className="projects">
            <div className="projects-container">
                <motion.div
                    className="projects-header"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <p className="section-tag">
                        FEATURED PROJECTS
                    </p>

                    <h2>
                        Building Products with
                        <span className="gradient-text">
                            {' '}
                            Real Engineering Impact
                        </span>
                    </h2>

                    <p className="projects-subtitle">
                        Product engineering, AI systems,
                        secure backend architecture, and
                        scalable web application
                        development.
                    </p>
                </motion.div>

                {featuredProject && (
                    <motion.div
                        className="flagship-project"
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
                        <div className="flagship-badge">
                            FLAGSHIP PROJECT
                        </div>

                        <h3>{featuredProject.name}</h3>

                        <p>
                            {featuredProject.shortDescription}
                        </p>

                        <div className="tech-stack">
                            {featuredProject.techStack.map(
                                (tech, i) => (
                                    <span key={i}>{tech}</span>
                                )
                            )}
                        </div>

                        <div className="project-buttons">
                            <a
                                href={featuredProject.liveDemoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaExternalLinkAlt />
                                Live Demo
                            </a>

                            <button
                                onClick={() =>
                                    setSelectedProject(
                                        featuredProject
                                    )
                                }
                            >
                                <FaRocket />
                                Case Study
                            </button>
                        </div>
                    </motion.div>
                )}

                <div className="filter-buttons">
                    {categories.map((filter) => (
                        <button
                            key={filter}
                            className={
                                activeFilter === filter
                                    ? 'active-filter'
                                    : ''
                            }
                            onClick={() =>
                                setActiveFilter(filter)
                            }
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                <div className="projects-grid">
                    {filteredProjects.map(
                        (project, index) => (
                            <motion.div
                                key={project._id}
                                className="project-card"
                                initial={{
                                    opacity: 0,
                                    y: 35,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.08,
                                }}
                                viewport={{ once: true }}
                            >
                                <h3>{project.name}</h3>

                                <p>
                                    {
                                        project.shortDescription
                                    }
                                </p>

                                <div className="tech-stack">
                                    {project.techStack.map(
                                        (tech, i) => (
                                            <span key={i}>
                                                {tech}
                                            </span>
                                        )
                                    )}
                                </div>

                                <div className="project-buttons">
                                    <button
                                        onClick={() =>
                                            setSelectedProject(
                                                project
                                            )
                                        }
                                    >
                                        Architecture View
                                    </button>

                                    {project.githubLink ? (
                                        <a
                                            href={
                                                project.githubLink
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <FaGithub />
                                            GitHub
                                        </a>
                                    ) : (
                                        <button disabled>
                                            In Active Development
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        )
                    )}
                </div>
            </div>

            {selectedProject && (
                <div
                    className="project-modal-overlay"
                    onClick={() =>
                        setSelectedProject(null)
                    }
                >
                    <motion.div
                        className="project-modal"
                        initial={{
                            opacity: 0,
                            scale: 0.88,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                        }}
                        transition={{ duration: 0.3 }}
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >
                        <h2>
                            {selectedProject.modalTitle}
                        </h2>

                        <div className="modal-section">
                            <h4>Challenge</h4>
                            <p>
                                {selectedProject.challenge}
                            </p>
                        </div>

                        <div className="modal-section">
                            <h4>Architecture</h4>
                            <p>
                                {
                                    selectedProject.architecture
                                }
                            </p>
                        </div>

                        <div className="modal-section">
                            <h4>Impact Metrics</h4>

                            <div className="impact-grid">
                                {selectedProject.impactMetrics.map(
                                    (item, index) => (
                                        <span key={index}>
                                            {item}
                                        </span>
                                    )
                                )}
                            </div>
                        </div>

                        <div className="modal-actions">
                            {selectedProject.projectType ===
                                'flagship' &&
                                (selectedProject.githubLink ? (
                                    <a
                                        href={selectedProject.githubLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="close-modal-btn"
                                    >
                                        <FaGithub />
                                        GitHub Repository
                                    </a>
                                ) : (
                                    <button
                                        disabled
                                        className="close-modal-btn"
                                    >
                                        Source Code Available on Request
                                    </button>
                                ))}

                            <button
                                className="close-modal-btn"
                                onClick={() =>
                                    setSelectedProject(null)
                                }
                            >
                                Close
                            </button>
                        </div>

                        
                    </motion.div>
                </div>
            )}
        </section>
    );
}

export default Projects;