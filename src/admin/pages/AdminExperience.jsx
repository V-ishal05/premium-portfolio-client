import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import "../styles/AdminDashboard.css";
import "../styles/AdminExperience.css";

import AdminSidebar from "../components/AdminSidebar";
import ExperienceFormModal from "../components/ExperienceFormModal";

import { getAdminToken } from "../utils/adminAuth";

function AdminExperience() {
  const [experiences, setExperiences] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [activeFilter, setActiveFilter] =
    useState("All");

  const [selectedExperience, setSelectedExperience] =
    useState(null);

  const [editingExperience, setEditingExperience] =
    useState(null);

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

  const fetchExperiences =
    async () => {
      try {
        const response =
          await fetch(
            "${API_BASE_URL}/api/admin/experience",
            {
              headers: {
                Authorization: `Bearer ${getAdminToken()}`,
              },
            }
          );

        const data =
          await response.json();

        if (data.success) {
          setExperiences(
            data.experiences
          );
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const deleteExperience =
    async (id) => {
      try {
        const response =
          await fetch(
            `${API_BASE_URL}/api/admin/experience/${id}`,
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
          fetchExperiences();
          showToast(
            "Experience deleted"
          );
          setSelectedExperience(
            null
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

  const filteredExperiences =
    useMemo(() => {
      let filtered = [
        ...experiences,
      ];

      if (
        activeFilter ===
        "Featured"
      ) {
        filtered =
          filtered.filter(
            (item) =>
              item.experienceDisplayType ===
              "featured"
          );
      }

      else if (
        activeFilter ===
        "Inactive"
      ) {
        filtered =
          filtered.filter(
            (item) =>
              !item.isActive
          );
      }

      else if (
        activeFilter ===
        "Standard"
      ) {
        filtered =
          filtered.filter(
            (item) =>
              item.experienceDisplayType !==
              "featured"
          );
      }

      if (
        searchTerm.trim()
      ) {
        const search =
          searchTerm.toLowerCase();

        filtered =
          filtered.filter(
            (item) =>
              item.title
                .toLowerCase()
                .includes(
                  search
                ) ||
              item.companyName
                .toLowerCase()
                .includes(
                  search
                )
          );
      }

      return filtered;
    }, [
      experiences,
      searchTerm,
      activeFilter,
    ]);

  const featuredCount =
    experiences.filter(
      (item) =>
        item.experienceDisplayType ===
        "featured"
    ).length;

  return (
    <div className="admin-dashboard">
      <AdminSidebar />

      <main className="admin-main">
        <div className="experience-header">
          <div>
            <h1>
              Experience CMS
            </h1>

            <p>
              Manage
              internships,
              training,
              and practical
              experience.
            </p>
          </div>

          <div className="experience-stats-grid">
            <div className="exp-stat-card">
              <span>
                {
                  experiences.length
                }
              </span>
              <p>
                Total
                Records
              </p>
            </div>

            <div className="exp-stat-card">
              <span>
                {
                  featuredCount
                }
              </span>
              <p>
                Featured
              </p>
            </div>
          </div>
        </div>

        <div className="experience-toolbar">
          <input
            type="text"
            placeholder="Search experiences..."
            value={
              searchTerm
            }
            onChange={(
              e
            ) =>
              setSearchTerm(
                e.target
                  .value
              )
            }
            className="exp-search"
          />

          <div className="filter-chips">
            {[
              "All",
              "Featured",
              "Standard",
              "Inactive",
            ].map(
              (
                filter
              ) => (
                <button
                  key={
                    filter
                  }
                  className={
                    activeFilter ===
                    filter
                      ? "chip active-chip"
                      : "chip"
                  }
                  onClick={() =>
                    setActiveFilter(
                      filter
                    )
                  }
                >
                  {
                    filter
                  }
                </button>
              )
            )}
          </div>

          <div className="experience-toolbar-actions">
            <button
              className="primary-exp-btn"
              onClick={() => {
                setEditingExperience(
                  null
                );
                setShowFormModal(
                  true
                );
              }}
            >
              + Add
              Experience
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
              <table className="exp-table">
                <thead>
                  <tr>
                    <th>
                      Logo
                    </th>
                    <th>
                      Title
                    </th>
                    <th>
                      Company
                    </th>
                    <th>
                      Role
                    </th>
                    <th>
                      Duration
                    </th>
                    <th>
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredExperiences.map(
                    (
                      item
                    ) => (
                      <tr
                        key={
                          item._id
                        }
                        onClick={() =>
                          setSelectedExperience(
                            item
                          )
                        }
                      >
                        <td>
                          <img
                            src={item.logoImage}
                            alt=""
                            className="exp-logo-thumb"
                          />
                        </td>

                        <td>
                          {
                            item.title
                          }
                        </td>

                        <td>
                          {
                            item.companyName
                          }
                        </td>

                        <td>
                          {
                            item.role
                          }
                        </td>

                        <td>
                          {
                            item.duration
                          }
                        </td>

                        <td>
                          <div className="exp-status-wrap">
                            {item.experienceDisplayType ===
                              "featured" && (
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

        {selectedExperience && (
          <div
            className="modal-overlay"
            onClick={() =>
              setSelectedExperience(
                null
              )
            }
          >
            <div
              className="exp-preview-modal"
              onClick={(
                e
              ) =>
                e.stopPropagation()
              }
            >
              <button
                className="modal-close-btn"
                onClick={() =>
                  setSelectedExperience(
                    null
                  )
                }
              >
                ✕
              </button>

              <img
                src={selectedExperience.logoImage}
                alt=""
                className="preview-logo"
              />

              <h2>
                {
                  selectedExperience.title
                }
              </h2>

              <p>
                {
                  selectedExperience.companyName
                }
              </p>

              <div className="preview-actions">
                <button
                  onClick={() =>
                    window.open(
                     selectedExperience.certificatePdf
                    )
                  }
                >
                  View
                  Certificate
                </button>

                <button
                  onClick={() => {
                    setEditingExperience(
                      selectedExperience
                    );

                    setShowFormModal(
                      true
                    );
                  }}
                >
                  Edit
                </button>

                <button
                  className="danger-btn"
                  onClick={() =>
                    deleteExperience(
                      selectedExperience._id
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
          <ExperienceFormModal
            editingExperience={
              editingExperience
            }
            onClose={() => {
              setShowFormModal(
                false
              );
              setEditingExperience(
                null
              );
            }}
            refreshData={
              fetchExperiences
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

export default AdminExperience;