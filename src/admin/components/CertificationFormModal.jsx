import React, { useState } from "react";
import "../styles/CertificationFormModal.css";
import { getAdminToken } from "../utils/adminAuth";
import API_BASE_URL from "../../config/api";
function CertificationFormModal({
  editingCertification,
  onClose,
  refreshData,
  showToast,
}) {
  const [formData, setFormData] = useState({

    credentialPdf:
      editingCertification?.credentialPdf || "",
    certificateTitle:
      editingCertification?.certificateTitle || "",
    shortDescription:
      editingCertification?.shortDescription || "",
    issuedBy: editingCertification?.issuedBy || "",
    platform: editingCertification?.platform || "",
    year: editingCertification?.year || "",
    category: editingCertification?.category || "",
    skillsLearned:
      editingCertification?.skillsLearned?.join(", ") ||
      "",
    credentialUrl:
      editingCertification?.credentialUrl || "",
    isVerified:
      editingCertification?.isVerified ?? true,
    isFeatured:
      editingCertification?.isFeatured ?? false,
    isActive:
      editingCertification?.isActive ?? true,
  });



  const [submitting, setSubmitting] =
    useState(false);
  const [logoImage, setLogoImage] =
    useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } =
      e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      const url = editingCertification
        ? `${API_BASE_URL}/api/certifications/admin/${editingCertification._id}`
        : `${API_BASE_URL}/api/certifications/admin/create`;

      const method = editingCertification
        ? "PUT"
        : "POST";

      const payload =
        new FormData();

      Object.keys(formData).forEach(
        (key) => {
          payload.append(
            key,
            formData[key]
          );
        }
      );

      if (logoImage) {
        payload.append(
          "logoImage",
          logoImage
        );
      }

      const response = await fetch(
        url,
        {
          method,
          headers: {
            Authorization:
              `Bearer ${getAdminToken()}`,
          },
          body: payload,
        }
      );

      const data = await response.json();

      if (data.success) {
        refreshData();

        showToast(
          editingCertification
            ? "Certification updated"
            : "Certification created"
        );

        onClose();
      } else {
        showToast(data.message);
      }
    } catch (error) {
      console.error(error);
      showToast("Operation failed");
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
        className="cert-form-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close-btn"
          onClick={onClose}
        >
          ✕
        </button>

        <h2>
          {editingCertification
            ? "Edit Certification"
            : "Add Certification"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="cert-form-grid"
        >
          <input
            type="text"
            name="certificateTitle"
            placeholder="Certificate Title"
            value={formData.certificateTitle}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="issuedBy"
            placeholder="Issued By"
            value={formData.issuedBy}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="platform"
            placeholder="Platform"
            value={formData.platform}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="year"
            placeholder="Year"
            value={formData.year}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="skillsLearned"
            placeholder="Skills (comma separated)"
            value={formData.skillsLearned}
            onChange={handleChange}
          />

          <input
            type="text"
            name="credentialUrl"
            placeholder="External Credential URL (optional)"
            value={formData.credentialUrl}
            onChange={handleChange}
          />

          <textarea
            name="shortDescription"
            placeholder="Short Description"
            value={formData.shortDescription}
            onChange={handleChange}
            required
          />

          <div className="upload-group">
            <label>Logo Image</label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setLogoImage(
                  e.target.files[0]
                )
              }
              required={!editingCertification}
            />
          </div>

          <div className="upload-group">
            <label>Credential PDF</label>
            <input
              type="text"
              name="credentialPdf"
              placeholder="Google Drive PDF URL"
              value={formData.credentialPdf}
              onChange={handleChange}
              required
            />
          </div>

          <div className="toggle-grid">
            <label>
              <input
                type="checkbox"
                name="isVerified"
                checked={formData.isVerified}
                onChange={handleChange}
              />
              Verified Credential
            </label>

            <label>
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
              />
              Featured Credential
            </label>

            <label>
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
              />
              Active
            </label>
          </div>

          <button
            type="submit"
            className="submit-cert-btn"
            disabled={submitting}
          >
            {submitting
              ? "Saving..."
              : editingCertification
                ? "Update Certification"
                : "Create Certification"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CertificationFormModal;