import React, { useEffect, useMemo, useState } from "react";
import "../styles/AdminDashboard.css";
import { getAdminToken } from "../utils/adminAuth";
import AdminSidebar from "../components/AdminSidebar";
import API_BASE_URL from "../../config/api";
function AdminMessages() {

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] =
    useState("All");

  const [selectedMessage, setSelectedMessage] =
    useState(null);

  const [adminNotes, setAdminNotes] = useState("");

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [toastMessage, setToastMessage] =
    useState("");

  const showToast = (message) => {
    setToastMessage(message);

    setTimeout(() => {
      setToastMessage("");
    }, 2500);
  };


  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/admin/messages`,
        {
          headers: {
            Authorization: `Bearer ${getAdminToken()}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setMessages(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (
    id,
    closeModal = true
  ) => {
    try {
      await fetch(
        `${API_BASE_URL}/api/v1/admin/messages/${id}/read`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${getAdminToken()}`,
          },
        }
      );

      fetchMessages();
      showToast("Inquiry marked as read");

      if (closeModal) {
        setSelectedMessage(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const archiveMessage = async (id) => {
    try {
      await fetch(
        `${API_BASE_URL}/api/v1/admin/messages/${id}/archive`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${getAdminToken()}`,
          },
        }
      );

      fetchMessages();
      setSelectedMessage(null);
      showToast("Inquiry archived");
    } catch (error) {
      console.error(error);
    }
  };

  const deleteMessage = async (id) => {
    try {
      await fetch(
        `${API_BASE_URL}/api/v1/admin/messages/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${getAdminToken()}`,
          },
        }
      );

      fetchMessages();
      setSelectedMessage(null);
      setShowDeleteModal(false);
      showToast("Inquiry deleted");
    } catch (error) {
      console.error(error);
    }
  };

  const saveAdminNotes = async () => {
    if (!selectedMessage) return;

    try {
      await fetch(
        `${API_BASE_URL}/api/v1/admin/messages/${selectedMessage._id}/notes`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAdminToken()}`,
          },
          body: JSON.stringify({
            adminNotes,
          }),
        }
      );

      fetchMessages();
      showToast("Notes saved");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const filteredMessages = useMemo(() => {
    let filtered =
      activeFilter === "Archived"
        ? messages.filter((m) => m.isArchived)
        : messages.filter((m) => !m.isArchived);

    if (activeFilter === "Unread") {
      filtered = filtered.filter((m) => !m.isRead);
    }

    if (activeFilter === "Read") {
      filtered = filtered.filter((m) => m.isRead);
    }

    if (activeFilter === "High") {
      filtered = filtered.filter(
        (m) => m.urgency === "High"
      );
    }

    if (activeFilter === "Immediate") {
      filtered = filtered.filter(
        (m) => m.urgency === "Immediate"
      );
    }

    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();

      filtered = filtered.filter(
        (m) =>
          m.fullName
            .toLowerCase()
            .includes(search) ||
          m.company
            .toLowerCase()
            .includes(search) ||
          m.corporateEmail
            .toLowerCase()
            .includes(search) ||
          m.jobRole
            .toLowerCase()
            .includes(search)
      );
    }

    return filtered;
  }, [messages, searchTerm, activeFilter]);

  const activeMessages = messages.filter(
    (m) => !m.isArchived
  );

  const unreadCount = activeMessages.filter(
    (m) => !m.isRead
  ).length;

  const readCount = activeMessages.filter(
    (m) => m.isRead
  ).length;

  const totalCount = activeMessages.length;

  const getUrgencyClass = (urgency) => {
    switch (urgency) {
      case "Immediate":
        return "badge-immediate";
      case "High":
        return "badge-high";
      case "Medium":
        return "badge-medium";
      default:
        return "badge-low";
    }
  };

  return (
    <div className="admin-dashboard">
      <AdminSidebar />

      <main className="admin-main">
        <div className="messages-header">
          <div>
            <h1>Recruiter Messages</h1>
            <p>
              Premium recruiter inquiry CRM
              management.
            </p>
          </div>

          <div className="message-stats-grid">
            <div className="message-count-card unread-card">
              <span>{unreadCount}</span>
              <p>Unread Leads</p>
            </div>

            <div className="message-count-card read-card">
              <span>{readCount}</span>
              <p>Read Leads</p>
            </div>

            <div className="message-count-card total-card">
              <span>{totalCount}</span>
              <p>Total Leads</p>
            </div>
          </div>
        </div>

        <div className="messages-toolbar">
          <input
            type="text"
            placeholder="Search recruiter, company, role, email..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            className="messages-search"
          />

          <div className="filter-chips">
            {[
              "All",
              "Unread",
              "Read",
              "High",
              "Immediate",
              "Archived",
            ].map((filter) => (
              <button
                key={filter}
                className={
                  activeFilter === filter
                    ? "chip active-chip"
                    : "chip"
                }
                onClick={() =>
                  setActiveFilter(filter)
                }
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="messages-empty-card">
            Loading recruiter inquiries...
          </div>
        ) : filteredMessages.length === 0 ? (
          <div className="messages-empty-card">
            No recruiter inquiries found.
          </div>
        ) : (
          <div className="messages-glass-card">
            <div className="messages-table-wrapper">
              <table className="messages-table">
                <thead>
                  <tr>
                    <th>Recruiter</th>
                    <th>Company</th>
                    <th>Role</th>
                    <th>Opportunity</th>
                    <th>Urgency</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredMessages.map((msg) => (
                    <tr
                      key={msg._id}
                      onClick={() => {
                        setSelectedMessage({
                          ...msg,
                          isRead: true,
                        });

                        setAdminNotes(
                          msg.adminNotes || ""
                        );

                        if (!msg.isRead) {
                          markAsRead(
                            msg._id,
                            false
                          );
                        }
                      }}
                      className={
                        !msg.isRead
                          ? "unread-row"
                          : ""
                      }
                    >
                      <td>{msg.fullName}</td>
                      <td>{msg.company}</td>
                      <td>{msg.jobRole}</td>
                      <td>
                        {msg.opportunityType}
                      </td>

                      <td>
                        <span
                          className={`urgency-badge ${getUrgencyClass(
                            msg.urgency
                          )}`}
                        >
                          {msg.urgency}
                        </span>
                      </td>

                      <td>
                        {msg.isArchived ? (
                          <span className="archived-badge">
                            Archived
                          </span>
                        ) : msg.isRead ? (
                          "Read"
                        ) : (
                          <div className="status-unread">
                            <span className="red-dot"></span>
                            Unread
                          </div>
                        )}
                      </td>

                      <td>
                        {new Date(
                          msg.createdAt
                        ).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedMessage && (
          <div
            className="modal-overlay"
            onClick={() =>
              setSelectedMessage(null)
            }
          >
            <div
              className="message-modal"
              onClick={(e) =>
                e.stopPropagation()
              }
            >
              <button
                className="modal-close-btn"
                onClick={() =>
                  setSelectedMessage(null)
                }
              >
                ✕
              </button>

              <h2>Recruiter Inquiry Details</h2>

              <div className="modal-grid">
                <p>
                  <strong>Name:</strong>{" "}
                  {selectedMessage.fullName}
                </p>

                <p>
                  <strong>Company:</strong>{" "}
                  {selectedMessage.company}
                </p>

                <p>
                  <strong>Email:</strong>{" "}
                  {
                    selectedMessage.corporateEmail
                  }
                </p>

                <p>
                  <strong>Role:</strong>{" "}
                  {selectedMessage.jobRole}
                </p>

                <p>
                  <strong>Opportunity:</strong>{" "}
                  {
                    selectedMessage.opportunityType
                  }
                </p>

                <p>
                  <strong>Urgency:</strong>{" "}
                  {selectedMessage.urgency}
                </p>
              </div>

              <div className="modal-message-box">
                {selectedMessage.message}
              </div>

              <textarea
                className="admin-notes"
                placeholder="Admin notes..."
                value={adminNotes}
                onChange={(e) =>
                  setAdminNotes(e.target.value)
                }
              />

              <div className="modal-actions">
                <button onClick={saveAdminNotes}>
                  Save Notes
                </button>

                <button
                  onClick={() =>
                    window.open(
                      `mailto:${selectedMessage.corporateEmail}`
                    )
                  }
                >
                  Reply Email
                </button>

                <button
                  onClick={() =>
                    archiveMessage(
                      selectedMessage._id
                    )
                  }
                >
                  Archive
                </button>

                <button
                  className="danger-btn"
                  onClick={() =>
                    setShowDeleteModal(true)
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {showDeleteModal && (
          <div
            className="modal-overlay"
            onClick={() =>
              setShowDeleteModal(false)
            }
          >
            <div
              className="delete-confirm-modal"
              onClick={(e) =>
                e.stopPropagation()
              }
            >
              <h2>Delete Recruiter Inquiry?</h2>

              <p>
                This action cannot be undone.
              </p>

              <div className="delete-modal-actions">
                <button
                  onClick={() =>
                    setShowDeleteModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  className="danger-btn"
                  onClick={() =>
                    deleteMessage(
                      selectedMessage._id
                    )
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {toastMessage && (
          <div className="admin-toast">
            {toastMessage}
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminMessages;