"use client";

import { useState, useEffect, useRef, type RefObject } from "react";
import Navbar from "@/app/components/Navbar";
import { useRouter } from "next/navigation";

/* ─── DATA ──────────────────────────────── */
const PRODUCTS = [
  {
    id: "meal-mitra",
    kind: "POS",
    icon: "🍽️",
    name: "Meal Mitra",
    tagline: "Your restaurant, run from one counter.",
    desc: "A complete restaurant & café POS built for real service — billing, kitchen display, table management, inventory, purchasing, and reporting, all working off the same live data. From the first order to the closing report, nothing needs a second system.",
    accent: "#ff6ce7",
    light: "#FFF0FB",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=85",
    moduleCount: 15,
    modules: [
      { icon: "🧾", title: "POS Billing", desc: "Fast billing, barcode scan, variants, add-ons, combos, splits & GST." },
      { icon: "🍽️", title: "Order Management", desc: "Dine-in, takeaway, delivery & online orders in one live queue." },
      { icon: "🪑", title: "Table Management", desc: "Multi-floor layouts, merge/split tables, reservations & waitlist." },
      { icon: "👨‍🍳", title: "Kitchen Display System", desc: "Live KDS queue with New / Preparing / Ready status per station." },
      { icon: "🍔", title: "Menu Management", desc: "Categories, variants, combos, seasonal & happy-hour pricing." },
      { icon: "📦", title: "Inventory Management", desc: "Stock in/out, low-stock alerts, expiry & wastage tracking." },
      { icon: "🧪", title: "Recipe Management", desc: "Ingredient mapping, food costing & automatic stock deduction." },
      { icon: "🚚", title: "Purchase Management", desc: "Vendor orders, goods receiving, returns & vendor ledgers." },
      { icon: "🤝", title: "Customer Management", desc: "Profiles, order history & customer-wise sales." },
      { icon: "💰", title: "Payments & Finance", desc: "Cash, card & UPI, split payments, refunds & daily collections." },
      { icon: "📊", title: "Reports & Analytics", desc: "Sales, GST, discount, inventory & profit reporting." },
      { icon: "🔐", title: "Staff & User Management", desc: "Role-based access for admins, managers, cashiers & kitchen." },
      { icon: "🏪", title: "Outlet Management", desc: "Multiple outlets, branch-wise sales & centralised control." },
      { icon: "🖨️", title: "Printing", desc: "Customer invoices, kitchen tickets & one-tap reprints." },
      { icon: "📥", title: "Data Import", desc: "Bulk product, category, inventory & image import." },
    ],
  },
  {
    id: "kiwi-payroll",
    kind: "AMS",
    icon: "🥝",
    name: "Kiwi Payroll",
    tagline: "Attendance and payroll that run themselves.",
    desc: "A complete attendance management system that verifies who's actually on-site with face recognition and geofencing, then turns that data straight into working hours, overtime, leave, and payroll — no spreadsheet reconciliation required.",
    accent: "#8B5CF6",
    light: "#F5F3FF",
    img: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=900&q=85",
    moduleCount: 11,
    modules: [
      { icon: "🧑‍💼", title: "Employee Management", desc: "Profiles, department, designation, salary & bank details." },
      { icon: "🕐", title: "Attendance Management", desc: "Check-in/out, working hours, overtime & late tracking." },
      { icon: "📍", title: "Location & Geofencing", desc: "Site-verified check-ins — no off-location clock-ins." },
      { icon: "📸", title: "Face Recognition", desc: "Face-matched attendance with a configurable threshold." },
      { icon: "🏖️", title: "Leave Management", desc: "Requests, approvals, balances & leave history." },
      { icon: "💵", title: "Payroll", desc: "Salary calculated from real attendance, overtime & leave." },
      { icon: "📈", title: "Reports & Analytics", desc: "Attendance, overtime, leave & payroll-ready reports." },
      { icon: "🔐", title: "User & Access Management", desc: "Admin & employee accounts with role-based access." },
      { icon: "📧", title: "Automated Notifications", desc: "Scheduled daily attendance summaries by email." },
      { icon: "⚙️", title: "Automated Processes", desc: "Cron-driven hours, overtime & attendance processing." },
      { icon: "📱", title: "Mobile Attendance", desc: "Face + GPS check-in and self-service from the app." },
    ],
  },
];

