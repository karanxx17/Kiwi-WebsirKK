import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";

// IMPORT THE SAME SERVICES ARRAY FROM THE MAIN PAGE
// You should move SERVICES to a shared file, but for now, let's sync them
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
    accentLight: "#EBF8D8",
    accentMid: "#D5EDBB",
    whyNeed: {
      headline: "Turn Ad Spend into Predictable Revenue",
      body: "Performance marketing isn't just about spending money on ads—it's about spending smarter. With data-driven strategies and continuous optimisation, we turn every dollar into measurable business growth.",
      stats: [
        { value: "4.5x", label: "Average ROI for optimised campaigns" },
        { value: "60%", label: "Lower cost per acquisition with proper targeting" },
        { value: "2.8x", label: "Higher conversion rates with retargeting" }
      ]
    },
    process: [
      { step: "01", title: "Audit & Analysis", desc: "We analyse your current campaigns, audience data, and competitors to identify opportunities and gaps." },
      { step: "02", title: "Strategy Development", desc: "Custom strategy with clear KPIs, audience segments, creative direction, and budget allocation." },
      { step: "03", title: "Campaign Setup", desc: "Precision campaign structure with proper tracking, conversion setup, and A/B testing frameworks." },
      { step: "04", title: "Launch & Monitor", desc: "Campaigns go live with 24/7 monitoring, daily optimizations, and rapid response to performance signals." },
      { step: "05", title: "Scale What Works", desc: "We double down on winning campaigns, audiences, and creatives while pausing what doesn't perform." }
    ]
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
    accentLight: "#EFF6FF",
    accentMid: "#BFDBFE",
    whyNeed: {
      headline: "Your Leads Are Leaking—Plug the Gaps with a Custom CRM",
      body: "Most businesses lose 40% of their leads because they don't follow up fast enough. A custom CRM automates follow-ups, organises your pipeline, and ensures no opportunity slips through the cracks.",
      stats: [
        { value: "40%", label: "Leads lost due to slow follow-up" },
        { value: "35%", label: "Increase in sales productivity with CRM" },
        { value: "4x", label: "Faster customer acquisition with proper systems" }
      ]
    },
    process: [
      { step: "01", title: "Workflow Mapping", desc: "We map your entire sales and customer journey—from first touch to repeat purchase." },
      { step: "02", title: "System Architecture", desc: "Custom database design, API structure, and user role architecture built for your needs." },
      { step: "03", title: "Development", desc: "Agile development with regular demos. You see progress every step of the way." },
      { step: "04", title: "Integration & Migration", desc: "Seamless integration with your existing tools and data migration from spreadsheets or old systems." },
      { step: "05", title: "Launch & Training", desc: "Full training for your team and ongoing support to ensure adoption and success." }
    ]
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
    accentLight: "#ECFDF5",
    accentMid: "#A7F3D0",
    whyNeed: {
      headline: "Stop Using 10 Different Tools—Unify Everything in One System",
      body: "Using separate tools for inventory, billing, HR, and reporting creates data silos, errors, and inefficiencies. A custom ERP connects everything in one platform, saving hours every day.",
      stats: [
        { value: "30%", label: "Reduction in operational costs with ERP" },
        { value: "60%", label: "Faster decision-making with unified data" },
        { value: "4.5h", label: "Saved per employee weekly with automation" }
      ]
    },
    process: [
      { step: "01", title: "Process Audit", desc: "We audit your current workflows, pain points, and system bottlenecks." },
      { step: "02", title: "Custom Architecture", desc: "Modular system design that connects inventory, finance, HR, and purchasing." },
      { step: "03", title: "Development", desc: "Scrum-based development with biweekly demos to keep you in control." },
      { step: "04", title: "Data Integration", desc: "Migrate and clean your existing data into the new unified system." },
      { step: "05", title: "Deploy & Train", desc: "Full deployment with team training, documentation, and post-launch support." }
    ]
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
    accentLight: "#EEF2FF",
    accentMid: "#C7D2FE",
    whyNeed: {
      headline: "Your Software Idea Deserves More Than Just Code—It Deserves a Product",
      body: "Building a SaaS isn't just about writing code. It's about creating a product that solves real problems, scales with your users, and generates recurring revenue. We take you from idea to launch with a product-first approach.",
      stats: [
        { value: "6.8x", label: "Higher valuation for SaaS vs traditional businesses" },
        { value: "80%", label: "Recurring revenue from subscription models" },
        { value: "2.5x", label: "Faster time-to-market with our proven frameworks" }
      ]
    },
    process: [
      { step: "01", title: "Idea Validation", desc: "We validate your concept with market research, competitor analysis, and user interviews." },
      { step: "02", title: "MVP Design", desc: "Focus on core features that solve the primary problem. No feature bloat." },
      { step: "03", title: "Scalable Architecture", desc: "Multi-tenant, cloud-native architecture designed to scale from day one." },
      { step: "04", title: "Development & Testing", desc: "Rapid development with extensive testing, security audits, and performance optimisation." },
      { step: "05", title: "Launch & Scale", desc: "Production deployment, post-launch support, and continuous iteration based on user feedback." }
    ]
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
    accentLight: "#F5F3FF",
    accentMid: "#DDD6FE",
    whyNeed: {
      headline: "Off-the-Shelf Software Is Costing You More Than You Think",
      body: "Generic tools force you to work around their limitations. Custom software is built around your exact workflows, eliminating bottlenecks and creating efficiencies that directly impact your bottom line.",
      stats: [
        { value: "40%", label: "Average productivity gain with custom software" },
        { value: "60%", label: "Reduction in manual data entry errors" },
        { value: "3-5x", label: "ROI within 3 years vs off-the-shelf tools" }
      ]
    },
    process: [
      { step: "01", title: "Discovery & Requirements", desc: "We map your workflows, pain points, and objectives to define the exact scope of what needs to be built." },
      { step: "02", title: "Architecture Design", desc: "Our architects design a scalable system—database schemas, API layers, and infrastructure plans." },
      { step: "03", title: "Agile Development", desc: "Built in 2-week sprints with regular demos so you see progress and stay in full control." },
      { step: "04", title: "QA & Testing", desc: "Rigorous unit, integration, and user-acceptance testing before any code touches production." },
      { step: "05", title: "Deploy & Support", desc: "We handle deployment, monitor performance, and provide ongoing support and feature updates." }
    ]
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
    accentLight: "#FFFBEB",
    accentMid: "#FDE68A",
    whyNeed: {
      headline: "Mobile Is the Primary Screen—Not Secondary",
      body: "Over 55% of all internet traffic comes from mobile devices. Users spend 90% of their mobile time inside apps, not browsers. If you don't have a native app experience, you're losing engagement, loyalty, and revenue to competitors who do.",
      stats: [
        { value: "55%", label: "Of web traffic comes from mobile" },
        { value: "90%", label: "Of mobile time spent in apps vs browsers" },
        { value: "157%", label: "Higher conversion in apps vs mobile web" }
      ]
    },
    process: [
      { step: "01", title: "Ideation & Wireframing", desc: "We translate your idea into detailed wireframes and user flows before writing a single line of code." },
      { step: "02", title: "UI/UX Design", desc: "Our designers create pixel-perfect, platform-native interfaces that feel natural to your users." },
      { step: "03", title: "Agile Development", desc: "Cross-platform or native—we build in sprints with full transparency and weekly builds for your testing." },
      { step: "04", title: "Beta Testing", desc: "Real users test the app before launch. Bugs are caught. Flows are refined. UX is perfected." },
      { step: "05", title: "Launch & Grow", desc: "We submit to the App Store / Play Store and support you with ASO and post-launch updates." }
    ]
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
    accentLight: "#ECFEFF",
    accentMid: "#67E8F9",
    whyNeed: {
      headline: "Your Web Application Is the Face of Your Business—Make It Powerful",
      body: "Your web application isn't just a website—it's your primary business tool, your customer portal, and your competitive advantage. A slow, outdated, or poorly designed web app sends customers straight to your competitors.",
      stats: [
        { value: "53%", label: "Of users abandon sites that take over 3 seconds to load" },
        { value: "88%", label: "Less likely to return after a bad user experience" },
        { value: "3x", label: "Higher engagement with modern, fast web applications" }
      ]
    },
    process: [
      { step: "01", title: "Strategy & Architecture", desc: "We define your application's purpose, audience, and technical requirements before writing any code." },
      { step: "02", title: "Design & Prototyping", desc: "Custom UI/UX design with interactive prototypes to validate user flows." },
      { step: "03", title: "Development", desc: "Modern stack development (React, Next.js, Node.js) with API-first architecture." },
      { step: "04", title: "Testing & QA", desc: "Comprehensive testing across all browsers, devices, and user scenarios." },
      { step: "05", title: "Deploy & Optimise", desc: "Cloud deployment with CI/CD pipelines, monitoring, and performance optimisation." }
    ]
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
    accentLight: "#FDF2F8",
    accentMid: "#FBCFE8",
    whyNeed: {
      headline: "Your Data Is a Goldmine—AI Helps You Find the Gold",
      body: "Most businesses sit on years of valuable data but never use it to make better decisions. Predictive AI uncovers patterns, predicts future outcomes, and automates decisions—giving you a competitive edge that's impossible to replicate.",
      stats: [
        { value: "2.5x", label: "Faster decision-making with AI insights" },
        { value: "85%", label: "Accuracy of AI predictions vs 55% for human forecasts" },
        { value: "30%", label: "Reduction in inventory costs with demand forecasting" }
      ]
    },
    process: [
      { step: "01", title: "Data Assessment", desc: "We audit your existing data sources, quality, and infrastructure to identify what's usable." },
      { step: "02", title: "Model Selection", desc: "We choose the right AI models for your specific business problems and data types." },
      { step: "03", title: "Model Training", desc: "Train AI models on your historical data to recognise patterns and make predictions." },
      { step: "04", title: "Integration", desc: "Integrate AI insights into your existing workflows and dashboards for real-time decision support." },
      { step: "05", title: "Monitor & Refine", desc: "Continuous monitoring and retraining to maintain accuracy as your business evolves." }
    ]
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
    accentLight: "#F0FDFA",
    accentMid: "#99F6E4",
    whyNeed: {
      headline: "Your Team Shouldn't Be Doing Work That a Computer Can Do",
      body: "Manual data entry, repetitive follow-ups, and disconnected tools are costing your team hours every day. Business automation frees your people to focus on creative, strategic work that actually drives growth.",
      stats: [
        { value: "30%", label: "Of work hours spent on manual, repeatable tasks" },
        { value: "70%", label: "Reduction in human errors with automation" },
        { value: "2x", label: "Faster project completion with automated workflows" }
      ]
    },
    process: [
      { step: "01", title: "Workflow Audit", desc: "We map every process, identify bottlenecks, and find opportunities for automation." },
      { step: "02", title: "Automation Design", desc: "Design automated workflows that connect your tools and eliminate manual steps." },
      { step: "03", title: "Integration", desc: "Connect CRMs, email, project management, and other tools into seamless automated workflows." },
      { step: "04", title: "Testing", desc: "Test automation workflows with real scenarios to ensure accuracy and reliability." },
      { step: "05", title: "Deploy & Optimise", desc: "Deploy automation, monitor performance, and continuously refine for maximum efficiency." }
    ]
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
    accentLight: "#F8FAFC",
    accentMid: "#CBD5E1",
    whyNeed: {
      headline: "The Backend Is the Foundation—Everything Else Is Built on It",
      body: "Your frontend is only as good as the backend that powers it. Slow APIs, insecure endpoints, and poorly designed databases create bad user experiences and security vulnerabilities that can sink your business.",
      stats: [
        { value: "70%", label: "Of startups fail due to scalability issues" },
        { value: "63%", label: "Of users leave due to poor API performance" },
        { value: "4x", label: "Faster development with well-designed APIs" }
      ]
    },
    process: [
      { step: "01", title: "Requirement Analysis", desc: "Define API endpoints, data structures, security requirements, and performance goals." },
      { step: "02", title: "Database Design", desc: "Design optimised database schemas with proper indexing and data relationships." },
      { step: "03", title: "API Development", desc: "Build RESTful APIs with proper authentication, validation, and documentation." },
      { step: "04", title: "Security Implementation", desc: "Implement JWT authentication, rate limiting, and comprehensive security best practices." },
      { step: "05", title: "Deploy & Monitor", desc: "Deploy to cloud infrastructure with monitoring, logging, and scaling capabilities." }
    ]
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
    accentLight: "#FAF5FF",
    accentMid: "#DDD6FE",
    whyNeed: {
      headline: "Design Isn't How It Looks—It's How It Works",
      body: "Users don't care about your code or features. They care about whether your product solves their problem quickly and easily. Great UX keeps users, great UI sells your brand, and together they drive conversions.",
      stats: [
        { value: "5x", label: "Higher conversion rates with great UX" },
        { value: "90%", label: "Of users judge products on design alone" },
        { value: "2.5x", label: "Higher user retention with well-designed interfaces" }
      ]
    },
    process: [
      { step: "01", title: "User Research", desc: "We interview users, analyse behaviour, and understand what they actually need—not what they say they want." },
      { step: "02", title: "Wireframing", desc: "Low-fidelity wireframes to test user flows and layout before investing in visual design." },
      { step: "03", title: "Visual Design", desc: "High-fidelity designs with your brand identity, typography, and visual language." },
      { step: "04", title: "Interactive Prototyping", desc: "Clickable prototypes that simulate the real experience for user testing." },
      { step: "05", title: "Design Handoff", desc: "Detailed design system, components, and assets ready for development." }
    ]
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
    accentLight: "#F0F9FF",
    accentMid: "#7DD3FC",
    whyNeed: {
      headline: "The Cloud Gives You Power—DevOps Makes It Work",
      body: "Moving to the cloud is just the first step. Without proper DevOps practices, you'll face downtime, slow deployments, security issues, and scaling problems. We ensure your infrastructure is reliable, secure, and ready to grow.",
      stats: [
        { value: "99.99%", label: "Uptime achieved with proper DevOps" },
        { value: "10x", label: "Faster deployment with CI/CD pipelines" },
        { value: "80%", label: "Reduction in infrastructure costs with optimisation" }
      ]
    },
    process: [
      { step: "01", title: "Infrastructure Assessment", desc: "We analyse your current setup and recommend the best cloud infrastructure for your needs." },
      { step: "02", title: "Architecture Design", desc: "Design a scalable, secure cloud architecture with redundancy and disaster recovery built in." },
      { step: "03", title: "DevOps Implementation", desc: "Set up CI/CD pipelines, containerisation, and automated deployment processes." },
      { step: "04", title: "Deployment", desc: "Deploy your application to the cloud with zero-downtime strategies and rollback capabilities." },
      { step: "05", title: "Monitoring & Support", desc: "24/7 monitoring, automated alerts, regular backups, and ongoing optimisation." }
    ]
  }
];
export function generateStaticParams() {
  return SERVICES.map((s) => ({ id: s.id }));
}

