"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";

const API_BASE = "https://backend.kiwiconnectdigital.com/api/blogs";

interface Blog {
  _id: string;
  title: string;
  description: string;
  category: string;
  author: string;
  slug: string;
  createdAt: string;
}

function BlogCard({ blog, index }: { blog: Blog; index: number }) {
  const [hov, setHov] = useState(false);
  const photoUrl = `${API_BASE}/get-blog-photo/${blog._id}`;
  const date = new Date(blog.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  const readTime = Math.max(1, Math.ceil((blog.description || "").replace(/<[^>]+>/g, "").split(" ").filter(Boolean).length / 200));

  return (
    <Link href={`/blog/${blog.slug}`} style={{ textDecoration: "none" }}>
      <article
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          background: "#fff",
          borderRadius: 20,
          overflow: "hidden",
          border: `1.5px solid ${hov ? "#ff6ce7" : "#EAE6E0"}`,
          boxShadow: hov ? "0 20px 60px rgba(255,108,231,0.15)" : "0 2px 16px rgba(0,0,0,0.05)",
          transition: "all 0.35s cubic-bezier(.22,.68,0,1.2)",
          transform: hov ? "translateY(-6px)" : "translateY(0)",
          opacity: 1,
          animationDelay: `${index * 0.07}s`,
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Photo */}
        <div style={{ position: "relative", overflow: "hidden", height: 200, background: "#F2EEE9", flexShrink: 0 }}>
          <img
            src={photoUrl}
            alt={blog.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease", transform: hov ? "scale(1.06)" : "scale(1)" }}
            onError={e => { (e.target as HTMLImageElement).src = `https://placehold.co/600x300/F2EEE9/888?text=${encodeURIComponent(blog.category || "Blog")}`; }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.4) 100%)" }} />
          <span style={{ position: "absolute", top: 14, left: 14, padding: "5px 14px", borderRadius: 100, background: "#ff6ce7", color: "#fff", fontSize: 11, fontWeight: 800, letterSpacing: "0.8px", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>
            {blog.category}
          </span>
          <span style={{ position: "absolute", bottom: 12, right: 14, fontSize: 11, color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>
            {readTime} min read
          </span>
        </div>

        {/* Content */}
        <div style={{ padding: "22px 24px 26px", flex: 1, display: "flex", flexDirection: "column" }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(16px,1.4vw,18px)", fontWeight: 800, color: "#1A1A1A", lineHeight: 1.35, marginBottom: 12, letterSpacing: "-0.3px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {blog.title}
          </h2>
          <p style={{ fontSize: 13, color: "#666", lineHeight: 1.75, fontWeight: 500, flex: 1, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden", marginBottom: 18 }}>
            {(blog.description || "").replace(/<[^>]+>/g, "")}
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 16, borderTop: "1px solid #F0EBE3" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#ff6ce7,#b774db)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "#fff" }}>
                {blog.author?.charAt(0)?.toUpperCase() || "K"}
              </div>
              <span style={{ fontSize: 12, color: "#888", fontWeight: 600 }}>{blog.author}</span>
            </div>
            <span style={{ fontSize: 11, color: "#BBB", fontWeight: 600 }}>{date}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

function SkeletonCard() {
  return (
    <div style={{ background: "#fff", borderRadius: 20, overflow: "hidden", border: "1.5px solid #EAE6E0" }}>
      <div style={{ height: 200, background: "linear-gradient(90deg, #F5F0EA 25%, #EDE8E0 50%, #F5F0EA 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite" }} />
      <div style={{ padding: "22px 24px 26px" }}>
        <div style={{ height: 20, borderRadius: 8, background: "#F0EBE3", marginBottom: 10, width: "80%" }} />
        <div style={{ height: 14, borderRadius: 6, background: "#F5F0EA", marginBottom: 6 }} />
        <div style={{ height: 14, borderRadius: 6, background: "#F5F0EA", marginBottom: 6, width: "90%" }} />
        <div style={{ height: 14, borderRadius: 6, background: "#F5F0EA", width: "60%" }} />
      </div>
    </div>
  );
}

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filtered, setFiltered] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
  fetch(`${API_BASE}/get-all-blogs`)
    .then(r => r.json())
    .then(data => {
      const list: Blog[] = Array.isArray(data) ? data : data.blogs || data.data || [];

      // ✅ SORT LATEST FIRST
      const sortedList = list.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setBlogs(sortedList);
      setFiltered(sortedList);
    })
    .catch(() => setError("Could not load blogs. Make sure the backend is running."))
    .finally(() => setLoading(false));
}, []);

  const categories = ["All", ...Array.from(new Set(blogs.map(b => b.category).filter(Boolean)))];

  useEffect(() => {
    let result = blogs;
    if (activeCategory !== "All") result = result.filter(b => b.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(b =>
        b.title?.toLowerCase().includes(q) ||
        b.description?.toLowerCase().includes(q) ||
        b.author?.toLowerCase().includes(q)
      );
    }
    setFiltered(result);
  }, [search, activeCategory, blogs]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #FAFAF7; font-family: 'DM Sans', sans-serif; }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
        .blog-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }
        @media (min-width: 600px) { .blog-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .blog-grid { grid-template-columns: repeat(3, 1fr); } }
        .cat-pill:hover { background: #ff6ce7 !important; color: #fff !important; border-color: #ff6ce7 !important; }
      `}</style>

      <main style={{ background: "#FAFAF7", minHeight: "100vh" }}>
        <Navbar />

        {/* Hero */}
        <section style={{
          background: "linear-gradient(158deg,#FAFAF7 0%,#EFF9E4 55%,#FAFAF7 100%)",
          padding: "130px 5% 60px", textAlign: "center", position: "relative", overflow: "hidden"
        }}>
          <div style={{ position: "absolute", top: "0%", right: "-5%", width: "min(500px,60vw)", height: "min(500px,60vw)", borderRadius: "50%", background: "radial-gradient(circle,rgba(255,108,231,0.08) 0%,transparent 65%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "-10%", left: "-4%", width: "min(380px,50vw)", height: "min(380px,50vw)", borderRadius: "50%", background: "radial-gradient(circle,rgba(109,191,62,0.07) 0%,transparent 65%)", pointerEvents: "none" }} />

          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", border: "1.5px solid #C8EBAA", borderRadius: 100, padding: "7px 20px", marginBottom: 28, boxShadow: "0 2px 16px rgba(109,191,62,0.1)" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#ff6ce7", display: "inline-block", animation: "blink 2s infinite" }} />
            <span style={{ fontSize: 12, fontWeight: 800, color: "#b774db", letterSpacing: "1.5px", textTransform: "uppercase" }}>Fresh insights, every week</span>
          </div>

          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(36px,6vw,78px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-3px", color: "#141414", maxWidth: 760, margin: "0 auto 20px" }}>
            Our <em style={{ fontStyle: "italic", color: "#ff6ce7" }}>Blog</em> &amp; Insights
          </h1>
          <p style={{ fontSize: "clamp(14px,1.6vw,18px)", color: "#5A5A5A", maxWidth: 480, lineHeight: 1.75, fontWeight: 500, margin: "0 auto 40px" }}>
           AI, software, SaaS, and application development insights to help businesses build, innovate, and scale.
          </p>

          {/* Search */}
          <div style={{ position: "relative", maxWidth: 500, margin: "0 auto" }}>
            <span style={{ position: "absolute", left: 18, top: "50%", transform: "translateY(-50%)", fontSize: 18, pointerEvents: "none" }}>🔍</span>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              placeholder="Search articles…"
              style={{
                width: "100%", padding: "15px 20px 15px 50px", borderRadius: 100,
                border: `2px solid ${searchFocused ? "#ff6ce7" : "#E2DDD6"}`,
                background: "#fff", fontSize: 15, color: "#1A1A1A", fontWeight: 500,
                fontFamily: "'DM Sans', sans-serif", outline: "none",
                boxShadow: searchFocused ? "0 0 0 4px rgba(255,108,231,0.12)" : "0 4px 20px rgba(0,0,0,0.06)",
                transition: "all 0.25s",
              }}
            />
            {search && (
              <button onClick={() => setSearch("")} style={{ position: "absolute", right: 18, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#AAA" }}>×</button>
            )}
          </div>
        </section>

        {/* Category Pills */}
        {categories.length > 1 && (
          <div style={{ background: "#FAFAF7", padding: "24px 5% 0", overflowX: "auto" }}>
            <div style={{ display: "flex", gap: 10, maxWidth: 1280, margin: "0 auto", paddingBottom: 8, flexWrap: "wrap" }}>
              {categories.map(cat => (
                <button key={cat} className="cat-pill" onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: "8px 20px", borderRadius: 100, border: `1.5px solid ${activeCategory === cat ? "#ff6ce7" : "#E2DDD6"}`,
                    background: activeCategory === cat ? "#ff6ce7" : "#fff",
                    color: activeCategory === cat ? "#fff" : "#555",
                    fontSize: 13, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap",
                    fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s",
                  }}
                >{cat}</button>
              ))}
            </div>
          </div>
        )}

        {/* Grid */}
        <section style={{ padding: "32px 5% 80px", maxWidth: 1280, margin: "0 auto" }}>
          {/* Count */}
          {!loading && !error && (
            <p style={{ fontSize: 13, color: "#AAA", fontWeight: 600, marginBottom: 24 }}>
              {filtered.length} article{filtered.length !== 1 ? "s" : ""}{activeCategory !== "All" ? ` in "${activeCategory}"` : ""}{search ? ` for "${search}"` : ""}
            </p>
          )}

          {error && (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
              <p style={{ color: "#888", fontWeight: 600 }}>{error}</p>
            </div>
          )}

          {loading ? (
            <div className="blog-grid">
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>📭</div>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: "#1A1A1A", marginBottom: 8 }}>No articles found</h3>
              <p style={{ color: "#888", fontSize: 14 }}>Try a different search or category.</p>
              <button onClick={() => { setSearch(""); setActiveCategory("All"); }}
                style={{ marginTop: 20, padding: "10px 24px", borderRadius: 100, background: "#ff6ce7", color: "#fff", border: "none", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="blog-grid">
              {filtered.map((blog, i) => <BlogCard key={blog._id} blog={blog} index={i} />)}
            </div>
          )}
        </section>

        {/* Footer */}
        <footer style={{ background: "#111", padding: "40px 5% 24px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <img src="/kiwilogo.png" alt="Kiwi Connect Logo" style={{ width: 32, height: 32, borderRadius: 9, objectFit: "cover" }} />
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 15, color: "#fff" }}>
                Kiwi Connect <span style={{ color: "#ff6ce7" }}>Digital</span>
              </span>
            </div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", fontWeight: 500 }}>© 2026 Kiwi Connect Digital. All rights reserved.</div>
          </div>
        </footer>
      </main>
    </>
  );
}