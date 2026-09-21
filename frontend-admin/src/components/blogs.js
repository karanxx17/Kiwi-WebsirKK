import React from "react";

const API = "http://localhost:5100/api/blogs";

const CATEGORIES = [
  "Social Media", "SEO", "Google Ads", "Content", "Branding",
  "Website", "YouTube", "Email Marketing", "Case Study", "Other",
];

export default function BlogAdminPage() {
  const [blogs, setBlogs] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);
  const [toast, setToast] = React.useState(null);
  const [deleteConfirm, setDeleteConfirm] = React.useState(null);
  const [search, setSearch] = React.useState("");
  const [previewUrl, setPreviewUrl] = React.useState(null);
  const formRef = React.useRef(null);

  const [formData, setFormData] = React.useState({
    title: "", excerpt: "", content: "", category: "", author: "", photo: null,
  });

  const showToast = (msg, type = "ok") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  React.useEffect(() => { fetchBlogs(); }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/get-all-blogs`);
      const data = await res.json();
      setBlogs(data.blogs || data || []);
    } catch { showToast("Failed to fetch blogs", "err"); }
    finally { setLoading(false); }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, photo: file }));
    setPreviewUrl(file ? URL.createObjectURL(file) : null);
  };

  const resetForm = () => {
    setFormData({ title: "", excerpt: "", content: "", category: "", author: "", photo: null });
    setEditingId(null);
    setPreviewUrl(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      showToast("Title and content are required", "err"); return;
    }
    try {
      setSubmitting(true);
      const data = new FormData();
      data.append("title", formData.title);
      data.append("excerpt", formData.excerpt);
      data.append("content", formData.content);
      data.append("description", formData.content); // some backends use description
      data.append("category", formData.category);
      data.append("author", formData.author);
      if (formData.photo) data.append("photo", formData.photo);

      const url = editingId ? `${API}/update-blog/${editingId}` : `${API}/add-blog`;
      const res = await fetch(url, { method: editingId ? "PUT" : "POST", body: data });
      const result = await res.json();

      if (result.success || res.ok) {
        showToast(editingId ? "Blog updated!" : "Blog published!");
        resetForm();
        fetchBlogs();
      } else {
        showToast(result.message || "Something went wrong", "err");
      }
    } catch { showToast("Error saving blog", "err"); }
    finally { setSubmitting(false); }
  };

  const handleEdit = (blog) => {
    setEditingId(blog._id);
    setFormData({ title: blog.title || "", excerpt: blog.excerpt || "", content: blog.content || blog.description || "", category: blog.category || "", author: blog.author || "", photo: null });
    setPreviewUrl(null);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API}/delete-blog/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success || res.ok) { showToast("Blog deleted"); fetchBlogs(); }
      else showToast(data.message || "Delete failed", "err");
    } catch { showToast("Error deleting blog", "err"); }
    finally { setDeleteConfirm(null); }
  };

  const filtered = blogs.filter(b =>
    !search.trim() ||
    b.title?.toLowerCase().includes(search.toLowerCase()) ||
    b.category?.toLowerCase().includes(search.toLowerCase()) ||
    b.author?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #0E0E0E; font-family: 'DM Sans', sans-serif; color: #E8E3DC; }

        @keyframes slideDown { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes shimmer { 0%{background-position:-400px 0} 100%{background-position:400px 0} }

        .admin-input {
          width:100%; padding:13px 16px;
          background:#181818; border:1.5px solid #2C2C2C;
          border-radius:12px; color:#E8E3DC;
          font-family:'DM Sans',sans-serif; font-size:14px; font-weight:500;
          outline:none; transition:border-color 0.2s,box-shadow 0.2s;
          appearance: none;
        }
        .admin-input:focus { border-color:#ff6ce7; box-shadow:0 0 0 3px rgba(255,108,231,0.12); }
        .admin-input::placeholder { color:#444; }
        select.admin-input { background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%23666' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 14px center; padding-right:36px; }
        select.admin-input option { background:#181818; }

        .blog-card { background:#161616; border:1.5px solid #222; border-radius:18px; overflow:hidden; transition:all 0.28s cubic-bezier(.22,.68,0,1.2); }
        .blog-card:hover { border-color:#ff6ce7; transform:translateY(-4px); box-shadow:0 20px 48px rgba(255,108,231,0.1); }

        .btn-primary { padding:13px 28px; border-radius:12px; border:none; background:linear-gradient(135deg,#ff6ce7,#b774db); color:#fff; font-family:'DM Sans',sans-serif; font-size:14px; font-weight:800; cursor:pointer; transition:all 0.2s; display:inline-flex; align-items:center; justify-content:center; gap:8px; }
        .btn-primary:hover:not(:disabled) { transform:translateY(-1px); box-shadow:0 8px 28px rgba(255,108,231,0.38); }
        .btn-primary:disabled { opacity:0.55; cursor:not-allowed; }

        .btn-ghost { padding:11px 20px; border-radius:11px; border:1.5px solid #2C2C2C; background:transparent; color:#777; font-family:'DM Sans',sans-serif; font-size:13px; font-weight:700; cursor:pointer; transition:all 0.2s; }
        .btn-ghost:hover { border-color:#555; color:#E8E3DC; background:#1E1E1E; }

        .btn-edit { padding:7px 14px; border-radius:8px; border:1.5px solid rgba(90,171,255,0.25); background:rgba(90,171,255,0.08); color:#5AABFF; font-family:'DM Sans',sans-serif; font-size:12px; font-weight:700; cursor:pointer; transition:all 0.2s; }
        .btn-edit:hover { background:rgba(90,171,255,0.18); border-color:rgba(90,171,255,0.5); }

        .btn-delete { padding:7px 14px; border-radius:8px; border:1.5px solid rgba(255,80,80,0.25); background:rgba(255,80,80,0.08); color:#FF6B6B; font-family:'DM Sans',sans-serif; font-size:12px; font-weight:700; cursor:pointer; transition:all 0.2s; }
        .btn-delete:hover { background:rgba(255,80,80,0.18); border-color:rgba(255,80,80,0.5); }

        .form-grid { display:grid; grid-template-columns:1fr; gap:14px; }
        @media(min-width:640px) { .form-grid { grid-template-columns:1fr 1fr; } }

        .blog-grid { display:grid; grid-template-columns:1fr; gap:20px; }
        @media(min-width:640px) { .blog-grid { grid-template-columns:repeat(2,1fr); } }
        @media(min-width:1024px) { .blog-grid { grid-template-columns:repeat(3,1fr); } }

        .skel { background:linear-gradient(90deg,#1A1A1A 25%,#222 50%,#1A1A1A 75%); background-size:400px 100%; animation:shimmer 1.4s infinite; border-radius:10px; }

        .overlay { position:fixed; inset:0; background:rgba(0,0,0,0.75); backdrop-filter:blur(4px); z-index:50; display:flex; align-items:center; justify-content:center; padding:20px; animation:fadeIn 0.2s ease; }
      `}</style>

      {/* Toast */}
      {toast && (
        <div style={{ position:"fixed", top:20, right:20, zIndex:999, padding:"13px 20px", borderRadius:12, background: toast.type==="ok" ? "linear-gradient(135deg,#ff6ce7,#b774db)" : "#FF4444", color:"#fff", fontSize:13, fontWeight:700, boxShadow:"0 8px 32px rgba(0,0,0,0.4)", animation:"slideDown 0.3s ease", display:"flex", alignItems:"center", gap:8 }}>
          <span>{toast.type==="ok" ? "✓" : "⚠"}</span> {toast.msg}
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <div className="overlay" onClick={() => setDeleteConfirm(null)}>
          <div onClick={e => e.stopPropagation()} style={{ background:"#161616", border:"1.5px solid #2A2A2A", borderRadius:20, padding:"32px 28px", maxWidth:380, width:"100%", textAlign:"center" }}>
            <div style={{ width:52, height:52, borderRadius:"50%", background:"rgba(255,80,80,0.1)", border:"1.5px solid rgba(255,80,80,0.3)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 18px", fontSize:22 }}>🗑</div>
            <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:20, fontWeight:800, marginBottom:8 }}>Delete Blog?</h3>
            <p style={{ fontSize:13, color:"#666", marginBottom:24, lineHeight:1.6 }}>This action cannot be undone.</p>
            <div style={{ display:"flex", gap:10, justifyContent:"center" }}>
              <button className="btn-ghost" onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} style={{ padding:"11px 24px", borderRadius:11, border:"none", background:"#FF4444", color:"#fff", fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:800, cursor:"pointer" }}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ minHeight:"100vh", background:"#0E0E0E", padding:"0 0 80px" }}>

        {/* Header */}
        <div style={{ borderBottom:"1px solid #1A1A1A", padding:"20px 5%", display:"flex", alignItems:"center", justifyContent:"space-between", gap:12, flexWrap:"wrap", position:"sticky", top:0, background:"rgba(14,14,14,0.92)", backdropFilter:"blur(12px)", zIndex:40 }}>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <div style={{ width:38, height:38, borderRadius:11, background:"linear-gradient(135deg,#ff6ce7,#b774db)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>✍️</div>
            <div>
              <div style={{ fontFamily:"'Syne',sans-serif", fontSize:18, fontWeight:800, letterSpacing:"-0.3px" }}>Blog Admin</div>
              <div style={{ fontSize:11, color:"#555", fontWeight:600 }}>Kiwi Connect Digital</div>
            </div>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ width:7, height:7, borderRadius:"50%", background:"#4ADE80", display:"inline-block", animation:"blink 2s infinite" }} />
            <span style={{ fontSize:12, color:"#555", fontWeight:600 }}>{blogs.length} blogs published</span>
          </div>
        </div>

        <div style={{ maxWidth:1200, margin:"0 auto", padding:"36px 5% 0" }}>

          {/* Form Card */}
          <div ref={formRef} style={{ background:"#141414", border:`1.5px solid ${editingId ? "#ff6ce7" : "#1E1E1E"}`, borderRadius:22, padding:"clamp(20px,4vw,36px)", marginBottom:40, boxShadow: editingId ? "0 0 0 4px rgba(255,108,231,0.07)" : "none", transition:"border-color 0.3s,box-shadow 0.3s" }}>

            {/* Form Header */}
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:26, flexWrap:"wrap", gap:12 }}>
              <div>
                <div style={{ fontSize:10, fontWeight:800, color:"#ff6ce7", letterSpacing:"2px", textTransform:"uppercase", marginBottom:6 }}>
                  {editingId ? "Editing post" : "New post"}
                </div>
                <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(20px,2.5vw,26px)", fontWeight:800, letterSpacing:"-0.5px" }}>
                  {editingId ? "Update Blog" : "Write a Blog"}
                </h2>
              </div>
              {editingId && (
                <span style={{ padding:"5px 14px", borderRadius:100, background:"rgba(255,108,231,0.12)", border:"1px solid rgba(255,108,231,0.3)", fontSize:11, fontWeight:700, color:"#ff6ce7" }}>
                  Edit Mode
                </span>
              )}
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-grid" style={{ marginBottom:14 }}>
                <div>
                  <label style={{ fontSize:11, fontWeight:700, color:"#555", letterSpacing:"1px", textTransform:"uppercase", display:"block", marginBottom:7 }}>Title <span style={{ color:"#ff6ce7" }}>*</span></label>
                  <input name="title" className="admin-input" placeholder="Your blog title…" value={formData.title} onChange={handleChange} required />
                </div>
                <div>
                  <label style={{ fontSize:11, fontWeight:700, color:"#555", letterSpacing:"1px", textTransform:"uppercase", display:"block", marginBottom:7 }}>Author</label>
                  <input name="author" className="admin-input" placeholder="Author name" value={formData.author} onChange={handleChange} />
                </div>
              </div>

              <div className="form-grid" style={{ marginBottom:14 }}>
                <div>
                  <label style={{ fontSize:11, fontWeight:700, color:"#555", letterSpacing:"1px", textTransform:"uppercase", display:"block", marginBottom:7 }}>Category</label>
                  <select name="category" className="admin-input" value={formData.category} onChange={handleChange}>
                    <option value="">Select category</option>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize:11, fontWeight:700, color:"#555", letterSpacing:"1px", textTransform:"uppercase", display:"block", marginBottom:7 }}>Cover Photo</label>
                  <label style={{ display:"flex", alignItems:"center", gap:10, padding:"11px 16px", background:"#181818", border:"1.5px dashed #2C2C2C", borderRadius:12, cursor:"pointer", transition:"border-color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.borderColor="#ff6ce7"}
                    onMouseLeave={e => e.currentTarget.style.borderColor="#2C2C2C"}
                  >
                    <span style={{ fontSize:18 }}>📷</span>
                    <span style={{ fontSize:13, color:"#555", fontWeight:500 }}>{formData.photo ? formData.photo.name : "Choose image…"}</span>
                    <input type="file" accept="image/*" onChange={handleFile} style={{ display:"none" }} />
                  </label>
                  {previewUrl && (
                    <div style={{ marginTop:8, position:"relative", display:"inline-block" }}>
                      <img src={previewUrl} alt="preview" style={{ height:56, width:80, objectFit:"cover", borderRadius:8, border:"1px solid #2A2A2A" }} />
                      <button type="button" onClick={() => { setPreviewUrl(null); setFormData(p => ({ ...p, photo:null })); }}
                        style={{ position:"absolute", top:-6, right:-6, width:20, height:20, borderRadius:"50%", background:"#FF4444", border:"none", color:"#fff", fontSize:11, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800 }}>×</button>
                    </div>
                  )}
                </div>
              </div>

              <div style={{ marginBottom:14 }}>
                <label style={{ fontSize:11, fontWeight:700, color:"#555", letterSpacing:"1px", textTransform:"uppercase", display:"block", marginBottom:7 }}>Short Excerpt <span style={{ color:"#ff6ce7" }}>*</span></label>
                <input name="excerpt" className="admin-input" placeholder="A short one-line summary of the blog…" value={formData.excerpt} onChange={handleChange} required />
              </div>

              <div style={{ marginBottom:22 }}>
                <label style={{ fontSize:11, fontWeight:700, color:"#555", letterSpacing:"1px", textTransform:"uppercase", display:"block", marginBottom:7 }}>Full Content <span style={{ color:"#ff6ce7" }}>*</span></label>
                <textarea name="content" className="admin-input" placeholder="Write your full blog content here… HTML is supported." value={formData.content} onChange={handleChange} rows={7} required style={{ resize:"vertical", minHeight:140, lineHeight:1.7 }} />
                <div style={{ textAlign:"right", fontSize:11, color:"#333", marginTop:4 }}>{formData.content.length} chars</div>
              </div>

              <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                <button type="submit" className="btn-primary" disabled={submitting}>
                  {submitting ? (
                    <><span style={{ width:14, height:14, borderRadius:"50%", border:"2px solid rgba(255,255,255,0.3)", borderTopColor:"#fff", display:"inline-block", animation:"spin 0.7s linear infinite" }} /> Saving…</>
                  ) : editingId ? "✓ Update Blog" : "🚀 Publish Blog"}
                </button>
                {editingId && <button type="button" className="btn-ghost" onClick={resetForm}>Cancel</button>}
              </div>
            </form>
          </div>

          {/* Search + Count Bar */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:12, marginBottom:24, flexWrap:"wrap" }}>
            <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(18px,2vw,22px)", fontWeight:800, letterSpacing:"-0.3px" }}>
              All Blogs <span style={{ color:"#333", fontWeight:600 }}>({filtered.length})</span>
            </h2>
            <div style={{ position:"relative", flex:"1 1 240px", maxWidth:340 }}>
              <span style={{ position:"absolute", left:13, top:"50%", transform:"translateY(-50%)", fontSize:14, pointerEvents:"none" }}>🔍</span>
              <input className="admin-input" placeholder="Search blogs…" value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft:36 }} />
              {search && <button onClick={() => setSearch("")} style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", color:"#555", fontSize:18, cursor:"pointer" }}>×</button>}
            </div>
          </div>

          {/* Blog Grid */}
          {loading ? (
            <div className="blog-grid">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} style={{ background:"#141414", border:"1.5px solid #1E1E1E", borderRadius:18, overflow:"hidden" }}>
                  <div className="skel" style={{ height:180 }} />
                  <div style={{ padding:18 }}>
                    <div className="skel" style={{ height:16, width:"70%", marginBottom:10 }} />
                    <div className="skel" style={{ height:12, marginBottom:7 }} />
                    <div className="skel" style={{ height:12, width:"85%" }} />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign:"center", padding:"80px 0" }}>
              <div style={{ fontSize:52, marginBottom:14 }}>📭</div>
              <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:20, fontWeight:800, marginBottom:8 }}>No blogs found</h3>
              <p style={{ color:"#555", fontSize:13 }}>{search ? "Try a different search." : "Create your first blog above."}</p>
              {search && <button className="btn-ghost" style={{ marginTop:16 }} onClick={() => setSearch("")}>Clear search</button>}
            </div>
          ) : (
            <div className="blog-grid">
              {filtered.map((blog) => (
                <div key={blog._id} className="blog-card">
                  {/* Cover */}
                  <div style={{ position:"relative", height:180, background:"#1A1A1A", overflow:"hidden" }}>
                    <img
                      src={`${API}/get-blog-photo/${blog._id}`}
                      alt={blog.title}
                      style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.4s ease" }}
                      onError={e => { e.target.src = `https://placehold.co/600x300/181818/333?text=${encodeURIComponent(blog.category || "Blog")}`; }}
                      onMouseEnter={e => e.target.style.transform="scale(1.05)"}
                      onMouseLeave={e => e.target.style.transform="scale(1)"}
                    />
                    <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom,transparent 40%,rgba(0,0,0,0.65))" }} />
                    {blog.category && (
                      <span style={{ position:"absolute", top:12, left:12, padding:"4px 12px", borderRadius:100, background:"#ff6ce7", color:"#fff", fontSize:10, fontWeight:800, letterSpacing:"0.8px", textTransform:"uppercase" }}>
                        {blog.category}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div style={{ padding:"18px 18px 20px" }}>
                    <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:16, fontWeight:800, color:"#E8E3DC", lineHeight:1.35, marginBottom:8, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>
                      {blog.title}
                    </h3>
                    <p style={{ fontSize:12, color:"#555", lineHeight:1.7, marginBottom:14, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>
                      {(blog.excerpt || blog.description || blog.content || "").replace(/<[^>]+>/g, "")}
                    </p>

                    {/* Meta */}
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14, paddingBottom:14, borderBottom:"1px solid #1E1E1E" }}>
                      <div style={{ width:24, height:24, borderRadius:"50%", background:"linear-gradient(135deg,#ff6ce7,#b774db)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:800, color:"#fff", flexShrink:0 }}>
                        {blog.author?.charAt(0)?.toUpperCase() || "K"}
                      </div>
                      <span style={{ fontSize:11, color:"#555", fontWeight:600 }}>{blog.author || "Unknown"}</span>
                      <span style={{ marginLeft:"auto", fontSize:10, color:"#333", fontWeight:600 }}>
                        {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" }) : "—"}
                      </span>
                    </div>

                    {/* Actions */}
                    <div style={{ display:"flex", gap:8 }}>
                      <button className="btn-edit" onClick={() => handleEdit(blog)}>✏️ Edit</button>
                      <button className="btn-delete" onClick={() => setDeleteConfirm(blog._id)}>🗑 Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}