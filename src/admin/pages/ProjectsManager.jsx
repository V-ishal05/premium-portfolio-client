import React, { useEffect, useState } from "react";
import "../styles/ProjectsManager.css";
import "../styles/AdminDashboard.css";
import { getAdminToken } from "../utils/adminAuth";
import AdminSidebar from "../components/AdminSidebar";

function ProjectsManager() {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] =
    useState(false);

  const [editingId, setEditingId] =
    useState(null);

  const [form, setForm] = useState({
    name: "",
    category: "",
    projectType: "flagship",
    featured: false,
    shortDescription: "",
    techStack: "",
    liveDemoLink: "",
    githubLink: "",
    modalTitle: "",
    challenge: "",
    architecture: "",
    impactMetrics: "",
  });

  const API =
    `${API_BASE_URL}/api/admin/projects`;

  const fetchProjects = async () => {
    try {
      const res = await fetch(API, {
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        setProjects(data.projects);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const resetForm = () => {
    setForm({
      name: "",
      category: "",
      projectType: "flagship",
      featured: false,
      shortDescription: "",
      techStack: "",
      liveDemoLink: "",
      githubLink: "",
      modalTitle: "",
      challenge: "",
      architecture: "",
      impactMetrics: "",
    });

    setEditingId(null);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (project) => {
    setEditingId(project._id);

    setForm({
      name: project.name,
      category: project.category,
      projectType: project.projectType,
      featured: project.featured,
      shortDescription:
        project.shortDescription,
      techStack:
        project.techStack.join(", "),
      liveDemoLink:
        project.liveDemoLink || "",
      githubLink:
        project.githubLink || "",
      modalTitle: project.modalTitle,
      challenge: project.challenge,
      architecture:
        project.architecture,
      impactMetrics:
        project.impactMetrics.join(", "),
    });

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } =
      e.target;

    setForm({
      ...form,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      techStack: form.techStack
        .split(",")
        .map((tech) => tech.trim()),

      impactMetrics:
        form.impactMetrics
          .split(",")
          .map((metric) =>
            metric.trim()
          ),
    };

    try {
      const res = await fetch(
        editingId
          ? `${API}/${editingId}`
          : API,
        {
          method: editingId
            ? "PUT"
            : "POST",
          headers: {
            "Content-Type":
              "application/json",
            Authorization: `Bearer ${getAdminToken()}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (data.success) {
        fetchProjects();
        closeModal();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete =
      window.confirm(
        "Delete this project?"
      );

    if (!confirmDelete) return;

    try {
      await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      });

      fetchProjects();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="admin-dashboard">
      <AdminSidebar />

      <main className="admin-main">
        <div className="projects-topbar">
          <button
            className="add-project-btn"
            onClick={openAddModal}
          >
            + Add Project
          </button>
        </div>

        <h1>Projects Manager</h1>

        {projects.length === 0 ? (
          <div className="empty-state">
            <h2>No Projects Yet</h2>

            <p>
              Add your first project to
              power your premium portfolio
              CMS.
            </p>

            <button onClick={openAddModal}>
              + Create First Project
            </button>
          </div>
        ) : (
          <div className="projects-grid">
            {projects.map((project) => (
              <div
                key={project._id}
                className="project-card"
              >
                {project.featured && (
                  <span className="featured-badge">
                    Featured
                  </span>
                )}

                <h3>{project.name}</h3>

                <p className="category">
                  {project.category}
                </p>

                <p className="description">
                  {
                    project.shortDescription
                  }
                </p>

                <div className="tech-stack">
                  {project.techStack.map(
                    (tech, index) => (
                      <span key={index}>
                        {tech}
                      </span>
                    )
                  )}
                </div>

                <div className="project-actions">
                  <button
                    onClick={() =>
                      openEditModal(project)
                    }
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(
                        project._id
                      )
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {showModal && (
          <div className="modal-overlay">
            <div className="project-modal">
              <div className="modal-header">
                <h2>
                  {editingId
                    ? "Edit Project"
                    : "Add Project"}
                </h2>

                <button
                  className="close-btn"
                  onClick={closeModal}
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <input
                  name="name"
                  placeholder="Project Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />

                <input
                  name="category"
                  placeholder="Category"
                  value={form.category}
                  onChange={handleChange}
                  required
                />

                <select
                  name="projectType"
                  value={form.projectType}
                  onChange={handleChange}
                >
                  <option value="flagship">
                    Flagship Project
                  </option>

                  <option value="architecture">
                    Architecture Project
                  </option>
                </select>

                <textarea
                  name="shortDescription"
                  placeholder="Short Description"
                  value={
                    form.shortDescription
                  }
                  onChange={handleChange}
                  required
                />

                <input
                  name="techStack"
                  placeholder="Tech Stack"
                  value={form.techStack}
                  onChange={handleChange}
                  required
                />

                {form.projectType ===
                  "flagship" && (
                  <input
                    name="liveDemoLink"
                    placeholder="Live Demo Link"
                    value={
                      form.liveDemoLink
                    }
                    onChange={
                      handleChange
                    }
                    required
                  />
                )}

                <input
                  name="githubLink"
                  placeholder="GitHub Link"
                  value={form.githubLink}
                  onChange={handleChange}
                />

                <input
                  name="modalTitle"
                  placeholder="Modal Title"
                  value={form.modalTitle}
                  onChange={handleChange}
                  required
                />

                <textarea
                  name="challenge"
                  placeholder="Challenge"
                  value={form.challenge}
                  onChange={handleChange}
                  required
                />

                <textarea
                  name="architecture"
                  placeholder="Architecture"
                  value={
                    form.architecture
                  }
                  onChange={handleChange}
                  required
                />

                <input
                  name="impactMetrics"
                  placeholder="Impact Metrics"
                  value={
                    form.impactMetrics
                  }
                  onChange={handleChange}
                  required
                />

                <label className="featured-row">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={form.featured}
                    onChange={handleChange}
                  />
                  Make Featured Project
                </label>

                <div className="modal-actions">
                  <button
                    type="button"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>

                  <button type="submit">
                    {editingId
                      ? "Update Project"
                      : "Save Project"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default ProjectsManager;