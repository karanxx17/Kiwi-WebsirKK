import React, { useState } from "react";
import { reelsAPI } from "../services/api";

const ReelForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    caption: "",
    image: "",
    music: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await reelsAPI.create(formData);
      setFormData({
        caption: "",
        image: "",
        music: "",
      });
      setMessage("Reel created successfully!");
      setTimeout(() => setMessage(""), 3000);
      onSuccess();
    } catch (error) {
      setMessage(error.response?.data?.message || "Error creating reel");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-card">
      <h3>Create New Reel</h3>
      <textarea
        name="caption"
        placeholder="Reel caption"
        value={formData.caption}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={formData.image}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="music"
        placeholder="Music title"
        value={formData.music}
        onChange={handleChange}
      />
      {message && <p className="message">{message}</p>}
      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Reel"}
      </button>
    </form>
  );
};

export default ReelForm;
