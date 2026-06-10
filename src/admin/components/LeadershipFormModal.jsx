import React, { useEffect, useState } from "react";
import "../styles/LeadershipFormModal.css";
import { getAdminToken } from "../utils/adminAuth";
import API_BASE_URL from "../../config/api";
function LeadershipFormModal({
  leadership,
  onClose,
  refreshData,
  showToast,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");
  const [
    organizationName,
    setOrganizationName,
  ] = useState("");
  const [role, setRole] = useState("");
  const [duration, setDuration] =
    useState("");
  const [
    programsOrganized,
    setProgramsOrganized,
  ] = useState("");
  const [
    organizationLogo,
    setOrganizationLogo,
  ] = useState(null);

  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] =
    useState("");

  const [galleryImages, setGalleryImages] =
    useState([]);

  const [credentials, setCredentials] =
    useState(
      Array.from(
        { length: 4 },
        () => ({
          title: "",
          pdfFile: "",
        })
      )
    );

  const [submitting, setSubmitting] =
    useState(false);

  useEffect(() => {
    if (!leadership) return;

    setTitle(leadership.title || "");

    setDescription(
      leadership.description || ""
    );

    setOrganizationName(
      leadership.organizationName || ""
    );

    setRole(
      leadership.role || ""
    );

    setDuration(
      leadership.duration || ""
    );

    setProgramsOrganized(
      leadership.programsOrganized || ""
    );

    setTags(
      leadership.tags || []
    );

    /*
      FIXED GALLERY PRELOAD
    */
    setGalleryImages(
      leadership.galleryImages &&
        leadership.galleryImages.length > 0
        ? leadership.galleryImages.map(
          (item) => ({
            image:
              item.image || null,
            imageCaptionTitle:
              item.imageCaptionTitle || "",
            imageCaptionSubtitle:
              item.imageCaptionSubtitle || "",
          })
        )
        : [
          {
            image: null,
            imageCaptionTitle: "",
            imageCaptionSubtitle: "",
          },
        ]
    );

    /*
      FIXED CREDENTIAL PRELOAD
    */
    const filledCredentials =
      Array.from(
        { length: 4 },
        (_, index) => ({
          title:
            leadership.credentials?.[
              index
            ]?.title || "",
          pdfFile:
            leadership.credentials?.[
              index
            ]?.pdfFile || "",
        })
      );

    setCredentials(
      filledCredentials
    );
  }, [leadership]);

  const addTag = () => {
    if (!tagInput.trim()) return;

    if (
      tags.includes(
        tagInput.trim()
      )
    )
      return;

    setTags([
      ...tags,
      tagInput.trim(),
    ]);

    setTagInput("");
  };

  const removeTag = (
    tagToRemove
  ) => {
    setTags(
      tags.filter(
        (tag) =>
          tag !== tagToRemove
      )
    );
  };

  const addGalleryItem = () => {
    setGalleryImages([
      ...galleryImages,
      {
        image: null,
        imageCaptionTitle: "",
        imageCaptionSubtitle: "",
      },
    ]);
  };

  const removeGalleryItem = (
    index
  ) => {
    setGalleryImages(
      galleryImages.filter(
        (_, i) => i !== index
      )
    );
  };

  const handleGalleryChange = (
    index,
    field,
    value
  ) => {
    const updated = [
      ...galleryImages,
    ];

    updated[index][field] =
      value;

    setGalleryImages(
      updated
    );
  };

  const handleCredentialChange =
    (
      index,
      field,
      value
    ) => {
      const updated = [
        ...credentials,
      ];

      updated[index][field] =
        value;

      setCredentials(
        updated
      );
    };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        setSubmitting(true);

        const formData =
          new FormData();

        formData.append(
          "title",
          title
        );

        formData.append(
          "description",
          description
        );

        formData.append(
          "organizationName",
          organizationName
        );

        formData.append(
          "role",
          role
        );

        formData.append(
          "duration",
          duration
        );

        formData.append(
          "programsOrganized",
          programsOrganized
        );

        formData.append(
          "tags",
          JSON.stringify(tags)
        );

        if (organizationLogo) {
          formData.append(
            "organizationLogo",
            organizationLogo
          );
        }

        /*
          GALLERY PAYLOAD
        */
        const galleryPayload =
          galleryImages.map(
            (item) => ({
              imageCaptionTitle:
                item.imageCaptionTitle,
              imageCaptionSubtitle:
                item.imageCaptionSubtitle,
              existingImage:
                item.image &&
                  !(item.image instanceof File)
                  ? item.image
                  : null,
            })
          );

        formData.append(
          "galleryCaptions",
          JSON.stringify(
            galleryPayload
          )
        );

        galleryImages.forEach(
          (
            item,
            index
          ) => {
            if (
              item.image instanceof
              File
            ) {
              formData.append(
                `galleryImage_${index}`,
                item.image
              );
            }
          }
        );

        /*
          CREDENTIALS
        */
        formData.append(
          "credentials",
          JSON.stringify(credentials)
        );


        const response =
          await fetch(
            `${API_BASE_URL}/api/leadership/admin`,
            {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${getAdminToken()}`,
              },
              body: formData,
            }
          );

        const data =
          await response.json();

        if (data.success) {
          showToast(
            leadership
              ? "Leadership updated"
              : "Leadership created"
          );

          refreshData();
          onClose();
        }
      } catch (error) {
        console.error(error);
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
        className="leadership-form-modal"
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
          {leadership
            ? "Edit Leadership"
            : "Add Leadership"}
        </h2>

        <form
          onSubmit={
            handleSubmit
          }
        >
          <div className="form-section">
            <h3>
              Basic Info
            </h3>

            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
              required
            />

            <textarea
              rows="5"
              placeholder="Description"
              value={
                description
              }
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              required
            />
          </div>
          <div className="form-grid">
  <input
    type="text"
    placeholder="Organization Name"
    value={organizationName}
    onChange={(e) =>
      setOrganizationName(e.target.value)
    }
  />

  <input
    type="text"
    placeholder="Role"
    value={role}
    onChange={(e) =>
      setRole(e.target.value)
    }
  />

  <input
    type="text"
    placeholder="Duration"
    value={duration}
    onChange={(e) =>
      setDuration(e.target.value)
    }
  />

  <input
    type="number"
    placeholder="Programs Organized"
    value={programsOrganized}
    onChange={(e) =>
      setProgramsOrganized(e.target.value)
    }
  />
</div>
<div className="logo-upload-section">
  <h4>Organization Logo</h4>

  <input
    type="file"
    accept="image/*"
    onChange={(e) =>
      setOrganizationLogo(
        e.target.files[0]
      )
    }
  />

  {leadership?.organizationLogo && (
    <img
      src={leadership.organizationLogo}
      alt="Organization Logo"
      className="org-logo-preview"
    />
  )}
</div>
          <div className="form-section">
            <h3>
              Gallery Images
            </h3>

            {galleryImages.map(
              (
                item,
                index
              ) => (
                <div
                  key={
                    index
                  }
                  className="gallery-block"
                >
                  <h4>
                    Gallery Item{" "}
                    {index +
                      1}
                  </h4>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(
                      e
                    ) =>
                      handleGalleryChange(
                        index,
                        "image",
                        e.target
                          .files[0]
                      )
                    }
                  />

                  {item.image &&
                    !(item.image instanceof File) && (
                      <img
                        src={item.image}
                        alt="preview"
                        style={{
                          width: "140px",
                          borderRadius:
                            "12px",
                          marginTop:
                            "12px",
                          marginBottom:
                            "12px",
                        }}
                      />
                    )}

                  <input
                    type="text"
                    placeholder="Caption Title"
                    value={
                      item.imageCaptionTitle
                    }
                    onChange={(
                      e
                    ) =>
                      handleGalleryChange(
                        index,
                        "imageCaptionTitle",
                        e.target
                          .value
                      )
                    }
                  />

                  <input
                    type="text"
                    placeholder="Caption Subtitle"
                    value={
                      item.imageCaptionSubtitle
                    }
                    onChange={(
                      e
                    ) =>
                      handleGalleryChange(
                        index,
                        "imageCaptionSubtitle",
                        e.target
                          .value
                      )
                    }
                  />

                  <button
                    type="button"
                    onClick={() =>
                      removeGalleryItem(
                        index
                      )
                    }
                  >
                    Remove
                  </button>
                </div>
              )
            )}

            <button
              type="button"
              onClick={
                addGalleryItem
              }
            >
              + Add Gallery Image
            </button>
          </div>
             <div className="form-section">
  <h3>Leadership Credentials</h3>

  {credentials.map(
    (credential, index) => (
      <div
        key={index}
        className="credential-block"
      >
        <h4>
          Credential {index + 1}
        </h4>

        <input
          type="text"
          placeholder="Credential Title"
          value={credential.title}
          onChange={(e) =>
            handleCredentialChange(
              index,
              "title",
              e.target.value
            )
          }
        />

        <input
          type="url"
          placeholder="Google Drive PDF Link"
          value={credential.pdfFile}
          onChange={(e) =>
            handleCredentialChange(
              index,
              "pdfFile",
              e.target.value
            )
          }
        />
      </div>
    )
  )}
</div> 
          <div className="form-actions">
            <button
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                submitting
              }
            >
              {submitting
                ? "Saving..."
                : "Save Leadership"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LeadershipFormModal;