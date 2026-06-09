import React, {
  useEffect,
  useState,
} from "react";
import "../styles/AdminDashboard.css";
import "../styles/AdminResumeManager.css";
import AdminSidebar from "../components/AdminSidebar";
import { getAdminToken } from "../utils/adminAuth";

function AdminResumeManager() {
  const [resume, setResume] =
    useState(null);

  const [resumeUrl, setResumeUrl] =
    useState("");

  const [saving, setSaving] =
    useState(false);

  const API =
    "${API_BASE_URL}/api/resume";

  const fetchResume = async () => {
    try {
      const res = await fetch(API);

      const data = await res.json();

      if (data.success && data.resume) {
        setResume(data.resume);
        setResumeUrl(
          data.resume.resumeUrl
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchResume();
  }, []);

  const handleSave = async () => {
    if (!resumeUrl.trim()) {
      alert(
        "Please enter a resume link"
      );
      return;
    }

    try {
      setSaving(true);

      const res = await fetch(
        `${API}/save`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
            Authorization: `Bearer ${getAdminToken()}`,
          },
          body: JSON.stringify({
            resumeUrl,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert(data.message);
        fetchResume();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-dashboard">
      <AdminSidebar />

      <main className="admin-main">
        <div className="resume-manager-page">
          <h1>
            Resume Manager
          </h1>

          <p className="resume-subtitle">
            Manage your recruiter
            resume link.
          </p>

          <div className="resume-upload-card">
            <input
              type="text"
              placeholder="Paste Google Drive preview link"
              value={resumeUrl}
              onChange={(e) =>
                setResumeUrl(
                  e.target.value
                )
              }
            />

            <button
              onClick={handleSave}
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : "Save Resume Link"}
            </button>
          </div>

          {resume && (
            <div className="current-resume-card">
              <h2>
                Current Resume
              </h2>

              <a
                href={
                  resume.resumeUrl
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                Preview Resume
              </a>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default AdminResumeManager;