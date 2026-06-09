import React, { useState } from "react";
import "../styles/EducationFormModal.css";
import { getAdminToken } from "../utils/adminAuth";

function EducationFormModal({
  editingEducation,
  onClose,
  refreshData,
  showToast,
}) {
  const [formData, setFormData] = useState({
    educationType:
      editingEducation?.educationType || "standard",
    title: editingEducation?.title || "",
    institutionName:
      editingEducation?.institutionName || "",
    affiliation:
      editingEducation?.affiliation || "",
    programOrStream:
      editingEducation?.programOrStream || "",
    location:
      editingEducation?.location || "",
    statusLabel:
      editingEducation?.statusLabel || "",
    completionText:
      editingEducation?.completionText || "",
    scoreType:
      editingEducation?.scoreType || "CGPA",
    scoreValue:
      editingEducation?.scoreValue || "",
    year: editingEducation?.year || "",
    documentPdf:
  editingEducation?.documentPdf || "",
    displayOrder:
      editingEducation?.displayOrder || "",
    isActive:
      editingEducation?.isActive ?? true,
    isFeatured:
      editingEducation?.isFeatured ?? false,
  });

  const [logoImage, setLogoImage] =
    useState(null);

  const [submitting, setSubmitting] =
    useState(false);

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
      const payload = new FormData();

      Object.keys(formData).forEach((key) => {
        payload.append(key, formData[key]);
      });

      if (logoImage) {
        payload.append("logoImage", logoImage);
      }



      const url = editingEducation
        ? `${API_BASE_URL}/api/education/admin/${editingEducation._id}`
        : "${API_BASE_URL}/api/education/admin/create";

      const method = editingEducation
        ? "PUT"
        : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
        body: payload,
      });

      const data = await response.json();

      if (data.success) {
        refreshData();
        showToast(
          editingEducation
            ? "Education updated"
            : "Education created"
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
        className="education-form-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close-btn"
          onClick={onClose}
        >
          ✕
        </button>

        <h2>
          {editingEducation
            ? "Edit Education"
            : "Add Education"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="education-form-grid"
        >
          <input
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <input
            name="institutionName"
            placeholder="Institution Name"
            value={formData.institutionName}
            onChange={handleChange}
            required
          />

          <input
            name="affiliation"
            placeholder="Affiliation"
            value={formData.affiliation}
            onChange={handleChange}
          />

          <input
            name="programOrStream"
            placeholder="Program / Stream"
            value={formData.programOrStream}
            onChange={handleChange}
          />

          <input
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
          />

          <input
            name="statusLabel"
            placeholder="Status Label"
            value={formData.statusLabel}
            onChange={handleChange}
            required
          />

          <input
            name="completionText"
            placeholder="Completion Text"
            value={formData.completionText}
            onChange={handleChange}
            required
          />

          <select
            name="scoreType"
            value={formData.scoreType}
            onChange={handleChange}
          >
            <option value="CGPA">CGPA</option>
            <option value="Percentage">
              Percentage
            </option>
          </select>

          <input
            name="scoreValue"
            placeholder="Score"
            value={formData.scoreValue}
            onChange={handleChange}
            required
          />

          <input
            name="year"
            placeholder="Year"
            value={formData.year}
            onChange={handleChange}
            required
          />

          <input
  type="number"
  name="displayOrder"
  placeholder="Display Order (1, 2, 3...)"
  value={formData.displayOrder || ""}
  onChange={handleChange}
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
              required={!editingEducation}
            />
          </div>

          <div className="upload-group">
  <label>Academic PDF (Google Drive Link)</label>

  <input
    type="text"
    name="documentPdf"
    placeholder="Paste Google Drive PDF Link"
    value={formData.documentPdf}
    onChange={handleChange}
    required
  />
</div>

          <div className="toggle-grid">
            <label>
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
              />
              Featured
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
            className="submit-education-btn"
            disabled={submitting}
          >
            {submitting
              ? "Saving..."
              : "Save Education"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EducationFormModal;