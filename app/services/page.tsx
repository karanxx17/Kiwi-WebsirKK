"use client";

import { useState, useEffect, useRef, type RefObject } from "react";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import { useRouter } from "next/navigation";


const SERVICES = [
 {
  id: "performance-marketing",
  icon: "📈",
  tag: "01",
  title: "Performance Marketing",
  short: "Spend smarter. Scale faster. Grow profitably.",
  desc: "Drive measurable business growth with high-performance Google and Meta advertising campaigns. We combine strategy, creative testing, audience targeting, conversion optimisation, and data analytics to turn ad spend into predictable revenue.",
  features: [
    "Google Ads",
    "Meta Ads",
    "Conversion Optimisation",
    "Retargeting Campaigns",
    "Analytics & ROI Tracking"
  ],
  img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=85",
  accent: "#ff6ce7",
  light: "#EBF8D8",
},

{
  id: "crm-software",
  icon: "👥",
  tag: "02",
  title: "CRM Software",
  short: "Turn leads into customers with smarter systems.",
  desc: "Build custom CRM platforms designed around your exact business workflow. Manage leads, customers, sales pipelines, follow-ups, teams, communication, and performance from one powerful system.",
  features: [
    "Lead Management",
    "Sales Pipeline",
    "Customer Management",
    "Task & Follow-up Automation",
    "Reports & Dashboards"
  ],
  img: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=700&q=85",
  accent: "#3B82F6",
  light: "#EFF6FF",
},

{
  id: "erp-software",
  icon: "⚙️",
  tag: "03",
  title: "ERP Software",
  short: "Connect every part of your business.",
  desc: "Develop custom ERP systems that bring your business operations into one unified platform. From inventory and billing to employees, finance, purchasing, and reporting — everything works together.",
  features: [
    "Inventory Management",
    "Purchase & Sales",
    "Billing & Accounting",
    "HR & Employee Management",
    "Business Analytics"
  ],
  img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=700&q=85",
  accent: "#10B981",
  light: "#ECFDF5",
},

{
  id: "saas-development",
  icon: "☁️",
  tag: "04",
  title: "SaaS Development",
  short: "Turn your idea into a scalable software product.",
  desc: "Build powerful cloud-based SaaS products from concept to launch. We develop secure, scalable, multi-user platforms with subscriptions, dashboards, automation, APIs, and everything needed to grow your software business.",
  features: [
    "SaaS Product Development",
    "Multi-Tenant Architecture",
    "Subscription & Payments",
    "Admin Dashboards",
    "Cloud Deployment"
  ],
  img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=700&q=85",
  accent: "#6366F1",
  light: "#EEF2FF",
},

{
  id: "custom-software",
  icon: "💻",
  tag: "05",
  title: "Custom Software Development",
  short: "Software built around the way your business works.",
  desc: "We design and develop custom software solutions that solve real business problems. From internal management systems to complex enterprise applications, every product is engineered around your requirements.",
  features: [
    "Business Applications",
    "Custom Dashboards",
    "Workflow Automation",
    "API Development",
    "Third-Party Integrations"
  ],
  img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&q=85",
  accent: "#8B5CF6",
  light: "#F5F3FF",
},

{
  id: "mobile-app-development",
  icon: "📱",
  tag: "06",
  title: "Mobile App Development",
  short: "Powerful mobile experiences for Android & iOS.",
  desc: "Build modern, high-performance mobile applications that deliver seamless experiences across Android and iOS. From business apps to customer-facing products, we take your app from idea to production.",
  features: [
    "Android & iOS Apps",
    "React Native Development",
    "API Integration",
    "Push Notifications",
    "App Store Deployment"
  ],
  img: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=700&q=85",
  accent: "#F59E0B",
  light: "#FFFBEB",
},

{
  id: "web-development",
  icon: "🌐",
  tag: "07",
  title: "Web Application Development",
  short: "Fast, modern web applications built to scale.",
  desc: "Create powerful web applications with modern technologies and scalable architecture. We build everything from customer portals and booking platforms to complex dashboards and business applications.",
  features: [
    "Modern Web Applications",
    "React & Next.js",
    "Admin Panels",
    "REST APIs",
    "Cloud & Server Deployment"
  ],
  img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=700&q=85",
  accent: "#06B6D4",
  light: "#ECFEFF",
},

{
  id: "predictive-ai",
  icon: "🧠",
  tag: "08",
  title: "Predictive AI",
  short: "Turn your business data into intelligent decisions.",
  desc: "Use AI and predictive analytics to identify patterns, forecast outcomes, automate decisions, and uncover opportunities hidden inside your business data.",
  features: [
    "Predictive Analytics",
    "AI Business Insights",
    "Demand Forecasting",
    "Customer Prediction",
    "Intelligent Automation"
  ],
  img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=700&q=85",
  accent: "#EC4899",
  light: "#FDF2F8",
},

{
  id: "business-automation",
  icon: "⚡",
  tag: "09",
  title: "Business Automation",
  short: "Replace repetitive work with intelligent automation.",
  desc: "Automate repetitive business processes and connect your tools into efficient digital workflows. Reduce manual work, minimise errors, and help your team focus on what actually matters.",
  features: [
    "Workflow Automation",
    "Process Automation",
    "API Integrations",
    "Notifications & Triggers",
    "Automated Reports"
  ],
  img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=700&q=85",
  accent: "#14B8A6",
  light: "#F0FDFA",
},

{
  id: "api-development",
  icon: "🔗",
  tag: "10",
  title: "API & Backend Development",
  short: "Secure, scalable infrastructure behind your product.",
  desc: "Build robust backend systems and APIs that power web, mobile, SaaS, and enterprise applications. We focus on performance, security, scalability, and clean architecture.",
  features: [
    "REST API Development",
    "Node.js Backend",
    "Database Architecture",
    "Authentication & Security",
    "Third-Party API Integration"
  ],
  img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=700&q=85",
  accent: "#64748B",
  light: "#F8FAFC",
},

{
  id: "ui-ux-development",
  icon: "🎨",
  tag: "11",
  title: "UI/UX & Product Design",
  short: "Interfaces designed for humans and built for business.",
  desc: "Design intuitive digital products that look premium and are easy to use. We transform complex business requirements into clean, conversion-focused user experiences.",
  features: [
    "UI/UX Design",
    "Product Design",
    "Design Systems",
    "Prototyping",
    "Responsive Interfaces"
  ],
  img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=700&q=85",
  accent: "#A855F7",
  light: "#FAF5FF",
},

{
  id: "cloud-deployment",
  icon: "🚀",
  tag: "12",
  title: "Cloud & DevOps",
  short: "Deploy, scale, monitor, and keep your software running.",
  desc: "Take your applications from development to reliable production infrastructure. We handle deployment, cloud servers, SSL, monitoring, backups, and performance optimisation.",
  features: [
    "Cloud Deployment",
    "Server Configuration",
    "CI/CD Pipelines",
    "SSL & Security",
    "Monitoring & Backups"
  ],
  img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=700&q=85",
  accent: "#0EA5E9",
  light: "#F0F9FF",
},
];

