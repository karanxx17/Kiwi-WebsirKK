import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import { AppWindow, ScreenshotConsole } from "./ScreenshotConsole";

/* ─────────────────────────────────────────────────────────
   DATA
   To add a real screenshot: set `img` on any module, or
   `heroShot` on the product, to an image URL. Leave it
   undefined and the placeholder console/mock renders instead.
───────────────────────────────────────────────────────── */
const PRODUCTS = [
  {
    id: "meal-mitra",
    kind: "POS",
    icon: "🍽️",
    name: "Meal Mitra",
    tagline: "Your restaurant, run from one counter.",
    desc: "A complete restaurant & café POS built for real service — billing, kitchen display, table management, inventory, purchasing, and reporting, all working off the same live data.",
    accent: "#ff6ce7", accentLight: "#fff0fb", accentMid: "#ffd6f9",
    moduleCount: 15,
    heroShot: undefined as string | undefined, // 🖼️ add your main product screenshot URL here
    whyNeed: {
      headline: "Running a Kitchen on Paper Costs You Every Single Shift.",
      body: "Handwritten tickets get lost between the counter and the kitchen. Stock gets counted by memory. End-of-day totals get reconciled by hand at midnight. A connected POS closes every one of those gaps at the source.",
      stats: [
        { value: "30%", label: "Faster table turnover with live KDS routing" },
        { value: "20%", label: "Fewer order errors vs handwritten tickets" },
        { value: "15", label: "Modules running off one shared dataset" },
      ],
    },
    process: [
      { step: "01", title: "Take the Order", desc: "Dine-in, takeaway, delivery, and online orders land in one live queue." },
      { step: "02", title: "Fire to Kitchen", desc: "Orders hit the KDS instantly, moving New → Preparing → Ready." },
      { step: "03", title: "Deduct Stock", desc: "Recipes map to inventory, so stock drops automatically as orders go out." },
      { step: "04", title: "Reorder in Time", desc: "Low-stock alerts turn into purchase orders before service is affected." },
      { step: "05", title: "Close & Report", desc: "Sales, GST, discounts, and profit are ready the moment the doors lock." },
    ],
    whyChoose: [
      { icon: "🏪", title: "Built for Multi-Outlet", desc: "Branch-wise sales with centralised control from day one." },
      { icon: "🧪", title: "Recipe-Level Accuracy", desc: "Food costing and stock deduction at the ingredient level." },
      { icon: "🔐", title: "Role-Based by Design", desc: "Cashiers, kitchen, managers each see exactly what they need." },
      { icon: "⚡", title: "Live, Not Batched", desc: "Billing, KDS, and inventory read the same live data." },
    ],
  },
  {
    id: "kiwi-payroll",
    kind: "AMS",
    icon: "🥝",
    name: "Kiwi Payroll",
    tagline: "Attendance and payroll that run themselves.",
    desc: "A complete attendance management system that verifies who's on-site with face recognition and geofencing, then turns that data straight into hours, overtime, leave, and payroll.",
    accent: "#8B5CF6", accentLight: "#f5f3ff", accentMid: "#ddd6fe",
    moduleCount: 11,
    heroShot: undefined as string | undefined, // 🖼️ add your main product screenshot URL here
    whyNeed: {
      headline: "Manual Attendance Is Where Every Payroll Error Begins.",
      body: "Buddy punching, forgotten registers, and end-of-month guesswork all turn into payroll that doesn't match reality. Verify attendance at the source, and there's nothing left to reconcile.",
      stats: [
        { value: "0", label: "Spreadsheets needed to reconcile attendance" },
        { value: "100%", label: "Site-verified check-ins, face + geofence" },
        { value: "11", label: "Modules from clock-in to payslip" },
      ],
    },
    process: [
      { step: "01", title: "Verify Check-in", desc: "Face-matched, geofenced — no off-location or buddy punches." },
      { step: "02", title: "Track Hours Live", desc: "Working hours, late arrivals, overtime calculated the moment it's logged." },
      { step: "03", title: "Handle Leave", desc: "Requests, approvals, and balances feed straight into payroll." },
      { step: "04", title: "Run Payroll", desc: "Salaries calculated from verified attendance — not memory." },
      { step: "05", title: "Report & Notify", desc: "Automated summaries and payroll-ready reports, on schedule." },
    ],
    whyChoose: [
      { icon: "📸", title: "Face-Verified", desc: "A configurable match threshold — the right person gets paid." },
      { icon: "📍", title: "Geofenced by Site", desc: "Check-ins only count inside the boundary you set." },
      { icon: "⚙️", title: "Cron-Driven", desc: "Hours and overtime processing run on schedule, unattended." },
      { icon: "📱", title: "Self-Service App", desc: "Employees check in and view balances from their own phone." },
    ],
  },
];

