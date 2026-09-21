"use client";

import { useState, useEffect, useRef } from "react";
import type { RefObject } from "react";
import Navbar from "@/app/components/Navbar";

/* ─── CONSTANTS ─────────────────────────── */
const WA_NUMBER = "918305959538";
const WA_MESSAGE = "Hi! I found you through your website and would like to discuss my project.";
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;
const QR_URL = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(WA_LINK)}&bgcolor=ffffff&color=1A1A1A&margin=10`;

const CONTACT_INFO = [
  { icon: "📍", label: "Bhopal Office", lines: [" Second Floor, R-59, GRP Colony, Zone 2, Maharana Pratap Nagar, Bhopal, Madhya Pradesh 462011."], accent: "#ff6ce7", light: "#EBF8D8", action: null },
  { icon: "📍", label: "Indore Office", lines: [" 303, Hello World Victor, Plot No. 47, Chikitsak Nagar, Indore, MP 452010."], accent: "#ff6ce7", light: "#EBF8D8", action: null },
  { icon: "📞", label: "Call / WhatsApp", lines: ["+91 8305959538, +91 6261610281"], accent: "#3B82F6", light: "#EFF6FF", action: { label: "Call Now", href: "tel:+918305959538" } },
  { icon: "✉️", label: "Email Us", lines: ["kiwiconnectdigital@gmail.com"], accent: "#F97316", light: "#FFF7ED", action: { label: "Send Email", href: "mailto: kiwiconnectdigital@gmail.com" } },
];

const SERVICES_LIST = [
  "Performance Marketing",
  "CRM Software Development",
  "ERP Software Development",
  "SaaS Development",
  "Custom Software Development",
  "Web Application Development",
  "Mobile App Development",
  "Predictive AI Solutions",
  "Business Automation",
  "API & Backend Development",
  "UI/UX & Product Design",
  "Cloud & DevOps",
  "Other / Not Sure",
];

function useInView(threshold = 0.1): [RefObject<HTMLElement | null>, boolean] {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ─── HERO ──────────────────────────────── */
function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 80); return () => clearTimeout(t); }, []);

  return (
    <section style={{
      minHeight: "52vh",
      background: "linear-gradient(158deg,#FAFAF7 0%,#EFF9E4 55%,#FAFAF7 100%)",
      display: "flex", flexDirection: "column",
      justifyContent: "center", alignItems: "center",
      padding: "130px 5% 60px", textAlign: "center",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: "0%", right: "-5%", width: "min(500px,60vw)", height: "min(500px,60vw)", borderRadius: "50%", background: "radial-gradient(circle,rgba(109,191,62,0.1) 0%,transparent 65%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-10%", left: "-4%", width: "min(380px,50vw)", height: "min(380px,50vw)", borderRadius: "50%", background: "radial-gradient(circle,rgba(109,191,62,0.08) 0%,transparent 65%)", pointerEvents: "none" }} />

      <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(18px)", transition: "all 0.7s cubic-bezier(.22,.68,0,1.2)", display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", border: "1.5px solid #C8EBAA", borderRadius: 100, padding: "7px 20px", marginBottom: 28, boxShadow: "0 2px 16px rgba(109,191,62,0.1)", position: "relative", zIndex: 1 }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#ff6ce7", display: "inline-block", animation: "blink 2s infinite" }} />
        <span style={{ fontSize: 12, fontWeight: 800, color: "#b774db", letterSpacing: "1.5px", textTransform: "uppercase" }}>We respond within 2 hours</span>
      </div>

      <h1 style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(28px)", transition: "all 0.8s cubic-bezier(.22,.68,0,1.2) 0.1s", fontFamily: "'Syne',sans-serif", fontSize: "clamp(36px,6vw,82px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-3px", color: "#141414", maxWidth: 820, marginBottom: 22, position: "relative", zIndex: 1 }}>
        Let's build something<br /><em style={{ fontStyle: "italic", color: "#ff6ce7" }}>great together.</em>
      </h1>

      <p style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(18px)", transition: "all 0.8s cubic-bezier(.22,.68,0,1.2) 0.2s", fontSize: "clamp(14px,1.6vw,18px)", color: "#5A5A5A", maxWidth: 520, lineHeight: 1.75, fontWeight: 500, position: "relative", zIndex: 1 }}>
        Tell us about your brand and goals. We'll get back to you with a tailored strategy — no fluff, no pushy sales.
      </p>
    </section>
  );
}

/* ─── CONTACT INFO CARD ─────────────────── */
function ContactCard({ c, i, inView }: { c: { icon: string; label: string; lines: string[]; accent: string; light: string; action: { label: string; href: string } | null }; i: number; inView: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: hov ? c.accent : "#fff", border: `1.5px solid ${hov ? c.accent : "#EAE6E0"}`, borderRadius: 20, padding: "22px 24px", display: "flex", alignItems: "flex-start", gap: 16, transition: "all 0.32s cubic-bezier(.22,.68,0,1.2)", boxShadow: hov ? `0 16px 48px ${c.accent}33` : "0 2px 12px rgba(0,0,0,0.04)", transform: hov ? "translateX(4px)" : "translateX(0)", opacity: inView ? 1 : 0, transitionDelay: `${0.08 * i}s`, cursor: "default" }}>
      <div style={{ width: 46, height: 46, borderRadius: 13, flexShrink: 0, background: hov ? "rgba(255,255,255,0.2)" : c.light, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 21, transition: "background 0.3s" }}>{c.icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: hov ? "rgba(255,255,255,0.7)" : "#AAA", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 5, transition: "color 0.3s" }}>{c.label}</div>
        {c.lines.map((ln, li) => <div key={li} style={{ fontSize: 14, fontWeight: 700, color: hov ? "#fff" : "#1A1A1A", lineHeight: 1.6, transition: "color 0.3s" }}>{ln}</div>)}
        {c.action && <a href={c.action.href} style={{ display: "inline-flex", alignItems: "center", gap: 5, marginTop: 9, fontSize: 13, fontWeight: 700, color: hov ? "#fff" : c.accent, textDecoration: "none", transition: "color 0.3s" }}>{c.action.label} →</a>}
      </div>
    </div>
  );
}

/* ─── WHATSAPP QR ───────────────────────── */
function WhatsAppQR({ inView }: { inView: boolean }) {
  const [hov, setHov] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    try { navigator.clipboard.writeText(WA_LINK).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2200); }); } catch {}
  };

  return (
    <div style={{ background: "#1A1A1A", borderRadius: 22, padding: "28px 24px", border: "1.5px solid #2A2A2A", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s cubic-bezier(.22,.68,0,1.2) 0.32s", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "-30%", right: "-10%", width: 260, height: 260, borderRadius: "50%", background: "radial-gradient(circle,rgba(109,191,62,0.18) 0%,transparent 70%)", pointerEvents: "none" }} />

      <div className="wa-inner" style={{ display: "flex", gap: 20, alignItems: "center", position: "relative", zIndex: 1 }}>
        <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
          style={{ flexShrink: 0, background: "#fff", borderRadius: 16, padding: 9, boxShadow: "0 8px 32px rgba(0,0,0,0.3)", border: "3px solid #ff6ce7", transition: "transform 0.3s", transform: hov ? "scale(1.03)" : "scale(1)" }}>
          <img src={QR_URL} alt="WhatsApp QR" width={100} height={100} style={{ display: "block", borderRadius: 9 }} />
          <div style={{ textAlign: "center", marginTop: 5 }}><span style={{ fontSize: 9, fontWeight: 800, color: "#25D366", letterSpacing: "0.5px" }}>SCAN TO CHAT</span></div>
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#25D36622", border: "1px solid #25D36644", borderRadius: 100, padding: "4px 12px", marginBottom: 12 }}>
            <span style={{ fontSize: 10, fontWeight: 800, color: "#25D366", letterSpacing: "0.5px" }}>💬 WhatsApp Direct Chat</span>
          </div>
          <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 7, letterSpacing: "-0.3px" }}>Chat with us instantly</h3>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, fontWeight: 500, marginBottom: 16 }}>Scan the QR code to open a WhatsApp chat — no saving numbers needed.</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <a href={WA_LINK} target="_blank" rel="noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "9px 18px", borderRadius: 100, background: "#25D366", color: "#fff", textDecoration: "none", fontSize: 13, fontWeight: 800, fontFamily: "'DM Sans',sans-serif", boxShadow: "0 6px 20px rgba(37,211,102,0.35)", transition: "all 0.25s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
            >Open WhatsApp</a>
            <button onClick={copyLink}
              style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "9px 18px", borderRadius: 100, background: copied ? "#ff6ce7" : "rgba(255,255,255,0.1)", color: "#fff", border: "1.5px solid rgba(255,255,255,0.15)", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", transition: "all 0.3s" }}
            >{copied ? "✓ Copied!" : "Copy Link"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── MAP CARDS (Bhopal & Indore) ─────────────────── */
function MapCards({ inView }: { inView: boolean }) {
  const offices = [
    {
      city: "Bhopal HQ",
      address: "Second Floor, R-59, GRP Colony, Zone 2, MP Nagar, Bhopal, MP 462011",
      link: "https://maps.app.goo.gl/9UWib1JDfDkRwXnf6",
      iframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.212002164789!2d77.4328849!3d23.2353388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c43526fa545f5%3A0x2326096e22e379c1!2sR-59%2C%20Zone-II%2C%20Maharana%20Pratap%20Nagar%2C%20Bhopal%2C%20Madhya%20Pradesh%20462011!5e0!3m2!1sen!2sin!4v1711200000000"
    },
    {
      city: "Indore Office",
      address: "303, Hello World Victor, Plot No. 47, Chikitsak Nagar, Indore, MP 452010",
      link: "https://maps.app.goo.gl/461QnisdYzkRPJps7",
      iframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3679.434789505!2d75.9049830!3d22.7570536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd2b9e50ada3%3A0x3e44d767ec6c9a3c!2sPlot%20No.%2047%2C%20Chikitsak%20Nagar%2C%20Indore%2C%20Madhya%20Pradesh%20452010!5e0!3m2!1sen!2sin!4v1711200000000"
    }
  ];

  return (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s cubic-bezier(.22,.68,0,1.2) 0.42s" }}>
      {offices.map((off, i) => (
        <div key={i} style={{ flex: "1 1 280px", borderRadius: 20, overflow: "hidden", border: "1.5px solid #EAE6E0", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", background: "#fff" }}>
          <iframe 
            title={off.city} 
            src={off.iframe} 
            width="100%" 
            height="160" 
            style={{ display: "block", border: "none" }} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div style={{ padding: "14px 18px" }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#1A1A1A" }}>{off.city}</div>
            <div style={{ fontSize: 11, color: "#888", fontWeight: 500, marginTop: 2, minHeight: 32 }}>{off.address}</div>
            <a href={off.link} target="_blank" rel="noreferrer"
              style={{ display: "inline-block", marginTop: 10, padding: "6px 14px", borderRadius: 100, background: "#ff6ce7", color: "#fff", fontSize: 11, fontWeight: 700, textDecoration: "none", fontFamily: "'DM Sans',sans-serif" }}
            >Directions →</a>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── CONTACT FORM ──────────────────────── */
function ContactForm({ inView }: { inView: boolean }) {
  const EMPTY = { firstName: "", lastName: "", email: "", phone: "", company: "", service: "", budget: "", message: "" };
  type FormType = typeof EMPTY;
  const [form, setForm] = useState<FormType>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormType, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<keyof FormType | null>(null);

  const validate = () => {
    const e: Partial<Record<keyof FormType, string>> = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.phone.trim() || form.phone.length < 10) e.phone = "Valid phone required";
    if (!form.service) e.service = "Please select a service";
    if (!form.message.trim() || form.message.length < 20) e.message = "Please tell us a bit more (min 20 chars)";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (response.ok) { setSubmitted(true); } else { alert("Something went wrong. Please try again."); }
    } catch (err) {
      console.error("Submission error:", err);
      setTimeout(() => { setSubmitted(true); }, 1000);
    } finally { setLoading(false); }
  };

  const iStyle = (field: string | null) => ({
    width: "100%", padding: "13px 16px", borderRadius: 12,
    border: `1.5px solid ${field && errors[field as keyof FormType] ? "#EF4444" : focused === field ? "#ff6ce7" : "#E2DDD6"}`,
    background: focused === field ? "#FAFFF5" : "#FAFAF7",
    fontSize: 14, color: "#1A1A1A", fontWeight: 500,
    fontFamily: "'DM Sans',sans-serif", outline: "none", transition: "all 0.25s",
    boxShadow: focused === field ? "0 0 0 4px rgba(109,191,62,0.12)" : "none",
    appearance: field === "service" ? "none" : "auto" as any,
  });

  const lStyle = { fontSize: 13, fontWeight: 700, color: "#444", marginBottom: 6, display: "block", letterSpacing: "0.2px" };
  const eStyle = { fontSize: 12, color: "#EF4444", fontWeight: 600, marginTop: 4 };

  if (submitted) {
    return (
      <div style={{ background: "#fff", borderRadius: 28, padding: "60px 40px", boxShadow: "0 8px 48px rgba(0,0,0,0.08)", border: "1.5px solid #EAE6E0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", minHeight: 460, opacity: inView ? 1 : 0, transition: "all 0.7s ease" }}>
        <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg,#ff6ce7,#ba3aff)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, marginBottom: 24, boxShadow: "0 12px 40px rgba(109,191,62,0.35)" }}>✓</div>
        <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 28, fontWeight: 800, color: "#1A1A1A", marginBottom: 12 }}>Message Received! 🎉</h2>
        <p style={{ fontSize: 15, color: "#666", lineHeight: 1.75, fontWeight: 500, maxWidth: 360, marginBottom: 32 }}>Thank you, <strong>{form.firstName}</strong>! We'll reach out within 2 business hours.</p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
          <a href={WA_LINK} target="_blank" rel="noreferrer" style={{ padding: "12px 24px", borderRadius: 100, background: "#25D366", color: "#fff", textDecoration: "none", fontSize: 14, fontWeight: 800 }}>Chat on WhatsApp →</a>
          <button onClick={() => { setSubmitted(false); setForm(EMPTY); }} style={{ padding: "12px 24px", borderRadius: 100, background: "#F2EFE9", color: "#555", border: "none", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Send Another</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#fff", borderRadius: 28, padding: "clamp(28px,4vw,48px) clamp(24px,4vw,48px)", boxShadow: "0 8px 48px rgba(0,0,0,0.08)", border: "1.5px solid #EAE6E0", opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(32px)", transition: "all 0.9s cubic-bezier(.22,.68,0,1.2) 0.1s" }}>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: "#ff6ce7", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 8 }}>Start the conversation</div>
        <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(22px,2.5vw,28px)", fontWeight: 800, color: "#1A1A1A", letterSpacing: "-0.8px", marginBottom: 6 }}>Tell us about your project</h2>
      </div>

      <div className="form-row" style={{ marginBottom: 16 }}>
        <div>
          <label style={lStyle}>First Name <span style={{ color: "#EF4444" }}>*</span></label>
          <input value={form.firstName} onChange={e => { setForm({ ...form, firstName: e.target.value }); setErrors({ ...errors, firstName: "" }); }} onFocus={() => setFocused("firstName")} onBlur={() => setFocused(null)} placeholder="Arjun" style={iStyle("firstName")} />
          {errors.firstName && <div style={eStyle}>{errors.firstName}</div>}
        </div>
        <div>
          <label style={lStyle}>Last Name</label>
          <input value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} onFocus={() => setFocused("lastName")} onBlur={() => setFocused(null)} placeholder="Shetty" style={iStyle("lastName")} />
        </div>
      </div>

      <div className="form-row" style={{ marginBottom: 16 }}>
        <div>
          <label style={lStyle}>Email Address <span style={{ color: "#EF4444" }}>*</span></label>
          <input type="email" value={form.email} onChange={e => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: "" }); }} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} placeholder="arjun123@gmail.com" style={iStyle("email")} />
          {errors.email && <div style={eStyle}>{errors.email}</div>}
        </div>
        <div>
          <label style={lStyle}>Phone / WhatsApp <span style={{ color: "#EF4444" }}>*</span></label>
          <input type="tel" value={form.phone} onChange={e => { setForm({ ...form, phone: e.target.value }); setErrors({ ...errors, phone: "" }); }} onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)} placeholder="+91 98765 43210" style={iStyle("phone")} />
          {errors.phone && <div style={eStyle}>{errors.phone}</div>}
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={lStyle}>Company / Brand Name</label>
        <input value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} onFocus={() => setFocused("company")} onBlur={() => setFocused(null)} placeholder="Your company or brand name" style={iStyle("company")} />
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={lStyle}>Service You're Interested In <span style={{ color: "#EF4444" }}>*</span></label>
        <div style={{ position: "relative" }}>
          <select 
            value={form.service} 
            onChange={e => { setForm({ ...form, service: e.target.value }); setErrors({ ...errors, service: "" }); }} 
            onFocus={() => setFocused("service")} 
            onBlur={() => setFocused(null)} 
            style={{ ...iStyle("service"), cursor: "pointer", paddingRight: 40, backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' fill=\'%23888\' viewBox=\'0 0 16 16\'%3E%3Cpath d=\'M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z\'/%3E%3C/svg%3E")', backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center" }}
          >
            <option value="" disabled>Select a service</option>
            {SERVICES_LIST.map(svc => (
              <option key={svc} value={svc}>{svc}</option>
            ))}
          </select>
        </div>
        {errors.service && <div style={eStyle}>{errors.service}</div>}
      </div>

      <div style={{ marginBottom: 28 }}>
        <label style={lStyle}>Tell Us About Your Goals <span style={{ color: "#EF4444" }}>*</span></label>
        <textarea value={form.message} onChange={e => { setForm({ ...form, message: e.target.value }); setErrors({ ...errors, message: "" }); }} onFocus={() => setFocused("message")} onBlur={() => setFocused(null)} placeholder="Share your current challenges, goals, target audience…" rows={4} style={{ ...iStyle("message"), resize: "vertical", minHeight: 110, lineHeight: 1.7 }} />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
          {errors.message ? <div style={eStyle}>{errors.message}</div> : <div />}
          <div style={{ fontSize: 11, color: "#BBB", fontWeight: 600 }}>{form.message.length} chars</div>
        </div>
      </div>

      <button onClick={handleSubmit} disabled={loading}
        style={{ width: "100%", padding: "17px 32px", borderRadius: 14, border: "none", background: loading ? "#ba3aff" : "linear-gradient(135deg,#ff6ce7,#b774db)", color: "#fff", fontSize: 15, fontWeight: 800, cursor: loading ? "not-allowed" : "pointer", fontFamily: "'DM Sans',sans-serif", boxShadow: "0 8px 32px rgba(109,191,62,0.38)", transition: "all 0.3s", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}
      >
        {loading ? "Sending..." : "Send My Message — It's Free →"}
      </button>

      <div style={{ display: "flex", gap: 16, marginTop: 18, justifyContent: "center", flexWrap: "wrap" }}>
        {["⚡ 2hr Response", "🚫 No Spam Ever"].map(t => (
          <span key={t} style={{ fontSize: 12, color: "#AAA", fontWeight: 600 }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

/* ─── CONTACT SECTION ───────────────────── */
function ContactSection() {
  const [ref, inView] = useInView(0.05);
  return (
    <section ref={ref} style={{ padding: "40px 5% 80px", background: "#FAFAF7" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 32 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {CONTACT_INFO.map((c, i) => <ContactCard key={i} c={c as any} i={i} inView={inView} />)}
            <WhatsAppQR inView={inView} />
            <MapCards inView={inView} />
          </div>
          <ContactForm inView={inView} />
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ────────────────────────────── */
function Footer() {
  return (
    <footer style={{ background: "#111", padding: "40px 5% 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/kiwilogo.png" alt="Kiwi Connect Logo" style={{ width: 32, height: 32, borderRadius: 9, objectFit: "cover" }} />
          <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 15, color: "#fff" }}>
            Kiwi Connect <span style={{ color: "#ff6ce7" }}>Digital</span>
          </span>
        </div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", fontWeight: 500 }}>© 2026 Kiwi Connect Digital. All rights reserved.</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", fontWeight: 500 }}>Crafted by KiwiConnect</div>
      </div>
    </footer>
  );
}

/* ─── MAIN PAGE ─────────────────────────── */
export default function ContactPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap');
        
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #FAFAF7; font-family: 'DM Sans', sans-serif; }

        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes popIn { 0% { transform: scale(0.5); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
        @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0.3; } }

        input::placeholder, textarea::placeholder { color: #BBC; font-weight: 500; }
        input:focus, textarea:focus { outline: none; }

        /* Navbar show/hide */
        .nav-desktop { display: none !important; }
        @media (min-width: 768px) { .nav-desktop { display: flex !important; } }
        .nav-mobile { display: flex !important; }
        @media (min-width: 768px) { .nav-mobile { display: none !important; } }

        /* Main contact layout: stacked on mobile, side-by-side on large */
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          align-items: flex-start;
        }
        @media (min-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr 1.15fr;
            gap: 28px;
          }
        }

        /* WhatsApp card inner layout */
        .wa-inner {
          display: flex;
          flex-direction: column;
          gap: 20px;
          position: relative;
        }
        @media (min-width: 480px) {
          .wa-inner {
            flex-direction: row;
            align-items: center;
            gap: 24px;
          }
        }

        /* Form 2-col rows */
        .form-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
        }
        @media (min-width: 480px) {
          .form-row {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
      <main style={{ background: "#FAFAF7", minHeight: "100vh" }}>
        <Navbar />
        <HeroSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}