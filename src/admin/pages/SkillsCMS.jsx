import React, {
  useEffect,
  useState,
} from "react";

import "../styles/SkillsCMS.css";
import "../styles/AdminDashboard.css";

import AdminSidebar from "../components/AdminSidebar";

import {
  getAdminSkills,
  updateSkills,
} from "../utils/skillsApi";

function SkillsCMS() {
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
      subtitle: "",
      proficiencyTitle: "",
      skillCards: [],
      proficiency: [],
    });

  const showToast = (message) => {
    setToastMessage(message);

    setTimeout(() => {
      setToastMessage("");
    }, 2500);
  };

  const loadSkills =
    async () => {
      try {
        const data =
          await getAdminSkills();

        if (data.success) {
          setForm(data.skills);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadSkills();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const updateSkillCard = (
    index,
    field,
    value
  ) => {
    const updated = [
      ...form.skillCards,
    ];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setForm({
      ...form,
      skillCards: updated,
    });
  };

  const addSkillCard =
    () => {
      setForm({
        ...form,
        skillCards: [
          ...form.skillCards,
          {
            icon: "react",
            title: "",
            tech: "",
          },
        ],
      });
    };

  const removeSkillCard =
    (index) => {
      const updated =
        form.skillCards.filter(
          (_, i) =>
            i !== index
        );

      setForm({
        ...form,
        skillCards: updated,
      });
    };

  const updateProficiency =
    (
      index,
      field,
      value
    ) => {
      const updated = [
        ...form.proficiency,
      ];

      updated[index] = {
        ...updated[index],
        [field]:
          field === "level"
            ? Number(value)
            : value,
      };

      setForm({
        ...form,
        proficiency:
          updated,
      });
    };

  const addProficiency =
    () => {
      setForm({
        ...form,

        proficiency: [
          ...form.proficiency,
          {
            name: "",
            level: 50,
          },
        ],
      });
    };

  const removeProficiency =
    (index) => {
      const updated =
        form.proficiency.filter(
          (_, i) =>
            i !== index
        );

      setForm({
        ...form,
        proficiency:
          updated,
      });
    };

  const handleSave =
    async () => {
      try {
        setSaving(true);

        const response =
          await updateSkills(
            form
          );

        if (
          response.success
        ) {
          showToast(
            "Skills updated successfully"
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
            Loading Skills CMS...
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
            Skills CMS
          </h1>

          <p>
            Manage skills,
            technologies and
            expertise levels.
          </p>
        </div>

        <div className="skills-cms-grid">

          <div className="skills-cms-card">
            <h2>
              Section Content
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
              rows="4"
              name="subtitle"
              placeholder="Subtitle"
              value={
                form.subtitle
              }
              onChange={
                handleChange
              }
            />

            <input
              type="text"
              name="proficiencyTitle"
              placeholder="Proficiency Title"
              value={
                form.proficiencyTitle
              }
              onChange={
                handleChange
              }
            />
          </div>

          <div className="skills-cms-card">
            <h2>
              Skill Cards
            </h2>

            {form.skillCards.map(
              (
                card,
                index
              ) => (
                <div
                  key={index}
                  className="skill-editor"
                >
                  <select
                    value={
                      card.icon
                    }
                    onChange={(
                      e
                    ) =>
                      updateSkillCard(
                        index,
                        "icon",
                        e
                          .target
                          .value
                      )
                    }
                  >
                    <option value="react">
                      React
                    </option>

                    <option value="backend">
                      Backend
                    </option>

                    <option value="database">
                      Database
                    </option>

                    <option value="security">
                      Security
                    </option>

                    <option value="tools">
                      Tools
                    </option>

                    <option value="ai">
                      AI
                    </option>
                  </select>

                  <input
                    placeholder="Title"
                    value={
                      card.title
                    }
                    onChange={(
                      e
                    ) =>
                      updateSkillCard(
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
                    placeholder="Technology Description"
                    value={
                      card.tech
                    }
                    onChange={(
                      e
                    ) =>
                      updateSkillCard(
                        index,
                        "tech",
                        e
                          .target
                          .value
                      )
                    }
                  />

                  <button
                    className="delete-skill-btn"
                    onClick={() =>
                      removeSkillCard(
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
              className="add-skill-btn"
              onClick={
                addSkillCard
              }
            >
              + Add Skill Card
            </button>
          </div>

          <div className="skills-cms-card">
            <h2>
              Core Expertise
            </h2>

            {form.proficiency.map(
              (
                item,
                index
              ) => (
                <div
                  key={index}
                  className="proficiency-editor"
                >
                  <input
                    placeholder="Skill Name"
                    value={
                      item.name
                    }
                    onChange={(
                      e
                    ) =>
                      updateProficiency(
                        index,
                        "name",
                        e
                          .target
                          .value
                      )
                    }
                  />

                  <input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="Level"
                    value={
                      item.level
                    }
                    onChange={(
                      e
                    ) =>
                      updateProficiency(
                        index,
                        "level",
                        e
                          .target
                          .value
                      )
                    }
                  />

                  <button
                    className="delete-skill-btn"
                    onClick={() =>
                      removeProficiency(
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
              className="add-skill-btn"
              onClick={
                addProficiency
              }
            >
              + Add Expertise
            </button>
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

export default SkillsCMS;