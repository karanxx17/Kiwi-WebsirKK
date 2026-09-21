import React, { useState, useEffect } from "react";
import { employeesAPI } from "../services/api";

const EmployeeForm = ({ onSuccess, initialData = null, onCancel = null }) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");
  const [followersCount, setFollowersCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setRole(initialData.role || "");
      setBio(initialData.bio || "");
      setImage(initialData.image || "");
      setFollowersCount(initialData.followersCount || 0);
    }
  }, [initialData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !role) {
      alert("Name and role are required");
      return;
    }
    setLoading(true);
    try {
      const employeeData = { name, role, bio, image, followersCount: Number(followersCount) };
      if (initialData && initialData._id) {
        await employeesAPI.update(initialData._id, employeeData);
      } else {
        await employeesAPI.create(employeeData);
      }
      if (!initialData) {
        setName("");
        setRole("");
        setBio("");
        setImage("");
        setFollowersCount(0);
      }
      if (onSuccess) onSuccess();
    } catch (error) {
      alert(initialData ? "Error updating employee" : "Error creating employee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-card">
      <h3>{initialData ? "Edit Employee" : "Add New Employee"}</h3>
      
      <input
        type="text"
        placeholder="Employee Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        spellCheck={false}
      />
      
      <input
        type="text"
        placeholder="Role (e.g. Senior Frontend Developer)"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        required
        spellCheck={false}
      />
      
      <textarea
        placeholder="Bio (optional)"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        spellCheck={false}
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
          required={!initialData && !image}
          style={{ marginBottom: 0, padding: "8px", border: "1px solid #ddd", flex: 1 }}
        />
        {image && (
          <img 
            src={image} 
            alt="Preview" 
            style={{ width: "45px", height: "45px", borderRadius: "50%", objectFit: "cover" }} 
          />
        )}
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <button type="submit" disabled={loading} style={{ flex: 1 }}>
          {loading ? "Saving..." : (initialData ? "Update Employee" : "Add Employee")}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} style={{ flex: 1, backgroundColor: "#ccc" }}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default EmployeeForm;
