"use client";
import { useState, useEffect, useRef } from "react";
import Navbar from "@/app/components/Navbar";


// ─── TYPES ───────────────────────────────────────────────────────────────────
interface User {
  id: number | string;
  name: string;
  handle: string;
  avatar: string;
  verified: boolean;
  bio: string;
  followers: string | number;
  following: string;
  posts: number;
  type?: string;
}
interface Story {
  user: User;
  img: string;
  caption: string;
  time: string;
  seen: boolean;
}
interface Comment {
  user: User;
  text: string;
  time: string;
}
interface Post {
  id: number | string;
  user: User;
  time: string;
  location: string;
  img: string;
  caption: string;
  likes: number;
  badge: string | null;
  tags: string[];
  music: string | null;
  comments: Comment[];
}
interface Reel {
  id: string;
  user: User;
  img: string;
  views: string;
  music: string;
  likes: number;
  caption: string;
}
interface Employee {
  _id: string;
  name: string;
  role: string;
  image?: string;
  bio?: string;
  followersCount?: number;
  followedByDevices?: string[];
}
interface ApiPost {
  _id: string;
  author: any;
  onModel: string;
  createdAt: string;
  location?: string;
  image: string;
  caption: string;
  likes: number;
  badge?: string;
  tags?: string[];
  music?: string;
  comments?: any[];
  likedByDevices?: string[];
}

// ─── CSS VARS ─────────────────────────────────────────────────────────────────
const V = {
  pink: "#ff6ce7",
  purple: "#ba3aff",
  dark: "#1A1A1A",
  sand: "#F2F0EA",
  cream: "#FAFAF7",
  white: "#fff",
  border: "#EAE6E0",
  muted: "#888",
};
const grad = `linear-gradient(135deg,${V.pink},${V.purple})`;

function fmt(n: number) {
  return n >= 1000 ? (n / 1000).toFixed(1) + "K" : String(n);
}

