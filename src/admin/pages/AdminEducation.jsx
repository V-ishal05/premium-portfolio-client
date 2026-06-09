import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import "../styles/AdminDashboard.css";
import "../styles/AdminEducation.css";
import AdminSidebar from "../components/AdminSidebar";

import { getAdminToken } from "../utils/adminAuth";

import EducationFormModal from "../components/EducationFormModal";
import HighlightManagerModal from "../components/HighlightManagerModal";

function AdminEducation() {
  

  const [education, setEducation] =
    useState([]);

  const [highlights, setHighlights] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [activeFilter, setActiveFilter] =
    useState("All");

  const [selectedEducation, setSelectedEducation] =
    useState(null);

  const [editingEducation, setEditingEducation] =
    useState(null);

  const [showFormModal, setShowFormModal] =
    useState(false);

  const [showHighlightModal, setShowHighlightModal] =
    useState(false);

  const [toastMessage, setToastMessage] =
    useState("");

  const showToast = (message) => {
    setToastMessage(message);

    setTimeout(() => {
      setToastMessage("");
    }, 2500);
  };


  const fetchEducation = async () => {
    try {
      const response = await fetch(
        "${API_BASE_URL}/api/education/admin/all",
        {
          headers: {
            Authorization: `Bearer ${getAdminToken()}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
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
        "${API_BASE_URL}/api/education/highlights"
      );

      const data = await response.json();

      if (data.success) {
        setHighlights(data.highlights);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteEducation = async (id) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/education/admin/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${getAdminToken()}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        fetchEducation();
        showToast("Education deleted");
        setSelectedEducation(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEducation();
    fetchHighlights();
  }, []);

  const filteredEducation =
    useMemo(() => {
      let filtered = [...education];

      if (activeFilter === "Featured") {
        filtered = filtered.filter(
          (item) => item.isFeatured
        );
      }

      else if (activeFilter === "Inactive") {
        filtered = filtered.filter(
          (item) => !item.isActive
        );
      }

      else if (activeFilter === "Standard") {
        filtered = filtered.filter(
          (item) => !item.isFeatured
        );
      }

      if (searchTerm.trim()) {
        const search =
          searchTerm.toLowerCase();

        filtered = filtered.filter(
          (item) =>
            item.title
              .toLowerCase()
              .includes(search) ||
            item.institutionName
              .toLowerCase()
              .includes(search)
        );
      }

      return filtered;
    }, [
      education,
      searchTerm,
      activeFilter,
    ]);

  const featuredCount =
    education.filter(
      (item) => item.isFeatured
    ).length;

  return (
    <div className="admin-dashboard">
      <AdminSidebar />

      <main className="admin-main">
        <div className="education-header">
          <div>
            <h1>Education CMS</h1>
            <p>
              Manage academic journey
              content.
            </p>
          </div>

          <div className="education-stats-grid">
            <div className="edu-stat-card">
              <span>{education.length}</span>
              <p>Total Records</p>
            </div>

            <div className="edu-stat-card">
              <span>{featuredCount}</span>
              <p>Featured Education</p>
            </div>

            <div className="edu-stat-card">
              <span>{highlights.length}</span>
              <p>Academic Highlights</p>
            </div>
          </div>
        </div>

        <div className="education-toolbar">
          <input
            type="text"
            placeholder="Search education..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            className="edu-search"
          />

          <div className="filter-chips">
            {[
              "All",
              "Featured",
              "Standard",
              "Inactive",
            ].map((filter) => (
              <button
                key={filter}
                className={
                  activeFilter === filter
                    ? "chip active-chip"
                    : "chip"
                }
                onClick={() =>
                  setActiveFilter(filter)
                }
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="education-toolbar-actions">
            <button
              onClick={() =>
                setShowHighlightModal(true)
              }
            >
              Manage Highlights
            </button>

            <button
              className="primary-edu-btn"
              onClick={() => {
                setEditingEducation(null);
                setShowFormModal(true);
              }}
            >
              + Add Education
            </button>
          </div>
        </div>

        {loading ? (
          <div className="messages-empty-card">
            Loading...
          </div>
        ) : (
          <div className="messages-glass-card">
            <div className="messages-table-wrapper">
              <table className="edu-table">
                <thead>
                  <tr>
                    <th>Logo</th>
                    <th>Title</th>
                    <th>Institution</th>
                    <th>Year</th>
                    <th>Score</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredEducation.map(
                    (item) => (
                      <tr
                        key={item._id}
                        onClick={() =>
                          setSelectedEducation(
                            item
                          )
                        }
                      >
                        <td>
                          <img
                            src={item.logoImage}
                            alt=""
                            className="edu-logo-thumb"
                          />
                        </td>

                        <td>{item.title}</td>

                        <td>
                          {
                            item.institutionName
                          }
                        </td>

                        <td>{item.year}</td>

                        <td>
                          {
                            item.scoreValue
                          }{" "}
                          {item.scoreType ===
                          "Percentage"
                            ? "%"
                            : ""}
                        </td>

                        <td>
                          <div className="edu-status-wrap">
                            {item.isFeatured && (
                              <span className="featured-badge">
                                Featured
                              </span>
                            )}

                            {!item.isActive && (
                              <span className="inactive-badge">
                                Inactive
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedEducation && (
          <div
            className="modal-overlay"
            onClick={() =>
              setSelectedEducation(null)
            }
          >
            <div
              className="edu-preview-modal"
              onClick={(e) =>
                e.stopPropagation()
              }
            >
              <button
                className="modal-close-btn"
                onClick={() =>
                  setSelectedEducation(null)
                }
              >
                ✕
              </button>

              <img
               src={selectedEducation.logoImage}
                alt=""
                className="preview-logo"
              />

              <h2>
                {selectedEducation.title}
              </h2>

              <p>
                {
                  selectedEducation.institutionName
                }
              </p>

              <div className="preview-actions">
                <button
                  onClick={() =>
                    window.open(
                      selectedEducation.documentPdf
                    )
                  }
                >
                  View PDF
                </button>

                <button
                  onClick={() => {
                    setEditingEducation(
                      selectedEducation
                    );
                    setShowFormModal(true);
                  }}
                >
                  Edit
                </button>

                <button
                  className="danger-btn"
                  onClick={() =>
                    deleteEducation(
                      selectedEducation._id
                    )
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {showFormModal && (
          <EducationFormModal
            editingEducation={
              editingEducation
            }
            onClose={() => {
              setShowFormModal(false);
              setEditingEducation(null);
            }}
            refreshData={fetchEducation}
            showToast={showToast}
          />
        )}

        {showHighlightModal && (
          <HighlightManagerModal
            highlights={highlights}
            refreshHighlights={
              fetchHighlights
            }
            onClose={() =>
              setShowHighlightModal(false)
            }
            showToast={showToast}
          />
        )}

        {toastMessage && (
          <div className="admin-toast">
            {toastMessage}
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminEducation;