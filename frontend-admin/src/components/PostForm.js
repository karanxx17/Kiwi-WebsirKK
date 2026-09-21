import React, { useState, useRef, useEffect } from "react";
import { postsAPI } from "../services/api";

const API_BASE = process.env.REACT_APP_API_URL || "https://backend.kiwiconnectdigital.com/api";

const PostForm = ({ onSuccess, initialData, onCancel }) => {
  const [formData, setFormData] = useState({
    caption: "",
    location: "",
    badge: "",
    tags: "",
    music: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [employees, setEmployees] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState("admin");
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetch(`${API_BASE}/employees`)
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((err) => console.error("Error fetching employees:", err));
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData({
        caption: initialData.caption || "",
        location: initialData.location || "",
        badge: initialData.badge || "",
        tags: Array.isArray(initialData.tags) ? initialData.tags.join(", ") : initialData.tags || "",
        music: initialData.music || "",
      });
      setImagePreview(initialData.image || null);
      setImageFile(null);
      
      if (initialData.onModel === "Employee") {
        setSelectedAuthor(initialData.author?._id || "admin");
      } else {
        setSelectedAuthor("admin");
      }
    } else {
      setFormData({ caption: "", location: "", badge: "", tags: "", music: "" });
      setImagePreview(null);
      setImageFile(null);
      setSelectedAuthor("admin");
    }
  }, [initialData]);

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

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile && !initialData) {
      setMessage({ text: "Please select an image to upload.", type: "error" });
      return;
    }

    setLoading(true);

    try {
      let finalImageUrl = initialData?.image;

      // Only upload if a new file is chosen
      if (imageFile) {
        setUploadProgress("Uploading image to MongoDB...");
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
        finalImageUrl = `https://backend.kiwiconnectdigital.com${uploadResult.imageUrl}`;
      }

      setUploadProgress(initialData ? "Updating post..." : "Saving post...");
      const postData = {
        ...formData,
        image: finalImageUrl,
        authorId: selectedAuthor === "admin" ? null : selectedAuthor,
        onModel: selectedAuthor === "admin" ? "User" : "Employee",
        tags: formData.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };

      if (initialData) {
        await postsAPI.update(initialData._id, postData);
        setMessage({ text: "✅ Post updated successfully!", type: "success" });
      } else {
        await postsAPI.create(postData);
        // Reset form only on creation
        setFormData({ caption: "", location: "", badge: "", tags: "", music: "" });
        setImageFile(null);
        setImagePreview(null);
        setSelectedAuthor("admin");
        setMessage({ text: "✅ Post created successfully!", type: "success" });
      }

      setTimeout(() => setMessage({ text: "", type: "" }), 4000);
      onSuccess();
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || error.message || "Error saving post",
        type: "error",
      });
    } finally {
      setLoading(false);
      setUploadProgress("");
    }
  };

  return (
    <div style={styles.wrapper}>
      <h3 style={styles.title}>{initialData ? "✏️ Edit Post" : "📸 Create New Post"}</h3>

      {/* Post As Selector */}
      <div style={{ marginBottom: 15 }}>
        <label style={{ fontSize: 13, fontWeight: 600, color: "#666", display: "block", marginBottom: 5 }}>
          🎭 Post As:
        </label>
        <select 
          value={selectedAuthor} 
          onChange={(e) => setSelectedAuthor(e.target.value)}
          style={styles.input}
        >
          <option value="admin">Admin (Default)</option>
          <optgroup label="Employees">
            {employees.map(emp => (
              <option key={emp._id} value={emp._id}>{emp.name} ({emp.role})</option>
            ))}
          </optgroup>
        </select>
      </div>

      {/* Image Drop Zone */}
      <div
        style={{
          ...styles.dropZone,
          ...(imagePreview ? styles.dropZoneWithImage : {}),
        }}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => fileInputRef.current?.click()}
      >
        {imagePreview ? (
          <img src={imagePreview} alt="Preview" style={styles.previewImg} />
        ) : (
          <div style={styles.dropZoneContent}>
            <span style={styles.uploadIcon}>🖼️</span>
            <p style={styles.dropZoneText}>
              <strong>Click or drag & drop</strong> to upload an image
            </p>
            <p style={styles.dropZoneHint}>Supports JPG, PNG, WEBP</p>
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

      {imagePreview && (
        <button
          type="button"
          onClick={() => {
            setImageFile(null);
            setImagePreview(null);
          }}
          style={styles.removeBtn}
        >
          ✕ Remove Image
        </button>
      )}

      {/* Caption */}
      <textarea
        name="caption"
        placeholder="Write a caption... (use #hashtags)"
        value={formData.caption}
        onChange={handleChange}
        required
        style={styles.textarea}
      />

      {/* Location */}
      <div style={styles.row}>
        <input
          type="text"
          name="location"
          placeholder="📍 Add location"
          value={formData.location}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="badge"
          placeholder="🏷️ Badge (e.g. Brand Story)"
          value={formData.badge}
          onChange={handleChange}
          style={styles.input}
        />
      </div>

      {/* Tags */}
      <input
        type="text"
        name="tags"
        placeholder="🔖 Tags (comma separated, e.g. #Marketing, #Growth)"
        value={formData.tags}
        onChange={handleChange}
        style={styles.input}
      />

      {/* Music */}
      <input
        type="text"
        name="music"
        placeholder="🎵 Music (e.g. Brand New Day — Kiwi Mix)"
        value={formData.music}
        onChange={handleChange}
        style={styles.input}
      />

      {/* Feedback */}
      {message.text && (
        <p
          style={{
            ...styles.message,
            color: message.type === "error" ? "#e53e3e" : "#38a169",
            background: message.type === "error" ? "#fff5f5" : "#f0fff4",
            border: `1px solid ${message.type === "error" ? "#fed7d7" : "#c6f6d5"}`,
          }}
        >
          {message.text}
        </p>
      )}

      {loading && uploadProgress && (
        <p style={styles.progress}>⏳ {uploadProgress}</p>
      )}

      <div style={{ display: 'flex', gap: '10px' }}>
        <button type="submit" disabled={loading} style={styles.submitBtn} onClick={handleSubmit}>
          {loading ? "Saving..." : initialData ? "💾 Update Post" : "🚀 Publish Post"}
        </button>
        {initialData && (
          <button 
            type="button" 
            onClick={onCancel} 
            style={{ ...styles.submitBtn, background: "#888", flex: 0.3 }}
          >
            Cancel
          </button>
        )}
      </div>
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
  dropZone: {
    border: "2px dashed #d0ccc5",
    borderRadius: 12,
    padding: 32,
    textAlign: "center",
    cursor: "pointer",
    transition: "border-color .2s, background .2s",
    background: "#fafaf7",
    marginBottom: 12,
  },
  dropZoneWithImage: {
    border: "2px solid #ba3aff",
    padding: 0,
    overflow: "hidden",
    background: "#000",
  },
  dropZoneContent: { pointerEvents: "none" },
  uploadIcon: { fontSize: 36 },
  dropZoneText: { margin: "8px 0 4px", fontSize: 14, color: "#333" },
  dropZoneHint: { margin: 0, fontSize: 12, color: "#888" },
  previewImg: {
    width: "100%",
    maxHeight: 360,
    objectFit: "cover",
    display: "block",
  },
  removeBtn: {
    background: "none",
    border: "1px solid #e53e3e",
    color: "#e53e3e",
    borderRadius: 8,
    padding: "4px 12px",
    fontSize: 12,
    cursor: "pointer",
    marginBottom: 12,
  },
  row: { display: "flex", gap: 10, marginBottom: 10 },
  input: {
    flex: 1,
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid #e0ddd8",
    fontSize: 14,
    fontFamily: "inherit",
    outline: "none",
    background: "#fafaf7",
    marginBottom: 10,
    width: "100%",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    minHeight: 90,
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid #e0ddd8",
    fontSize: 14,
    fontFamily: "inherit",
    outline: "none",
    resize: "vertical",
    background: "#fafaf7",
    marginBottom: 10,
    boxSizing: "border-box",
  },
  message: {
    padding: "10px 14px",
    borderRadius: 8,
    fontSize: 13,
    marginBottom: 10,
  },
  progress: {
    color: "#805ad5",
    fontSize: 13,
    marginBottom: 10,
  },
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
    fontFamily: "inherit",
    letterSpacing: ".3px",
  },
};

export default PostForm;