function mapAuthorToUser(author: any, onModel: string): User {
  const isEmployee = onModel === "Employee";
  return {
    id: author?._id || 0,
    name: author?.name || (isEmployee ? "Team Member" : "Admin"),
    handle: isEmployee
      ? (author?.name || "team").toLowerCase().replace(/\s+/g, ".")
      : (author?.handle || "kiwi.connect"),
    avatar: isEmployee
      ? (author?.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80")
      : (author?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80"),
    verified: isEmployee ? true : (author?.verified ?? true),
    bio: isEmployee ? (author?.role || "") : (author?.bio || ""),
    followers: author?.followersCount || 0,
    following: author?.following || "0",
    posts: 0,
    type: onModel,
  };
}

// ─── SHARED HELPERS ───────────────────────────────────────────────────────────
const Verified = () => (
  <span style={{ width: 15, height: 15, background: grad, borderRadius: "50%", fontSize: 9, color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>✓</span>
);

const REACTIONS = ["❤️", "🔥", "😮", "👏", "💡", "🚀"];

// ─── STORY VIEWER ─────────────────────────────────────────────────────────────
function StoryViewer({ stories, index, onClose, onNext, onPrev }: { stories: Story[]; index: number; onClose: () => void; onNext: () => void; onPrev: () => void }) {
  const s = stories[index];
  const [liked, setLiked] = useState(false);
  useEffect(() => { const t = setTimeout(onNext, 5000); return () => clearTimeout(t); }, [index]);
  return (
    <div onClick={(e) => { if (e.target === e.currentTarget) onClose(); }} style={{ position: "fixed", inset: 0, background: "rgba(10,10,10,.92)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)" }}>
      <div style={{ width: 360, maxWidth: "94vw", background: V.dark, borderRadius: 24, overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,.6)", position: "relative" }}>
        <div style={{ display: "flex", gap: 3, padding: "10px 12px 0" }}>
          {stories.map((_, i) => (
            <div key={i} style={{ flex: 1, height: 2.5, background: "rgba(255,255,255,.2)", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ height: "100%", background: grad, width: i < index ? "100%" : i === index ? "100%" : "0%", transition: i === index ? "width 5s linear" : "none" }} />
            </div>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px" }}>
          <img src={s.user.avatar} alt="" style={{ width: 34, height: 34, borderRadius: "50%", border: `2px solid ${V.pink}`, objectFit: "cover" }} />
          <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", flex: 1 }}>{s.user.name}</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,.5)" }}>{s.time}</div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "rgba(255,255,255,.7)", fontSize: 20, cursor: "pointer", width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
        </div>
        <img src={s.img} alt="" style={{ width: "100%", display: "block", maxHeight: "58vh", objectFit: "cover" }} />
        <div style={{ padding: "12px 16px", color: "rgba(255,255,255,.8)", fontSize: 13, lineHeight: 1.5 }}>{s.caption}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderTop: "1px solid rgba(255,255,255,.1)" }}>
          <input placeholder="Reply to story…" style={{ flex: 1, background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.15)", borderRadius: 100, padding: "8px 14px", fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "#fff", outline: "none" }} />
          <button onClick={() => setLiked(!liked)} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer" }}>{liked ? "❤️" : "🤍"}</button>
        </div>
        <div onClick={onPrev} style={{ position: "absolute", top: 60, bottom: 80, left: 0, width: "38%", cursor: "pointer", zIndex: 2 }} />
        <div onClick={onNext} style={{ position: "absolute", top: 60, bottom: 80, right: 0, width: "38%", cursor: "pointer", zIndex: 2 }} />
      </div>
    </div>
  );
}

// ─── POST CARD ────────────────────────────────────────────────────────────────
function PostCard({ post, liked, saved, reaction, showCm, followed, onLike, onSave, onFollow, onReact, onComment, onToggleCm, onViewProfile }: {
  post: Post; liked: boolean; saved: boolean; reaction: string | null; showCm: boolean; followed: boolean;
  onLike: () => void; onSave: () => void; onFollow: () => void; onReact: (e: string) => void;
  onComment: (t: string) => void; onToggleCm: () => void; onViewProfile: (u: User) => void;
}) {
  const [hov, setHov] = useState(false);
  const [heartBurst, setHeartBurst] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [reactOpen, setReactOpen] = useState(false);
  const likeCount = post.likes + (liked ? 1 : 0);

  function doubleTap() { if (!liked) onLike(); setHeartBurst(true); setTimeout(() => setHeartBurst(false), 700); }

  return (
    <div style={{ background: V.white, border: `1px solid ${V.border}`, borderRadius: 20, marginBottom: 18, overflow: "hidden", boxShadow: "0 2px 20px rgba(0,0,0,.04)", animation: "slideUp .5s both" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "13px 15px" }}>
        <img src={post.user.avatar} alt="" onClick={() => onViewProfile(post.user)} style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover", border: `2px solid ${V.pink}`, flexShrink: 0, cursor: "pointer" }} onError={(e) => { (e.target as HTMLImageElement).style.opacity = ".3"; }} />
        <div style={{ flex: 1 }}>
          <div onClick={() => onViewProfile(post.user)} style={{ fontWeight: 700, fontSize: 13.5, display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
            {post.user.name}{post.user.verified && <Verified />}
          </div>
          <div style={{ fontSize: 11.5, color: V.muted }}>@{post.user.handle} · {post.time}{post.location && ` · 📍 ${post.location}`}</div>
        </div>
        <button onClick={onFollow} style={{ background: followed ? grad : "none", border: `1.5px solid ${followed ? "transparent" : V.pink}`, color: followed ? "#fff" : V.pink, fontSize: 12, fontWeight: 700, padding: "5px 14px", borderRadius: 100, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", transition: "all .2s", whiteSpace: "nowrap" }}>
          {followed ? "✓ Following" : "+ Follow"}
        </button>
        <button style={{ background: "none", border: "none", fontSize: 18, color: V.muted, cursor: "pointer", padding: "4px 8px", letterSpacing: 2 }}>···</button>
      </div>

      <div onDoubleClick={doubleTap} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ position: "relative", overflow: "hidden", cursor: "pointer" }}>
        <img src={post.img} alt="" style={{ width: "100%", display: "block", maxHeight: 520, objectFit: "cover", transform: hov ? "scale(1.02)" : "scale(1)", transition: "transform .5s" }} />
        {post.badge && <div style={{ position: "absolute", top: 12, right: 12, background: grad, color: "#fff", fontSize: 10, fontWeight: 800, padding: "4px 12px", borderRadius: 100, letterSpacing: ".5px", textTransform: "uppercase" }}>{post.badge}</div>}
        {post.location && <div style={{ position: "absolute", bottom: 12, left: 12, background: "rgba(26,26,26,.65)", backdropFilter: "blur(8px)", color: "#fff", fontSize: 10.5, fontWeight: 600, padding: "4px 10px", borderRadius: 100 }}>📍 {post.location}</div>}
        {heartBurst && <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontSize: 90, pointerEvents: "none", animation: "hpop .65s ease both" }}>❤️</div>}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 2, padding: "10px 12px 6px", position: "relative" }}>
        {reactOpen && (
          <div onMouseLeave={() => setReactOpen(false)} style={{ position: "absolute", bottom: 44, left: 4, background: V.white, border: `1px solid ${V.border}`, borderRadius: 100, padding: "6px 10px", boxShadow: "0 8px 32px rgba(0,0,0,.12)", display: "flex", gap: 4, zIndex: 50 }}>
            {REACTIONS.map((e) => (<span key={e} onClick={() => { onReact(e); setReactOpen(false); }} style={{ fontSize: 22, cursor: "pointer", padding: "2px 4px", borderRadius: "50%", display: "inline-block" }} onMouseEnter={(el) => ((el.target as HTMLElement).style.transform = "scale(1.3)")} onMouseLeave={(el) => ((el.target as HTMLElement).style.transform = "")}>{e}</span>))}
          </div>
        )}
        {[
          { icon: reaction || (liked ? "❤️" : "🤍"), onClick: onLike, onEnter: () => setReactOpen(true), onLeave: () => setTimeout(() => setReactOpen(false), 400) },
          { icon: "💬", onClick: () => {}, onEnter: () => {}, onLeave: () => {} },
          { icon: "↗️", onClick: () => alert("Share via link, story or DM!"), onEnter: () => {}, onLeave: () => {} },
        ].map((b, i) => (
          <button key={i} onClick={b.onClick} onMouseEnter={b.onEnter} onMouseLeave={b.onLeave} style={{ background: "none", border: "none", cursor: "pointer", width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, borderRadius: "50%", transition: "transform .15s" }}>{b.icon}</button>
        ))}
        <button onClick={onSave} style={{ background: "none", border: "none", cursor: "pointer", width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, borderRadius: "50%", marginLeft: "auto" }}>{saved ? "🔖" : "🏷️"}</button>
      </div>

      <div style={{ padding: "2px 15px 4px", fontSize: 13, fontWeight: 700 }}>{fmt(likeCount)} likes{reaction && ` · You reacted ${reaction}`}</div>
      <div style={{ padding: "0 15px 6px", fontSize: 13.5, lineHeight: 1.65 }} dangerouslySetInnerHTML={{ __html: `<b>@${post.user.handle}</b> ${post.caption}` }} />
      {post.tags.length > 0 && (
        <div style={{ padding: "0 15px 8px", display: "flex", flexWrap: "wrap", gap: 4 }}>
          {post.tags.map((t) => (<span key={t} style={{ fontSize: 11.5, fontWeight: 700, color: V.pink, background: "rgba(255,108,231,.08)", padding: "3px 10px", borderRadius: 100, cursor: "pointer" }}>{t}</span>))}
        </div>
      )}
      {post.music && <div style={{ padding: "0 15px 6px", fontSize: 11.5, color: V.muted, display: "flex", alignItems: "center", gap: 5 }}>♪ <i>{post.music}</i></div>}

      {post.comments.length > 0 && (
        <>
          <div onClick={onToggleCm} style={{ padding: "0 15px 4px", fontSize: 13, color: V.muted, cursor: "pointer" }}>
            {showCm ? "Hide" : `View all ${post.comments.length}`} comment{post.comments.length > 1 ? "s" : ""}
          </div>
          {showCm && (
            <div style={{ padding: "0 15px 6px" }}>
              {post.comments.map((c, i) => (
                <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 8 }}>
                  <img src={c.user.avatar} alt="" style={{ width: 26, height: 26, borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: `1.5px solid ${V.border}` }} onError={(e) => { (e.target as HTMLImageElement).style.opacity = ".3"; }} />
                  <div style={{ background: V.sand, borderRadius: "0 12px 12px 12px", padding: "6px 10px", fontSize: 12.5, lineHeight: 1.5, flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 1 }}>{c.user.name} {c.user.verified && "✓"}</div>
                    {c.text}
                    <div style={{ fontSize: 11, color: "#ccc", marginTop: 4 }}>{c.time}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      <div style={{ display: "flex", gap: 8, padding: "8px 15px 12px", alignItems: "center", borderTop: `1px solid ${V.border}` }}>
        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80" alt="" style={{ width: 28, height: 28, borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: `1.5px solid ${V.pink}` }} />
        <input value={commentText} onChange={(e) => setCommentText(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && commentText.trim()) { onComment(commentText); setCommentText(""); } }} placeholder="Add a comment…" style={{ flex: 1, background: V.sand, border: "none", borderRadius: 100, padding: "7px 14px", fontSize: 12.5, fontFamily: "'DM Sans',sans-serif", color: V.dark, outline: "none" }} />
        {commentText.trim() && <button onClick={() => { onComment(commentText); setCommentText(""); }} style={{ background: grad, border: "none", borderRadius: 100, padding: "6px 14px", fontSize: 12, fontWeight: 700, color: "#fff", cursor: "pointer" }}>Post</button>}
      </div>
      <div style={{ padding: "0 15px 10px", fontSize: 11, color: "#c0bbb0", letterSpacing: ".4px", textTransform: "uppercase" }}>{post.time}</div>
    </div>
  );
}

// ─── REEL CARD ────────────────────────────────────────────────────────────────
function ReelCard({ reel, liked, onLike }: { reel: Reel; liked: boolean; onLike: () => void }) {
  const likeCount = reel.likes + (liked ? 1 : 0);
  return (
    <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", background: V.dark, aspectRatio: "9/16", maxHeight: 580, boxShadow: "0 8px 40px rgba(0,0,0,.18)", animation: "slideUp .5s both", flexShrink: 0, width: "100%" }}>
      <img src={reel.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={(e) => { (e.target as HTMLImageElement).style.opacity = ".3"; }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,26,26,.85) 0%, transparent 50%)" }} />
      <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)", width: 54, height: 54, background: grad, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: "#fff", cursor: "pointer" }}>▶</div>
      <div style={{ position: "absolute", right: 14, bottom: 100, display: "flex", flexDirection: "column", gap: 20, alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <button onClick={onLike} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 26 }}>{liked ? "❤️" : "🤍"}</button>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>{fmt(likeCount)}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: 24 }}>💬</button>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>—</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: 24 }}>↗️</button>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>Share</span>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 60, padding: "0 14px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <img src={reel.user.avatar} alt="" style={{ width: 34, height: 34, borderRadius: "50%", border: `2px solid ${V.pink}`, objectFit: "cover", flexShrink: 0 }} onError={(e) => { (e.target as HTMLImageElement).style.opacity = ".3"; }} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", gap: 4 }}>{reel.user.name}{reel.user.verified && <Verified />}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,.6)" }}>@{reel.user.handle}</div>
          </div>
        </div>
        <div style={{ fontSize: 13, color: "#fff", lineHeight: 1.5, marginBottom: 6 }}>{reel.caption}</div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,.6)", display: "flex", alignItems: "center", gap: 5 }}>♪ {reel.music} · <span style={{ fontWeight: 700, color: "rgba(255,255,255,.8)" }}>▶ {reel.views} views</span></div>
      </div>
    </div>
  );
}

