import React, { useState } from "react";
import "../styles/ExperienceFormModal.css";
import { getAdminToken } from "../utils/adminAuth";

function ExperienceFormModal({
  editingExperience,
  onClose,
  refreshData,
  showToast,
}) {
  const [formData, setFormData] = useState({
    title:
      editingExperience?.title || "",

    companyName:
      editingExperience?.companyName ||
      "",

    role:
      editingExperience?.role || "",

    subtitle:
      editingExperience?.subtitle ||
      "",

    description:
      editingExperience?.description ||
      "",

    skills:
      editingExperience?.skills
        ?.join(", ") || "",

    duration:
      editingExperience?.duration ||
      "",

    modeOrLocation:
      editingExperience?.modeOrLocation ||
      "",

    experienceCategory:
      editingExperience?.experienceCategory ||
      "",

    buttonText:
      editingExperience?.buttonText ||
      "View Certificate",
    certificatePdf:
      editingExperience?.certificatePdf || "",

    experienceDisplayType:
      editingExperience?.experienceDisplayType ||
      "standard",

    displayOrder:
      editingExperience?.displayOrder ||
      "",

    isActive:
      editingExperience?.isActive ??
      true,
  });

  const [logoImage, setLogoImage] =
    useState(null);

  const [submitting, setSubmitting] =
    useState(false);

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      const payload = new FormData();

      Object.keys(formData).forEach(
        (key) => {
          if (key === "skills") {
            payload.append(
              "skills",
              JSON.stringify(
                formData.skills
                  .split(",")
                  .map((skill) =>
                    skill.trim()
                  )
              )
            );
          } else {
            payload.append(
              key,
              formData[key]
            );
          }
        }
      );

      if (logoImage) {
        payload.append(
          "logoImage",
          logoImage
        );
      }

      

      const url =
        editingExperience
          ? `http://${API_BASE_URL}/api/admin/experience/${editingExperience._id}`
          : "http://${API_BASE_URL}/api/admin/experience";

      const method =
        editingExperience
          ? "PUT"
          : "POST";

      const response = await fetch(
        url,
        {
          method,
          headers: {
            Authorization: `Bearer ${getAdminToken()}`,
          },
          body: payload,
        }
      );

      const data =
        await response.json();

      if (data.success) {
        refreshData();

        showToast(
          editingExperience
            ? "Experience updated"
            : "Experience created"
        );

        onClose();
      } else {
        showToast(
          data.message ||
          "Operation failed"
        );
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
        className="experience-form-modal"
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        <button
          className="modal-close-btn"
          onClick={onClose}
        >
          ✕
        </button>

        <h2>
          {editingExperience
            ? "Edit Experience"
            : "Add Experience"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="experience-form-grid"
        >
          <input
            name="title"
            placeholder="Experience Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <input
            name="companyName"
            placeholder="Company Name"
            value={
              formData.companyName
            }
            onChange={handleChange}
            required
          />

          <input
            name="role"
            placeholder="Role"
            value={formData.role}
            onChange={handleChange}
            required
          />

          <input
            name="subtitle"
            placeholder="Subtitle"
            value={
              formData.subtitle
            }
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={
              formData.description
            }
            onChange={handleChange}
            required
          />

          <input
            name="skills"
            placeholder="Skills (comma separated)"
            value={formData.skills}
            onChange={handleChange}
            required
          />

          <input
            name="duration"
            placeholder="Duration"
            value={
              formData.duration
            }
            onChange={handleChange}
            required
          />

          <input
            name="modeOrLocation"
            placeholder="Mode / Location"
            value={
              formData.modeOrLocation
            }
            onChange={handleChange}
            required
          />

          <input
            name="experienceCategory"
            placeholder="Experience Category"
            value={
              formData.experienceCategory
            }
            onChange={handleChange}
            required
          />

          <input
            name="buttonText"
            placeholder="Button Text"
            value={
              formData.buttonText
            }
            onChange={handleChange}
          />

          <select
            name="experienceDisplayType"
            value={
              formData.experienceDisplayType
            }
            onChange={handleChange}
          >
            <option value="standard">
              Standard
            </option>

            <option value="featured">
              Featured
            </option>
          </select>

          <input
            type="number"
            name="displayOrder"
            placeholder="Display Order"
            value={
              formData.displayOrder
            }
            onChange={handleChange}
          />

          <div className="upload-group">
            <label>
              Company Logo
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setLogoImage(
                  e.target.files[0]
                )
              }
              required={
                !editingExperience
              }
            />
          </div>

          <div className="upload-group">
            <label>
              Certificate PDF (Google Drive Link)
            </label>

            <input
              type="text"
              name="certificatePdf"
              placeholder="Paste Google Drive PDF Link"
              value={formData.certificatePdf}
              onChange={handleChange}
              required
            />
          </div>

          <div className="toggle-grid">
            <label>
              <input
                type="checkbox"
                name="isActive"
                checked={
                  formData.isActive
                }
                onChange={
                  handleChange
                }
              />
              Active
            </label>
          </div>

          <button
            type="submit"
            className="submit-experience-btn"
            disabled={submitting}
          >
            {submitting
              ? "Saving..."
              : "Save Experience"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ExperienceFormModal;