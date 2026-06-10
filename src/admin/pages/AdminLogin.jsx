import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminLogin.css";
import { saveAdminToken } from "../utils/adminAuth";
import API_BASE_URL from "../../config/api";
function AdminLogin() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("admin@vishalportfolio.com");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");
  const [loading, setLoading] = useState(false);

  const API = `${API_BASE_URL}/api/admin`;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (data.success) {
        saveAdminToken(data.token);
        navigate("/admin/dashboard");
      } else {
        alert(data.message);
      }
    } catch {
      alert("Login failed");
    }

    setLoading(false);
  };

  const sendOtp = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${API}/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        setSuccessMessage(
          "Verification code sent successfully."
        );
        setMode("reset");
      } else {
        alert(data.message);
      }
    } catch {
      alert("OTP send failed");
    }

    setLoading(false);
  };

  const resetPassword = async () => {
    if (
      newPassword !==
      confirmPassword
    ) {
      alert(
        "Passwords do not match"
      );
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${API}/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email,
            otp,
            newPassword,
          }),
        }
      );

      const data =
        await res.json();

      if (data.success) {
        setSuccessMessage(
          "Password updated successfully. Please login."
        );

        setMode("login");

        setOtp("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        alert(data.message);
      }
    } catch {
      alert("Reset failed");
    }

    setLoading(false);
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <h1>Admin Access</h1>
        <p className="admin-subtitle">
          {mode === "login" &&
            "Secure administrator access to the portfolio management system."}

          {mode === "forgot" &&
            "Enter your administrator email to receive a verification code."}

          {mode === "reset" &&
            "Enter the verification code and create a new secure password."}
        </p>
        {successMessage && (
          <div className="success-banner">
            {successMessage}
          </div>
        )}

        {mode === "login" && (

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Login"}
            </button>

            <p
              className="admin-link"
              onClick={() => setMode("forgot")}
            >
              Forgot Password?
            </p>
          </form>
        )}

        {mode === "forgot" && (
          <>
            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button onClick={sendOtp}>
              Send OTP
            </button>

            <p
              className="admin-link"
              onClick={() => setMode("login")}
            >
              Back to Login
            </p>
          </>
        )}

        {mode === "reset" && (
          <>
            <input
              type="text"
              placeholder="Verification Code"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value)
              }
            />

            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(
                  e.target.value
                )
              }
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
            />

            <button
              onClick={resetPassword}
            >
              Reset Password
            </button>

            <p
              className="admin-link"
              onClick={() =>
                setMode("login")
              }
            >
              Back to Login
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default AdminLogin;