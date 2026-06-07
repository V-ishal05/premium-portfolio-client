import './Hero.css';
import { motion } from 'framer-motion';
import Typed from 'typed.js';
import {
  useEffect,
  useRef,
  useState
} from 'react';

import Particles from 'react-tsparticles';
import { useNavigate } from 'react-router-dom';

import { fetchResumeLink } from '../../utils/resumeApi';
import { fetchHeroContent } from '../../utils/heroApi';

import {
  FaPython,
  FaReact,
  FaNodeJs,
  FaJava,
  FaDownload
} from 'react-icons/fa';

import {
  SiCplusplus,
  SiMongodb,
  SiMysql
} from 'react-icons/si';

import { MdSecurity } from 'react-icons/md';

function Hero() {
  const typedRef = useRef(null);
  const navigate = useNavigate();

  const [resumeUrl, setResumeUrl] =
    useState('');

  const [hero, setHero] =
    useState(null);

  useEffect(() => {
    const loadHero =
      async () => {
        const data =
          await fetchHeroContent();

        if (data) {
          setHero(data);
        }
      };

    loadHero();
  }, []);

  useEffect(() => {
    if (!hero) return;

    const typed = new Typed(
      typedRef.current,
      {
        strings:
          hero.typedRoles?.length
            ? hero.typedRoles
            : [
                'Full Stack Developer',
                'Cybersecurity Enthusiast',
                'AI Builder',
                'Problem Solver'
              ],

        typeSpeed: 60,
        backSpeed: 35,
        backDelay: 1500,
        loop: true
      }
    );

    return () =>
      typed.destroy();
  }, [hero]);

  useEffect(() => {
    const loadResume =
      async () => {
        const url =
          await fetchResumeLink();

        setResumeUrl(url);
      };

    loadResume();
  }, []);

  const techIcons = [
    <FaPython style={{ color: '#3776AB' }} />,
    <SiCplusplus style={{ color: '#00599C' }} />,
    <FaJava style={{ color: '#f89820' }} />,
    <FaReact style={{ color: '#61DAFB' }} />,
    <FaNodeJs style={{ color: '#68A063' }} />,
    <SiMongodb style={{ color: '#47A248' }} />,
    <SiMysql style={{ color: '#00758F' }} />,
    <MdSecurity style={{ color: '#8b5cf6' }} />
  ];

  return (
    <section
      id="home"
      className="hero"
    >
      <div className="gradient-overlay"></div>

      <Particles
        className="particles-bg"
        options={{
          fullScreen: false,
          fpsLimit: 120,

          particles: {
            color: {
              value: [
                '#38bdf8',
                '#8b5cf6'
              ]
            },

            links: {
              color: '#38bdf8',
              distance: 140,
              enable: true,
              opacity: 0.2,
              width: 1
            },

            move: {
              enable: true,
              speed: 0.8
            },

            number: {
              value: 60
            },

            opacity: {
              value: 0.4
            },

            size: {
              value: {
                min: 1,
                max: 3
              }
            }
          }
        }}
      />

      <div className="hero-container">

        <motion.div
          className="hero-left"
          initial={{
            opacity: 0,
            x: -70
          }}
          animate={{
            opacity: 1,
            x: 0
          }}
          transition={{
            duration: 1
          }}
          whileHover={{
            rotateY: 10,
            rotateX: -6,
            scale: 1.02
          }}
        >
          <div className="glow-ring glow-ring-1"></div>
          <div className="glow-ring glow-ring-2"></div>

          <div className="floating-orb orb-1"></div>
          <div className="floating-orb orb-2"></div>

          <div className="floating-dot dot-1"></div>
          <div className="floating-dot dot-2"></div>
          <div className="floating-dot dot-3"></div>

          <motion.div
            className="hero-image-frame"
            animate={{
              y: [0, -14, 0]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            <div className="shine"></div>

            <img
              src={
                hero?.profileImage?.url ||
                '/vishal.png'
              }
              alt="Vishal Kumar"
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-right"
          initial={{
            opacity: 0,
            x: 70
          }}
          animate={{
            opacity: 1,
            x: 0
          }}
          transition={{
            duration: 1
          }}
        >
          <h1>
            {hero?.heroTitle ||
              'Building'}{' '}

            <span className="gradient-text">
              {hero?.heroHighlight ||
                'Intelligent'}
            </span>

            <br />

            Digital Experiences
          </h1>

          <p className="hero-intro">
            {hero?.introText ||
              "Hi, I'm Vishal Kumar"}
          </p>

          <h2>
            <span
              ref={typedRef}
            ></span>
          </h2>

          <p className="hero-description">
            {hero?.description ||
              'Building scalable modern web applications, AI-powered systems, secure backend solutions, and premium recruiter-focused digital experiences.'}
          </p>

          <div className="hero-buttons">

            <a
              href="#projects"
              className="hero-primary-btn"
            >
              View My Work
            </a>

            <button
              className="hero-secondary-btn"
              onClick={() =>
                navigate(
                  '/recruiter'
                )
              }
            >
              {hero?.recruiterButtonText ||
                'Recruiter Access'}
            </button>

            {resumeUrl && (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-secondary-btn"
              >
                <FaDownload />
                {' '}
                Resume
              </a>
            )}
          </div>

          <div className="tech-glass-panel">
            {techIcons.map(
              (
                icon,
                index
              ) => (
                <motion.div
                  key={index}
                  className="tech-icon"
                  whileHover={{
                    scale: 1.2,
                    y: -8
                  }}
                >
                  {icon}
                </motion.div>
              )
            )}
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default Hero;