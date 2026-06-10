import React, { useEffect, useMemo, useState } from "react";
import "../styles/AdminCertifications.css";
import "../styles/AdminDashboard.css";
import AdminSidebar from "../components/AdminSidebar";
import API_BASE_URL from "../../config/api";
import { getAdminToken } from "../utils/adminAuth";

import CertificationFormModal from "../components/CertificationFormModal";
import CertificationStatsEditor from "../components/CertificationStatsEditor";

function AdminCertifications() {


  const [certifications, setCertifications] = useState([]);
  const [stats, setStats] = useState(null);

  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] =
    useState("All");

  const [selectedCertification, setSelectedCertification] =
    useState(null);

  const [showFormModal, setShowFormModal] =
    useState(false);

  const [editingCertification, setEditingCertification] =
    useState(null);

  const [showStatsEditor, setShowStatsEditor] =
    useState(false);

  const [toastMessage, setToastMessage] =
    useState("");

  const showToast = (message) => {
    setToastMessage(message);

    setTimeout(() => {
      setToastMessage("");
    }, 2500);
  };


  const fetchCertifications = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/certifications/admin/all`,
        {
          headers: {
            Authorization: `Bearer ${getAdminToken()}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setCertifications(data.certifications);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/certifications/stats`
      );

      const data = await response.json();

      if (data.success) {
        setStats(data.settings);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCertification = async (id) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/certifications/admin/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${getAdminToken()}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        fetchCertifications();
        showToast("Certification deleted");
        setSelectedCertification(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCertifications();
    fetchStats();
  }, []);

  const dynamicCategories = useMemo(() => {
    const categories = certifications.map(
      (c) => c.category
    );

    return [...new Set(categories)];
  }, [certifications]);

  const filteredCertifications = useMemo(() => {
    let filtered = [...certifications];

    if (activeFilter === "Featured") {
      filtered = filtered.filter(
        (c) => c.isFeatured
      );
    }

    else if (activeFilter === "Verified") {
      filtered = filtered.filter(
        (c) => c.isVerified
      );
    }

    else if (activeFilter === "Inactive") {
      filtered = filtered.filter(
        (c) => !c.isActive
      );
    }

    else if (activeFilter !== "All") {
      filtered = filtered.filter(
        (c) => c.category === activeFilter
      );
    }

    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();

      filtered = filtered.filter(
        (c) =>
          c.certificateTitle
            .toLowerCase()
            .includes(search) ||
          c.issuedBy
            .toLowerCase()
            .includes(search) ||
          c.platform
            .toLowerCase()
            .includes(search)
      );
    }

    return filtered;
  }, [
    certifications,
    searchTerm,
    activeFilter,
  ]);

  const totalCount = certifications.length;

  const featuredCount =
    certifications.filter(
      (c) => c.isFeatured
    ).length;

  const verifiedCount =
    certifications.filter(
      (c) => c.isVerified
    ).length;

  return (
    <div className="admin-dashboard">
      <AdminSidebar />

      <main className="admin-main">
        <div className="certifications-header">
          <div>
            <h1>Certification CMS</h1>
            <p>
              Manage premium credential portfolio
              content.
            </p>
          </div>

          <div className="certification-stats-grid">
            <div className="cert-stat-card">
              <span>{totalCount}</span>
              <p>Total Certifications</p>
            </div>

            <div className="cert-stat-card featured-stat">
              <span>{featuredCount}</span>
              <p>Featured Credential</p>
            </div>

            <div className="cert-stat-card verified-stat">
              <span>{verifiedCount}</span>
              <p>Verified Credentials</p>
            </div>

            <div className="cert-stat-card">
              <span>
                {dynamicCategories.length}
              </span>
              <p>Active Categories</p>
            </div>
          </div>
        </div>

        <div className="cert-toolbar">
          <input
            type="text"
            placeholder="Search certifications, issuer, platform..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            className="cert-search"
          />

          <div className="filter-chips">
            {[
              "All",
              "Featured",
              "Verified",
              ...dynamicCategories,
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

          <div className="cert-toolbar-actions">
            <button
              onClick={() =>
                setShowStatsEditor(true)
              }
            >
              Edit Stats
            </button>

            <button
              className="primary-cert-btn"
              onClick={() => {
                setEditingCertification(null);
                setShowFormModal(true);
              }}
            >
              + Add Certification
            </button>
          </div>
        </div>

        {loading ? (
          <div className="messages-empty-card">
            Loading certifications...
          </div>
        ) : filteredCertifications.length === 0 ? (
          <div className="messages-empty-card">
            No certifications found.
          </div>
        ) : (
          <div className="messages-glass-card">
            <div className="messages-table-wrapper">
              <table className="cert-table">
                <thead>
                  <tr>
                    <th>Logo</th>
                    <th>Certificate</th>
                    <th>Issued By</th>
                    <th>Platform</th>
                    <th>Year</th>
                    <th>Category</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredCertifications.map(
                    (cert) => (
                      <tr
                        key={cert._id}
                        onClick={() =>
                          setSelectedCertification(
                            cert
                          )
                        }
                      >
                        <td>
                          <img
                            src={cert.logoImage}
                            alt=""
                            className="cert-logo-thumb"
                          />
                        </td>

                        <td>
                          {cert.certificateTitle}
                        </td>

                        <td>{cert.issuedBy}</td>

                        <td>{cert.platform}</td>

                        <td>{cert.year}</td>

                        <td>{cert.category}</td>

                        <td>
                          <div className="cert-status-wrap">
                            {cert.isFeatured && (
                              <span className="featured-badge">
                                Featured
                              </span>
                            )}

                            {cert.isVerified && (
                              <span className="verified-badge">
                                Verified
                              </span>
                            )}

                            {!cert.isActive && (
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

        {selectedCertification && (
          <div
            className="modal-overlay"
            onClick={() =>
              setSelectedCertification(null)
            }
          >
            <div
              className="cert-preview-modal"
              onClick={(e) =>
                e.stopPropagation()
              }
            >
              <button
                className="modal-close-btn"
                onClick={() =>
                  setSelectedCertification(null)
                }
              >
                ✕
              </button>

              <img
                src={selectedCertification.logoImage}
                alt=""
                className="preview-logo"
              />

              <h2>
                {
                  selectedCertification.certificateTitle
                }
              </h2>

              <p>
                {
                  selectedCertification.shortDescription
                }
              </p>

              <div className="preview-actions">
                <button
                  onClick={() =>
                    window.open(
                      selectedCertification.credentialPdf
                    )
                  }
                >
                  View PDF
                </button>

                <button
                  onClick={() => {
                    setEditingCertification(
                      selectedCertification
                    );
                    setShowFormModal(true);
                  }}
                >
                  Edit
                </button>

                <button
                  className="danger-btn"
                  onClick={() =>
                    deleteCertification(
                      selectedCertification._id
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
          <CertificationFormModal
            editingCertification={
              editingCertification
            }
            onClose={() => {
              setShowFormModal(false);
              setEditingCertification(null);
            }}
            refreshData={fetchCertifications}
            showToast={showToast}
          />
        )}

        {showStatsEditor && (
          <CertificationStatsEditor
            stats={stats}
            onClose={() =>
              setShowStatsEditor(false)
            }
            refreshStats={fetchStats}
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

export default AdminCertifications;