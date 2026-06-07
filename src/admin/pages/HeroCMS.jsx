import React, {
  useEffect,
  useState,
} from "react";

import "../styles/HeroCMS.css";
import "../styles/AdminDashboard.css";

import AdminSidebar from "../components/AdminSidebar";

import {
  getAdminHero,
  updateHero,
  uploadHeroImage,
} from "../utils/heroApi";

function HeroCMS() {
  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [uploading, setUploading] =
    useState(false);

  const [toastMessage, setToastMessage] =
    useState("");

  const [selectedImage, setSelectedImage] =
    useState(null);

  const [form, setForm] =
    useState({
      heroTitle: "",
      heroHighlight: "",
      introText: "",
      description: "",
      recruiterButtonText: "",
      typedRoles: [],
      profileImage: {},
    });

  const showToast = (message) => {
    setToastMessage(message);

    setTimeout(() => {
      setToastMessage("");
    }, 2500);
  };

  const loadHero = async () => {
    try {
      const data =
        await getAdminHero();

      if (data.success) {
        setForm(data.hero);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHero();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const updateRole = (
    index,
    value
  ) => {
    const updatedRoles = [
      ...form.typedRoles,
    ];

    updatedRoles[index] =
      value;

    setForm({
      ...form,
      typedRoles:
        updatedRoles,
    });
  };

  const addRole = () => {
    setForm({
      ...form,
      typedRoles: [
        ...form.typedRoles,
        "",
      ],
    });
  };

  const removeRole = (
    index
  ) => {
    const updatedRoles =
      form.typedRoles.filter(
        (_, i) =>
          i !== index
      );

    setForm({
      ...form,
      typedRoles:
        updatedRoles,
    });
  };

  const handleSave =
    async () => {
      try {
        setSaving(true);

        const data =
          await updateHero({
            heroTitle:
              form.heroTitle,
            heroHighlight:
              form.heroHighlight,
            introText:
              form.introText,
            description:
              form.description,
            recruiterButtonText:
              form.recruiterButtonText,
            typedRoles:
              form.typedRoles,
          });

        if (data.success) {
          showToast(
            "Hero updated successfully"
          );
        }
      } catch (error) {
        console.error(error);
      } finally {
        setSaving(false);
      }
    };

  const handleImageUpload =
    async () => {
      if (!selectedImage)
        return;

      try {
        setUploading(true);

        const data =
          await uploadHeroImage(
            selectedImage
          );

        if (data.success) {
          showToast(
            "Profile image updated"
          );

          loadHero();

          setSelectedImage(
            null
          );
        }
      } catch (error) {
        console.error(error);
      } finally {
        setUploading(false);
      }
    };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <AdminSidebar />

        <main className="admin-main">
          <div className="messages-empty-card">
            Loading Hero CMS...
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <AdminSidebar />

      <main className="admin-main">
        <div className="hero-cms-header">
          <h1>Hero CMS</h1>

          <p>
            Manage hero
            branding, typed
            roles, and profile
            image.
          </p>
        </div>

        <div className="hero-cms-grid">

          <div className="hero-cms-card">
            <h2>
              Hero Content
            </h2>

            <input
              type="text"
              name="heroTitle"
              placeholder="Hero Title"
              value={
                form.heroTitle
              }
              onChange={
                handleChange
              }
            />

            <input
              type="text"
              name="heroHighlight"
              placeholder="Highlight"
              value={
                form.heroHighlight
              }
              onChange={
                handleChange
              }
            />

            <input
              type="text"
              name="introText"
              placeholder="Intro Text"
              value={
                form.introText
              }
              onChange={
                handleChange
              }
            />

            <textarea
              name="description"
              placeholder="Description"
              value={
                form.description
              }
              onChange={
                handleChange
              }
              rows="5"
            />

            <input
              type="text"
              name="recruiterButtonText"
              placeholder="Recruiter Button"
              value={
                form.recruiterButtonText
              }
              onChange={
                handleChange
              }
            />
          </div>

          <div className="hero-cms-card">
            <h2>
              Typed Roles
            </h2>

            {form.typedRoles.map(
              (
                role,
                index
              ) => (
                <div
                  key={
                    index
                  }
                  className="role-row"
                >
                  <input
                    value={
                      role
                    }
                    onChange={(
                      e
                    ) =>
                      updateRole(
                        index,
                        e
                          .target
                          .value
                      )
                    }
                  />

                  <button
                    onClick={() =>
                      removeRole(
                        index
                      )
                    }
                  >
                    Delete
                  </button>
                </div>
              )
            )}

            <button
              className="add-role-btn"
              onClick={
                addRole
              }
            >
              + Add Role
            </button>
          </div>

          <div className="hero-cms-card">
            <h2>
              Profile Image
            </h2>

            {form
              .profileImage
              ?.url ? (
              <img
                src={
                  form
                    .profileImage
                    .url
                }
                alt="Profile"
                className="hero-preview-image"
              />
            ) : (
              <div className="hero-no-image">
                No image uploaded
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={(
                e
              ) =>
                setSelectedImage(
                  e.target
                    .files[0]
                )
              }
            />

            <button
              className="upload-btn"
              disabled={
                uploading
              }
              onClick={
                handleImageUpload
              }
            >
              {uploading
                ? "Uploading..."
                : "Upload Image"}
            </button>
          </div>
        </div>

        <div className="hero-save-row">
          <button
            className="hero-save-btn"
            disabled={
              saving
            }
            onClick={
              handleSave
            }
          >
            {saving
              ? "Saving..."
              : "Save Changes"}
          </button>
        </div>

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

export default HeroCMS;