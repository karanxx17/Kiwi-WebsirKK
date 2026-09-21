import React, { useState, useEffect, useCallback } from "react";
import { storiesAPI, postsAPI, reelsAPI, employeesAPI } from "../services/api";

import StoryForm from "../components/StoryForm";
import PostForm from "../components/PostForm";
import ReelForm from "../components/ReelForm";
import EmployeeForm from "../components/EmployeeForm";
import ProfileForm from "../components/ProfileForm";
import Blogs from "../components/blogs"; // 👈 ADD THIS

import "./Dashboard.css";

const Dashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState("stories");
  const [stories, setStories] = useState([]);
  const [posts, setPosts] = useState([]);
  const [reels, setReels] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [editingPost, setEditingPost] = useState(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      if (activeTab === "stories") {
        const { data } = await storiesAPI.getAll();
        setStories(data);
      } else if (activeTab === "posts") {
        const { data } = await postsAPI.getAll();
        setPosts(data);
      } else if (activeTab === "reels") {
        const { data } = await reelsAPI.getAll();
        setReels(data);
      } else if (activeTab === "employees") {
        const { data } = await employeesAPI.getAll();
        setEmployees(data);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleDelete = async (id, type) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      try {
        if (type === "story") {
          await storiesAPI.delete(id);
          setStories(stories.filter((s) => s._id !== id));
        } else if (type === "post") {
          await postsAPI.delete(id);
          setPosts(posts.filter((p) => p._id !== id));
        } else if (type === "reel") {
          await reelsAPI.delete(id);
          setReels(reels.filter((r) => r._id !== id));
        } else if (type === "employee") {
          await employeesAPI.delete(id);
          setEmployees(employees.filter((e) => e._id !== id));
        }
      } catch (error) {
        alert("Error deleting item");
      }
    }
  };

  const [quickComment, setQuickComment] = useState({
    postId: null,
    text: "",
    authorId: "admin",
  });

  const handleAddComment = async (postId) => {
    if (!quickComment.text.trim()) return;
    try {
      await postsAPI.addComment(postId, {
        text: quickComment.text,
        authorId:
          quickComment.authorId === "admin" ? null : quickComment.authorId,
        onModel:
          quickComment.authorId === "admin" ? "User" : "Employee",
      });

      setQuickComment({ postId: null, text: "", authorId: "admin" });
      loadData();
      alert("Comment posted successfully!");
    } catch (err) {
      alert("Error posting comment");
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>KiwiGram Admin Dashboard</h1>
        <p>Welcome, {user?.name}</p>
      </header>

      {/* ✅ TABS */}
      <div className="tabs">
        <button
          className={activeTab === "stories" ? "active" : ""}
          onClick={() => setActiveTab("stories")}
        >
          Stories
        </button>

        <button
          className={activeTab === "posts" ? "active" : ""}
          onClick={() => setActiveTab("posts")}
        >
          Posts
        </button>

        <button
          className={activeTab === "reels" ? "active" : ""}
          onClick={() => setActiveTab("reels")}
        >
          Reels
        </button>

        <button
          className={activeTab === "employees" ? "active" : ""}
          onClick={() => setActiveTab("employees")}
        >
          Employees
        </button>

        {/* 👇 NEW BLOG TAB */}
        <button
          className={activeTab === "blogs" ? "active" : ""}
          onClick={() => setActiveTab("blogs")}
        >
          Blogs
        </button>

        <button
          className={activeTab === "profile" ? "active" : ""}
          onClick={() => setActiveTab("profile")}
        >
          My Profile
        </button>
      </div>

      <div className="content">
        {loading && <div className="loading">Loading...</div>}

        {/* STORIES */}
        {activeTab === "stories" && (
          <>
            <StoryForm onSuccess={loadData} employees={employees} />
            <div className="items-list">
              {stories.map((story) => (
                <div key={story._id} className="item-card">
                  <img src={story.image} alt="Story" />
                  <p>{story.caption}</p>
                  <button
                    onClick={() => handleDelete(story._id, "story")}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* POSTS */}
        {activeTab === "posts" && (
          <>
            <PostForm
              onSuccess={() => {
                loadData();
                setEditingPost(null);
              }}
              initialData={editingPost}
              onCancel={() => setEditingPost(null)}
            />

            <div className="items-list">
              {posts.map((post) => (
                <div key={post._id} className="item-card">
                  <img src={post.image} alt="Post" />
                  <h4>{post.caption}</h4>
                  <p>
                    Likes: {post.likes} | Comments:{" "}
                    {post.comments?.length || 0}
                  </p>

                  <div>
                    <button
                      onClick={() => setEditingPost(post)}
                      className="edit-btn"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(post._id, "post")}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* REELS */}
        {activeTab === "reels" && (
          <>
            <ReelForm onSuccess={loadData} />

            <div className="items-list">
              {reels.map((reel) => (
                <div key={reel._id} className="item-card">
                  <img src={reel.image} alt="Reel" />
                  <h4>{reel.caption}</h4>
                  <p>
                    Views: {reel.views} | Likes: {reel.likes}
                  </p>

                  <button
                    onClick={() => handleDelete(reel._id, "reel")}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* EMPLOYEES */}
        {activeTab === "employees" && (
          <>
            <EmployeeForm
              onSuccess={() => {
                loadData();
                setEditingEmployee(null);
              }}
              initialData={editingEmployee}
              onCancel={() => setEditingEmployee(null)}
            />

            <div className="items-list">
              {employees.map((employee) => (
                <div key={employee._id} className="item-card">
                  <img
                    src={employee.image}
                    alt={employee.name}
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                    }}
                  />
                  <h4>{employee.name}</h4>
                  <p>{employee.role}</p>

                  <button onClick={() => setEditingEmployee(employee)}>
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(employee._id, "employee")}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* 👇 BLOGS TAB (NEW) */}
        {activeTab === "blogs" && <Blogs />}

        {/* PROFILE */}
        {activeTab === "profile" && (
          <ProfileForm
            user={user}
            onSuccess={() => window.location.reload()}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;