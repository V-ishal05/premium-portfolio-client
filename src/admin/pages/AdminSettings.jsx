import React, {
  useEffect,
  useState,
} from "react";

import AdminSidebar from "../components/AdminSidebar";

import {
  getProfile,
  updateProfile,
  updatePassword,
} from "../utils/adminSettingsApi";

import "../styles/AdminSettings.css";

function AdminSettings() {
  const [activeTab, setActiveTab] =
    useState("profile");

  const [profile, setProfile] =
    useState({
      name: "",
      email: "",
      createdAt: "",
      updatedAt: "",
    });

  const [passwordData, setPasswordData] =
    useState({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile =
    async () => {
      const response =
        await getProfile();

      if (
        response.success
      ) {
        setProfile(
          response.data
        );
      }
    };

  const handleProfileUpdate =
    async () => {
      const response =
        await updateProfile({
          name: profile.name,
          email:
            profile.email,
        });

      alert(
        response.message
      );
    };

  const handlePasswordUpdate =
    async () => {
      if (
        passwordData.newPassword !==
        passwordData.confirmPassword
      ) {
        alert(
          "Passwords do not match"
        );
        return;
      }

      const response =
        await updatePassword(
          {
            currentPassword:
              passwordData.currentPassword,
            newPassword:
              passwordData.newPassword,
          }
        );

      alert(
        response.message
      );

      if (
        response.success
      ) {
        setPasswordData({
          currentPassword:
            "",
          newPassword: "",
          confirmPassword:
            "",
        });
      }
    };

  return (
    <div className="admin-dashboard">
      <AdminSidebar />

      <div className="admin-main">
        <div className="settings-header">
          <h1>
            Settings
          </h1>

          <p>
            Manage your
            administrator
            profile and
            security.
          </p>
        </div>

        <div className="settings-tabs">
          <button
            className={
              activeTab ===
              "profile"
                ? "active-tab"
                : ""
            }
            onClick={() =>
              setActiveTab(
                "profile"
              )
            }
          >
            Profile
          </button>

          <button
            className={
              activeTab ===
              "security"
                ? "active-tab"
                : ""
            }
            onClick={() =>
              setActiveTab(
                "security"
              )
            }
          >
            Security
          </button>

          <button
            className={
              activeTab ===
              "account"
                ? "active-tab"
                : ""
            }
            onClick={() =>
              setActiveTab(
                "account"
              )
            }
          >
            Account
          </button>
        </div>

        {activeTab ===
          "profile" && (
          <div className="settings-card">
            <h2>
              Profile
              Information
            </h2>

            <input
              type="text"
              placeholder="Name"
              value={
                profile.name
              }
              onChange={(
                e
              ) =>
                setProfile({
                  ...profile,
                  name: e
                    .target
                    .value,
                })
              }
            />

            <input
              type="email"
              placeholder="Email"
              value={
                profile.email
              }
              onChange={(
                e
              ) =>
                setProfile({
                  ...profile,
                  email:
                    e.target
                      .value,
                })
              }
            />

            <button
              className="settings-btn"
              onClick={
                handleProfileUpdate
              }
            >
              Save
              Profile
            </button>
          </div>
        )}

        {activeTab ===
          "security" && (
          <div className="settings-card">
            <h2>
              Change
              Password
            </h2>

            <input
              type="password"
              placeholder="Current Password"
              value={
                passwordData.currentPassword
              }
              onChange={(
                e
              ) =>
                setPasswordData(
                  {
                    ...passwordData,
                    currentPassword:
                      e
                        .target
                        .value,
                  }
                )
              }
            />

            <input
              type="password"
              placeholder="New Password"
              value={
                passwordData.newPassword
              }
              onChange={(
                e
              ) =>
                setPasswordData(
                  {
                    ...passwordData,
                    newPassword:
                      e
                        .target
                        .value,
                  }
                )
              }
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={
                passwordData.confirmPassword
              }
              onChange={(
                e
              ) =>
                setPasswordData(
                  {
                    ...passwordData,
                    confirmPassword:
                      e
                        .target
                        .value,
                  }
                )
              }
            />

            <button
              className="settings-btn"
              onClick={
                handlePasswordUpdate
              }
            >
              Update
              Password
            </button>
          </div>
        )}

        {activeTab ===
          "account" && (
          <div className="settings-card">
            <h2>
              Account
              Information
            </h2>

            <div className="info-item">
              <strong>
                Role:
              </strong>{" "}
              Administrator
            </div>

            <div className="info-item">
              <strong>
                Created:
              </strong>{" "}
              {new Date(
                profile.createdAt
              ).toLocaleDateString()}
            </div>

            <div className="info-item">
              <strong>
                Updated:
              </strong>{" "}
              {new Date(
                profile.updatedAt
              ).toLocaleDateString()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminSettings;