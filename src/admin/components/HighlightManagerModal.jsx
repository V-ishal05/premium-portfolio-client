import React, { useState } from "react";
import "../styles/HighlightManagerModal.css";
import { getAdminToken } from "../utils/adminAuth";

function HighlightManagerModal({
  highlights,
  refreshHighlights,
  onClose,
  showToast,
}) {
  const [text, setText] = useState("");
  const [displayOrder, setDisplayOrder] =
    useState(0);

  const [editingId, setEditingId] =
    useState(null);

  const [isActive, setIsActive] =
    useState(true);

  const resetForm = () => {
    setText("");
    setDisplayOrder(0);
    setEditingId(null);
    setIsActive(true);
  };

  const saveHighlight = async () => {
    try {
      const url = editingId
        ? `http://${API_BASE_URL}/api/education/admin/highlights/${editingId}`
        : "http://${API_BASE_URL}/api/education/admin/highlights";

      const method = editingId
        ? "PUT"
        : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type":
            "application/json",
          Authorization: `Bearer ${getAdminToken()}`,
        },
        body: JSON.stringify({
          highlightText: text,
          displayOrder,
          isActive,
        }),
      });

      const data = await response.json();

      if (data.success) {
        refreshHighlights();
        resetForm();

        showToast(
          editingId
            ? "Highlight updated"
            : "Highlight added"
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteHighlight = async (id) => {
    try {
      await fetch(
        `http://${API_BASE_URL}/api/education/admin/highlights/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${getAdminToken()}`,
          },
        }
      );

      refreshHighlights();
      showToast("Deleted");
    } catch (error) {
      console.error(error);
    }
  };

  const editHighlight = (item) => {
    setText(item.highlightText);
    setDisplayOrder(item.displayOrder);
    setIsActive(item.isActive);
    setEditingId(item._id);
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="highlight-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close-btn"
          onClick={onClose}
        >
          ✕
        </button>

        <h2>Academic Highlights</h2>

        <div className="highlight-form">
          <input
            placeholder="Highlight text"
            value={text}
            onChange={(e) =>
              setText(e.target.value)
            }
          />

          <input
            type="number"
            placeholder="Order"
            value={displayOrder}
            onChange={(e) =>
              setDisplayOrder(
                e.target.value
              )
            }
          />

          <button onClick={saveHighlight}>
            {editingId
              ? "Update"
              : "Add Highlight"}
          </button>
        </div>

        <div className="highlight-list">
          {highlights.map((item) => (
            <div
              key={item._id}
              className="highlight-item"
            >
              <span>
                {item.highlightText}
              </span>

              <div className="highlight-actions">
                <button
                  className="edit-highlight-btn"
                  onClick={() =>
                    editHighlight(item)
                  }
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteHighlight(item._id)
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HighlightManagerModal;