import React, {
  useEffect,
  useState,
} from "react";

import "../styles/SocialLinksCMS.css";
import "../styles/AdminDashboard.css";

import AdminSidebar from "../components/AdminSidebar";

import {
  getSocialLinks,
  updateSocialLinks,
} from "../utils/socialLinksApi";

function SocialLinksCMS() {
  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [toastMessage, setToastMessage] =
    useState("");

  const [form, setForm] =
    useState({
      github: "",
      linkedin: "",
      email: "",
      phone: "",
      whatsapp: "",
      location: "",
    });

  const showToast = (
    message
  ) => {
    setToastMessage(message);

    setTimeout(() => {
      setToastMessage("");
    }, 2500);
  };

  const loadData =
    async () => {
      try {
        const data =
          await getSocialLinks();

        if (data.success) {
          setForm({
            github:
              data.data.github || "",
            linkedin:
              data.data.linkedin || "",
            email:
              data.data.email || "",
            phone:
              data.data.phone || "",
            whatsapp:
              data.data.whatsapp || "",
            location:
              data.data.location || "",
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (
    e
  ) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSave =
    async () => {
      try {
        setSaving(true);

        const response =
          await updateSocialLinks(
            form
          );

        if (
          response.success
        ) {
          showToast(
            "Social Links updated successfully"
          );
        }
      } catch (error) {
        console.error(error);
        showToast(
          "Update failed"
        );
      } finally {
        setSaving(false);
      }
    };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <AdminSidebar />

        <main className="admin-main">
          <div className="messages-empty-card">
            Loading Social Links...
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <AdminSidebar />

      <main className="admin-main">

        <div className="skills-cms-header">
          <h1>
            Social Links CMS
          </h1>

          <p>
            Manage contact information
            and professional links
            across the entire portfolio.
          </p>
        </div>

        <div className="skills-cms-grid">

          <div className="skills-cms-card">
            <h2>
              Contact & Professional Information
            </h2>

            <input
              type="text"
              name="github"
              placeholder="GitHub URL"
              value={
                form.github
              }
              onChange={
                handleChange
              }
            />

            <input
              type="text"
              name="linkedin"
              placeholder="LinkedIn URL"
              value={
                form.linkedin
              }
              onChange={
                handleChange
              }
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={
                form.email
              }
              onChange={
                handleChange
              }
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={
                form.phone
              }
              onChange={
                handleChange
              }
            />

            <input
              type="text"
              name="whatsapp"
              placeholder="WhatsApp Number"
              value={
                form.whatsapp
              }
              onChange={
                handleChange
              }
            />

            <input
              type="text"
              name="location"
              placeholder="Location"
              value={
                form.location
              }
              onChange={
                handleChange
              }
            />
          </div>

        </div>

        <div className="skills-save-row">
          <button
            className="skills-save-btn"
            disabled={saving}
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
            {toastMessage}
          </div>
        )}

      </main>
    </div>
  );
}

export default SocialLinksCMS;