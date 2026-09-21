import React, { useState, useRef } from "react";
import { storiesAPI } from "../services/api";

const API_BASE = process.env.REACT_APP_API_URL || "https://backend.kiwiconnectdigital.com/api";

const StoryForm = ({ onSuccess, employees = [] }) => {
  const [formData, setFormData] = useState({ 
    caption: "",
    authorId: "admin",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage({ text: "Please select a valid image file.", type: "error" });
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setMessage({ text: "", type: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      setMessage({ text: "Please select an image for your story.", type: "error" });
      return;
    }

    setLoading(true);

    try {
      setUploadProgress("Uploading story image...");
      const uploadFormData = new FormData();
      uploadFormData.append("file", imageFile);

      const uploadResponse = await fetch(`${API_BASE}/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: uploadFormData,
      });

      if (!uploadResponse.ok) {
        throw new Error("Image upload failed");
      }

      const uploadResult = await uploadResponse.json();
      const finalImageUrl = `https://backend.kiwiconnectdigital.com${uploadResult.imageUrl}`;

      const storyData = {
        image: finalImageUrl,
        caption: formData.caption,
        authorId: formData.authorId === "admin" ? null : formData.authorId,
        onModel: formData.authorId === "admin" ? "User" : "Employee"
      };

      await storiesAPI.create(storyData);
      
      setFormData({ caption: "", authorId: "admin" });
      setImageFile(null);
      setImagePreview(null);
      setMessage({ text: "✅ Story posted successfully!", type: "success" });
      
      setTimeout(() => setMessage({ text: "", type: "" }), 4000);
      onSuccess();
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || error.message || "Error posting story",
        type: "error",
      });
    } finally {
      setLoading(false);
      setUploadProgress("");
    }
  };

  return (
    <div style={styles.wrapper}>
      <h3 style={styles.title}>✨ Post New Story</h3>

      <div style={{ marginBottom: 15 }}>
        <label style={styles.label}>🎭 Post As:</label>
        <select 
          name="authorId"
          value={formData.authorId} 
          onChange={handleChange}
          style={styles.input}
        >
          <option value="admin">Admin (Self)</option>
          {employees.map(emp => (
            <option key={emp._id} value={emp._id}>{emp.name}</option>
          ))}
        </select>
      </div>

      <div
        style={{
          ...styles.dropZone,
          ...(imagePreview ? styles.dropZoneWithImage : {}),
        }}
        onClick={() => fileInputRef.current?.click()}
      >
        {imagePreview ? (
          <img src={imagePreview} alt="Preview" style={styles.previewImg} />
        ) : (
          <div style={styles.dropZoneContent}>
            <span style={styles.uploadIcon}>📸</span>
            <p style={styles.dropZoneText}>Click to upload story image</p>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </div>

      <textarea
        name="caption"
        placeholder="Add a story caption... (optional)"
        value={formData.caption}
        onChange={handleChange}
        style={styles.textarea}
      />

      {message.text && (
        <p style={{
          ...styles.message,
          color: message.type === "error" ? "#e53e3e" : "#38a169",
          background: message.type === "error" ? "#fff5f5" : "#f0fff4",
        }}>
          {message.text}
        </p>
      )}

      {loading && uploadProgress && (
        <p style={styles.progress}>⏳ {uploadProgress}</p>
      )}

      <button onClick={handleSubmit} disabled={loading} style={styles.submitBtn}>
        {loading ? "Posting..." : "🚀 Share to Story"}
      </button>
    </div>
  );
};

const styles = {
  wrapper: {
    background: "#fff",
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    boxShadow: "0 2px 16px rgba(0,0,0,.08)",
    border: "1px solid #eae6e0",
  },
  title: {
    margin: "0 0 16px",
    fontSize: 18,
    fontWeight: 700,
    color: "#1a1a1a",
  },
  label: { fontSize: 13, fontWeight: 600, color: "#666", display: "block", marginBottom: 5 },
  input: {
    width: "100%",
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid #e0ddd8",
    fontSize: 14,
    outline: "none",
    background: "#fafaf7",
    boxSizing: "border-box",
  },
  dropZone: {
    border: "2px dashed #d0ccc5",
    borderRadius: 12,
    aspectRatio: "9/16",
    maxHeight: "300px",
    margin: "15px auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    background: "#fafaf7",
    overflow: "hidden",
  },
  dropZoneWithImage: {
    border: "2px solid #ff6ce7",
  },
  dropZoneContent: { textAlign: "center" },
  uploadIcon: { fontSize: 32 },
  dropZoneText: { fontSize: 13, color: "#888", marginTop: 10 },
  previewImg: { width: "100%", height: "100%", objectFit: "cover" },
  textarea: {
    width: "100%",
    minHeight: 60,
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid #e0ddd8",
    fontSize: 14,
    outline: "none",
    resize: "none",
    background: "#fafaf7",
    marginBottom: 10,
    boxSizing: "border-box",
  },
  message: { padding: "10px", borderRadius: 8, fontSize: 13, marginBottom: 10 },
  progress: { color: "#ff6ce7", fontSize: 13, marginBottom: 10, textAlign: "center" },
  submitBtn: {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(135deg,#ff6ce7,#ba3aff)",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
  },
};

export default StoryForm;