const PROCESS = [
  { step: "01", title: "Discovery & Planning", desc: "We understand your business, users, goals, and challenges before defining the right technology and product approach." },
  { step: "02", title: "Product Blueprint", desc: "We define the features, user experience, architecture, technology stack, and roadmap needed to turn your idea into a scalable product." },
  { step: "03", title: "Build & Launch", desc: "We design, develop, integrate, test, and launch your AI application, software, or SaaS product with precision." },
  { step: "04", title: "Optimise & Scale", desc: "We continuously improve your product, AI capabilities, performance, and infrastructure as your users and business grow." },
];

const FILTER_MAP = {
  Growth: ["Social-Media-Marketing", "seo", "ads", "youtube", "influencer", "email"],
  Creative: ["content", "reels", "brand"],
  Technical: ["web", "gmb"],
};

const FILTERS = ["All", "Growth", "Creative", "Technical"] as const;

const FLOATING_PILLS = [
  { label: "SEO", top: "22%", left: "4%", delay: "0.5s", rot: "-4deg" },
  { label: "Social Media", top: "20%", right: "4%", delay: "0.65s", rot: "3deg" },
  { label: "Google Ads", bottom: "25%", left: "3%", delay: "0.8s", rot: "2deg" },
  { label: "Video Editing", bottom: "25%", right: "3%", delay: "0.7s", rot: "-3deg" },
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
      minHeight: "82vh",
      background: "linear-gradient(158deg,#FAFAF7 0%,#EFF9E4 55%,#FAFAF7 100%)",
      display: "flex", flexDirection: "column",
      justifyContent: "center", alignItems: "center",
      padding: "130px 5% 70px",
      position: "relative", overflow: "hidden",
      textAlign: "center",
    }}>
      {/* BG blobs */}
      <div style={{ position: "absolute", top: "5%", right: "0%", width: "min(480px,60vw)", height: "min(480px,60vw)", borderRadius: "50%", background: "radial-gradient(circle,rgba(109,191,62,0.12) 0%,transparent 65%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "0%", left: "-3%", width: "min(360px,45vw)", height: "min(360px,45vw)", borderRadius: "50%", background: "radial-gradient(circle,rgba(109,191,62,0.09) 0%,transparent 65%)", pointerEvents: "none" }} />

      {/* Floating pills — hidden on small screens via CSS */}
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

      {/* Badge */}
      <div style={{
        opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(18px)",
        transition: "all 0.7s cubic-bezier(.22,.68,0,1.2)",
        display: "inline-flex", alignItems: "center", gap: 8,
        background: "#fff", border: "1.5px solid #C8EBAA",
        borderRadius: 100, padding: "7px 20px", marginBottom: 28,
        boxShadow: "0 2px 16px rgba(109,191,62,0.1)",
        position: "relative", zIndex: 1,
      }}>
        <span style={{ fontSize: 12, fontWeight: 800, color: "#b774db", letterSpacing: "1.5px", textTransform: "uppercase" }}>11 Specialist Services</span>
      </div>

      <h1 style={{
        opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(28px)",
        transition: "all 0.8s cubic-bezier(.22,.68,0,1.2) 0.1s",
        fontFamily: "'Syne',sans-serif",
        fontSize: "clamp(36px,6.5vw,86px)",
        fontWeight: 800, lineHeight: 1.04, letterSpacing: "-2px",
        color: "#141414", maxWidth: 860, marginBottom: 22,
        position: "relative", zIndex: 1,
      }}>
        Every service you need<br />to <em style={{ fontStyle: "italic", color: "#ff6ce7" }}>dominate</em> digital.
      </h1>

      <p style={{
        opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(18px)",
        transition: "all 0.8s cubic-bezier(.22,.68,0,1.2) 0.22s",
        fontSize: "clamp(14px,1.6vw,19px)", color: "#5A5A5A",
        maxWidth: 540, lineHeight: 1.75, fontWeight: 500, marginBottom: 40,
        position: "relative", zIndex: 1,
      }}>
        From concept to launch — AI and technology solutions built to transform ideas, solve problems, and scale your business..
      </p>

      <div style={{
        opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(16px)",
        transition: "all 0.8s cubic-bezier(.22,.68,0,1.2) 0.32s",
        display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center",
        position: "relative", zIndex: 1,
      }}>
        <button style={{ padding: "14px 30px", borderRadius: 100, background: "#ff6ce7", color: "#fff", border: "none", fontSize: 15, fontWeight: 700, cursor: "pointer", boxShadow: "0 8px 28px rgba(109,191,62,0.38)", fontFamily: "'DM Sans',sans-serif", transition: "all 0.25s" }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 14px 40px rgba(109,191,62,0.5)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(109,191,62,0.38)"; }}
        >Get a Free Strategy Call →</button>
        <button style={{ padding: "14px 30px", borderRadius: 100, background: "transparent", color: "#1A1A1A", border: "2px solid #D0D0D0", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", transition: "all 0.25s" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "#ff6ce7"; e.currentTarget.style.color = "#ff6ce7"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "#D0D0D0"; e.currentTarget.style.color = "#1A1A1A"; }}
        >View All Services ↓</button>
      </div>
    </section>
  );
}

/* ─── SERVICE CARD ──────────────────────── */
function ServiceCard({ s, i, inView }: { s: (typeof SERVICES)[number]; i: number; inView: boolean }) {
  const router = useRouter();
  const [hov, setHov] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "#fff",
        borderRadius: 22,
        overflow: "hidden",
        border: `1.5px solid ${hov ? s.accent : "#EAE6E0"}`,
        boxShadow: hov ? "0 20px 60px rgba(0,0,0,0.12)" : "0 2px 12px rgba(0,0,0,0.04)",
        transition: "all 0.35s cubic-bezier(.22,.68,0,1.2)",
        transform: inView ? (hov ? "translateY(-5px)" : "translateY(0)") : "translateY(32px)",
        opacity: inView ? 1 : 0,
        transitionDelay: `${0.06 * (i % 9)}s`,
        display: "flex", flexDirection: "column",
      }}
    >
      {/* Image */}
      <div style={{ height: 190, overflow: "hidden", position: "relative", flexShrink: 0 }}>
        <img src={s.img} alt={s.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s", transform: hov ? "scale(1.06)" : "scale(1)", display: "block" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,0.55) 0%,transparent 55%)" }} />
        <div style={{ position: "absolute", top: 14, right: 14, background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", borderRadius: 7, padding: "4px 9px", fontSize: 10, fontWeight: 800, color: "#fff", letterSpacing: "1px" }}>{s.tag}</div>
        <div style={{ position: "absolute", bottom: 14, left: 14, width: 42, height: 42, borderRadius: 11, background: s.light, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, boxShadow: "0 4px 16px rgba(0,0,0,0.12)", transition: "transform 0.3s", transform: hov ? "scale(1.1) rotate(-5deg)" : "scale(1)" }}>{s.icon}</div>
      </div>

      {/* Body */}
      <div style={{ padding: "22px 24px 24px", display: "flex", flexDirection: "column", flex: 1 }}>
        <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 800, color: "#1A1A1A", marginBottom: 5, letterSpacing: "-0.3px" }}>{s.title}</h3>
        <p style={{ fontSize: 13, fontWeight: 700, color: s.accent, marginBottom: 12, letterSpacing: "0.2px" }}>{s.short}</p>
        <p style={{ fontSize: 13, lineHeight: 1.75, color: "#666", fontWeight: 500, marginBottom: 16 }}>{s.desc}</p>

        {/* Expandable */}
        <div style={{ maxHeight: expanded ? 300 : 0, overflow: "hidden", transition: "max-height 0.4s cubic-bezier(.22,.68,0,1.2)", marginBottom: expanded ? 16 : 0 }}>
          <div style={{ paddingTop: 4, display: "flex", flexDirection: "column", gap: 8 }}>
            {s.features.map((f, fi) => (
              <div key={fi} style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <div style={{ width: 19, height: 19, borderRadius: "50%", background: s.light, border: `1.5px solid ${s.accent}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: 9, color: s.accent, fontWeight: 900 }}>✓</span>
                </div>
                <span style={{ fontSize: 13, color: "#444", fontWeight: 600 }}>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", gap: 8 }}>
          <button onClick={() => setExpanded(!expanded)} style={{ fontSize: 12, fontWeight: 700, color: s.accent, background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", padding: 0, display: "flex", alignItems: "center", gap: 4, transition: "all 0.2s", whiteSpace: "nowrap", flexShrink: 0 }}>
            {expanded ? "Show less ↑" : "What's included ↓"}
          </button>
          <button
  onClick={() => router.push(`/services/${s.id}`)}
  style={{
    padding: "8px 16px",
    borderRadius: 100,
    background: hov ? s.accent : "#F2EFE9",
    color: hov ? "#fff" : "#444",
    border: "none",
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 700,
  }}
>
  Get Started →
</button>
        </div>
      </div>
    </div>
  );
}

/* ─── SERVICES GRID ─────────────────────── */
function ServicesGrid() {
  const [gridRef, inView] = useInView(0.05);
  const [activeFilter, setActiveFilter] = useState<"All" | keyof typeof FILTER_MAP>("All");

  const filtered = activeFilter === "All" ? SERVICES : SERVICES.filter(s => FILTER_MAP[activeFilter as keyof typeof FILTER_MAP]?.includes(s.id));

  return (
    <section id="all-services" ref={gridRef} style={{ padding: "80px 5% 100px", background: "#FAFAF7" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 44, flexWrap: "wrap", gap: 20, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s ease" }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: "#ff6ce7", letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 10 }}>What We Offer</div>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(26px,3.5vw,46px)", fontWeight: 800, color: "#1A1A1A", letterSpacing: "-1.5px", lineHeight: 1.1 }}>
              Our specialist<br /><em style={{ fontStyle: "italic", color: "#ff6ce7" }}>services.</em>
            </h2>
          </div>

          {/* Filter tabs */}
          <div style={{ display: "flex", gap: 6, background: "#EDEAE4", borderRadius: 100, padding: 4, flexWrap: "wrap" }}>
            {FILTERS.map(f => (
              <button key={f} onClick={() => setActiveFilter(f)} style={{ padding: "8px 16px", borderRadius: 100, border: "none", background: activeFilter === f ? "#1A1A1A" : "transparent", color: activeFilter === f ? "#fff" : "#666", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", transition: "all 0.25s" }}>{f}</button>
            ))}
          </div>
        </div>

        {/* Responsive grid via className */}
        <div className="services-grid">
          {filtered.map((s, i) => <ServiceCard key={s.id} s={s} i={i} inView={inView} />)}
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
          <div style={{ fontSize: 11, fontWeight: 800, color: "#ff6ce7", letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 14 }}>How We Work</div>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(26px,3.5vw,50px)", fontWeight: 800, color: "#fff", letterSpacing: "-1.5px", lineHeight: 1.1 }}>
            From brief to breakthrough<br />in <em style={{ fontStyle: "italic", color: "#ba3aff" }}>4 focused steps.</em>
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

/* ─── SPOTLIGHT ─────────────────────────── */
// import Link from "next/link";

function SpotlightSection() {
  const [ref, inView] = useInView();
  const [active, setActive] = useState(0);
  const spotlights = SERVICES.filter((_, i) => [0, 1, 2, 4].includes(i));
  const s = spotlights[active];

  return (
    <section ref={ref} style={{ padding: "100px 5%", background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s ease" }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: "#ff6ce7", letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 12 }}>Deep Dives</div>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(26px,3.2vw,44px)", fontWeight: 800, color: "#1A1A1A", letterSpacing: "-1.2px" }}>
            Our most-requested <em style={{ fontStyle: "italic", color: "#ff6ce7" }}>services.</em>
          </h2>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 44, flexWrap: "wrap", opacity: inView ? 1 : 0, transition: "all 0.7s ease 0.1s" }}>
          {spotlights.map((sp, i) => (
            <button key={sp.id} onClick={() => setActive(i)} style={{ padding: "9px 18px", borderRadius: 100, background: active === i ? sp.accent : "#F2EFE9", color: active === i ? "#fff" : "#555", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 700, fontFamily: "'DM Sans',sans-serif", transition: "all 0.25s", boxShadow: active === i ? `0 6px 20px ${sp.accent}55` : "none" }}>
              {sp.icon} <span className="tab-label">{sp.title}</span>
            </button>
          ))}
        </div>

        {/* Spotlight card */}
        <div className="spotlight-card" style={{ borderRadius: 24, overflow: "hidden", boxShadow: "0 20px 72px rgba(0,0,0,0.1)", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(32px)", transition: "all 0.9s cubic-bezier(.22,.68,0,1.2) 0.15s" }}>
          {/* Image side */}
          <div style={{ position: "relative", minHeight: 340 }}>
            <img src={s.img} alt={s.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", minHeight: 340 }} />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg,${s.accent}CC 0%,rgba(0,0,0,0.5) 100%)` }} />
            <div style={{ position: "absolute", inset: 0, padding: "36px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
              <div style={{ fontSize: 56 }}>{s.icon}</div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(22px,2.5vw,30px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.8px", marginTop: 10 }}>{s.title}</div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", fontWeight: 500, marginTop: 5 }}>{s.short}</div>
            </div>
          </div>

          {/* Content side */}
          <div style={{ background: "#FAFAF7", padding: "44px 40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: "#555", fontWeight: 500, marginBottom: 28 }}>{s.desc}</p>
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#AAA", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 16 }}>What's Included</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {s.features.map((f, fi) => (
                  <div key={fi} style={{ display: "flex", alignItems: "center", gap: 11 }}>
                    <div style={{ width: 22, height: 22, borderRadius: "50%", background: s.light, border: `2px solid ${s.accent}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontSize: 9, color: s.accent, fontWeight: 900 }}>✓</span>
                    </div>
                    <span style={{ fontSize: 14, color: "#333", fontWeight: 600 }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <Link href={`/services/${s.id}`}>
              <button style={{ padding: "14px 28px", borderRadius: 100, background: s.accent, color: "#fff", border: "none", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", alignSelf: "flex-start", boxShadow: `0 8px 28px ${s.accent}55`, transition: "all 0.25s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
              >Start This Service →</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ───────────────────────────────── */
function CTASection() {
  const [ref, inView] = useInView();
  return (
    <section ref={ref} style={{ padding: "0 5% 80px", background: "#FAFAF7" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="cta-block" style={{ background: "#1A1A1A", borderRadius: 28, position: "relative", overflow: "hidden", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(36px)", transition: "all 0.9s cubic-bezier(.22,.68,0,1.2)" }}>
          <div style={{ position: "absolute", top: "-25%", right: "18%", width: 380, height: 380, borderRadius: "50%", background: "radial-gradient(circle,rgba(109,191,62,0.14) 0%,transparent 70%)", pointerEvents: "none" }} />
          <div className="cta-inner">
            <div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
                {["AI Software", "SaaS", "Web Apps", "Mobile Apps", "Automation"].map(t => (
                  <span key={t} style={{ padding: "5px 14px", borderRadius: 100, background: "rgba(109,191,62,0.15)", border: "1px solid rgba(109,191,62,0.3)", fontSize: 12, fontWeight: 700, color: "#ba3aff" }}>{t}</span>
                ))}
              </div>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(24px,3.2vw,44px)", fontWeight: 800, color: "#fff", lineHeight: 1.1, letterSpacing: "-1px", marginBottom: 14 }}>
                Not sure which services<br />you <em style={{ fontStyle: "italic", color: "#ba3aff" }}>actually need?</em>
              </h2>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>Book a free 30-minute strategy call. We'll audit your current presence and recommend exactly what will move the needle.</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, flexShrink: 0 }}>
             <Link href="/contact">
  <button style={{ padding: "16px 36px", borderRadius: 100, background: "#ff6ce7", color: "#fff", border: "none", fontSize: 15, fontWeight: 800, cursor: "pointer", boxShadow: "0 8px 32px rgba(109,191,62,0.4)", fontFamily: "'DM Sans',sans-serif", whiteSpace: "nowrap", transition: "all 0.25s" }}
    onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; }}
    onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
  >Book Free Strategy Call →</button>
</Link>

<Link href="/blogs">
  <button style={{ padding: "16px 36px", borderRadius: 100, background: "transparent", color: "rgba(255,255,255,0.6)", border: "1.5px solid rgba(255,255,255,0.2)", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", whiteSpace: "nowrap", transition: "all 0.25s" }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; e.currentTarget.style.color = "#fff"; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
  >View Insights</button>
</Link>
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
          {/* Logo Image */}
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
export default function ServicesPage() {
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

        /* Services grid: 1 col → 2 col → 3 col */
        .services-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 520px) {
          .services-grid { grid-template-columns: repeat(2, 1fr); gap: 18px; }
        }
        @media (min-width: 960px) {
          .services-grid { grid-template-columns: repeat(3, 1fr); gap: 22px; }
        }

        /* Process: 1 → 2 → 4 */
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

        /* Spotlight: stacked → side-by-side */
        .spotlight-card {
          display: grid;
          grid-template-columns: 1fr;
        }
        @media (min-width: 768px) {
          .spotlight-card { grid-template-columns: 1fr 1fr; }
        }

        /* CTA block */
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

        /* Tab labels — hide text on very small screens */
        .tab-label { display: none; }
        @media (min-width: 480px) { .tab-label { display: inline; } }
      `}</style>
      <Navbar />
      <HeroSection />
      <ServicesGrid />
      <ProcessSection />
      <SpotlightSection />
      <CTASection />
      <Footer />
    </>
  );
}