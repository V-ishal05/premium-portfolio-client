import React, { useState } from "react";
import "../styles/CertificationStatsEditor.css";
import { getAdminToken } from "../utils/adminAuth";

function CertificationStatsEditor({
  stats,
  onClose,
  refreshStats,
  showToast,
}) {
  const [formData, setFormData] = useState({
    verifiedCredentials:
      stats?.verifiedCredentials || "",
    domainsCovered:
      stats?.domainsCovered || "",
    industryPlatforms:
      stats?.industryPlatforms || "",
    learningAcceleration:
      stats?.learningAcceleration || "",
  });

  const [submitting, setSubmitting] =
    useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/certifications/admin/stats",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAdminToken()}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.success) {
        refreshStats();
        showToast("Stats updated");
        onClose();
      } else {
        showToast(data.message);
      }
    } catch (error) {
      console.error(error);
      showToast("Update failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="stats-editor-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close-btn"
          onClick={onClose}
        >
          ✕
        </button>

        <h2>Edit Certification Vault Stats</h2>

        <form
          onSubmit={handleSubmit}
          className="stats-form"
        >
          <input
            type="text"
            name="verifiedCredentials"
            placeholder="Verified Credentials"
            value={formData.verifiedCredentials}
            onChange={handleChange}
          />

          <input
            type="text"
            name="domainsCovered"
            placeholder="Domains Covered"
            value={formData.domainsCovered}
            onChange={handleChange}
          />

          <input
            type="text"
            name="industryPlatforms"
            placeholder="Industry Platforms"
            value={formData.industryPlatforms}
            onChange={handleChange}
          />

          <input
            type="text"
            name="learningAcceleration"
            placeholder="Learning Acceleration"
            value={formData.learningAcceleration}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="submit-stats-btn"
            disabled={submitting}
          >
            {submitting
              ? "Saving..."
              : "Save Stats"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CertificationStatsEditor;