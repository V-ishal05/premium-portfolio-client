import React, {
  useEffect,
  useState,
} from "react";

import "../styles/AdminDashboard.css";
import "../styles/AdminLeadership.css";

import AdminSidebar from "../components/AdminSidebar";
import LeadershipFormModal from "../components/LeadershipFormModal";

import { getAdminToken } from "../utils/adminAuth";

function AdminLeadership() {
  const [leadership, setLeadership] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [showFormModal, setShowFormModal] =
    useState(false);

  const [toastMessage, setToastMessage] =
    useState("");

  const showToast = (message) => {
    setToastMessage(message);

    setTimeout(() => {
      setToastMessage("");
    }, 2500);
  };

  const fetchLeadership =
    async () => {
      try {
        const response =
          await fetch(
            "http://localhost:5000/api/leadership"
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

  useEffect(() => {
    fetchLeadership();
  }, []);

  const deleteLeadership =
    async () => {
      const confirmDelete =
        window.confirm(
          "Delete leadership content?"
        );

      if (!confirmDelete) return;

      try {
        const response =
          await fetch(
            "http://localhost:5000/api/leadership/admin",
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${getAdminToken()}`,
              },
            }
          );

        const data =
          await response.json();

        if (data.success) {
          setLeadership(null);
          showToast(
            "Leadership deleted"
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <div className="admin-dashboard">
      <AdminSidebar />

      <main className="admin-main">
        <div className="leadership-header">
          <div>
            <h1>
              Leadership CMS
            </h1>

            <p>
              Manage community
              leadership content,
              credentials, and
              animated gallery.
            </p>
          </div>

          {leadership && (
            <div className="leadership-stats-grid">
              <div className="lead-stat-card">
                <span>
                  {
                    leadership
                      ?.galleryImages
                      ?.length || 0
                  }
                </span>
                <p>
                  Gallery Images
                </p>
              </div>

              <div className="lead-stat-card">
                <span>
                  {
                    leadership
                      ?.credentials
                      ?.length || 0
                  }
                </span>
                <p>
                  Credentials
                </p>
              </div>

              <div className="lead-stat-card">
                <span>
                  {
                    leadership
                      ?.tags
                      ?.length || 0
                  }
                </span>
                <p>Tags</p>
              </div>
            </div>
          )}
        </div>

        {loading ? (
          <div className="messages-empty-card">
            Loading...
          </div>
        ) : leadership ? (
          <div className="leadership-preview-card">
            <div className="leadership-preview-top">
              <img
                src={leadership.organizationLogo}
                alt=""
                className="leadership-org-logo"
              />

              <div>
                <h2>
                  {
                    leadership.title
                  }
                </h2>

                <p>
                  {
                    leadership.organizationName
                  }
                </p>
              </div>
            </div>

            <div className="leadership-preview-meta">
              <div>
                <span>
                  Duration
                </span>
                <strong>
                  {
                    leadership.duration
                  }
                </strong>
              </div>

              <div>
                <span>
                  Programs
                </span>
                <strong>
                  {
                    leadership.programsOrganized
                  }
                </strong>
              </div>

              <div>
                <span>
                  Role
                </span>
                <strong>
                  {
                    leadership.role
                  }
                </strong>
              </div>
            </div>

            <p className="leadership-preview-description">
              {
                leadership.description
              }
            </p>

            <div className="leadership-tags-preview">
              {leadership.tags?.map(
                (tag, index) => (
                  <span
                    key={
                      index
                    }
                  >
                    {tag}
                  </span>
                )
              )}
            </div>

            <div className="preview-actions">
              <button
                onClick={() =>
                  setShowFormModal(
                    true
                  )
                }
              >
                Edit Leadership
              </button>

              <button
                className="danger-btn"
                onClick={
                  deleteLeadership
                }
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <div className="leadership-empty-card">
            <h2>
              No leadership
              content found
            </h2>

            <p>
              Add your leadership
              showcase content to
              activate this section.
            </p>

            <button
              className="primary-exp-btn"
              onClick={() =>
                setShowFormModal(
                  true
                )
              }
            >
              + Add Leadership
            </button>
          </div>
        )}

        {showFormModal && (
          <LeadershipFormModal
            leadership={
              leadership
            }
            onClose={() =>
              setShowFormModal(
                false
              )
            }
            refreshData={
              fetchLeadership
            }
            showToast={
              showToast
            }
          />
        )}

        {toastMessage && (
          <div className="admin-toast">
            {
              toastMessage
            }
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminLeadership;