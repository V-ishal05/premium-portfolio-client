import './LeadershipImpact.css';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
    FaUsers,
    FaCertificate,
    FaTimes,
    FaExternalLinkAlt,
} from 'react-icons/fa';
import API_BASE_URL from "../../config/api";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';

function LeadershipImpact() {
    const [showModal, setShowModal] =
        useState(false);

    const [leadership, setLeadership] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        const fetchLeadership =
            async () => {
                try {
                    const response =
                        await fetch(
                            `${API_BASE_URL}/api/leadership`
                        );

                    const data =
                        await response.json();

                    if (data.success) {
                        setLeadership(
                            data.leadership
                        );
                    }
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            };

        fetchLeadership();
    }, []);

    if (loading || !leadership) {
        return null;
    }

    return (
        <>
            <section
                className="leadership-section"
                id="leadership"
            >
                <div className="leadership-container">
                    <motion.div
                        className="leadership-header"
                        initial={{
                            opacity: 0,
                            y: 40,
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                        }}
                        viewport={{
                            once: true,
                        }}
                        transition={{
                            duration: 0.7,
                        }}
                    >
                        <p className="section-tag">
                            COMMUNITY
                            LEADERSHIP
                        </p>

                        <h2>
                            Community
                            Leadership &
                            Impact
                        </h2>

                        <p>
                            Leadership
                            through
                            service,
                            execution,
                            and
                            meaningful
                            community
                            engagement.
                        </p>
                    </motion.div>

                    <div className="leadership-content">
                        <div className="leadership-carousel-wrapper">
                            <Swiper
                                effect={'coverflow'}
                                grabCursor={true}
                                centeredSlides={true}
                                slidesPerView={'1.6'}
                                loop={true}
                                autoplay={{
                                    delay: 2500,
                                    disableOnInteraction: false,
                                    pauseOnMouseEnter: true,
                                }}
                                coverflowEffect={{
                                    rotate: 0,
                                    stretch: -40,
                                    depth: 90,
                                    modifier: 1,
                                    slideShadows: false,
                                    scale: 0.88,
                                }}
                                modules={[
                                    EffectCoverflow,
                                    Autoplay,
                                ]}
                                className="leadership-swiper"
                            >
                                {leadership.galleryImages?.map(
                                    (
                                        item,
                                        index
                                    ) => (
                                        <SwiperSlide
                                            key={
                                                index
                                            }
                                        >
                                            <div className="carousel-card">
                                                <img
                                                    src={item.image}
                                                    alt={
                                                        item.imageCaptionTitle
                                                    }
                                                />

                                                <div className="carousel-overlay">
                                                    <h4>
                                                        {
                                                            item.imageCaptionTitle
                                                        }
                                                    </h4>

                                                    <p>
                                                        {
                                                            item.imageCaptionSubtitle
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    )
                                )}
                            </Swiper>
                        </div>

                        <motion.div
                            className="leadership-story"
                            initial={{
                                opacity: 0,
                                x: 60,
                            }}
                            whileInView={{
                                opacity: 1,
                                x: 0,
                            }}
                            viewport={{
                                once: true,
                            }}
                            transition={{
                                duration: 0.8,
                            }}
                        >
                            <h3>
                                {
                                    leadership.title
                                }
                            </h3>

                            <p>
                                {
                                    leadership.description
                                }
                            </p>

                            <div className="impact-metrics">
                                <div className="metric-card organization-card">
                                    <img
                                        src={leadership.organizationLogo}
                                        alt={
                                            leadership.organizationName
                                        }
                                        className="organization-logo"
                                    />

                                    <p>
                                        {
                                            leadership.organizationName
                                        }
                                    </p>
                                </div>

                                <div className="metric-card">
                                    <FaUsers />

                                    <h4>
                                        {
                                            leadership.duration
                                        }
                                    </h4>

                                    <p>
                                        Years
                                        Leadership
                                    </p>
                                </div>

                                <div className="metric-card">
                                    <FaUsers />

                                    <h4>
                                        {
                                            leadership.programsOrganized
                                        }
                                    </h4>

                                    <p>
                                        Programs
                                        Organized
                                    </p>
                                </div>

                                <div className="metric-card">
                                    <FaUsers />

                                    <h4>
                                        {
                                            leadership.role
                                        }
                                    </h4>
                                </div>
                            </div>

                            <div className="leadership-tags">
                                {leadership.tags?.map(
                                    (
                                        tag,
                                        index
                                    ) => (
                                        <span
                                            key={
                                                index
                                            }
                                        >
                                            {
                                                tag
                                            }
                                        </span>
                                    )
                                )}
                            </div>

                            <button
                                className="leadership-btn"
                                onClick={() =>
                                    setShowModal(
                                        true
                                    )
                                }
                            >
                                <FaCertificate />
                                View
                                Leadership
                                Credentials
                            </button>
                        </motion.div>
                    </div>
                </div>
            </section>

            {showModal && (
                <div
                    className="leadership-modal-overlay"
                    onClick={() =>
                        setShowModal(
                            false
                        )
                    }
                >
                    <div
                        className="leadership-modal"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >
                        <button
                            className="close-btn"
                            onClick={() =>
                                setShowModal(
                                    false
                                )
                            }
                        >
                            <FaTimes />
                        </button>

                        <h3>
                            Leadership
                            Credentials
                        </h3>

                        <div className="certificate-grid">
                            {leadership.credentials?.map(
                                (
                                    cert,
                                    index
                                ) => (
                                    <div
                                        key={
                                            index
                                        }
                                        className="certificate-card"
                                    >
                                        <h4>
                                            {
                                                cert.title
                                            }
                                        </h4>

                                        <a
                                            href={cert.pdfFile}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <FaExternalLinkAlt />
                                            Open
                                            PDF
                                        </a>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default LeadershipImpact;