export default function ServicePage({ params }: { params: { id: string } }) {
  const service = SERVICES.find((s) => s.id === params.id);
  if (!service) return notFound();

  const lastWord = service.title.split(" ").slice(-1)[0];
  const restWords = service.title.split(" ").slice(0, -1).join(" ");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #FAFAF7; font-family: 'DM Sans', sans-serif; color: #1A1A1A; }
        @keyframes blink { 0%,100%{opacity:1;}50%{opacity:0.3;} }
        .feature-card:hover { border-color: var(--accent) !important; box-shadow: 0 6px 24px rgba(0,0,0,0.08) !important; }
        .trust-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.08) !important; transform: translateY(-3px); }
        .trust-card { transition: all 0.25s ease; }
      `}</style>

      <main style={{ background: "#FAFAF7", minHeight: "100vh" }}>
        <Navbar />

        {/* ══ HERO ══ */}
        <section style={{
          background: `linear-gradient(158deg, #FAFAF7 0%, ${service.accentLight} 55%, #FAFAF7 100%)`,
          padding: "130px 6% 80px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: "-60px", right: "-5%", width: "min(500px,60vw)", height: "min(500px,60vw)", borderRadius: "50%", background: `radial-gradient(circle,${service.accent}12 0%,transparent 65%)`, pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "-10%", left: "-4%", width: "min(380px,50vw)", height: "min(380px,50vw)", borderRadius: "50%", background: `radial-gradient(circle,${service.accent}08 0%,transparent 65%)`, pointerEvents: "none" }} />

          <div style={{ position: "relative" }}>
            {/* Service badge */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", border: `1.5px solid ${service.accentMid}`, borderRadius: 100, padding: "7px 20px", marginBottom: 28, boxShadow: `0 2px 16px ${service.accent}18` }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: service.accent, display: "inline-block", animation: "blink 2s infinite" }} />
              <span style={{ fontSize: 12, fontWeight: 800, color: service.accent, letterSpacing: "1.5px", textTransform: "uppercase" as const, fontFamily: "'DM Sans', sans-serif" }}>
                Service {service.tag}
              </span>
            </div>

            <div style={{ fontSize: 62, marginBottom: 18 }}>{service.icon}</div>

            <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(36px,6vw,74px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-3px", color: "#141414", maxWidth: 820, margin: "0 auto 20px" }}>
              {restWords} <em style={{ fontStyle: "italic", color: service.accent }}>{lastWord}</em>
            </h1>

            <p style={{ fontSize: "clamp(15px,1.8vw,19px)", color: "#5A5A5A", maxWidth: 520, margin: "0 auto 44px", lineHeight: 1.75, fontWeight: 500 }}>
              {service.short}
            </p>

            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact">
                <button style={{ padding: "14px 30px", borderRadius: 100, background: service.accent, color: "#fff", border: "none", fontWeight: 800, fontSize: 15, cursor: "pointer", boxShadow: `0 8px 30px ${service.accent}40`, fontFamily: "'DM Sans', sans-serif" }}>
                  Book Free Strategy Call →
                </button>
              </Link>
              <a href="#process" style={{ padding: "14px 28px", borderRadius: 100, background: "#fff", color: "#1A1A1A", border: "1.5px solid #E2DDD6", fontWeight: 700, fontSize: 15, textDecoration: "none", fontFamily: "'DM Sans', sans-serif", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                See How It Works
              </a>
            </div>
          </div>
        </section>

        {/* ══ HERO IMAGE ══ */}
        <div style={{ padding: "0 6% 80px", background: "#FAFAF7" }}>
          <div style={{ maxWidth: 1050, margin: "0 auto", borderRadius: 24, overflow: "hidden", border: `1.5px solid ${service.accentMid}`, boxShadow: `0 24px 70px ${service.accent}15` }}>
            <img src={service.img} alt={service.title} style={{ width: "100%", height: 420, objectFit: "cover", display: "block" }} />
          </div>
        </div>

        {/* ══ WHY YOU NEED IT ══ */}
        <section style={{ padding: "90px 6%", background: "#fff" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 64, alignItems: "center" }}>
              <div>
                <div style={{ display: "inline-block", background: service.accentLight, border: `1.5px solid ${service.accentMid}`, color: service.accent, borderRadius: 6, padding: "4px 14px", fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", marginBottom: 22, textTransform: "uppercase" as const, fontFamily: "'DM Sans', sans-serif" }}>
                  Why You Need This
                </div>
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(22px,3vw,38px)", fontWeight: 800, lineHeight: 1.2, marginBottom: 20, letterSpacing: "-1.5px", color: "#141414" }}>
                  {service.whyNeed.headline}
                </h2>
                <p style={{ color: "#5A5A5A", fontSize: 16, lineHeight: 1.85, fontWeight: 500 }}>
                  {service.whyNeed.body}
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {service.whyNeed.stats.map((stat, i) => (
                  <div key={i} style={{ background: service.accentLight, border: `1.5px solid ${service.accentMid}`, borderRadius: 18, padding: "20px 26px", display: "flex", alignItems: "center", gap: 20, boxShadow: `0 4px 20px ${service.accent}10` }}>
                    <div style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, color: service.accent, lineHeight: 1, minWidth: 90, fontFamily: "'Syne', sans-serif" }}>
                      {stat.value}
                    </div>
                    <div style={{ color: "#5A5A5A", fontSize: 15, lineHeight: 1.5, fontWeight: 500 }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ HOW WE PROCEED ══ */}
        <section id="process" style={{ padding: "100px 6%", background: "#FAFAF7" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div style={{ display: "inline-block", background: service.accentLight, border: `1.5px solid ${service.accentMid}`, color: service.accent, borderRadius: 6, padding: "4px 14px", fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", marginBottom: 18, textTransform: "uppercase" as const, fontFamily: "'DM Sans', sans-serif" }}>
                Our Process
              </div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(28px,4vw,50px)", fontWeight: 800, letterSpacing: "-2px", color: "#141414", maxWidth: 560, margin: "0 auto" }}>
                How We Make It Happen
              </h2>
            </div>

            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: 31, top: 40, bottom: 40, width: 2, background: `linear-gradient(to bottom, ${service.accent}, ${service.accent}00)` }} />
              {service.process.map((step, i) => (
                <div key={i} style={{ display: "flex", gap: 28, padding: "28px 0", borderBottom: i < service.process.length - 1 ? "1px solid #EAE6E0" : "none" }}>
                  <div style={{ width: 64, height: 64, borderRadius: "50%", background: service.accentLight, border: `2px solid ${service.accent}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 13, fontWeight: 800, color: service.accent, letterSpacing: "0.05em", boxShadow: `0 4px 16px ${service.accent}25`, fontFamily: "'DM Sans', sans-serif" }}>
                    {step.step}
                  </div>
                  <div style={{ paddingTop: 12 }}>
                    <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800, marginBottom: 8, color: "#141414", letterSpacing: "-0.5px" }}>{step.title}</h3>
                    <p style={{ color: "#777", fontSize: 15, lineHeight: 1.8, fontWeight: 500 }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ WHAT'S INCLUDED ══ */}
        <section style={{ padding: "90px 6%", background: "#fff" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 50 }}>
              <div style={{ display: "inline-block", background: service.accentLight, border: `1.5px solid ${service.accentMid}`, color: service.accent, borderRadius: 6, padding: "4px 14px", fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", marginBottom: 18, textTransform: "uppercase" as const, fontFamily: "'DM Sans', sans-serif" }}>
                Deliverables
              </div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(26px,4vw,46px)", fontWeight: 800, letterSpacing: "-2px", color: "#141414" }}>
                Everything That's Included
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 14 }}>
              {service.features.map((f, i) => (
                <div key={i} className="feature-card" style={{ padding: "18px 22px", borderRadius: 14, background: "#FAFAF7", border: "1.5px solid #EAE6E0", display: "flex", alignItems: "center", gap: 14, transition: "all 0.2s" }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: service.accentLight, border: `1.5px solid ${service.accentMid}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 14, color: service.accent, fontWeight: 800 }}>✓</div>
                  <span style={{ fontWeight: 700, fontSize: 15, color: "#1A1A1A", fontFamily: "'DM Sans', sans-serif" }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ WHY CHOOSE US ══ */}
        <section style={{ padding: "100px 6%", background: "#FAFAF7" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(26px,4vw,46px)", fontWeight: 800, letterSpacing: "-2px", color: "#141414" }}>Why Brands Choose Us</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 20 }}>
              {[
                { icon: "🏆", title: "Results-Obsessed", desc: "We don't measure success in likes or impressions. Every strategy ties back to revenue and business growth." },
                { icon: "🔬", title: "Data-Driven Decisions", desc: "No guesswork. Every decision is backed by analytics, testing, and real performance data from your campaigns." },
                { icon: "🤝", title: "True Partnership", desc: "You get a dedicated team that treats your business like their own — proactive, transparent, and always available." },
                { icon: "⚡", title: "Fast Execution", desc: "We move with urgency. Onboarding completed in 48 hours. No endless paperwork or approval chains." },
              ].map((item, i) => (
                <div key={i} className="trust-card" style={{ background: "#fff", border: "1.5px solid #EAE6E0", borderRadius: 20, padding: "28px 24px", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}>
                  <div style={{ fontSize: 34, marginBottom: 14 }}>{item.icon}</div>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 17, marginBottom: 10, color: "#141414", letterSpacing: "-0.3px" }}>{item.title}</h3>
                  <p style={{ color: "#777", fontSize: 14, lineHeight: 1.8, fontWeight: 500 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CTA BANNER ══ */}
        <section style={{ padding: "0 6% 100px", background: "#FAFAF7" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", borderRadius: 28, background: `linear-gradient(158deg, ${service.accentLight} 0%, #fff 60%, ${service.accentLight} 100%)`, border: `1.5px solid ${service.accentMid}`, padding: "70px 60px", textAlign: "center", position: "relative", overflow: "hidden", boxShadow: `0 20px 60px ${service.accent}15` }}>
            <div style={{ position: "absolute", top: -80, right: -80, width: 320, height: 320, borderRadius: "50%", background: `radial-gradient(circle,${service.accent}12 0%,transparent 70%)`, pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: -60, left: -60, width: 260, height: 260, borderRadius: "50%", background: `radial-gradient(circle,${service.accent}08 0%,transparent 70%)`, pointerEvents: "none" }} />

            <div style={{ position: "relative" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", border: `1.5px solid ${service.accentMid}`, borderRadius: 100, padding: "7px 20px", marginBottom: 28, boxShadow: `0 2px 16px ${service.accent}15` }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: service.accent, display: "inline-block", animation: "blink 2s infinite" }} />
                <span style={{ fontSize: 12, fontWeight: 800, color: service.accent, letterSpacing: "1.5px", textTransform: "uppercase" as const }}>Free Strategy Call</span>
              </div>

              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(28px,4vw,52px)", fontWeight: 800, letterSpacing: "-2px", marginBottom: 16, color: "#141414" }}>
                Ready to grow with <em style={{ fontStyle: "italic", color: service.accent }}>{service.title}</em>?
              </h2>
              <p style={{ color: "#5A5A5A", fontSize: 17, maxWidth: 500, margin: "0 auto 36px", lineHeight: 1.7, fontWeight: 500 }}>
                Book a free 30-minute strategy call. No pressure, no pitch — just clarity on what's possible for your business.
              </p>
              <Link href="/contact">
                <button style={{ padding: "16px 36px", borderRadius: 100, background: service.accent, color: "#fff", border: "none", fontWeight: 800, fontSize: 16, cursor: "pointer", boxShadow: `0 12px 40px ${service.accent}45`, fontFamily: "'DM Sans', sans-serif" }}>
                  Book Free Strategy Call →
                </button>
              </Link>
              <p style={{ color: "#BBB", fontSize: 13, marginTop: 18, fontWeight: 600 }}>No contracts. Cancel anytime. Results guaranteed or your money back.</p>
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