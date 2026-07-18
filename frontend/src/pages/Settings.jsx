import { useState } from "react";
import {
  changePassword,
  deleteAccount,
} from "../services/settingsService";

import "../styles/settings.css";

function Settings() {

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordChange = async () => {

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {

      const response = await changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      alert(response);

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Unable to change password."
      );

    }

  };

  const handleDeleteAccount = async () => {

    const confirmDelete = window.confirm(
      "Are you sure you want to permanently delete your account?"
    );

    if (!confirmDelete) return;

    try {

      const response = await deleteAccount();

      alert(response);

      localStorage.removeItem("token");

      window.location.href = "/login";

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Unable to delete account."
      );

    }

  };

  return (

    <div className="settings-page">

      <h1>⚙️ Account Settings</h1>

      <div className="settings-card">

        <h2>Security</h2>

        <input
          type="password"
          placeholder="Current Password"
          value={passwordData.currentPassword}
          onChange={(e) =>
            setPasswordData({
              ...passwordData,
              currentPassword: e.target.value,
            })
          }
        />

        <input
          type="password"
          placeholder="New Password"
          value={passwordData.newPassword}
          onChange={(e) =>
            setPasswordData({
              ...passwordData,
              newPassword: e.target.value,
            })
          }
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          value={passwordData.confirmPassword}
          onChange={(e) =>
            setPasswordData({
              ...passwordData,
              confirmPassword: e.target.value,
            })
          }
        />

        <button
          className="secondary-btn"
          onClick={handlePasswordChange}
          style={{ marginTop: "20px" }}
        >
          Change Password
        </button>

      </div>

      <div className="danger-card">

        <h2>Danger Zone</h2>

        <p>
          Deleting your account is permanent and cannot be undone.
        </p>

        <button
          className="danger-btn"
          onClick={handleDeleteAccount}
        >
          Delete Account
        </button>

      </div>

    </div>

  );

}

export default Settings;