const PROCESS = [
  { step: "01", title: "Sell & Serve", desc: "Meal Mitra handles billing, table service, and the kitchen queue — every order tracked end to end." },
  { step: "02", title: "Stock & Source", desc: "Recipes deduct inventory automatically, and purchase orders keep vendors and stock in sync." },
  { step: "03", title: "Track the Team", desc: "Kiwi Payroll verifies every check-in with face and location, no matter how many shifts run." },
  { step: "04", title: "Pay & Report", desc: "Payroll runs off real attendance data, while both products feed the same reporting layer." },
];

const FLOATING_PILLS = [
  { label: "POS Billing", top: "22%", left: "4%", delay: "0.5s", rot: "-4deg" },
  { label: "Kitchen Display", top: "20%", right: "4%", delay: "0.65s", rot: "3deg" },
  { label: "Face Attendance", bottom: "25%", left: "3%", delay: "0.8s", rot: "2deg" },
  { label: "Payroll", bottom: "25%", right: "3%", delay: "0.7s", rot: "-3deg" },
];

/* ─── HOOK ──────────────────────────────── */
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
      minHeight: "78vh",
      background: "linear-gradient(158deg,#FAFAF7 0%,#EFF9E4 55%,#FAFAF7 100%)",
      display: "flex", flexDirection: "column",
      justifyContent: "center", alignItems: "center",
      padding: "130px 5% 70px",
      position: "relative", overflow: "hidden",
      textAlign: "center",
    }}>
      <div style={{ position: "absolute", top: "5%", right: "0%", width: "min(480px,60vw)", height: "min(480px,60vw)", borderRadius: "50%", background: "radial-gradient(circle,rgba(109,191,62,0.12) 0%,transparent 65%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "0%", left: "-3%", width: "min(360px,45vw)", height: "min(360px,45vw)", borderRadius: "50%", background: "radial-gradient(circle,rgba(109,191,62,0.09) 0%,transparent 65%)", pointerEvents: "none" }} />

      {FLOATING_PILLS.map((p, i) => (
        <div key={i} className="floating-pill" style={{
          position: "absolute",
          top: p.top, bottom: p.bottom, left: p.left, right: p.right,
          background: "#fff", borderRadius: 100, padding: "9px 18px",
          border: "1.5px solid #D5EDBB", boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
          fontSize: 13, fontWeight: 700, color: "#b774db",
          opacity: loaded ? 1 : 0,
          transform: loaded ? `rotate(${p.rot})` : `rotate(${p.rot}) translateY(16px)`,
          transition: `all 0.8s cubic-bezier(.22,.68,0,1.2) ${p.delay}`,
          display: "flex", alignItems: "center", gap: 7,
          pointerEvents: "none",
        }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#ff6ce7", display: "inline-block", flexShrink: 0 }} />
          {p.label}
        </div>
      ))}

      <div style={{
        opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(18px)",
        transition: "all 0.7s cubic-bezier(.22,.68,0,1.2)",
        display: "inline-flex", alignItems: "center", gap: 8,
        background: "#fff", border: "1.5px solid #C8EBAA",
        borderRadius: 100, padding: "7px 20px", marginBottom: 28,
        boxShadow: "0 2px 16px rgba(109,191,62,0.1)",
        position: "relative", zIndex: 1,
      }}>
        <span style={{ fontSize: 12, fontWeight: 800, color: "#b774db", letterSpacing: "1.5px", textTransform: "uppercase" }}>Two Products, Built to Connect</span>
      </div>

      <h1 style={{
        opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(28px)",
        transition: "all 0.8s cubic-bezier(.22,.68,0,1.2) 0.1s",
        fontFamily: "'Syne',sans-serif",
        fontSize: "clamp(36px,6.5vw,80px)",
        fontWeight: 800, lineHeight: 1.04, letterSpacing: "-2px",
        color: "#141414", maxWidth: 880, marginBottom: 22,
        position: "relative", zIndex: 1,
      }}>
        Run the floor.<br />Run the <em style={{ fontStyle: "italic", color: "#ff6ce7" }}>team.</em>
      </h1>

      <p style={{
        opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(18px)",
        transition: "all 0.8s cubic-bezier(.22,.68,0,1.2) 0.22s",
        fontSize: "clamp(14px,1.6vw,19px)", color: "#5A5A5A",
        maxWidth: 560, lineHeight: 1.75, fontWeight: 500, marginBottom: 40,
        position: "relative", zIndex: 1,
      }}>
        <strong style={{ color: "#1A1A1A" }}>Meal Mitra</strong> handles billing, kitchen, and stock. <strong style={{ color: "#1A1A1A" }}>Kiwi Payroll</strong> handles attendance and pay. Use either on its own, or run both together.
      </p>

      <div style={{
        opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(16px)",
        transition: "all 0.8s cubic-bezier(.22,.68,0,1.2) 0.32s",
        display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center",
        position: "relative", zIndex: 1,
      }}>
        <a href="#meal-mitra" style={{ padding: "14px 30px", borderRadius: 100, background: "#ff6ce7", color: "#fff", border: "none", fontSize: 15, fontWeight: 700, cursor: "pointer", boxShadow: "0 8px 28px rgba(255,108,231,0.35)", fontFamily: "'DM Sans',sans-serif", transition: "all 0.25s", textDecoration: "none", display: "inline-block" }}
        >🍽️ Meet Meal Mitra →</a>
        <a href="#kiwi-payroll" style={{ padding: "14px 30px", borderRadius: 100, background: "transparent", color: "#1A1A1A", border: "2px solid #D0D0D0", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", transition: "all 0.25s", textDecoration: "none", display: "inline-block" }}
        >🥝 Meet Kiwi Payroll →</a>
      </div>
    </section>
  );
}

/* ─── MODULE CHIP ───────────────────────── */
function ModuleChip({ m, accent, light, i, inView }: { m: { icon: string; title: string; desc: string }; accent: string; light: string; i: number; inView: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "#fff",
        border: `1.5px solid ${hov ? accent : "#EAE6E0"}`,
        borderRadius: 16,
        padding: "16px 18px",
        display: "flex", gap: 12, alignItems: "flex-start",
        boxShadow: hov ? "0 12px 32px rgba(0,0,0,0.08)" : "0 1px 6px rgba(0,0,0,0.03)",
        transform: inView ? (hov ? "translateY(-3px)" : "translateY(0)") : "translateY(18px)",
        opacity: inView ? 1 : 0,
        transition: `all 0.3s cubic-bezier(.22,.68,0,1.2)`,
        transitionDelay: `${0.03 * (i % 12)}s`,
      }}
    >
      <div style={{ width: 36, height: 36, borderRadius: 10, background: light, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, flexShrink: 0 }}>{m.icon}</div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 800, color: "#1A1A1A", marginBottom: 3, fontFamily: "'Syne',sans-serif" }}>{m.title}</div>
        <div style={{ fontSize: 12.5, lineHeight: 1.6, color: "#666", fontWeight: 500 }}>{m.desc}</div>
      </div>
    </div>
  );
}

