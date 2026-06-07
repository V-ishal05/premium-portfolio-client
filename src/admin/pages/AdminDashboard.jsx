import React, {
  useState
} from "react";
import "../styles/AdminDashboard.css";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import {
  removeAdminToken,
} from "../utils/adminAuth";

function AdminDashboard() {
  const navigate = useNavigate();
  const [showProfileMenu,
  setShowProfileMenu] =
  useState(false);
  const handleLogout = () => {
  removeAdminToken();

  navigate(
    "/admin/login"
  );
};

  return (
    <div className="admin-dashboard">
      <AdminSidebar />

      <main className="admin-main">
        <div className="dashboard-header">
          <div>
            <h1>Welcome Admin</h1>

            <p>
              Premium portfolio management
              control center.
            </p>
          </div>

          <div className="admin-profile-wrapper">
  <div
    className="admin-profile-circle"
    onClick={() =>
      setShowProfileMenu(
        !showProfileMenu
      )
    }
  >
    VK
  </div>

  {showProfileMenu && (
    <div className="admin-profile-dropdown">
      <div className="admin-profile-info">
        <h4>Vishal Kumar</h4>
        <p>Administrator</p>
      </div>

      <button
        onClick={() =>
          navigate("/admin/settings")
        }
      >
        Settings
      </button>

      <button
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  )}
</div>
        </div>

        <div className="admin-stats">
          <div
            className="stat-card"
            onClick={() =>
              navigate("/admin/projects")
            }
          >
            <h3>Projects</h3>
            <p>
              Manage flagship and architecture
              portfolio projects.
            </p>
          </div>

          <div
            className="stat-card"
            onClick={() =>
              navigate("/admin/certifications")
            }
          >
            <h3>Certifications</h3>
            <p>
              Control premium certification
              vault content.
            </p>
          </div>

          <div
            className="stat-card"
            onClick={() =>
              navigate("/admin/education")
            }
          >
            <h3>Education</h3>
            <p>
              Manage academic records and
              highlights.
            </p>
          </div>

          <div
            className="stat-card"
            onClick={() =>
              navigate("/admin/experience")
            }
          >
            <h3>Experience</h3>
            <p>
              Manage internships, practical
              training, and experience
              records.
            </p>
          </div>

          <div
            className="stat-card"
            onClick={() =>
              navigate("/admin/leadership")
            }
          >
            <h3>Leadership</h3>
            <p>
              Manage community leadership,
              credentials, and animated
              leadership showcase content.
            </p>
          </div>

          <div
            className="stat-card"
            onClick={() =>
              navigate("/admin/messages")
            }
          >
            <h3>Messages</h3>
            <p>
              Recruiter inquiry CRM and
              response center.
            </p>
          </div>

          <div
            className="stat-card"
            onClick={() =>
              navigate("/admin/hero")
            }
          >
            <h3>Hero CMS</h3>
            <p>
              Manage hero branding,
              typed roles, profile image
              and recruiter CTA content.
            </p>
          </div>
          <div
            className="stat-card"
            onClick={() =>
              navigate("/admin/about")
            }
          >
            <h3>About CMS</h3>

            <p>
              Manage About section,
              DSA count and journey
              timeline content.
            </p>
          </div>
          <div
            className="stat-card"
            onClick={() =>
              navigate("/admin/skills")
            }
          >
            <h3>Skills CMS</h3>

            <p>
              Manage technologies,
              expertise levels and
              technical categories.
            </p>
          </div>
          <div
            className="stat-card"
            onClick={() =>
              navigate("/admin/social-links")
            }
          >
            <h3>Social Links CMS</h3>

            <p>
              Manage GitHub, LinkedIn,
              contact information and
              portfolio branding.
            </p>
          </div>
          <div
            className="stat-card"
            onClick={() =>
              navigate("/admin/analytics")
            }
          >
            <h3>Analytics</h3>

            <p>
              Portfolio insights,
              recruiter activity,
              resume downloads and
              performance reports.
            </p>
          </div>
          <div
            className="stat-card"
            onClick={() =>
              navigate("/admin/settings")
            }
          >
            <h3>Settings</h3>
            <p>
              Global admin configuration
              controls.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;