import { useEffect, useRef, useState } from "react";
import {
  getProfile,
  updateProfile,
  uploadProfilePhoto,
} from "../services/profileService";
import "../styles/profile.css";

function Profile() {

  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);

  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    async function loadProfile() {

      try {

        const data = await getProfile();

        setProfile(data);

        setFormData({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
        });

      } catch (error) {

        console.log(error);

      }
    }

    loadProfile();

  }, []);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSave = async () => {

    try {

      const updated = await updateProfile(formData);

      setProfile(updated);

      setEditing(false);

      alert("Profile updated successfully.");

    } catch (error) {

      console.log(error);

      alert("Unable to update profile.");

    }

  };

  const handleCancel = () => {

    setFormData({
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      address: profile.address,
    });

    setEditing(false);

  };

const handleAvatar = async (e) => {

    const file = e.target.files[0];

    if (!file) return;


    try {

        await uploadProfilePhoto(file);


        const updatedProfile = await getProfile();

        setProfile(updatedProfile);


        alert("Profile photo updated successfully");


    } catch(error) {

        console.log(error);

        alert("Photo upload failed");

    }

};

  if (!profile) {

    return <h2>Loading...</h2>;

  }

  return (

    <div className="profile-page">

      {/* Header */}

      <div className="profile-header">

        <div className="avatar-box">

<img
    src={
        profile.profileImage
        ? `http://localhost:8080/uploads/profile/${profile.profileImage}`
        : `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=2563eb&color=fff`
    }
    alt={profile.name}
/>

          <button
            className="avatar-btn"
            onClick={() => fileInputRef.current.click()}
          >
            Change Photo
          </button>

          <input
            type="file"
            hidden
            ref={fileInputRef}
            accept="image/*"
            onChange={handleAvatar}
          />

        </div>

        <div>

          <h1>{profile.name}</h1>

        <p>{profile.role}</p>

       <span className={`badge ${(profile.badge || "bronze").toLowerCase()}`}>
    {profile.badge || "Bronze"}
</span>

        </div>

      </div>

      {/* Statistics */}

      <div className="stats-grid">

        <div className="stat-card">
          <h2>{profile.reportsSubmitted}</h2>
          <p>Reports Submitted</p>
        </div>

        <div className="stat-card">
          <h2>{profile.reportsResolved}</h2>
          <p>Reports Resolved</p>
        </div>

        <div className="stat-card">
          <h2>{profile.reportsPending}</h2>
          <p>Reports Pending</p>
        </div>

        <div className="stat-card">
          <h2>{profile.points}</h2>
          <p>Civic Points</p>
        </div>

      </div>

      {/* Personal Information */}

      <div className="profile-info">

        <h2>Personal Information</h2>

        {editing ? (

          <>

            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
            />

          <p>
          <strong>Email:</strong> {profile.email}
          </p>

            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />

            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
            />

            <div className="profile-buttons">

              <button
                className="save-btn"
                onClick={handleSave}
              >
                Save
              </button>

              <button
                className="cancel-btn"
                onClick={handleCancel}
              >
                Cancel
              </button>

            </div>

          </>

        ) : (

          <>

            <p><strong>Name:</strong> {profile.name}</p>

            <p><strong>Email:</strong> {profile.email}</p>

            <p><strong>Phone:</strong> {profile.phone}</p>

            <p><strong>Address:</strong> {profile.address}</p>

            <button
              className="edit-btn"
              onClick={() => setEditing(true)}
            >
              Edit Profile
            </button>

          </>

        )}

      </div>

    </div>

  );

}

export default Profile;