/* ─── PRODUCT SHOWCASE ──────────────────── */
function ProductShowcase({ product, index }: { product: (typeof PRODUCTS)[number]; index: number }) {
  const router = useRouter();
  const [ref, inView] = useInView(0.05);
  const reversed = index % 2 === 1;

  return (
    <section id={product.id} ref={ref} style={{ padding: "90px 5%", background: reversed ? product.light : "#fff" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Intro row */}
        <div className="product-intro" style={{ display: "grid", gap: 40, alignItems: "center", marginBottom: 56, direction: reversed ? "rtl" : "ltr" }}>
          <div style={{
            direction: "ltr",
            opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.7s cubic-bezier(.22,.68,0,1.2)",
          }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", border: `1.5px solid ${product.accent}55`, borderRadius: 100, padding: "6px 16px", marginBottom: 20 }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: product.accent, letterSpacing: "1.5px", textTransform: "uppercase" }}>{product.kind} · {product.moduleCount} Modules</span>
            </div>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(30px,4vw,54px)", fontWeight: 800, color: "#1A1A1A", letterSpacing: "-1.5px", lineHeight: 1.05, marginBottom: 16, display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ fontSize: "0.7em" }}>{product.icon}</span>{product.name}
            </h2>
            <p style={{ fontSize: 16, fontWeight: 700, color: product.accent, marginBottom: 18 }}>{product.tagline}</p>
            <p style={{ fontSize: 14.5, lineHeight: 1.85, color: "#555", fontWeight: 500, marginBottom: 28, maxWidth: 520 }}>{product.desc}</p>
            <button
              onClick={() => router.push(`/products/${product.id}`)}
              style={{ padding: "14px 28px", borderRadius: 100, background: product.accent, color: "#fff", border: "none", fontSize: 14.5, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", boxShadow: `0 8px 26px ${product.accent}55`, transition: "all 0.25s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
            >Explore {product.name} →</button>
          </div>

          <div style={{
            direction: "ltr",
            borderRadius: 24, overflow: "hidden", position: "relative", minHeight: 300,
            opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.8s cubic-bezier(.22,.68,0,1.2) 0.1s",
            boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
          }}>
            <img src={product.img} alt={product.name} style={{ width: "100%", height: "100%", minHeight: 300, objectFit: "cover", display: "block" }} />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg,${product.accent}33 0%,transparent 60%)` }} />
          </div>
        </div>

        {/* Module grid */}
        <div className="module-grid">
          {product.modules.map((m, i) => (
            <ModuleChip key={m.title} m={m} accent={product.accent} light={product.light} i={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PROCESS ───────────────────────────── */
function ProcessSection() {
  const [ref, inView] = useInView();
  return (
    <section ref={ref} style={{ padding: "100px 5%", background: "#1A1A1A", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "-20%", right: "10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(109,191,62,0.1) 0%,transparent 65%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 72, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s ease" }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: "#ff6ce7", letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 14 }}>How They Connect</div>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(26px,3.5vw,50px)", fontWeight: 800, color: "#fff", letterSpacing: "-1.5px", lineHeight: 1.1 }}>
            One workflow, from<br />the till to the <em style={{ fontStyle: "italic", color: "#ba3aff" }}>payslip.</em>
          </h2>
        </div>

        <div className="process-grid">
          {PROCESS.map((p, i) => {
            const [hov, setHov] = useState(false);
            return (
              <div key={i} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
                style={{ padding: "0 20px", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)", transition: `all 0.7s cubic-bezier(.22,.68,0,1.2) ${0.12 * i}s`, position: "relative", zIndex: 1 }}>
                <div style={{ width: 68, height: 68, borderRadius: "50%", background: hov ? "#ff6ce7" : "#2A2A2A", border: `2px solid ${hov ? "#ff6ce7" : "#3A3A3A"}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, transition: "all 0.35s", boxShadow: hov ? "0 0 0 8px rgba(109,191,62,0.15)" : "none" }}>
                  <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 17, fontWeight: 800, color: hov ? "#fff" : "#ff6ce7" }}>{p.step}</span>
                </div>
                <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 19, fontWeight: 800, color: "#fff", marginBottom: 12, letterSpacing: "-0.3px" }}>{p.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.8, color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>{p.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ───────────────────────────────── */
function CTASection() {
  const [ref, inView] = useInView();
  const router = useRouter();
  return (
    <section ref={ref} style={{ padding: "80px 5%", background: "#FAFAF7" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="cta-block" style={{ background: "#1A1A1A", borderRadius: 28, position: "relative", overflow: "hidden", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(36px)", transition: "all 0.9s cubic-bezier(.22,.68,0,1.2)" }}>
          <div style={{ position: "absolute", top: "-25%", right: "18%", width: 380, height: 380, borderRadius: "50%", background: "radial-gradient(circle,rgba(109,191,62,0.14) 0%,transparent 70%)", pointerEvents: "none" }} />
          <div className="cta-inner">
            <div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
                {["🍽️ Meal Mitra", "🥝 Kiwi Payroll"].map(t => (
                  <span key={t} style={{ padding: "5px 14px", borderRadius: 100, background: "rgba(109,191,62,0.15)", border: "1px solid rgba(109,191,62,0.3)", fontSize: 12, fontWeight: 700, color: "#ba3aff" }}>{t}</span>
                ))}
              </div>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(24px,3.2vw,44px)", fontWeight: 800, color: "#fff", lineHeight: 1.1, letterSpacing: "-1px", marginBottom: 14 }}>
                Not sure which one<br />you <em style={{ fontStyle: "italic", color: "#ba3aff" }}>need first?</em>
              </h2>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>Book a free 30-minute walkthrough. We'll show you Meal Mitra, Kiwi Payroll, or both — whatever actually fits.</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, flexShrink: 0 }}>
              <button onClick={() => router.push("/products/meal-mitra")} style={{ padding: "16px 36px", borderRadius: 100, background: "#ff6ce7", color: "#fff", border: "none", fontSize: 15, fontWeight: 800, cursor: "pointer", boxShadow: "0 8px 32px rgba(255,108,231,0.4)", fontFamily: "'DM Sans',sans-serif", whiteSpace: "nowrap", transition: "all 0.25s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
              >🍽️ Explore Meal Mitra →</button>
              <button onClick={() => router.push("/products/kiwi-payroll")} style={{ padding: "16px 36px", borderRadius: 100, background: "transparent", color: "rgba(255,255,255,0.75)", border: "1.5px solid rgba(255,255,255,0.25)", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", whiteSpace: "nowrap", transition: "all 0.25s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; e.currentTarget.style.color = "rgba(255,255,255,0.75)"; }}
              >🥝 Explore Kiwi Payroll →</button>
            </div>
          </div>
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
          <img
            src="/kiwilogo.png"
            alt="Kiwi Connect Logo"
            style={{ width: 32, height: 32, borderRadius: 9, objectFit: "cover" }}
          />
          <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 15, color: "#fff" }}>
            Kiwi Connect <span style={{ color: "#ff6ce7" }}>Digital</span>
          </span>
        </div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", fontWeight: 500, textAlign: "center" }}>
          © 2026 Kiwi Connect Digital. All rights reserved.
        </div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", fontWeight: 500 }}>
          Crafted by KiwiConnect
        </div>
      </div>
    </footer>
  );
}

/* ─── ROOT ──────────────────────────────── */
export default function ProductsPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #FAFAF7; font-family: 'DM Sans', sans-serif; }

        .nav-desktop { display: none !important; }
        @media (min-width: 768px) { .nav-desktop { display: flex !important; } }
        .nav-mobile { display: flex !important; }
        @media (min-width: 768px) { .nav-mobile { display: none !important; } }

        .floating-pill { display: none; }
        @media (min-width: 860px) { .floating-pill { display: flex; } }

        .product-intro {
          grid-template-columns: 1fr;
        }
        @media (min-width: 900px) {
          .product-intro { grid-template-columns: 1fr 1fr; }
        }

        .module-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }
        @media (min-width: 560px) {
          .module-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
        }
        @media (min-width: 960px) {
          .module-grid { grid-template-columns: repeat(3, 1fr); gap: 16px; }
        }

        .process-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 44px;
          position: relative;
        }
        @media (min-width: 560px) {
          .process-grid { grid-template-columns: repeat(2, 1fr); gap: 48px 32px; }
        }
        @media (min-width: 960px) {
          .process-grid { grid-template-columns: repeat(4, 1fr); gap: 0; }
        }

        .cta-block { }
        .cta-inner {
          padding: 44px 32px;
          display: flex;
          flex-direction: column;
          gap: 28px;
          position: relative; z-index: 1;
        }
        @media (min-width: 768px) {
          .cta-inner {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding: 64px 64px;
            gap: 48px;
          }
        }
        @media (min-width: 1024px) {
          .cta-inner { padding: 72px 80px; }
        }
      `}</style>
      <Navbar />
      <HeroSection />
      {PRODUCTS.map((p, i) => <ProductShowcase key={p.id} product={p} index={i} />)}
      <ProcessSection />
      <CTASection />
      <Footer />
    </>
  );
}