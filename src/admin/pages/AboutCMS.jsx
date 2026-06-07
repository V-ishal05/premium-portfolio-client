import React, {
  useEffect,
  useState,
} from "react";

import "../styles/AboutCMS.css";
import "../styles/AdminDashboard.css";

import AdminSidebar from "../components/AdminSidebar";

import {
  getAdminAbout,
  updateAbout,
} from "../utils/aboutApi";

function AboutCMS() {
  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [toastMessage, setToastMessage] =
    useState("");

  const [form, setForm] =
    useState({
      sectionTag: "",
      heading: "",
      highlightText: "",
      description: "",
      dsaCount: 400,
      timelineTitle: "",
      timelineItems: [],
    });

  const showToast = (message) => {
    setToastMessage(message);

    setTimeout(() => {
      setToastMessage("");
    }, 2500);
  };

  const loadAbout =
    async () => {
      try {
        const data =
          await getAdminAbout();

        if (data.success) {
          setForm(data.about);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadAbout();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const updateTimelineItem = (
    index,
    field,
    value
  ) => {
    const updatedItems = [
      ...form.timelineItems,
    ];

    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
    };

    setForm({
      ...form,
      timelineItems:
        updatedItems,
    });
  };

  const addTimelineItem =
    () => {
      setForm({
        ...form,

        timelineItems: [
          ...form.timelineItems,
          {
            tag: "",
            title: "",
            description:
              "",
          },
        ],
      });
    };

  const removeTimelineItem =
    (index) => {
      const updatedItems =
        form.timelineItems.filter(
          (_, i) =>
            i !== index
        );

      setForm({
        ...form,
        timelineItems:
          updatedItems,
      });
    };

  const handleSave =
    async () => {
      try {
        setSaving(true);

        const response =
          await updateAbout(
            form
          );

        if (
          response.success
        ) {
          showToast(
            "About content updated successfully"
          );
        }
      } catch (error) {
        console.error(error);
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
            Loading About CMS...
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <AdminSidebar />

      <main className="admin-main">
        <div className="about-cms-header">
          <h1>About CMS</h1>

          <p>
            Manage About
            section content,
            DSA count and
            journey timeline.
          </p>
        </div>

        <div className="about-cms-grid">

          <div className="about-cms-card">
            <h2>
              About Content
            </h2>

            <input
              type="text"
              name="sectionTag"
              placeholder="Section Tag"
              value={
                form.sectionTag
              }
              onChange={
                handleChange
              }
            />

            <input
              type="text"
              name="heading"
              placeholder="Heading"
              value={
                form.heading
              }
              onChange={
                handleChange
              }
            />

            <input
              type="text"
              name="highlightText"
              placeholder="Highlight Text"
              value={
                form.highlightText
              }
              onChange={
                handleChange
              }
            />

            <textarea
              name="description"
              rows="5"
              placeholder="Description"
              value={
                form.description
              }
              onChange={
                handleChange
              }
            />

            <input
              type="number"
              name="dsaCount"
              placeholder="DSA Count"
              value={
                form.dsaCount
              }
              onChange={
                handleChange
              }
            />

            <input
              type="text"
              name="timelineTitle"
              placeholder="Timeline Title"
              value={
                form.timelineTitle
              }
              onChange={
                handleChange
              }
            />
          </div>

          <div className="about-cms-card">
            <h2>
              Timeline Items
            </h2>

            {form.timelineItems.map(
              (
                item,
                index
              ) => (
                <div
                  key={index}
                  className="timeline-editor"
                >
                  <input
                    placeholder="Tag"
                    value={
                      item.tag
                    }
                    onChange={(
                      e
                    ) =>
                      updateTimelineItem(
                        index,
                        "tag",
                        e
                          .target
                          .value
                      )
                    }
                  />

                  <input
                    placeholder="Title"
                    value={
                      item.title
                    }
                    onChange={(
                      e
                    ) =>
                      updateTimelineItem(
                        index,
                        "title",
                        e
                          .target
                          .value
                      )
                    }
                  />

                  <textarea
                    rows="3"
                    placeholder="Description"
                    value={
                      item.description
                    }
                    onChange={(
                      e
                    ) =>
                      updateTimelineItem(
                        index,
                        "description",
                        e
                          .target
                          .value
                      )
                    }
                  />

                  <button
                    className="delete-timeline-btn"
                    onClick={() =>
                      removeTimelineItem(
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
              className="add-timeline-btn"
              onClick={
                addTimelineItem
              }
            >
              + Add Timeline Item
            </button>
          </div>
        </div>

        <div className="about-save-row">
          <button
            className="about-save-btn"
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

export default AboutCMS;