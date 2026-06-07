import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { removeAdminToken } from "../utils/adminAuth";

function AdminSidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        removeAdminToken();
        navigate("/admin/login");
    };

    const isActive = (path) =>
        location.pathname === path;

    return (
        <aside className="admin-sidebar">
            <h2>Admin Panel</h2>
            <div className="admin-sidebar-content">
                <nav>
                    <button
                        className={
                            isActive("/admin/dashboard")
                                ? "active-admin-btn"
                                : ""
                        }
                        onClick={() =>
                            navigate("/admin/dashboard")
                        }
                    >
                        Dashboard
                    </button>
                    <button
                        className={
                            isActive("/admin/hero")
                                ? "active-admin-btn"
                                : ""
                        }
                        onClick={() =>
                            navigate("/admin/hero")
                        }
                    >
                        Hero CMS
                    </button>
                    <button
                        className={
                            isActive("/admin/about")
                                ? "active-admin-btn"
                                : ""
                        }
                        onClick={() =>
                            navigate("/admin/about")
                        }
                    >
                        About CMS
                    </button>
                    <button
                        className={
                            isActive("/admin/skills")
                                ? "active-admin-btn"
                                : ""
                        }
                        onClick={() =>
                            navigate("/admin/skills")
                        }
                    >
                        Skills CMS
                    </button>
                    <button
                        className={
                            isActive("/admin/social-links")
                                ? "active-admin-btn"
                                : ""
                        }
                        onClick={() =>
                            navigate("/admin/social-links")
                        }
                    >
                        Social Links
                    </button>
                    <button
                        className={
                            isActive("/admin/projects")
                                ? "active-admin-btn"
                                : ""
                        }
                        onClick={() =>
                            navigate("/admin/projects")
                        }
                    >
                        Projects
                    </button>

                    <button
                        className={
                            isActive("/admin/certifications")
                                ? "active-admin-btn"
                                : ""
                        }
                        onClick={() =>
                            navigate("/admin/certifications")
                        }
                    >
                        Certifications
                    </button>

                    <button
                        className={
                            isActive("/admin/education")
                                ? "active-admin-btn"
                                : ""
                        }
                        onClick={() =>
                            navigate("/admin/education")
                        }
                    >
                        Education
                    </button>
                    <button
                        className={
                            isActive("/admin/experience")
                                ? "active-admin-btn"
                                : ""
                        }
                        onClick={() =>
                            navigate("/admin/experience")
                        }
                    >
                        Experience
                    </button>

                    <button
                        className={
                            isActive("/admin/leadership")
                                ? "active-admin-btn"
                                : ""
                        }
                        onClick={() =>
                            navigate("/admin/leadership")
                        }
                    >
                        Leadership
                    </button>

                    <button
                        className={
                            isActive("/admin/messages")
                                ? "active-admin-btn"
                                : ""
                        }
                        onClick={() =>
                            navigate("/admin/messages")
                        }
                    >
                        Messages
                    </button>

                    <button
                        className={
                            isActive("/admin/resume")
                                ? "active-admin-btn"
                                : ""
                        }
                        onClick={() =>
                            navigate("/admin/resume")
                        }
                    >
                        Resume
                    </button>
                    <button
                        className={
                            isActive("/admin/analytics")
                                ? "active-admin-btn"
                                : ""
                        }
                        onClick={() =>
                            navigate("/admin/analytics")
                        }
                    >
                        Analytics
                    </button>
                    <button
                        className={
                            isActive("/admin/settings")
                                ? "active-admin-btn"
                                : ""
                        }
                        onClick={() =>
                            navigate("/admin/settings")
                        }
                    >
                        Settings
                    </button>
                </nav>
            </div>

            
        </aside>
        
    );
}

export default AdminSidebar;