const MODULES: Record<string, { icon: string; title: string; desc: string; img?: string }[]> = {
  "meal-mitra": [
    { icon: "🧾", title: "POS Billing", desc: "Fast billing, barcode scan, variants, add-ons, combos, splits & GST.", img: "/meal-mitra/billing.png" },
    { icon: "🍽️", title: "Order Management", desc: "Dine-in, takeaway, delivery & online orders in one live queue.", img: "/meal-mitra/order.png" },
    { icon: "🪑", title: "Table Management", desc: "Multi-floor layouts, merge/split tables, reservations & waitlist.", img: "/meal-mitra/table.png" },
    { icon: "👨‍🍳", title: "Kitchen Display System", desc: "Live KDS queue with New / Preparing / Ready status per station.", img: "/meal-mitra/kitchen.png" },
    { icon: "🍔", title: "Menu Management", desc: "Categories, variants, combos, seasonal & happy-hour pricing." , img :"/meal-mitra/table.png"},
    { icon: "📦", title: "Inventory Management", desc: "Stock in/out, low-stock alerts, expiry & wastage tracking.", img: "/meal-mitra/inventory.png" },
    // { icon: "🧪", title: "Recipe Management", desc: "Ingredient mapping, food costing & automatic stock deduction." },
    // { icon: "🚚", title: "Purchase Management", desc: "Vendor orders, goods receiving, returns & vendor ledgers." },
    { icon: "🤝", title: "Customer Management", desc: "Profiles, order history & customer-wise sales.", img: "/meal-mitra/customber.png" },
    // { icon: "💰", title: "Payments & Finance", desc: "Cash, card & UPI, split payments, refunds & daily collections." },
    { icon: "📊", title: "Reports & Analytics", desc: "Sales, GST, discount, inventory & profit reporting.", img:"/meal-mitra/reports.png" },
    // { icon: "🔐", title: "Staff & User Management", desc: "Role-based access for admins, managers, cashiers & kitchen." },
    // { icon: "🏪", title: "Outlet Management", desc: "Multiple outlets, branch-wise sales & centralised control." },
    // { icon: "🖨️", title: "Printing", desc: "Customer invoices, kitchen tickets & one-tap reprints." },
    // { icon: "📥", title: "Data Import", desc: "Bulk product, category, inventory & image import." },
  ],
  "kiwi-payroll": [
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
};

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = PRODUCTS.find((p) => p.id === params.id);
  if (!product) return notFound();

  const modules = MODULES[product.id] ?? [];
  const otherProduct = PRODUCTS.find((p) => p.id !== product.id)!;
  const tickerModules = [...modules, ...modules];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&family=JetBrains+Mono:wght@400;500;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #FAFAF7; font-family: 'DM Sans', sans-serif; color: #1A1A1A; }

        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .ticker-track { animation: marquee 34s linear infinite; }
        .ticker-wrap:hover .ticker-track { animation-play-state: paused; }

        @keyframes floatY { 0%,100% { transform: translateY(0) rotateX(4deg) rotateY(-6deg); } 50% { transform: translateY(-10px) rotateX(4deg) rotateY(-6deg); } }
        .hero-window { animation: floatY 6s ease-in-out infinite; }

        .console-grid { display: grid; grid-template-columns: 1fr; }
        @media (min-width: 760px) { .console-grid { grid-template-columns: 240px 1fr; } }

        .ticket-card {
          background-image: radial-gradient(circle, var(--mid) 1.6px, transparent 1.6px);
          background-size: 9px 6px;
          background-repeat: repeat-x;
          background-position: top left;
        }
        .ticket-card:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(0,0,0,0.08); }
        .ticket-card { transition: all 0.2s ease; }

        .trust-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.08); transform: translateY(-3px); }
        .trust-card { transition: all 0.25s ease; }

        .modules-grid { display: grid; grid-template-columns: 1fr; gap: 14px; }
        @media (min-width: 640px) { .modules-grid { grid-template-columns: repeat(2,1fr); } }
        @media (min-width: 1000px) { .modules-grid { grid-template-columns: repeat(3,1fr); } }

        .pipeline-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
        @media (min-width: 760px) { .pipeline-grid { grid-template-columns: repeat(5,1fr); gap: 12px; } }

        .hero-grid { display: grid; grid-template-columns: 1fr; gap: 48px; align-items: center; }
        @media (min-width: 960px) { .hero-grid { grid-template-columns: 1.05fr 1fr; } }
      `}</style>

      <main style={{ background: "#FAFAF7", minHeight: "100vh" }}>
        <Navbar />

        {/* ══ HERO — dark console ══ */}
        <section
          style={{
            background: "#0E0E10",
            padding: "130px 6% 90px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "absolute", top: "-15%", right: "-8%", width: 520, height: 520, borderRadius: "50%", background: `radial-gradient(circle,${product.accent}22 0%,transparent 65%)`, pointerEvents: "none" }} />
          <div
            style={{
              position: "absolute", inset: 0, opacity: 0.4, pointerEvents: "none",
              backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
              backgroundSize: "26px 26px",
            }}
          />

          <div className="hero-grid" style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.05)", border: `1px solid ${product.accent}55`, borderRadius: 100, padding: "6px 16px", marginBottom: 26 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: product.accent }} />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, fontWeight: 500, color: product.accent, letterSpacing: "0.05em" }}>
                  {product.kind} · {product.moduleCount} MODULES
                </span>
              </div>

              <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(38px,5.5vw,70px)", fontWeight: 800, lineHeight: 1.03, letterSpacing: "-2.5px", color: "#fff", marginBottom: 20 }}>
                {product.name}
              </h1>
              <p style={{ fontSize: "clamp(15px,1.6vw,18px)", color: "rgba(255,255,255,0.55)", lineHeight: 1.75, fontWeight: 500, maxWidth: 460, marginBottom: 34 }}>
                {product.desc}
              </p>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link href="/contact">
                  <button style={{ padding: "14px 28px", borderRadius: 100, background: product.accent, color: "#0E0E10", border: "none", fontWeight: 800, fontSize: 14.5, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                    Book a Free Walkthrough →
                  </button>
                </Link>
                <a href="#console" style={{ padding: "14px 26px", borderRadius: 100, background: "transparent", color: "rgba(255,255,255,0.8)", border: "1.5px solid rgba(255,255,255,0.18)", fontWeight: 700, fontSize: 14.5, textDecoration: "none", fontFamily: "'DM Sans', sans-serif" }}>
                  Browse Modules ↓
                </a>
              </div>
            </div>

            <div className="hero-window" style={{ perspective: 1200 }}>
              <AppWindow
                src={product.heroShot}
                alt={`${product.name} dashboard`}
                label={`${product.name.toLowerCase().replace(/\s+/g, "-")}.app`}
                accent={product.accent}
                variant="dashboard"
              />
            </div>
          </div>
        </section>

        {/* ══ MODULE TICKER ══ */}
        <div className="ticker-wrap" style={{ background: "#141416", padding: "16px 0", overflow: "hidden", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="ticker-track" style={{ display: "flex", width: "max-content", gap: 12 }}>
            {tickerModules.map((m, i) => (
              <span
                key={i}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "8px 16px", borderRadius: 100,
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "rgba(255,255,255,0.6)",
                  whiteSpace: "nowrap" as const,
                }}
              >
                <span>{m.icon}</span>{m.title}
              </span>
            ))}
          </div>
        </div>

        {/* ══ WHY YOU NEED IT ══ */}
        <section style={{ padding: "90px 6%", background: "#fff" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 64, alignItems: "center" }}>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 500, color: product.accent, letterSpacing: "0.1em", marginBottom: 18 }}>
                  // WHY_YOU_NEED_THIS
                </div>
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(22px,3vw,38px)", fontWeight: 800, lineHeight: 1.2, marginBottom: 20, letterSpacing: "-1.5px", color: "#141414" }}>
                  {product.whyNeed.headline}
                </h2>
                <p style={{ color: "#5A5A5A", fontSize: 16, lineHeight: 1.85, fontWeight: 500 }}>{product.whyNeed.body}</p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {product.whyNeed.stats.map((stat, i) => (
                  <div key={i} style={{ background: "#0E0E10", borderRadius: 14, padding: "20px 26px", display: "flex", alignItems: "center", gap: 20 }}>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(24px,3.4vw,34px)", fontWeight: 700, color: product.accent, minWidth: 80 }}>
                      {stat.value}
                    </div>
                    <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 14.5, lineHeight: 1.5, fontWeight: 500 }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ SCREENSHOT CONSOLE ══ */}
        <section id="console" style={{ padding: "90px 6%", background: product.accentLight }}>
          <div style={{ maxWidth: 1150, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 44 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 500, color: product.accent, letterSpacing: "0.1em", marginBottom: 14 }}>
                // BROWSE_MODULES
              </div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(26px,4vw,44px)", fontWeight: 800, letterSpacing: "-1.5px", color: "#141414" }}>
                See {product.name} in Action
              </h2>
              <p style={{ color: "#5A5A5A", fontSize: 14.5, marginTop: 10, fontWeight: 500 }}>Pick a module to preview its screen.</p>
            </div>

            <ScreenshotConsole modules={modules} accent={product.accent} light={product.accentLight} mid={product.accentMid} productName={product.name} />
          </div>
        </section>

        {/* ══ HOW IT WORKS — pipeline ══ */}
        <section style={{ padding: "100px 6%", background: "#fff" }}>
          <div style={{ maxWidth: 1150, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 500, color: product.accent, letterSpacing: "0.1em", marginBottom: 14 }}>
                // HOW_IT_WORKS
              </div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(26px,4vw,46px)", fontWeight: 800, letterSpacing: "-1.5px", color: "#141414" }}>
                The Pipeline
              </h2>
            </div>

            <div className="pipeline-grid">
              {product.process.map((step, i) => (
                <div key={i} style={{ position: "relative", padding: "24px 18px", borderRadius: 16, background: "#FAFAF7", border: "1.5px solid #EAE6E0" }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700, color: product.accent, marginBottom: 14 }}>{step.step}</div>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 15.5, fontWeight: 800, marginBottom: 8, color: "#141414" }}>{step.title}</h3>
                  <p style={{ color: "#777", fontSize: 13, lineHeight: 1.65, fontWeight: 500 }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ ALL MODULES — ticket cards ══ */}
        <section style={{ padding: "90px 6%", background: "#FAFAF7" }} >
          <div style={{ maxWidth: 1150, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 50 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 500, color: product.accent, letterSpacing: "0.1em", marginBottom: 14 }}>
                // FULL_MODULE_LIST ({product.moduleCount})
              </div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(26px,4vw,46px)", fontWeight: 800, letterSpacing: "-1.5px", color: "#141414" }}>
                Everything That's Included
              </h2>
            </div>
            <div className="modules-grid">
              {modules.map((m, i) => (
                <div
                  key={i}
                  className="ticket-card"
                  style={{ "--mid": product.accentMid, padding: "22px 20px 20px", borderRadius: 14, background: "#fff", border: "1.5px solid #EAE6E0" } as React.CSSProperties}
                >
                  <div style={{ display: "flex", gap: 14, alignItems: "flex-start", paddingTop: 8 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: product.accentLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 16 }}>{m.icon}</div>
                    <div>
                      <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 14.5, color: "#1A1A1A", marginBottom: 4 }}>{m.title}</div>
                      <div style={{ fontSize: 12.5, lineHeight: 1.6, color: "#666", fontWeight: 500 }}>{m.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ WHY CHOOSE ══ */}
        <section style={{ padding: "100px 6%", background: "#fff" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(26px,4vw,46px)", fontWeight: 800, letterSpacing: "-1.5px", color: "#141414" }}>
                Why Teams Choose {product.name}
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 20 }}>
              {product.whyChoose.map((item, i) => (
                <div key={i} className="trust-card" style={{ background: "#FAFAF7", border: "1.5px solid #EAE6E0", borderRadius: 20, padding: "28px 24px" }}>
                  <div style={{ fontSize: 34, marginBottom: 14 }}>{item.icon}</div>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 17, marginBottom: 10, color: "#141414" }}>{item.title}</h3>
                  <p style={{ color: "#777", fontSize: 14, lineHeight: 1.8, fontWeight: 500 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CROSS-SELL ══ */}
        <section style={{ padding: "0 6% 20px", background: "#FAFAF7" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <Link href={`/products/${otherProduct.id}`} style={{ textDecoration: "none" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap", background: "#fff", border: "1.5px solid #EAE6E0", borderRadius: 18, padding: "22px 28px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <span style={{ fontSize: 28 }}>{otherProduct.icon}</span>
                  <div>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#999", letterSpacing: "0.08em", marginBottom: 4 }}>ALSO_ON_KIWI_CONNECT</div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18, color: "#141414" }}>{otherProduct.name} — {otherProduct.tagline}</div>
                  </div>
                </div>
                <span style={{ fontSize: 14, fontWeight: 700, color: otherProduct.accent, whiteSpace: "nowrap" as const }}>Explore →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* ══ CTA ══ */}
        <section style={{ padding: "60px 6% 100px", background: "#FAFAF7" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", borderRadius: 28, background: "#0E0E10", padding: "70px 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -80, right: -80, width: 320, height: 320, borderRadius: "50%", background: `radial-gradient(circle,${product.accent}22 0%,transparent 70%)`, pointerEvents: "none" }} />
            <div style={{ position: "relative" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.05)", border: `1px solid ${product.accent}55`, borderRadius: 100, padding: "6px 16px", marginBottom: 28 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: product.accent }} />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, color: product.accent, letterSpacing: "0.05em" }}>FREE WALKTHROUGH</span>
              </div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(28px,4vw,50px)", fontWeight: 800, letterSpacing: "-2px", marginBottom: 16, color: "#fff" }}>
                Ready to run on {product.name}?
              </h2>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 16, maxWidth: 480, margin: "0 auto 36px", lineHeight: 1.7, fontWeight: 500 }}>
                Book a free 30-minute walkthrough. We'll show you exactly how it fits your outlet, your team, and your workflow.
              </p>
              <Link href="/contact">
                <button style={{ padding: "16px 36px", borderRadius: 100, background: product.accent, color: "#0E0E10", border: "none", fontWeight: 800, fontSize: 16, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                  Book Free Walkthrough →
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* ══ FOOTER ══ */}
        <footer style={{ background: "#111", padding: "40px 6% 24px" }}>
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