// ─── POST PAGE ────────────────────────────────────────────────────────────────
function PostPage({ onPost, meUser }: { onPost: (text: string, img: string) => void; meUser: User }) {
  const [text, setText] = useState("");
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const charLeft = 220 - text.length;

  const SAMPLE_IMGS = [
    "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=300&q=80",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&q=80",
    "https://images.unsplash.com/photo-1551434678-e076c223a692?w=300&q=80",
    "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=300&q=80",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&q=80",
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=300&q=80",
  ];

  function handlePost() {
    if (!text.trim()) return;
    onPost(text, selectedImg || SAMPLE_IMGS[0]);
    setText(""); setSelectedImg(null);
    alert("Post published! 🎉 Check the Home feed.");
  }

  return (
    <div style={{ maxWidth: 520, margin: "0 auto", padding: "0 0 24px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 16px 16px" }}>
        <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 900, background: grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>New Post</div>
        <button onClick={handlePost} disabled={!text.trim()} style={{ background: text.trim() ? grad : V.border, border: "none", borderRadius: 100, padding: "10px 24px", fontSize: 14, fontWeight: 700, color: text.trim() ? "#fff" : V.muted, cursor: text.trim() ? "pointer" : "not-allowed", fontFamily: "'DM Sans',sans-serif", transition: "all .25s" }}>Share →</button>
      </div>
      <div style={{ background: V.white, borderRadius: 20, margin: "0 16px", border: `1px solid ${V.border}`, overflow: "hidden" }}>
        <div style={{ display: "flex", gap: 12, padding: "16px 16px 12px", alignItems: "flex-start" }}>
          <img src={meUser.avatar} alt="" style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover", border: `2.5px solid ${V.pink}`, flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2, display: "flex", alignItems: "center", gap: 4 }}>{meUser.name} <Verified /></div>
            <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Share a campaign win, insight, or update… 🚀" rows={4} style={{ width: "100%", background: "none", border: "none", outline: "none", resize: "none", fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: V.dark, lineHeight: 1.7, marginTop: 4 }} />
            <div style={{ fontSize: 11, color: charLeft < 30 ? V.pink : "#ccc", textAlign: "right", marginTop: 4 }}>{charLeft} chars left</div>
          </div>
        </div>
        {selectedImg && (
          <div style={{ position: "relative", margin: "0 16px 12px" }}>
            <img src={selectedImg} alt="" style={{ width: "100%", borderRadius: 14, objectFit: "cover", maxHeight: 220, display: "block" }} />
            <button onClick={() => setSelectedImg(null)} style={{ position: "absolute", top: 8, right: 8, background: "rgba(0,0,0,.55)", border: "none", borderRadius: "50%", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff", fontSize: 14 }}>✕</button>
          </div>
        )}
        <div style={{ display: "flex", gap: 4, padding: "10px 14px 14px", borderTop: `1px solid ${V.border}`, alignItems: "center" }}>
          {[{ icon: "📷", label: "Photo" }, { icon: "🎬", label: "Video" }, { icon: "🏷️", label: "Tag" }, { icon: "📍", label: "Location" }, { icon: "📊", label: "Poll" }, { icon: "😊", label: "Emoji" }].map((b) => (
            <button key={b.icon} title={b.label} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", transition: "background .2s" }} onMouseEnter={(e) => (e.currentTarget.style.background = V.sand)} onMouseLeave={(e) => (e.currentTarget.style.background = "")}>{b.icon}</button>
          ))}
        </div>
      </div>
      <div style={{ margin: "20px 16px 0" }}>
        <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 800, marginBottom: 12, color: V.dark }}>Pick a photo</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 4, borderRadius: 16, overflow: "hidden" }}>
          {SAMPLE_IMGS.map((src, i) => (
            <div key={i} onClick={() => setSelectedImg(src)} style={{ aspectRatio: "1", overflow: "hidden", cursor: "pointer", position: "relative", borderRadius: 4, border: selectedImg === src ? `3px solid ${V.pink}` : "3px solid transparent", transition: "border .2s" }}>
              <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform .3s" }} onMouseEnter={(e) => ((e.target as HTMLImageElement).style.transform = "scale(1.06)")} onMouseLeave={(e) => ((e.target as HTMLImageElement).style.transform = "")} />
              {selectedImg === src && <div style={{ position: "absolute", top: 6, right: 6, width: 20, height: 20, background: V.pink, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#fff", fontWeight: 800 }}>✓</div>}
            </div>
          ))}
        </div>
      </div>
      <div style={{ margin: "16px 16px 0", background: V.white, border: `1px solid ${V.border}`, borderRadius: 16, padding: "12px 14px" }}>
        <div style={{ fontSize: 12, fontWeight: 800, color: V.muted, letterSpacing: ".8px", textTransform: "uppercase", marginBottom: 8 }}>Popular Tags</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {["#BrandStrategy", "#ROAS", "#GrowthMarketing", "#SEO", "#KiwiConnect", "#DigitalIndia"].map((t) => (
            <span key={t} onClick={() => setText((prev) => prev + " " + t)} style={{ fontSize: 12, fontWeight: 700, color: V.pink, background: "rgba(255,108,231,.08)", padding: "4px 12px", borderRadius: 100, cursor: "pointer" }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── PROFILE PAGE ─────────────────────────────────────────────────────────────
function ProfilePage({ user, posts, onFollow, isFollowed, onSelectPost, reels }: { user: User; posts: Post[]; onFollow: () => void; isFollowed: boolean; onSelectPost: (p: Post) => void; reels: Reel[] }) {
  const [activeProfileTab, setActiveProfileTab] = useState<"posts" | "reels" | "saved">("posts");
  const tabs = [{ key: "posts" as const, icon: "⊞", label: "Posts" }, { key: "reels" as const, icon: "▶", label: "Reels" }, { key: "saved" as const, icon: "🔖", label: "Saved" }];
  const relevantPosts = posts.filter(p => String(p.user.id) === String(user.id));

  return (
    <div style={{ maxWidth: 520, margin: "0 auto", paddingBottom: 24 }}>
      <div style={{ position: "relative", height: 140, background: `linear-gradient(135deg,${V.pink}22,${V.purple}22)`, borderRadius: "0 0 24px 24px", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(255,108,231,.25),rgba(186,58,255,.25))" }} />
      </div>
      <div style={{ padding: "0 20px", marginTop: -44 }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 12 }}>
          <div style={{ position: "relative" }}>
            <img src={user.avatar} alt="" style={{ width: 88, height: 88, borderRadius: "50%", objectFit: "cover", border: `4px solid ${V.white}`, boxShadow: "0 4px 20px rgba(0,0,0,.12)" }} />
            {user.verified && <div style={{ position: "absolute", bottom: 2, right: 2, width: 22, height: 22, background: grad, borderRadius: "50%", border: `2px solid ${V.white}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#fff" }}>✓</div>}
          </div>
        </div>
        <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 900, display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>{user.name} {user.verified && <Verified />}</div>
        <div style={{ fontSize: 13, color: V.muted, marginBottom: 8 }}>@{user.handle}</div>
        <div style={{ fontSize: 14, color: V.dark, lineHeight: 1.6, marginBottom: 14 }}>{user.bio}</div>
        <div style={{ display: "flex", gap: 0, background: V.white, border: `1px solid ${V.border}`, borderRadius: 16, overflow: "hidden", marginBottom: 16 }}>
          {[[String(relevantPosts.length || user.posts), "Posts"], [String(user.followers), "Followers"], [user.following || "0", "Following"]].map(([val, lbl], i) => (
            <div key={i} style={{ flex: 1, textAlign: "center", padding: "14px 0", borderRight: i < 2 ? `1px solid ${V.border}` : "none" }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 900, background: grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{val}</div>
              <div style={{ fontSize: 11, color: V.muted, marginTop: 2 }}>{lbl}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
          <button onClick={onFollow} style={{ flex: 1, background: isFollowed ? V.white : grad, border: isFollowed ? `1.5px solid ${V.border}` : "none", borderRadius: 100, padding: "11px", fontSize: 13, fontWeight: 700, color: isFollowed ? V.dark : "#fff", cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>{isFollowed ? "✓ Following" : "✦ Follow"}</button>
          <button style={{ flex: 1, background: V.white, border: `1.5px solid ${V.border}`, borderRadius: 100, padding: "11px", fontSize: 13, fontWeight: 700, color: V.dark, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>Share Profile</button>
        </div>
        <div style={{ display: "flex", background: V.white, border: `1px solid ${V.border}`, borderRadius: 14, overflow: "hidden", marginBottom: 14 }}>
          {tabs.map((t, i) => (
            <button key={t.key} onClick={() => setActiveProfileTab(t.key)} style={{ flex: 1, padding: "11px 0", fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 700, border: "none", cursor: "pointer", background: activeProfileTab === t.key ? grad : V.white, color: activeProfileTab === t.key ? "#fff" : V.muted, borderLeft: i > 0 ? `1px solid ${V.border}` : "none", transition: "all .25s", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
              <span>{t.icon}</span> {t.label}
            </button>
          ))}
        </div>
        {activeProfileTab === "posts" && (
          relevantPosts.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 3, borderRadius: 16, overflow: "hidden" }}>
              {relevantPosts.map((p, i) => (
                <div key={i} onClick={() => onSelectPost(p)} style={{ aspectRatio: "1", overflow: "hidden", cursor: "pointer", position: "relative" }}>
                  <img src={p.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform .3s" }} onMouseEnter={(e) => ((e.target as HTMLImageElement).style.transform = "scale(1.07)")} onMouseLeave={(e) => ((e.target as HTMLImageElement).style.transform = "")} onError={(e) => { (e.target as HTMLImageElement).style.opacity = ".3"; }} />
                </div>
              ))}
            </div>
          ) : <div style={{ textAlign: "center", padding: "48px 20px", color: V.muted }}><div style={{ fontSize: 44, marginBottom: 12 }}>📭</div><div style={{ fontFamily: "'Syne',sans-serif", fontSize: 17, fontWeight: 800, color: V.dark }}>No posts yet</div></div>
        )}
        {activeProfileTab === "reels" && (
          reels.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 3, borderRadius: 16, overflow: "hidden" }}>
              {reels.map((r, i) => (
                <div key={i} style={{ aspectRatio: "9/16", overflow: "hidden", cursor: "pointer", position: "relative", background: V.dark }}>
                  <img src={r.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={(e) => { (e.target as HTMLImageElement).style.opacity = ".3"; }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,.7) 0%,transparent 50%)" }} />
                  <div style={{ position: "absolute", bottom: 6, left: 6, fontSize: 10, color: "#fff", fontWeight: 700 }}>▶ {r.views}</div>
                </div>
              ))}
            </div>
          ) : <div style={{ textAlign: "center", padding: "48px 20px", color: V.muted }}><div style={{ fontSize: 44, marginBottom: 12 }}>🎬</div><div style={{ fontFamily: "'Syne',sans-serif", fontSize: 17, fontWeight: 800, color: V.dark }}>No reels yet</div></div>
        )}
        {activeProfileTab === "saved" && <div style={{ textAlign: "center", padding: "48px 20px", color: V.muted }}><div style={{ fontSize: 44, marginBottom: 12 }}>🔖</div><div style={{ fontFamily: "'Syne',sans-serif", fontSize: 17, fontWeight: 800, color: V.dark }}>Saved posts appear here</div><div style={{ fontSize: 13, marginTop: 6 }}>Tap 🏷️ on any post to save it</div></div>}
      </div>
    </div>
  );
}

// ─── EMPTY STATE ──────────────────────────────────────────────────────────────
function EmptyState({ icon, title, sub }: { icon: string; title: string; sub: string }) {
  return (
    <div style={{ textAlign: "center", padding: "80px 20px", color: V.muted }}>
      <div style={{ fontSize: 52, marginBottom: 16 }}>{icon}</div>
      <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 800, color: V.dark, marginBottom: 8 }}>{title}</div>
      <div style={{ fontSize: 14 }}>{sub}</div>
    </div>
  );
}

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────────
export default function KiwiGram() {
  // ── API STATE ──
  const [meUser, setMeUser] = useState<User>({ id: 0, name: "You", handle: "kiwi.connect", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80", verified: true, bio: "", followers: 0, following: "0", posts: 0 });
  const [posts, setPosts] = useState<Post[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [reels, setReels] = useState<Reel[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [exploreImgs, setExploreImgs] = useState<{ src: string; likes: string; tall: boolean }[]>([]);
  const [trending, setTrending] = useState<{ tag: string; posts: string; heat: string }[]>([]);
  const [loading, setLoading] = useState(true);

  // ── UI STATE ──
  const [storyIdx, setStoryIdx] = useState<number | null>(null);
  const [likes, setLikes] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [followed, setFollowed] = useState<Record<string, boolean>>({});
  const [reactions, setReactions] = useState<Record<string, string | null>>({});
  const [showCm, setShowCm] = useState<Record<string, boolean>>({});
  const [reelLikes, setReelLikes] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<"home" | "explore" | "post" | "reels" | "profile">("home");
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifs, setNotifs] = useState<{ icon: string; text: string; time: string; unread: boolean }[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [exploreCat, setExploreCat] = useState("All");
  const [viewingUser, setViewingUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [suggFollowed, setSuggFollowed] = useState<Record<string | number, boolean>>({});
  const [deviceId, setDeviceId] = useState<string>("");
  const notifRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifs.filter((n) => n.unread).length;

  // ── DEVICE ID ──
  useEffect(() => {
    let id = localStorage.getItem("kg_device_id");
    if (!id) { id = "dev_" + Math.random().toString(36).substr(2, 9); localStorage.setItem("kg_device_id", id); }
    setDeviceId(id);
  }, []);

  // ── FETCH ALL DATA ──
  useEffect(() => {
    if (!deviceId) return;

    async function fetchAll() {
      setLoading(true);
      try {
        // Admin/me
        const usersRes = await fetch("http://localhost:5100/api/users").then(r => r.json()).catch(() => []);
        const adminData = usersRes.find((u: any) => u.isAdmin);
        if (adminData) {
          setMeUser({ id: adminData._id || 0, name: adminData.name || "You", handle: adminData.handle || "kiwi.connect", avatar: adminData.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80", verified: true, bio: adminData.bio || "", followers: adminData.followersCount || 0, following: adminData.following || "0", posts: adminData.posts || 0 });
        }

        // Employees
        const empData: Employee[] = await fetch("http://localhost:5100/api/employees").then(r => r.json()).catch(() => []);
        setEmployees(empData);

        // Posts
        const postsData: ApiPost[] = await fetch("http://localhost:5100/api/posts").then(r => r.json()).catch(() => []);
        const initialLikes: Record<string, boolean> = {};
        const initialFollows: Record<string, boolean> = {};

        const mappedPosts: Post[] = postsData.map((p) => {
          if (p.likedByDevices?.includes(deviceId)) initialLikes[p._id] = true;
          const author = p.author;
          if (author?.followedByDevices?.includes(deviceId)) initialFollows[author._id] = true;
          return {
            id: p._id,
            user: mapAuthorToUser(p.author, p.onModel),
            time: new Date(p.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
            location: p.location || "",
            img: p.image,
            caption: p.caption,
            likes: p.likes || 0,
            badge: p.badge || null,
            tags: p.tags || [],
            music: p.music || null,
            comments: (p.comments || []).map((c: any) => ({
              user: mapAuthorToUser(c.author, c.onModel || "User"),
              text: c.text,
              time: new Date(c.createdAt).toLocaleDateString("en-IN"),
            })),
          };
        });

        setLikes(prev => ({ ...prev, ...initialLikes }));
        setFollowed(prev => ({ ...prev, ...initialFollows }));
        setPosts(mappedPosts);

        // Build explore grid from post images
        const exploreGrid = postsData.slice(0, 8).map((p, i) => ({ src: p.image, likes: fmt(p.likes || 0), tall: i === 0 || i === 4 }));
        setExploreImgs(exploreGrid);

        // Build trending from post tags
        const tagCount: Record<string, number> = {};
        postsData.forEach(p => (p.tags || []).forEach(t => { tagCount[t] = (tagCount[t] || 0) + 1; }));
        const sortedTags = Object.entries(tagCount).sort((a, b) => b[1] - a[1]).slice(0, 5);
        setTrending(sortedTags.map(([tag, count]) => ({
          tag,
          posts: count >= 1000 ? (count / 1000).toFixed(1) + "K" : String(count),
          heat: count > 10 ? "🔥🔥🔥" : count > 5 ? "🔥🔥" : "🔥",
        })));

        // Build notifications from recent activity
        const recentLikes = postsData.filter(p => p.likedByDevices && p.likedByDevices.length > 0).slice(0, 3);
        const newNotifs = recentLikes.map((p) => ({
          icon: "❤️",
          text: `<b>${p.author?.name || "Someone"}</b> liked a post`,
          time: new Date(p.createdAt).toLocaleDateString("en-IN"),
          unread: true,
        }));
        setNotifs(newNotifs);

        // Stories
        const storiesData = await fetch("http://localhost:5100/api/stories").then(r => r.json()).catch(() => []);
        const mappedStories: Story[] = storiesData.map((s: any) => ({
          user: mapAuthorToUser(s.author, s.onModel || "Employee"),
          img: s.image,
          caption: s.caption || "",
          time: "Just now",
          seen: false,
        }));
        setStories(mappedStories);

        // Reels
        const reelsData = await fetch("http://localhost:5100/api/reels").then(r => r.json()).catch(() => []);
        const mappedReels: Reel[] = reelsData.length > 0
          ? reelsData.map((r: any) => ({
              id: r._id,
              user: mapAuthorToUser(r.author, r.onModel || "Employee"),
              img: r.image || r.thumbnail,
              views: r.views || "0",
              music: r.music || "—",
              likes: r.likes || 0,
              caption: r.caption || "",
            }))
          : postsData.slice(0, 6).map((p) => ({
              id: p._id + "_reel",
              user: mapAuthorToUser(p.author, p.onModel),
              img: p.image,
              views: fmt(Math.floor(Math.random() * 40000 + 5000)),
              music: "Kiwi Mix",
              likes: p.likes || 0,
              caption: p.caption.slice(0, 60) + (p.caption.length > 60 ? "…" : ""),
            }));
        setReels(mappedReels);

      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, [deviceId]);

  // ── CLICK OUTSIDE ──
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
      if (!(e.target as HTMLElement).closest("#kgSearchWrap")) setSearchOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // ── ALL USERS from posts/employees for search ──
  const allUsers: User[] = [
    ...employees.map(emp => ({
      id: emp._id, name: emp.name,
      handle: emp.name.toLowerCase().replace(/\s+/g, "."),
      avatar: emp.image || meUser.avatar,
      verified: true, bio: emp.role || "",
      followers: emp.followersCount || 0, following: "0", posts: 0, type: "Employee",
    })),
    ...posts.map(p => p.user).filter((u, i, arr) => arr.findIndex(x => String(x.id) === String(u.id)) === i),
  ].filter((u, i, arr) => arr.findIndex(x => String(x.id) === String(u.id)) === i);

  const filteredUsers = searchQuery ? allUsers.filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.handle.toLowerCase().includes(searchQuery.toLowerCase())) : allUsers.slice(0, 5);

  // ── ACTIONS ──
  async function toggleLike(id: string | number) {
    if (!deviceId) return;
    const isLiked = !!likes[id];
    setLikes(p => ({ ...p, [id]: !isLiked }));
    try { await fetch(`http://localhost:5100/api/posts/${id}/like`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ deviceId }) }); } catch {}
  }

  function toggleSave(id: number | string) { setSaved(p => ({ ...p, [id]: !p[id] })); }

  function setReaction(id: number | string, e: string) { setReactions(p => ({ ...p, [id]: e })); setLikes(p => ({ ...p, [id]: true })); }

  async function toggleFollow(id: string | number, authorType?: string) {
    if (!deviceId) return;
    const isF = !!followed[id];
    setFollowed(p => ({ ...p, [id]: !isF }));
    const endpoint = authorType === "Employee" ? "employees" : "users";
    try { await fetch(`http://localhost:5100/api/${endpoint}/${id}/follow`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ deviceId }) }); } catch {}
  }

  function toggleShowCm(id: number | string) { setShowCm(p => ({ ...p, [id]: !p[id] })); }

  async function addComment(postId: string | number, text: string) {
    try {
      const res = await fetch(`http://localhost:5100/api/posts/${postId}/comment`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text, deviceId }) });
      if (!res.ok) { const err = await res.json(); alert(err.message || "Error adding comment"); return; }
      setPosts(p => p.map(post => post.id === postId ? { ...post, comments: [...post.comments, { user: { ...meUser, name: "Guest", handle: "guest." + deviceId.slice(-4), avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&q=80" }, text, time: "Just now" }] } : post));
      setShowCm(p => ({ ...p, [postId]: true }));
    } catch {}
  }

  function handleNewPost(text: string, img: string) {
    const np: Post = { id: Date.now(), user: meUser, time: "Just now", location: "", img, caption: text, likes: 0, badge: null, tags: [], music: null, comments: [] };
    setPosts(p => [np, ...p]);
    setActiveTab("home");
  }

  const EXPLORE_CATS = ["All", "Branding", "Performance", "SEO", "Social", "Video", "UX"];

  const NAV_ITEMS = [
    { key: "home" as const, icon: "🏠", label: "Home" },
    { key: "explore" as const, icon: "🔭", label: "Explore" },
    { key: "post" as const, icon: "✦", label: "Post", special: true },
    { key: "reels" as const, icon: "🎬", label: "Reels" },
    { key: "profile" as const, icon: "👤", label: "Profile" },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #FAFAF7; font-family: 'DM Sans', sans-serif; color: #1A1A1A; overflow-x: hidden; }
        @keyframes slideUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        @keyframes hpop { 0%{transform:translate(-50%,-50%) scale(0);opacity:1} 40%{transform:translate(-50%,-50%) scale(1.1);opacity:1} 100%{transform:translate(-50%,-50%) scale(1);opacity:0} }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.4)} }
        @keyframes bFloat { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-40px) scale(1.05)} }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-thumb { background: #EAE6E0; border-radius: 2px; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media(min-width:960px){ .kg-sidebar{ display:flex !important; } }
      ` }} />

      {/* Bubble BG */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        {[{ w: 500, h: 500, bg: V.pink, top: "-100px", left: "-100px", d: "0s" }, { w: 400, h: 400, bg: V.purple, top: "20%", right: "-80px", d: "-4s" }, { w: 350, h: 350, bg: "#6DBF3E", bottom: "10%", left: "10%", d: "-8s" }, { w: 300, h: 300, bg: V.pink, bottom: "-80px", right: "20%", d: "-6s" }].map((b, i) => (
          <div key={i} style={{ position: "absolute", borderRadius: "50%", filter: "blur(80px)", opacity: 0.18, animation: `bFloat 12s ease-in-out ${b.d} infinite`, width: b.w, height: b.h, background: b.bg, top: (b as any).top, left: (b as any).left, bottom: (b as any).bottom, right: (b as any).right }} />
        ))}
      </div>

      {storyIdx !== null && (
        <StoryViewer stories={stories} index={storyIdx} onClose={() => setStoryIdx(null)}
          onNext={() => storyIdx < stories.length - 1 ? setStoryIdx(storyIdx + 1) : setStoryIdx(null)}
          onPrev={() => { if (storyIdx > 0) setStoryIdx(storyIdx - 1); }} />
      )}

      {/* NAVBAR */}
      {/* <nav style={{ position: "sticky", top: 0, zIndex: 300, background: "rgba(250,250,247,.92)", backdropFilter: "blur(16px)", borderBottom: `1px solid ${V.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", height: 56, gap: 10 }}>
        <div onClick={() => setActiveTab("home")} style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 900, background: grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", cursor: "pointer", flexShrink: 0, display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 7, height: 7, background: V.pink, borderRadius: "50%", animation: "pulse 2s infinite", flexShrink: 0 }} />
          KiwiGram
        </div>

        <div id="kgSearchWrap" style={{ position: "relative", flex: 1, maxWidth: 260 }}>
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 13, pointerEvents: "none" }}>🔍</span>
          <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onFocus={() => setSearchOpen(true)} placeholder="Search…" style={{ width: "100%", background: V.sand, border: `1.5px solid ${searchOpen ? V.pink : "transparent"}`, borderRadius: 100, padding: "7px 14px 7px 34px", fontSize: 13, fontFamily: "'DM Sans',sans-serif", color: V.dark, outline: "none", transition: "all .25s" }} />
          {searchOpen && filteredUsers.length > 0 && (
            <div style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, background: V.white, border: `1px solid ${V.border}`, borderRadius: 16, boxShadow: "0 8px 32px rgba(0,0,0,.1)", zIndex: 400, overflow: "hidden" }}>
              {filteredUsers.slice(0, 5).map((u) => (
                <div key={String(u.id)} onClick={() => { setViewingUser(u); setActiveTab("profile"); setSearchQuery(""); setSearchOpen(false); }} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", cursor: "pointer", transition: "background .2s" }} onMouseEnter={(e) => (e.currentTarget.style.background = V.sand)} onMouseLeave={(e) => (e.currentTarget.style.background = "")}>
                  <img src={u.avatar} alt="" style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover" }} onError={(e) => { (e.target as HTMLImageElement).style.opacity = ".3"; }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{u.name}{u.verified && <span style={{ display: "inline-block", width: 12, height: 12, background: grad, borderRadius: "50%", fontSize: 8, color: "#fff", textAlign: "center", lineHeight: "12px", marginLeft: 3 }}>✓</span>}</div>
                    <div style={{ fontSize: 11, color: V.muted }}>@{u.handle}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: 2, alignItems: "center", flexShrink: 0 }}>
          <button onClick={() => setActiveTab("explore")} style={{ background: activeTab === "explore" ? "rgba(255,108,231,.12)" : "none", border: "none", cursor: "pointer", width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, transition: "all .2s" }}>🔭</button>
          <div ref={notifRef} style={{ position: "relative" }}>
            <button onClick={() => { setNotifOpen(!notifOpen); if (!notifOpen) setNotifs(n => n.map(x => ({ ...x, unread: false }))); }} style={{ background: "none", border: "none", cursor: "pointer", width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, position: "relative" }}>
              🔔
              {unreadCount > 0 && !notifOpen && <span style={{ position: "absolute", top: 5, right: 5, width: 8, height: 8, background: V.pink, borderRadius: "50%", border: `2px solid ${V.cream}`, animation: "pulse 2s infinite" }} />}
            </button>
            {notifOpen && (
              <div style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, background: V.white, border: `1px solid ${V.border}`, borderRadius: 20, width: 310, boxShadow: "0 12px 48px rgba(0,0,0,.12)", zIndex: 400, overflow: "hidden" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px 10px", borderBottom: `1px solid ${V.border}` }}>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 15, fontWeight: 800 }}>Notifications</div>
                  <div onClick={() => setNotifs(n => n.map(x => ({ ...x, unread: false })))} style={{ fontSize: 12, fontWeight: 700, color: V.pink, cursor: "pointer" }}>Mark all read</div>
                </div>
                {notifs.length === 0 ? <div style={{ padding: "24px 16px", textAlign: "center", fontSize: 13, color: V.muted }}>No notifications yet</div> : notifs.map((n, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "10px 16px", borderBottom: i < notifs.length - 1 ? `1px solid ${V.border}` : "none", background: n.unread ? "rgba(255,108,231,.04)" : "transparent", cursor: "pointer" }}>
                    <div style={{ fontSize: 18, flexShrink: 0, width: 34, height: 34, background: "rgba(255,108,231,.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>{n.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12.5, lineHeight: 1.5 }} dangerouslySetInnerHTML={{ __html: n.text }} />
                      <div style={{ fontSize: 11, color: V.muted, marginTop: 2 }}>{n.time}</div>
                    </div>
                    {n.unread && <div style={{ width: 7, height: 7, background: V.pink, borderRadius: "50%", flexShrink: 0, marginTop: 4 }} />}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav> */}
<Navbar />
      {/* MAIN */}
      <div style={{ display: "flex", maxWidth: 1180, margin: "0 auto", padding: "80px 16px 90px", gap: 28, position: "relative", zIndex: 1 }}>
        <div style={{ flex: 1, minWidth: 0, maxWidth: 630, margin: "0 auto" }}>

          {/* Loading */}
          {loading && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 20px", gap: 16 }}>
              <div style={{ width: 40, height: 40, border: `3px solid ${V.border}`, borderTopColor: V.pink, borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
              <div style={{ fontSize: 14, color: V.muted, fontWeight: 600 }}>Loading your feed…</div>
            </div>
          )}

          {/* HOME */}
          {!loading && activeTab === "home" && (
            <>
              {/* Stories */}
              {stories.length > 0 && (
                <div style={{ background: V.white, border: `1px solid ${V.border}`, borderRadius: 20, padding: "14px 14px 10px", marginBottom: 18, overflowX: "auto", scrollbarWidth: "none", boxShadow: "0 2px 20px rgba(0,0,0,.04)" }}>
                  <div style={{ display: "flex", gap: 12, width: "max-content" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                      <div style={{ width: 62, height: 62, borderRadius: "50%", background: V.sand, border: `2px dashed ${V.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, color: V.pink, cursor: "pointer", transition: "all .2s" }} onMouseEnter={(e) => { e.currentTarget.style.background = "#ffe8fb"; e.currentTarget.style.borderColor = V.pink; }} onMouseLeave={(e) => { e.currentTarget.style.background = V.sand; e.currentTarget.style.borderColor = V.border; }}>+</div>
                      <div style={{ fontSize: 10.5, fontWeight: 600, color: V.dark }}>Your Story</div>
                    </div>
                    {stories.map((s, i) => (
                      <div key={i} onClick={() => { setStoryIdx(i); setStories(ss => ss.map((x, xi) => xi === i ? { ...x, seen: true } : x)); }} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, cursor: "pointer" }}>
                        <div style={{ width: 62, height: 62, borderRadius: "50%", padding: 2.5, background: s.seen ? "linear-gradient(135deg,#ddd,#ccc)" : grad, transition: "transform .2s" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.06)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = ""; }}>
                          <div style={{ width: "100%", height: "100%", borderRadius: "50%", border: `2.5px solid ${V.white}`, overflow: "hidden" }}>
                            <img src={s.user.avatar} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={(e) => { (e.target as HTMLImageElement).style.opacity = ".3"; }} />
                          </div>
                        </div>
                        <div style={{ fontSize: 10.5, fontWeight: 600, color: V.dark, maxWidth: 62, textAlign: "center", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.user.name.split(" ")[0]}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {posts.length === 0 ? <EmptyState icon="📭" title="No posts yet" sub="Posts from your team will appear here." /> : posts.map((p, i) => (
                <div key={p.id} style={{ animation: `slideUp .5s ${i * 0.06}s both` }}>
                  <PostCard post={p} liked={!!likes[p.id]} saved={!!saved[p.id]} reaction={reactions[p.id] || null} showCm={!!showCm[p.id]} followed={!!followed[p.user.id]}
                    onLike={() => toggleLike(p.id)} onSave={() => toggleSave(p.id)} onFollow={() => toggleFollow(p.user.id, p.user.type)}
                    onReact={(e) => setReaction(p.id, e)} onComment={(t) => addComment(p.id, t)} onToggleCm={() => toggleShowCm(p.id)}
                    onViewProfile={(u) => { setViewingUser(u); setActiveTab("profile"); }} />
                </div>
              ))}
            </>
          )}

          {/* EXPLORE */}
          {!loading && activeTab === "explore" && (
            <div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: V.pink, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>Discover</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 26, fontWeight: 900, background: grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: 10 }}>Explore</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {EXPLORE_CATS.map((c) => (<button key={c} onClick={() => setExploreCat(c)} style={{ background: exploreCat === c ? grad : V.white, border: `1.5px solid ${exploreCat === c ? "transparent" : V.border}`, borderRadius: 100, padding: "7px 16px", fontSize: 12.5, fontWeight: 700, cursor: "pointer", color: exploreCat === c ? "#fff" : V.dark, transition: "all .2s", fontFamily: "'DM Sans',sans-serif" }}>{c}</button>))}
                </div>
              </div>
              {exploreImgs.length === 0 ? <EmptyState icon="🔭" title="Nothing to explore yet" sub="Content will appear here as posts are added." /> : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 3, borderRadius: 20, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,.06)" }}>
                  {exploreImgs.map((img, i) => (
                    <div key={i} style={{ gridRow: img.tall ? "span 2" : undefined, aspectRatio: "1", overflow: "hidden", cursor: "pointer", position: "relative", background: V.sand }}>
                      <img src={img.src} alt="" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform .4s" }} onMouseEnter={(e) => ((e.target as HTMLImageElement).style.transform = "scale(1.07)")} onMouseLeave={(e) => ((e.target as HTMLImageElement).style.transform = "")} onError={(e) => { (e.target as HTMLImageElement).style.opacity = ".3"; }} />
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(26,26,26,.7) 0%,transparent 50%)", opacity: 0, transition: "opacity .3s", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 10 }} onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")} onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>❤️ {img.likes}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {trending.length > 0 && (
                <div style={{ marginTop: 24, background: V.white, border: `1px solid ${V.border}`, borderRadius: 20, padding: 18 }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: V.muted, letterSpacing: ".8px", textTransform: "uppercase", marginBottom: 14 }}>Trending Tags</div>
                  {trending.map((t, i) => (
                    <div key={i} style={{ padding: "8px 0", borderBottom: i < trending.length - 1 ? `1px solid ${V.border}` : "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div><div style={{ fontSize: 13, fontWeight: 700, color: V.pink }}>{t.tag}</div><div style={{ fontSize: 11, color: V.muted, marginTop: 1 }}>{t.posts} posts</div></div>
                      <div style={{ fontSize: 14 }}>{t.heat}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* POST */}
          {!loading && activeTab === "post" && <PostPage onPost={handleNewPost} meUser={meUser} />}

          {/* REELS */}
          {!loading && activeTab === "reels" && (
            <div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 900, background: grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>🎬 Reels</div>
              {reels.length === 0 ? <EmptyState icon="🎬" title="No reels yet" sub="Video content will appear here." /> : (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {reels.map((r, i) => (<div key={r.id} style={{ animation: `slideUp .4s ${i * 0.08}s both` }}><ReelCard reel={r} liked={!!reelLikes[r.id]} onLike={() => setReelLikes(p => ({ ...p, [r.id]: !p[r.id] }))} /></div>))}
                </div>
              )}
            </div>
          )}

          {/* PROFILE */}
          {!loading && activeTab === "profile" && (
            <ProfilePage user={viewingUser || meUser} posts={posts} reels={reels}
              onFollow={() => toggleFollow((viewingUser || meUser).id, (viewingUser || meUser).type)}
              isFollowed={!!followed[(viewingUser || meUser).id]}
              onSelectPost={setSelectedPost} />
          )}
        </div>

        {/* Post Modal */}
        {selectedPost && (
          <div onClick={() => setSelectedPost(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.85)", backdropFilter: "blur(8px)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, animation: "slideUp .3s both" }}>
            <div onClick={(e) => e.stopPropagation()} style={{ width: "100%", maxWidth: 480, maxHeight: "90vh", overflowY: "auto", background: "#fff", borderRadius: 24, position: "relative" }}>
              <button onClick={() => setSelectedPost(null)} style={{ position: "absolute", top: 15, right: 15, zIndex: 2000, width: 34, height: 34, background: "rgba(0,0,0,.4)", color: "#fff", border: "none", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>✕</button>
              <PostCard post={selectedPost} liked={!!likes[selectedPost.id]} saved={!!saved[selectedPost.id]} reaction={reactions[selectedPost.id] || null} showCm={true} followed={!!followed[selectedPost.user.id]}
                onLike={() => toggleLike(selectedPost.id)} onSave={() => toggleSave(selectedPost.id)} onFollow={() => toggleFollow(selectedPost.user.id, selectedPost.user.type)}
                onReact={(e) => setReaction(selectedPost.id, e)} onComment={(t) => addComment(selectedPost.id, t)} onToggleCm={() => toggleShowCm(selectedPost.id)}
                onViewProfile={(u) => { setViewingUser(u); setActiveTab("profile"); setSelectedPost(null); }} />
            </div>
          </div>
        )}

        {/* SIDEBAR */}
        <div className="kg-sidebar" style={{ width: 290, flexShrink: 0, display: "none", flexDirection: "column", gap: 16 }}>
          {/* Profile card */}
          <div style={{ background: V.white, border: `1px solid ${V.border}`, borderRadius: 20, padding: 18, boxShadow: "0 2px 16px rgba(0,0,0,.04)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <img src={meUser.avatar} alt="" style={{ width: 54, height: 54, borderRadius: "50%", objectFit: "cover", border: `2.5px solid ${V.pink}`, flexShrink: 0 }} />
              <div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 15, display: "flex", alignItems: "center", gap: 4 }}>{meUser.name} <Verified /></div>
                <div style={{ fontSize: 12, color: V.muted, marginTop: 2 }}>@{meUser.handle}</div>
              </div>
              <span onClick={() => { setViewingUser(null); setActiveTab("profile"); }} style={{ marginLeft: "auto", fontSize: 11.5, fontWeight: 700, color: V.pink, cursor: "pointer" }}>View →</span>
            </div>
            <div style={{ display: "flex", borderTop: `1px solid ${V.border}`, paddingTop: 14 }}>
              {[[String(meUser.posts), "Posts"], [String(meUser.followers), "Followers"], [meUser.following, "Following"]].map(([val, lbl], i) => (
                <div key={i} style={{ flex: 1, textAlign: "center", borderRight: i < 2 ? `1px solid ${V.border}` : "none" }}>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 900, background: grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{val}</div>
                  <div style={{ fontSize: 11, color: V.muted, marginTop: 2 }}>{lbl}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Team */}
          {employees.length > 0 && (
            <div style={{ background: V.white, border: `1px solid ${V.border}`, borderRadius: 20, padding: 18, boxShadow: "0 2px 16px rgba(0,0,0,.04)" }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: V.pink, letterSpacing: ".8px", textTransform: "uppercase", marginBottom: 14 }}>Our Team</div>
              {employees.map((emp) => (
                <div key={emp._id} onClick={() => { setViewingUser({ id: emp._id, name: emp.name, handle: emp.name.toLowerCase().replace(/\s+/g, "."), avatar: emp.image || meUser.avatar, verified: true, bio: emp.role || "", followers: emp.followersCount || 0, following: "0", posts: 0, type: "Employee" }); setActiveTab("profile"); }} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, cursor: "pointer" }}>
                  <img src={emp.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80"} alt="" style={{ width: 38, height: 38, borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: `1.5px solid ${V.pink}` }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: V.dark }}>{emp.name}</div>
                    <div style={{ fontSize: 11, color: V.muted }}>{emp.role}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Suggestions from real users */}
          {allUsers.slice(0, 3).length > 0 && (
            <div style={{ background: V.white, border: `1px solid ${V.border}`, borderRadius: 20, padding: 18, boxShadow: "0 2px 16px rgba(0,0,0,.04)" }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: V.muted, letterSpacing: ".8px", textTransform: "uppercase", marginBottom: 14 }}>Suggested For You</div>
              {allUsers.slice(0, 3).map((u) => (
                <div key={String(u.id)} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <img src={u.avatar} alt="" style={{ width: 38, height: 38, borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: `1.5px solid ${V.border}` }} onError={(e) => { (e.target as HTMLImageElement).style.opacity = ".3"; }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{u.name}{u.verified && <span style={{ display: "inline-block", width: 13, height: 13, background: grad, borderRadius: "50%", fontSize: 8, color: "#fff", textAlign: "center", lineHeight: "13px", marginLeft: 3 }}>✓</span>}</div>
                    <div style={{ fontSize: 11, color: V.muted }}>{u.bio}</div>
                  </div>
                  <button onClick={() => setSuggFollowed(p => ({ ...p, [u.id]: !p[u.id] }))} style={{ background: suggFollowed[u.id] ? grad : "none", border: `1.5px solid ${suggFollowed[u.id] ? "transparent" : V.pink}`, color: suggFollowed[u.id] ? "#fff" : V.pink, fontSize: 11.5, fontWeight: 700, padding: "5px 12px", borderRadius: 100, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", transition: "all .2s", whiteSpace: "nowrap" }}>{suggFollowed[u.id] ? "✓ Following" : "Follow"}</button>
                </div>
              ))}
            </div>
          )}

          {/* Trending */}
          {trending.length > 0 && (
            <div style={{ background: V.white, border: `1px solid ${V.border}`, borderRadius: 20, padding: 18, boxShadow: "0 2px 16px rgba(0,0,0,.04)" }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: V.muted, letterSpacing: ".8px", textTransform: "uppercase", marginBottom: 14 }}>Trending Tags</div>
              {trending.map((t, i) => (
                <div key={i} onClick={() => setActiveTab("explore")} style={{ padding: "8px 0", borderBottom: i < trending.length - 1 ? `1px solid ${V.border}` : "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div><div style={{ fontSize: 13, fontWeight: 700, color: V.pink }}>{t.tag}</div><div style={{ fontSize: 11, color: V.muted, marginTop: 1 }}>{t.posts} posts</div></div>
                  <div>{t.heat}</div>
                </div>
              ))}
            </div>
          )}

          <div style={{ padding: "0 4px", fontSize: 11, color: "#c0bbb0", lineHeight: 1.8 }}>
            About · Help · Press · API · Jobs · Privacy · Terms<br />© 2026 KiwiGram by Kiwi Connect Digital
          </div>
        </div>
      </div>

      {/* BOTTOM NAV */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "rgba(250,250,247,.96)", backdropFilter: "blur(14px)", borderTop: `1px solid ${V.border}`, display: "flex", justifyContent: "space-around", padding: "6px 0 14px", zIndex: 200, boxShadow: "0 -4px 24px rgba(0,0,0,.06)" }}>
        {NAV_ITEMS.map((b) => (
          <button key={b.key} onClick={() => setActiveTab(b.key)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "4px 10px", transition: "transform .2s", minWidth: 52 }}>
            {b.key === "post" ? (
              <div style={{ width: 44, height: 44, background: grad, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: "#fff", boxShadow: activeTab === "post" ? "0 4px 20px rgba(255,108,231,.5)" : "0 2px 10px rgba(255,108,231,.25)", transition: "all .2s", transform: activeTab === "post" ? "scale(1.1)" : "scale(1)" }}>✦</div>
            ) : (
              <div style={{ width: 38, height: 38, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, background: activeTab === b.key ? "linear-gradient(135deg,rgba(255,108,231,.15),rgba(186,58,255,.15))" : "transparent", transition: "all .2s" }}>{b.icon}</div>
            )}
            <span style={{ fontSize: 10, fontWeight: 700, color: activeTab === b.key ? V.pink : V.muted, fontFamily: "'DM Sans',sans-serif" }}>{b.label}</span>
          </button>
        ))}
      </div>
    </>
  );
}