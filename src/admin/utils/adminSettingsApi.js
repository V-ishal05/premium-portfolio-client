import { getAdminToken }
from "./adminAuth";
import API_BASE_URL from "../../config/api";
const API =
  `${API_BASE_URL}/api/admin/settings`;

export const getProfile =
  async () => {
    const response =
      await fetch(
        `${API}/profile`,
        {
          headers: {
            Authorization:
              `Bearer ${getAdminToken()}`
          }
        }
      );

    return response.json();
  };

export const updateProfile =
  async (profileData) => {
    const response =
      await fetch(
        `${API}/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
            Authorization:
              `Bearer ${getAdminToken()}`
          },
          body: JSON.stringify(
            profileData
          )
        }
      );

    return response.json();
  };

export const updatePassword =
  async (passwordData) => {
    const response =
      await fetch(
        `${API}/password`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
            Authorization:
              `Bearer ${getAdminToken()}`
          },
          body: JSON.stringify(
            passwordData
          )
        }
      );

    return response.json();
  };