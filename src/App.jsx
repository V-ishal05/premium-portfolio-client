import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar.jsx';
import Hero from './components/Hero/Hero.jsx';
import About from './components/About/About.jsx';
import Skills from './components/Skills/Skills.jsx';
import Projects from './components/Projects/Projects.jsx';
import CertificationVault from './components/CertificationVault/CertificationVault.jsx';
import Contact from './components/Contact/Contact.jsx';
import Footer from './components/Footer/Footer.jsx';
import Education from './components/Education/Education.jsx';
import PracticalExperience from './components/PracticalExperience/PracticalExperience.jsx';
import LeadershipImpact from './components/LeadershipImpact/LeadershipImpact.jsx';
import AIRecruiterAssistant from "./features/aiRecruiter/AIRecruiterAssistant";
import AdminLogin from "./admin/pages/AdminLogin";
import AdminDashboard from "./admin/pages/AdminDashboard";
import ProtectedAdminRoute from "./admin/components/ProtectedAdminRoute";
import ProjectsManager from "./admin/pages/ProjectsManager.jsx";
import AdminMessages from "./admin/pages/AdminMessages";
import AdminCertifications from "./admin/pages/AdminCertifications";
import AdminEducation from "./admin/pages/AdminEducation";
import AdminExperience from "./admin/pages/AdminExperience";
import AdminLeadership from "./admin/pages/AdminLeadership";
import AdminResumeManager from "./admin/pages/AdminResumeManager";
import HeroCMS from "./admin/pages/HeroCMS";
import AboutCMS from "./admin/pages/AboutCMS";
import SkillsCMS from "./admin/pages/SkillsCMS";
import SocialLinksCMS from "./admin/pages/SocialLinksCMS";
import Recruiter from './pages/Recruiter/Recruiter.jsx';
import AdminSettings from "./admin/pages/AdminSettings";
import AdminAnalytics from "./admin/pages/AdminAnalytics";


function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <CertificationVault />
      <Education />
      <PracticalExperience />
      <LeadershipImpact />
      <Contact />
      <AIRecruiterAssistant />
      <Footer />
    </>
  );
}
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/recruiter" element={<Recruiter />} />
      <Route path="/admin/login" element={<AdminLogin />} />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedAdminRoute>
            <AdminDashboard />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/projects"
        element={
          <ProtectedAdminRoute>
            <ProjectsManager />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/messages"
        element={
          <ProtectedAdminRoute>
            <AdminMessages />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/certifications"
        element={
          <ProtectedAdminRoute>
            <AdminCertifications />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/education"
        element={
          <ProtectedAdminRoute>
            <AdminEducation />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/experience"
        element={
          <ProtectedAdminRoute>
            <AdminExperience />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/leadership"
        element={
          <ProtectedAdminRoute>
            <AdminLeadership />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/resume"
        element={
          <ProtectedAdminRoute>
            <AdminResumeManager />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/hero"
        element={
          <ProtectedAdminRoute>
            <HeroCMS />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/about"
        element={
          <ProtectedAdminRoute>
            <AboutCMS />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/skills"
        element={
          <ProtectedAdminRoute>
            <SkillsCMS />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/social-links"
        element={
          <ProtectedAdminRoute>
            <SocialLinksCMS />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/settings"
        element={
          <ProtectedAdminRoute>
            <AdminSettings />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/analytics"
        element={
          <ProtectedAdminRoute>
            <AdminAnalytics />
          </ProtectedAdminRoute>
        }
      />
    </Routes>

  );
}

export default App;