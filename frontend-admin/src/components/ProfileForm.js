import React, { useState, useEffect } from "react";
import { usersAPI } from "../services/api";

const ProfileForm = ({ user, onSuccess }) => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [followersCount, setFollowersCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setBio(user.bio || "");
      setAvatar(user.avatar || "");
      setFollowersCount(user.followersCount || 0);
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      alert("Name is required");
      return;
    }
    setLoading(true);
    try {
      await usersAPI.updateProfile({ name, bio, avatar, followersCount: Number(followersCount) });
      alert("Profile updated successfully!");
      if (onSuccess) onSuccess();
    } catch (error) {
      alert("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-card" style={{ maxWidth: "500px", margin: "20px auto" }}>
      <h3>Edit Admin Profile</h3>
      
      <input
        type="text"
        placeholder="Admin Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        spellCheck={false}
      />
      
      <textarea
        placeholder="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        spellCheck={false}
        rows={4}
      />

      <div style={{ marginBottom: "15px" }}>
        <label style={{ fontSize: "12px", color: "#666", marginBottom: "5px", display: "block" }}>Followers Count:</label>
        <input
          type="number"
          placeholder="Followers Count"
          value={followersCount}
          onChange={(e) => setFollowersCount(e.target.value)}
          spellCheck={false}
          style={{ marginBottom: 0 }}
        />
      </div>
      
      <div style={{ marginBottom: "15px", display: "flex", alignItems: "center", gap: "10px" }}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ marginBottom: 0, padding: "8px", border: "1px solid #ddd", flex: 1 }}
        />
        {avatar && (
          <img 
            src={avatar} 
            alt="Avatar Preview" 
            style={{ width: "45px", height: "45px", borderRadius: "50%", objectFit: "cover" }} 
          />
        )}
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save Profile"}
      </button>
    </form>
  );
};

export default ProfileForm;
