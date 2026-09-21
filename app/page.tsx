"use client";
import {
  useState,
  useEffect,
  useRef,
  type MouseEvent,
  type RefObject,
} from "react";
import Navbar from "@/app/components/Navbar";
import Link from "next/link";

const NAV_LINKS = ["About", "Work", "Services", "Clients", "Contact"];

const SERVICES = [
  {
    icon: "✦",
    title: "CRM Software",
    desc: "Powerful CRM solutions built to manage leads, customers, sales pipelines, and relationships — all in one intelligent system.",
    tag: "01",
  },
  {
    icon: "◈",
    title: "Performance Marketing",
    desc: "Data-obsessed campaigns across Google, Meta & beyond. Every rupee spent is tracked, tested, and optimised.",
    tag: "02",
  },
  {
    icon: "❋",
    title: "ERP Software",
    desc: "End-to-end ERP systems that connect your business operations, inventory, finance, HR, and workflows in one seamless platform.",
    tag: "03",
  },
  {
    icon: "⬡",
    title: "SaaS Development",
    desc: "Scalable SaaS products engineered for growth — from powerful dashboards and automation to secure, cloud-based platforms.",
    tag: "04",
  },
  {
    icon: "◎",
    title: "Web & UX Design",
    desc: "Conversion-first interfaces that are also genuinely beautiful. Because performance and aesthetics aren't a trade-off.",
    tag: "05",
  },
  {
    icon: "⬟",
    title: "Predictive AI",
    desc: "Turn your business data into smarter decisions with predictive AI that forecasts trends, identifies opportunities, and automates intelligence.",
    tag: "06",
  },
];

const STATS = [
  { value: "App Development", label: "Powerful Apps, Built to Scale" },
  { value: "AI Development", label: "Intelligence Built for Business" },
  { value: "SaaS Development", label: "From Idea to Product" },
  { value: "Better Reach", label: "Right Audience Targeting" },
];

const WORK = [
  {
    img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    client: "Content Creation",
    category: "Scroll-Stopping Posts",
    result: "More Engagement",
  },
  {
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    client: "Ad Campaigns",
    category: "Targeted Performance Ads",
    result: "Quality Leads",
  },
  {
    img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
    client: "SEO Growth",
    category: "Ranking + Traffic",
    result: "Better Visibility",
  },
  {
    img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80",
    client: "Branding",
    category: "Identity + Positioning",
    result: "Strong Presence",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Kiwi Connect didn't just run our campaigns — they fundamentally changed how we think about growth. Our revenue tripled in 14 months.",
    name: "Priya Mehta",
    // role: "CEO, Lumē Skincare",
    avatar:
      "https://plus.unsplash.com/premium_photo-1682089844121-6e7d9edc30ff?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "I've worked with five agencies before. None came close to the strategic depth and execution speed of this team.",
    name: "Arjun Shetty",
    // role: "Founder, Stackr Finance",
    avatar:
      "https://images.unsplash.com/flagged/photo-1571367034861-e6729ad9c2d5?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "Every metric we care about moved in the right direction — within weeks, not months.",
    name: "Kavita Rao",
    // role: "CMO, NovaPulse",
    avatar:
      "https://plus.unsplash.com/premium_photo-1682089810582-f7b200217b67?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const CLIENTS = [
  "/clients/client1.jpg",
  "/clients/client2.png",
  "/clients/client3.png",
  "/clients/client4.png",
  "/clients/client5.png",
  "/clients/client6.png",
  "/clients/kavitashreelogo.jpeg",
  "/clients/jobjunctionlogo.jpeg",
  "/clients/ashishmarbel.png",
  "/clients/Full logo.png",
  "/clients/logo.png",
  "/clients/logo 2.jpg",
];

function useInView<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.1,
): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ─────────────────────────────────────────
// Hero
// ─────────────────────────────────────────
const HEADLINE_SETS = [
  ["Performance Marketing That", "Actually Grows", "Your Business."],
  ["Software That", "Powers Your", "Business."],
  ["Digital Products", "Built To", "Scale."],
  ["Growth That's", "Data-Driven &", "Built To Last."],
];

function HeroSection() {
  const [badge, setBadge] = useState(false);
  const [hlVisible, setHlVisible] = useState(false);
  const [lines, setLines] = useState(["", "", ""]);
  const [cursorLine, setCursorLine] = useState(0);
  const [showCursor, setShowCursor] = useState(false);
  const [showSub, setShowSub] = useState(false);
  const [showCtas, setShowCtas] = useState(false);
  const [showTrust, setShowTrust] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cancelRef = useRef(false);
  const setIdxRef = useRef(0);

  const CHAR = 52,
    PAUSE = 220,
    HOLD = 3800,
    ERASE = 22;

  function typeLine(li: number, ci: number, set: string[], done: () => void) {
    if (cancelRef.current) return;
    if (li >= 3) {
      done();
      return;
    }
    setCursorLine(li);
    setShowCursor(true);
    const text = set[li];
    setLines((prev) => {
      const n = [...prev];
      n[li] = text.slice(0, ci);
      return n;
    });
    if (ci < text.length) {
      setTimeout(() => typeLine(li, ci + 1, set, done), CHAR);
    } else {
      setTimeout(() => typeLine(li + 1, 0, set, done), PAUSE);
    }
  }

  function eraseLine(li: number, len: number, set: string[], done: () => void) {
    if (cancelRef.current) return;
    if (len < 0) {
      if (li > 0) eraseLine(li - 1, set[li - 1].length, set, done);
      else done();
      return;
    }
    setLines((prev) => {
      const n = [...prev];
      n[li] = set[li].slice(0, len);
      return n;
    });
    setTimeout(() => eraseLine(li, len - 1, set, done), ERASE);
  }

  function runSet(idx: number) {
    if (cancelRef.current) return;
    const set = HEADLINE_SETS[idx % HEADLINE_SETS.length];
    setLines(["", "", ""]);
    typeLine(0, 0, set, () => {
      setShowCursor(false);
      setTimeout(() => {
        eraseLine(2, set[2].length, set, () => {
          setTimeout(() => runSet(idx + 1), 260);
        });
      }, HOLD);
    });
  }

  useEffect(() => {
    cancelRef.current = false;
    const t1 = setTimeout(() => setBadge(true), 80);
    const t2 = setTimeout(() => {
      setHlVisible(true);
      runSet(0);
      setTimeout(() => setShowSub(true), 900);
      setTimeout(() => setShowCtas(true), 1150);
      setTimeout(() => setShowTrust(true), 1400);
    }, 500);
    return () => {
      cancelRef.current = true;
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Glowing Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const wrap = canvas.parentElement!;
    let animId: number,
      t = 0;
    let W = wrap.offsetWidth,
      H = wrap.offsetHeight;

    const resizeObserver = new ResizeObserver(() => {
      W = wrap.offsetWidth;
      H = wrap.offsetHeight;
      canvas.width = W;
      canvas.height = H;
      initParticles(); // reinitialize particles on resize
    });
    resizeObserver.observe(wrap);

    const colors = [
      { color: "rgba(224,96,216,", intensity: 0.7 }, // #e060d8
      { color: "rgba(155,77,202,", intensity: 0.6 }, // #9b4dca
      { color: "rgba(251,191,36,", intensity: 0.5 }, // #fbbf24
      { color: "rgba(186,58,255,", intensity: 0.65 }, // #ba3aff
      { color: "rgba(245,101,185,", intensity: 0.6 }, // #f565b9
    ];

    let pts: Array<{
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      a: number;
      baseA: number;
      c: string;
      intensity: number;
      ox: number;
      oy: number;
      sp: number;
      glow: number;
      pulseSpeed: number;
      pulsePhase: number;
    }> = [];

    const initParticles = () => {
      pts = Array.from({ length: 85 }, () => {
        const colorData = colors[Math.floor(Math.random() * colors.length)];
        return {
          x: Math.random() * W,
          y: Math.random() * H,
          r: Math.random() * 3.5 + 1.2,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          a: Math.random() * 0.4 + 0.1,
          baseA: Math.random() * 0.4 + 0.1,
          c: colorData.color,
          intensity: colorData.intensity,
          ox: Math.random() * 1000,
          oy: Math.random() * 1000,
          sp: Math.random() * 0.5 + 0.15,
          glow: Math.random() * 8 + 4,
          pulseSpeed: Math.random() * 0.008 + 0.002,
          pulsePhase: Math.random() * Math.PI * 2,
        };
      });
    };

    initParticles();

    const ctx = canvas.getContext("2d")!;

    // Helper to draw a glowing particle
    const drawGlow = (
      x: number,
      y: number,
      radius: number,
      color: string,
      alpha: number,
      glowSize: number,
      intensity: number,
    ) => {
      const gradient = ctx.createRadialGradient(
        x,
        y,
        radius * 0.3,
        x,
        y,
        radius * glowSize,
      );
      const glowAlpha = alpha * intensity * 0.7;
      gradient.addColorStop(0, color + alpha * 0.9 + ")");
      gradient.addColorStop(0.4, color + glowAlpha * 0.7 + ")");
      gradient.addColorStop(0.7, color + glowAlpha * 0.3 + ")");
      gradient.addColorStop(1, color + "0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, radius * glowSize, 0, Math.PI * 2);
      ctx.fill();
    };

    const loop = () => {
      t += 0.008;
      ctx.clearRect(0, 0, W, H);

      // First pass: draw glows (behind)
      pts.forEach((p) => {
        // Update position with smooth wave motion
        p.x += p.vx + Math.sin(t * p.sp + p.ox) * 0.12;
        p.y += p.vy + Math.cos(t * p.sp * 0.9 + p.oy) * 0.12;

        // Wrap around edges
        if (p.x < -15) p.x = W + 15;
        if (p.x > W + 15) p.x = -15;
        if (p.y < -15) p.y = H + 15;
        if (p.y > H + 15) p.y = -15;

        // Dynamic alpha with sine wave pulse
        const pulseAlpha =
          Math.sin(t * p.pulseSpeed * 2 + p.pulsePhase) * 0.2 + 0.8;
        const currentAlpha = p.a * pulseAlpha * p.intensity;

        // Draw glow (larger, blurred effect)
        const glowIntensity =
          0.6 + Math.sin(t * p.pulseSpeed + p.pulsePhase) * 0.2;
        drawGlow(
          p.x,
          p.y,
          p.r,
          p.c,
          currentAlpha,
          p.glow * glowIntensity,
          p.intensity,
        );
      });

      // Second pass: draw core particles (on top for crisp center)
      pts.forEach((p) => {
        const pulseAlpha =
          Math.sin(t * p.pulseSpeed * 2 + p.pulsePhase) * 0.2 + 0.8;
        const currentAlpha = p.a * pulseAlpha * p.intensity;

        // Core particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = p.c + (currentAlpha + 0.2) + ")";
        ctx.fill();

        // Inner bright spot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 0.25, 0, Math.PI * 2);
        ctx.fillStyle = p.c + (currentAlpha + 0.4) + ")";
        ctx.fill();
      });

      animId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
    };
  }, []);

  const Cursor = () =>
    showCursor ? (
      <span
        style={{
          display: "inline-block",
          width: 3,
          height: "0.82em",
          background: "#e060d8",
          marginLeft: 2,
          verticalAlign: "middle",
          borderRadius: 2,
          animation: "curBlink 0.65s step-end infinite",
          boxShadow: "0 0 4px #e060d8",
        }}
      />
    ) : null;

  return (
    <section className="hero-v2">
      <canvas ref={canvasRef} className="hero-v2__canvas" />

      {/* LEFT CARDS */}
      <div className="hside hside--left">
        <div className="hcard hcard--live">
          <span className="live-dot" />
          <div>
            <div className="hcard__live-txt">AI & Software</div>
            <div className="hcard__lbl">Built for Business</div>
          </div>
        </div>
        <div className="hcard hcard--chart">
          <div className="hcard__lbl">Business Growth</div>
          <div className="hbars">
            {[55, 70, 45, 85, 60, 95].map((h, i) => (
              <div
                key={i}
                className="hbar"
                style={{ "--h": h + "%" } as React.CSSProperties}
              />
            ))}
          </div>
        </div>
        <div className="hcard">
          <div className="hcard__icon">🎯</div>
          <div className="hcard__val">
            4.2× <span>ROAS</span>
          </div>
          <div className="hcard__lbl">Avg return on ad spend</div>
        </div>
        <div className="hcard hcard--pill">
          <span>✦ AI-powered technology company</span>
        </div>
      </div>

      {/* CENTER */}
      <div className="hero-v2__center">
        <div className={`hero-v2__badge${badge ? " hero-v2__badge--in" : ""}`}>
          <span className="badge-dot" />
          Now onboarding clients
        </div>
        <h1 className={`hero-v2__hl${hlVisible ? " hero-v2__hl--in" : ""}`}>
          <span className="tl">
            {lines[0]}
            {showCursor && cursorLine === 0 && <Cursor />}
          </span>
          <span className="tl tl--grad">
            {lines[1]}
            {showCursor && cursorLine === 1 && <Cursor />}
          </span>
          <span className="tl">
            {lines[2]}
            {showCursor && cursorLine === 2 && <Cursor />}
          </span>
        </h1>
        <p className={`hero-v2__sub${showSub ? " hero-v2__sub--in" : ""}`}>
          Kiwi Connect Digital builds AI-powered software, SaaS products and
          digital experiences that turn ideas into scalable business solutions.
        </p>
        <div className={`hero-v2__ctas${showCtas ? " hero-v2__ctas--in" : ""}`}>
          <Link href="/contact">
            <button className="btn btn--primary">Start Your Project →</button>
          </Link>
          <Link href="/services">
            <button className="btn btn--outline">View Our Services</button>
          </Link>
        </div>
        <div
          className={`hero-v2__trust${showTrust ? " hero-v2__trust--in" : ""}`}
        >
          <div className="trust-avs">
            {(
              [
                ["P", "#e060d8"],
                ["A", "#9b4dca"],
                ["K", "#5b8dee"],
                ["R", "#38c9b0"],
              ] as [string, string][]
            ).map(([l, bg]) => (
              <span key={l} style={{ background: bg }}>
                {l}
              </span>
            ))}
          </div>
          <div className="trust-txt">
            Trusted by <strong>50+ businesses </strong> worldwide
          </div>
        </div>
      </div>

      {/* RIGHT CARDS */}
      <div className="hside hside--right">
        <div className="hcard hcard--avatars">
          <div className="hcard__lbl">Happy businesses</div>
          <div className="av-row">
            {(
              [
                ["P", "#e060d8"],
                ["A", "#9b4dca"],
                ["K", "#5b8dee"],
                ["R", "#38c9b0"],
                ["M", "#f59e0b"],
              ] as [string, string][]
            ).map(([l, bg]) => (
              <span key={l} style={{ background: bg }}>
                {l}
              </span>
            ))}
          </div>
          <div className="hcard__count">50+ brands</div>
          <div className="hcard__lbl">Trusted worldwide</div>
        </div>
        <div className="hcard">
          <div className="hcard__icon">📈</div>
          <div className="hcard__val">+180%</div>
          <div className="hcard__lbl">Avg. lead growth</div>
        </div>
        <div className="hcard hcard--review">
          <div className="stars">★★★★★</div>
          <div className="hcard__quote">
            "They tripled our revenue in 14 months."
          </div>
          <div className="hcard__reviewer">— Priya M., CEO</div>
        </div>
        <div className="hcard hcard--mini">
          <span>🌿 Data-driven results</span>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
// Stats
// ─────────────────────────────────────────
function StatsBar() {
  const [ref, inView] = useInView();
  return (
    <section ref={ref} className="stats">
      {STATS.map((s, i) => (
        <div
          key={i}
          className={`stats__item${inView ? " stats__item--in" : ""}`}
          style={{ transitionDelay: `${i * 0.1}s` }}
        >
          <div className="stats__value">{s.value}</div>
          <div className="stats__label">{s.label}</div>
        </div>
      ))}
    </section>
  );
}

// ─────────────────────────────────────────
// Services
// ─────────────────────────────────────────
function ServicesSection() {
  return (
    <section id="services" className="section section--light">
      <div className="container">
        <div className="services__header">
          {/* Changed: Removed the template literal and 'inView' check */}
          <div className="services__header-left">
            <div className="eyebrow">What We Do</div>
            <h2 className="heading-lg">
              Services built for
              <br />
              <em style={{ fontStyle: "italic", color: "#ff6ce7" }}>
                real results.
              </em>
            </h2>
          </div>

          {/* Changed: Removed conditional classes */}
          <p className="services__header-desc">
            From AI-powered solutions to scalable software and digital products,
            we turn ideas into technology that solves real business problems and
            drives measurable growth.
          </p>
        </div>

        <div className="services__grid">
          {SERVICES.map((s, i) => (
            <ServiceCard key={i} s={s} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Removed: inView prop as it's no longer needed for visibility
function ServiceCard({ s }: { s: (typeof SERVICES)[0] }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      /* Removed: service-card--in and dynamic style for transitionDelay */
      className={`service-card${hov ? " service-card--hov" : ""}`}
    >
      <div className="service-card__top">
        <div className="service-card__icon">{s.icon}</div>
        <span className="service-card__tag">{s.tag}</span>
      </div>
      <h3 className="service-card__title">{s.title}</h3>
      <p className="service-card__desc">{s.desc}</p>
      <div className="service-card__link">
        Learn more{" "}
        <span
          className={`service-card__arrow${hov ? " service-card__arrow--hov" : ""}`}
        >
          →
        </span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// About
// ─────────────────────────────────────────
function AboutSection() {
  const [ref, inView] = useInView();
  return (
    <section id="about" ref={ref} className="section section--white">
      <div className="container">
        <div className="about__grid">
          {/* Image cluster */}
          <div className={`about__images${inView ? " about__images--in" : ""}`}>
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=700&q=85"
              alt="Team"
              className="about__img-main"
            />
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=85"
              alt="Work"
              className="about__img-second"
            />

            {/* Badge */}
            <div className="about__badge">
              <div
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 28,
                  fontWeight: 900,
                  color: "#fff",
                  lineHeight: 1,
                }}
              >
                Growth
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.85)",
                  fontWeight: 700,
                  marginTop: 4,
                }}
              >
                Focused
                <br />
                Agency
              </div>
            </div>
          </div>

          {/* Text */}
          <div className={`about__text${inView ? " about__text--in" : ""}`}>
            <div className="eyebrow">About Kiwi Connect</div>

            <h2 className="heading-lg">
              We're not just a tech company.
              <br />
              We're your{" "}
              <em style={{ fontStyle: "italic", color: "#ff6ce7" }}>
                technology partner.
              </em>
            </h2>

            <p className="body-text">
              Kiwi Connect Digital builds the technology behind tomorrow's
              businesses — from AI-powered applications and intelligent
              automation to custom software and scalable SaaS products.
            </p>

            <p className="body-text">
              We believe great technology should do more than look impressive.
              It should solve problems, simplify operations, improve
              experiences, and create opportunities for growth. That's why we
              combine AI, engineering, and product strategy to turn ambitious
              ideas into powerful digital products.
            </p>

            <div className="about__pillars">
              {[
                ["AI-First Mindset", "Smart, innovative, and built for what's next."],
                ["Technology Focus", "Every solution designed for real-world impact."],
                ["Execution First", "Ideas are nothing without action."],
              ].map(([title, sub]) => (
                <div key={title} className="pillar">
                  <div className="pillar__dot" />
                  <div>
                    <div className="pillar__title">{title}</div>
                    <div className="pillar__sub">{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
// Employees / Team
// ─────────────────────────────────────────
interface Employee {
  _id: string;
  name: string;
  role: string;
  image?: string;
  bio?: string;
}

// ─────────────────────────────────────────
// Clients
// ─────────────────────────────────────────
function ClientsSection() {
  const [ref, inView] = useInView();
  const trackRef = useRef<HTMLDivElement>(null);

  // Duplicate logos for seamless infinite loop
  const doubled = [...CLIENTS, ...CLIENTS];

  return (
    <section id="clients" ref={ref} className="clients">
      <div className="container">
        <p className="clients__label">Trusted by leading brands worldwide</p>
      </div>

      <div className="carousel">
        <div className="carousel__track" ref={trackRef}>
          {doubled.map((url, i) => (
            <div key={i} className="carousel__item">
              <img
                src={url}
                alt="client"
                style={{ height: 64, objectFit: "contain", maxWidth: 140 }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.visibility = "hidden";
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
// Testimonials
// ─────────────────────────────────────────
function TestimonialsSection() {
  const [ref, inView] = useInView();
  const [active, setActive] = useState(0);
  return (
    <section className="section section--white">
      <div ref={ref} className="container">
        <div className="text-center mb-lg">
          <div className="eyebrow">Client Love</div>
          <h2 className="heading-lg">Don't take our word for it.</h2>
        </div>

        <div className={`testimonial${inView ? " testimonial--in" : ""}`}>
          <div className="testimonial__quote-mark">"</div>
          <p className="testimonial__text">{TESTIMONIALS[active].quote}</p>
          <div className="testimonial__author">
            <img
              src={TESTIMONIALS[active].avatar}
              alt=""
              className="testimonial__avatar"
            />
            <div>
              <div className="testimonial__name">
                {TESTIMONIALS[active].name}
              </div>
              {/* <div className="testimonial__role">{TESTIMONIALS[active].role}</div> */}
            </div>
          </div>
        </div>

        <div className="testimonial__dots">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`testimonial__dot${i === active ? " testimonial__dot--active" : ""}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
// CTA
// ─────────────────────────────────────────
function CTASection() {
  const [ref, inView] = useInView();
  return (
    <section id="contact" className="section section--light">
      <div className="container">
        <div ref={ref} className={`cta-block${inView ? " cta-block--in" : ""}`}>
          <div className="cta-block__glow" />
          <div className="cta-block__text">
            <div className="eyebrow eyebrow--green">Ready to scale?</div>
            <h2 className="heading-lg heading--white">
              Let's build something
              <br />
              <em style={{ fontStyle: "italic", color: "#ba3aff" }}>
                extraordinary together.
              </em>
            </h2>
            <p
              style={{
                fontSize: 15,
                color: "rgba(255,255,255,0.5)",
                fontWeight: 500,
                marginTop: 12,
              }}
            >
              Free strategy audit included. No commitment required.
            </p>
          </div>
          <div className="cta-block__actions">
            <Link href="/contact">
              <button className="btn btn--primary">Get Free Audit →</button>
            </Link>
            {/* <button className="btn btn--ghost">Schedule a Call</button> */}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
// Footer
// ─────────────────────────────────────────
function Footer() {
  const MENU: [string, string[]][] = [
    ["Company", ["About", "Work", "Services", "Blog", "Careers"]],
    [
      "Services",
      [
        "Brand Strategy",
        "Performance",
        "SEO & Content",
        "Social Media",
        "Web & UX",
      ],
    ],
    [
      "Contact",
      [
        "kiwiconnectdigital@gmail.com",
        "+91 8305959538, +91 6261610281",
        "Bhopal, India",
        "LinkedIn",
        "Twitter",
      ],
    ],
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo">
              <img
                src="/kiwilogo.png"
                alt="Kiwi Connect Digital"
                style={{ width: 36, height: 36, objectFit: "contain" }}
              />
              <span className="footer__logo-text">
                Kiwi Connect <span style={{ color: "#ff6ce7" }}>Digital</span>
              </span>
            </div>

            <p className="footer__tagline">
             AI-powered technology for ambitious businesses. Built to solve problems, designed to scale.
            </p>

            {/* CTA */}
            <div className="footer__cta">
              <div className="footer__cta-text">
                Ready to build what's next?
              </div>
              {/* <a href="#contact" className="footer__cta-btn">Get Free Consultation</a> */}
            </div>
          </div>

          {/* Services */}
          <div className="footer__col">
            <div className="footer__col-title">Services</div>
            <div className="footer__col-item">AI Development</div>
            <div className="footer__col-item">AI Application Development</div>
            <div className="footer__col-item">Software Development</div>
            <div className="footer__col-item">SaaS Development</div>
            <div className="footer__col-item">Web & Mobile App Development</div>
            <div className="footer__col-item">Performance Marketing</div>
          </div>

          {/* Company */}
          <div className="footer__col">
            <div className="footer__col-title">Company</div>
            <div className="footer__col-item">About Us</div>
            <div className="footer__col-item">Our Process</div>
            <div className="footer__col-item">Contact</div>
            <div className="footer__col-item">Careers</div>
          </div>

          {/* Contact */}
          <div className="footer__col">
            <div className="footer__col-title">Contact</div>
            <div className="footer__col-item">📞 +91 83059 59538</div>
            <div className="footer__col-item">
              📧 kiwiconnectdigital@gmail.com
            </div>
            <div className="footer__col-item">📍 India</div>

            {/* Socials */}
            <div style={{ marginTop: 12 }}>
              <div className="footer__col-item">Instagram</div>
              <div className="footer__col-item">LinkedIn</div>
              <div className="footer__col-item">Facebook</div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer__bottom">
          <div>© 2026 Kiwi Connect Digital. All rights reserved.</div>
          <div>Crafted with 💜 by Kiwi Connect</div>
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────
// ROOT PAGE
// ─────────────────────────────────────────
export default function KiwiConnectDigital() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@400;500;600;700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #FAFAF7; font-family: 'DM Sans', sans-serif; }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.3); }
        }

        /* ── UTILITIES ─────────────────────── */
        .container { max-width: 1200px; margin: 0 auto; padding: 0 5%; }
        .section { padding: 80px 0; }
        .section--light { background: #FAFAF7; }
        .section--sand { background: #F2F0EA; }
        .section--white { background: #fff; }
        @media (min-width: 768px) { .section { padding: 120px 0; } }

        .eyebrow {
          font-size: 12px; font-weight: 800; color: #ff6ce7;
          letter-spacing: 2px; text-transform: uppercase; margin-bottom: 12px;
        }
        .eyebrow--green { color: #ff6ce7; }
/* ── HERO V2 ──────────────────────────── */
.hero-v2 {
  background: #faf9f7;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr minmax(0, 640px) 1fr;
  align-items: center;
  padding: 100px 0 80px;
  position: relative; overflow: hidden;
}
.hero-v2__canvas { position: absolute; inset: 0; pointer-events: none; z-index: 0; }

/* Side columns */
.hside {
  position: relative; z-index: 2;
  display: flex; flex-direction: column; gap: 14px; padding: 0 20px;
}
.hside--left { align-items: flex-end; }
.hside--right { align-items: flex-start; }

/* Cards */
.hcard {
  background: #fff; border-radius: 16px;
  padding: 14px 18px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.06);
  border: 1px solid rgba(224,96,216,0.1);
  max-width: 200px; width: 100%;
  opacity: 0; transform: translateX(-28px);
  animation: slideInL 0.7s cubic-bezier(.22,.68,0,1.2) forwards;
}
.hside--right .hcard { transform: translateX(28px); animation-name: slideInR; }
.hcard:nth-child(1) { animation-delay: 0.9s; }
.hcard:nth-child(2) { animation-delay: 1.1s; }
.hcard:nth-child(3) { animation-delay: 1.3s; }
.hcard:nth-child(4) { animation-delay: 1.5s; }

.hcard--live {
  display: flex; align-items: center; gap: 10px;
}
.live-dot {
  width: 9px; height: 9px; border-radius: 50%; background: #22c55e; flex-shrink: 0;
  animation: livepulse 1.8s ease-in-out infinite;
}
.hcard__live-txt { font-size: 13px; font-weight: 700; color: #333; }
.hcard__lbl { font-size: 10px; font-weight: 600; color: #aaa; text-transform: uppercase; letter-spacing: 0.6px; margin-top: 2px; }
.hcard__icon { font-size: 18px; margin-bottom: 5px; }
.hcard__val { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 900; color: #141414; line-height: 1; }
.hcard__val span { font-size: 13px; font-weight: 700; color: #e060d8; margin-left: 3px; }

/* Bar chart */
.hcard--chart .hcard__lbl { margin-bottom: 8px; }
.hbars { display: flex; align-items: flex-end; gap: 5px; height: 42px; }
.hbar {
  border-radius: 4px 4px 0 0; width: 18px; flex: 1;
  background: linear-gradient(180deg, #e060d8, #9b4dca);
  height: var(--h, 50%);
  animation: growBar 1s cubic-bezier(.22,.68,0,1.2) forwards;
  transform-origin: bottom; transform: scaleY(0);
}
.hbar:nth-child(1){animation-delay:1.4s;} .hbar:nth-child(2){animation-delay:1.5s;}
.hbar:nth-child(3){animation-delay:1.6s;} .hbar:nth-child(4){animation-delay:1.7s;}
.hbar:nth-child(5){animation-delay:1.8s;} .hbar:nth-child(6){animation-delay:1.9s;}

/* Pill card */
.hcard--pill {
  background: linear-gradient(135deg, #e060d8, #9b4dca) !important;
  border: none !important; border-radius: 100px !important; padding: 9px 16px !important;
  display: flex; align-items: center; gap: 8px;
}
.hcard--pill span { font-size: 12px; font-weight: 700; color: #fff; white-space: nowrap; }

.hcard--mini {
  border-radius: 100px !important; padding: 9px 16px !important;
  display: flex; align-items: center;
}
.hcard--mini span { font-size: 12px; font-weight: 700; color: #9b4dca; }

/* Avatars */
.av-row { display: flex; margin: 6px 0 4px; }
.av-row span {
  width: 26px; height: 26px; border-radius: 50%; border: 2px solid #fff;
  display: flex; align-items: center; justify-content: center;
  font-size: 10px; font-weight: 700; color: #fff; margin-left: -7px;
}
.av-row span:first-child { margin-left: 0; }
.hcard__count { font-size: 13px; font-weight: 800; color: #141414; margin-top: 3px; }

/* Review */
.stars { color: #f59e0b; font-size: 12px; letter-spacing: 1px; margin-bottom: 5px; }
.hcard__quote { font-size: 12px; color: #555; font-weight: 500; line-height: 1.5; font-style: italic; }
.hcard__reviewer { font-size: 11px; font-weight: 700; color: #9b4dca; margin-top: 6px; }

/* Center */
.hero-v2__center {
  position: relative; z-index: 2;
  display: flex; flex-direction: column;
  align-items: center; text-align: center; padding: 0 24px;
}

.hero-v2__badge {
  display: inline-flex; align-items: center; gap: 8px;
  background: #fff; border: 1.5px solid #e8d5f7; border-radius: 100px;
  padding: 7px 18px; font-size: 11px; font-weight: 700; color: #9b4dca;
  letter-spacing: 1px; text-transform: uppercase; margin-bottom: 26px;
  opacity: 0; transform: translateY(10px);
  transition: all 0.6s cubic-bezier(.22,.68,0,1.2);
}
.hero-v2__badge--in { opacity: 1; transform: translateY(0); }

.hero-v2__hl {
  font-family: 'Syne', sans-serif;
  font-size: clamp(34px, 4vw, 60px);
  font-weight: 900; color: #141414;
  line-height: 1.07; letter-spacing: -1.8px;
  margin-bottom: 22px; min-height: 3.3em; width: 100%;
  opacity: 0; transform: translateY(16px);
  transition: all 0.5s cubic-bezier(.22,.68,0,1.2) 0.3s;
}
.hero-v2__hl--in { opacity: 1; transform: translateY(0); }

.tl { display: block; min-height: 1.07em; }
.tl--grad {
  background: linear-gradient(135deg, #e060d8, #9b4dca);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  font-style: italic;
}
@keyframes curBlink { 0%,100%{opacity:1;} 50%{opacity:0;} }

.hero-v2__sub {
  font-size: clamp(14px, 1.5vw, 16px); color: #777; font-weight: 500;
  line-height: 1.8; max-width: 420px; margin-bottom: 32px;
  opacity: 0; transform: translateY(14px);
  transition: opacity 0.7s cubic-bezier(.22,.68,0,1.2), transform 0.7s cubic-bezier(.22,.68,0,1.2);
}
.hero-v2__sub--in { opacity: 1; transform: translateY(0); }

.hero-v2__ctas {
  display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; margin-bottom: 40px;
  opacity: 0; transform: translateY(12px);
  transition: opacity 0.6s cubic-bezier(.22,.68,0,1.2), transform 0.6s cubic-bezier(.22,.68,0,1.2);
}
.hero-v2__ctas--in { opacity: 1; transform: translateY(0); }

.hero-v2__trust {
  display: flex; align-items: center; gap: 10px;
  opacity: 0; transform: translateY(10px);
  transition: opacity 0.6s cubic-bezier(.22,.68,0,1.2), transform 0.6s cubic-bezier(.22,.68,0,1.2);
}
.hero-v2__trust--in { opacity: 1; transform: translateY(0); }
.trust-avs { display: flex; }
.trust-avs span {
  width: 30px; height: 30px; border-radius: 50%; border: 2.5px solid #faf9f7;
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; font-weight: 700; color: #fff; margin-left: -9px;
}
.trust-avs span:first-child { margin-left: 0; }
.trust-txt { font-size: 12px; font-weight: 600; color: #888; }
.trust-txt strong { color: #333; }

/* Animations */
@keyframes slideInL { to { opacity: 1; transform: translateX(0); } }
@keyframes slideInR { to { opacity: 1; transform: translateX(0); } }
@keyframes growBar { to { transform: scaleY(1); } }
@keyframes livepulse { 0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,0.5);} 50%{box-shadow:0 0 0 5px rgba(34,197,94,0);} }

/* Responsive — hide side cards on small screens */
@media (max-width: 900px) {
  .hero-v2 { grid-template-columns: 1fr; grid-template-rows: auto; padding: 100px 5% 70px; }
  .hside { display: none; }
  .hero-v2__hl { font-size: clamp(34px, 9vw, 56px); min-height: 3.6em; }
}
@media (max-width: 480px) {
  .hero-v2__ctas { flex-direction: column; align-items: center; }
  .btn { width: 100%; text-align: center; }
}
        .heading-lg {
          font-family: 'Syne', sans-serif;
          font-size: clamp(28px, 4vw, 52px);
          font-weight: 800; color: #1A1A1A;
          line-height: 1.1; letter-spacing: -1.5px;
        }
        .heading--white { color: #fff; }

        .body-text { font-size: 15px; line-height: 1.8; color: #666; margin-bottom: 18px; font-weight: 500; }
        @media (min-width: 768px) { .body-text { font-size: 16px; } }

        .text-center { text-align: center; }
        .mb-lg { margin-bottom: 48px; }
        @media (min-width: 768px) { .mb-lg { margin-bottom: 72px; } }

        /* ── BUTTONS ───────────────────────── */
        .btn {
          padding: 14px 28px; border-radius: 100px;
          font-size: 14px; font-weight: 700; cursor: pointer;
          font-family: 'DM Sans', sans-serif; transition: all 0.25s;
          white-space: nowrap; border: none;
        }
        @media (min-width: 480px) { .btn { padding: 16px 36px; font-size: 15px; } }

        .btn--primary {
          background: #ff6ce7; color: #fff;
          box-shadow: 0 8px 32px rgba(109,191,62,0.38);
        }
        .btn--primary:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 12px 40px rgba(109,191,62,0.5);
        }
        .btn--outline {
          background: transparent; color: #1A1A1A;
          border: 2px solid #D0D0D0;
        }
        .btn--outline:hover { border-color: #ff6ce7; color: #ff6ce7; }

        .btn--ghost {
          background: transparent; color: rgba(255,255,255,0.7);
          border: 1.5px solid rgba(255,255,255,0.2);
        }
        .btn--ghost:hover { border-color: rgba(255,255,255,0.5); color: #fff; }

        /* ── NAVBAR ────────────────────────── */
        .navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          transition: all 0.3s;
        }
        .navbar--scrolled {
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(12px);
          box-shadow: 0 2px 24px rgba(0,0,0,0.08);
        }
        .navbar__inner {
          max-width: 1200px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 5%;
        }
        .navbar__logo { display: flex; align-items: center; gap: 10px; }
        .navbar__logo-icon {
          width: 32px; height: 32px; border-radius: 9px;
          background: linear-gradient(135deg, #ff6ce7, #ba3aff);
          display: flex; align-items: center; justify-content: center;
          font-weight: 900; color: #fff; font-size: 16px; flex-shrink: 0;
        }
        .navbar__logo-text {
          font-family: 'Syne', sans-serif; font-weight: 800;
          font-size: 15px; color: #1A1A1A; white-space: nowrap;
        }
        .navbar__links {
          display: none; list-style: none; gap: 36px;
        }
        @media (min-width: 768px) { .navbar__links { display: flex; } }

        .navbar__link {
          font-size: 14px; font-weight: 600; color: #3A3A3A;
          text-decoration: none; transition: color 0.2s;
        }
        .navbar__link:hover { color: #ff6ce7; }

        .navbar__cta {
          display: none;
          padding: 10px 22px; border-radius: 100px;
          background: #1A1A1A; color: #fff; border: none;
          font-size: 13px; font-weight: 700; cursor: pointer;
          transition: all 0.25s; font-family: 'DM Sans', sans-serif;
        }
        @media (min-width: 768px) { .navbar__cta { display: block; } }
        .navbar__cta:hover { background: #ff6ce7; }

        .navbar__cta--mobile {
          display: block; width: 100%; margin-top: 8px;
          padding: 14px; text-align: center; border-radius: 12px;
          background: #1A1A1A; color: #fff; border: none;
          font-size: 15px; font-weight: 700; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
        }

        .navbar__hamburger {
          display: flex; flex-direction: column; gap: 5px;
          background: none; border: none; cursor: pointer; padding: 4px;
        }
        @media (min-width: 768px) { .navbar__hamburger { display: none; } }

        .navbar__hamburger-line {
          display: block; width: 24px; height: 2px;
          background: #1A1A1A; border-radius: 2px;
          transition: all 0.3s;
        }
        .navbar__hamburger-line.open:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .navbar__hamburger-line.open:nth-child(2) { opacity: 0; }
        .navbar__hamburger-line.open:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        .navbar__mobile-menu {
          display: flex; flex-direction: column; gap: 4px;
          background: #fff; padding: 0 5%;
          max-height: 0; overflow: hidden;
          transition: all 0.4s cubic-bezier(.22,.68,0,1.2);
          border-top: 1px solid transparent;
        }
        .navbar__mobile-menu--open {
          max-height: 400px; padding: 16px 5% 24px;
          border-top-color: #EAE6E0;
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
        }
        .navbar__mobile-link {
          font-size: 17px; font-weight: 600; color: #1A1A1A;
          text-decoration: none; padding: 10px 0;
          border-bottom: 1px solid #F0EDE8;
          transition: color 0.2s;
        }
        .navbar__mobile-link:hover { color: #ff6ce7; }

        /* ── HERO ──────────────────────────── */
        .hero {
          min-height: 100vh;
          background: linear-gradient(160deg, #FAFAF7 0%, #F0F7E8 50%, #FAFAF7 100%);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 120px 5% 60px;
          position: relative; overflow: hidden;
          text-align: center;
        }
        .hero__blob {
          position: absolute; border-radius: 50%; pointer-events: none;
        }
        .hero__blob--tr {
          top: 10%; right: 8%; width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(109,191,62,0.14) 0%, transparent 70%);
        }
        .hero__blob--bl {
          bottom: 5%; left: 3%; width: 220px; height: 220px;
          background: radial-gradient(circle, rgba(109,191,62,0.1) 0%, transparent 70%);
        }
        @media (min-width: 768px) {
          .hero__blob--tr { width: 420px; height: 420px; }
          .hero__blob--bl { width: 300px; height: 300px; }
        }

        .hero__badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: #fff; border: 1.5px solid #D6EFC0;
          border-radius: 100px; padding: 7px 18px; margin-bottom: 28px;
          box-shadow: 0 2px 16px rgba(109,191,62,0.12);
          opacity: 0; transform: translateY(20px);
          transition: all 0.7s cubic-bezier(.22,.68,0,1.2);
          font-size: 12px; font-weight: 700; color: #b774db; letter-spacing: 0.4px;
          position: relative; z-index: 1;
        }
        @media (min-width: 480px) { .hero__badge { font-size: 13px; } }
        .hero__badge--in { opacity: 1; transform: translateY(0); }
        .hero__badge-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #ff6ce7; display: inline-block;
          animation: pulse 2s infinite; flex-shrink: 0;
        }

        .hero__headline {
          font-family: 'Syne', sans-serif;
          font-size: clamp(38px, 7vw, 88px);
          font-weight: 800; line-height: 1.05;
          color: #141414; letter-spacing: -2px;
          max-width: 960px; margin-bottom: 24px;
          opacity: 0; transform: translateY(30px);
          transition: all 0.8s cubic-bezier(.22,.68,0,1.2) 0.1s;
          position: relative; z-index: 1;
        }
        .hero__headline--in { opacity: 1; transform: translateY(0); }

        .hero__sub {
          font-size: clamp(14px, 1.8vw, 19px); color: #5A5A5A;
          max-width: 560px; line-height: 1.7; font-weight: 500;
          margin-bottom: 40px;
          opacity: 0; transform: translateY(20px);
          transition: all 0.8s cubic-bezier(.22,.68,0,1.2) 0.22s;
          position: relative; z-index: 1;
        }
        .hero__sub--in { opacity: 1; transform: translateY(0); }

        .hero__ctas {
          display: flex; gap: 12px; flex-wrap: wrap;
          justify-content: center; margin-bottom: 56px;
          opacity: 0; transform: translateY(20px);
          transition: all 0.8s cubic-bezier(.22,.68,0,1.2) 0.32s;
          position: relative; z-index: 1;
        }
        .hero__ctas--in { opacity: 1; transform: translateY(0); }

        /* Hero image grid */
        .hero__grid {
          width: 100%; max-width: 1100px;
          display: grid; gap: 10px; border-radius: 20px; overflow: hidden;
          opacity: 0; transform: translateY(40px);
          transition: all 1s cubic-bezier(.22,.68,0,1.2) 0.45s;
          /* Mobile: 2 cols, 3 rows */
          grid-template-columns: 1.4fr 1fr;
          grid-template-rows: 180px 120px 120px;
        }
        .hero__grid--in { opacity: 1; transform: translateY(0); }
        
        @media (min-width: 640px) {
          .hero__grid {
            grid-template-columns: 1.4fr 1fr 1fr;
            grid-template-rows: 240px 180px;
          }
        }

        .hero__grid-main {
          position: relative; border-radius: 16px; overflow: hidden;
          /* Mobile: spans both rows in col 1 */
          grid-row: 1 / 3;
        }
        @media (max-width: 639px) {
          .hero__grid-main { grid-row: 1 / 3; grid-column: 1; }
          .hero__grid-img--sm:nth-child(2) { grid-column: 2; grid-row: 1; }
          .hero__grid-stat { grid-column: 2; grid-row: 2; }
          .hero__grid-img--sm:nth-child(4) { grid-column: 1; grid-row: 3; }
          .hero__grid-img--sm:nth-child(5) { grid-column: 2; grid-row: 3; }
        }

        .hero__grid-img {
          width: 100%; height: 100%; object-fit: cover;
          display: block; transition: transform 0.6s;
          border-radius: 16px;
        }
        .hero__grid-img:hover { transform: scale(1.04); }
        .hero__grid-img--sm { border-radius: 16px; overflow: hidden; }

        .hero__grid-caption {
          position: absolute; bottom: 14px; left: 14px;
          background: rgba(255,255,255,0.92); border-radius: 10px;
          padding: 8px 12px; backdrop-filter: blur(8px);
        }
        .hero__grid-stat {
          border-radius: 16px; overflow: hidden;
          background: linear-gradient(135deg, #ff6ce7, #ba3aff);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 16px;
        }

        /* ── STATS ─────────────────────────── */
        .stats {
          background: #1A1A1A;
          padding: 48px 5%;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0;
        }
        @media (min-width: 640px) {
          .stats { grid-template-columns: repeat(4, 1fr); padding: 60px 5%; }
        }

        .stats__item {
          text-align: center; padding: 20px 16px;
          opacity: 0; transform: translateY(24px);
          transition: all 0.7s cubic-bezier(.22,.68,0,1.2);
        }
        /* borders: right on col 1, bottom on row 1 for 2-col mobile */
        @media (max-width: 639px) {
          .stats__item:nth-child(1),
          .stats__item:nth-child(3) { border-right: 1px solid rgba(255,255,255,0.1); }
          .stats__item:nth-child(1),
          .stats__item:nth-child(2) { border-bottom: 1px solid rgba(255,255,255,0.1); }
        }
        @media (min-width: 640px) {
          .stats__item:not(:last-child) { border-right: 1px solid rgba(255,255,255,0.1); }
        }
        .stats__item--in { opacity: 1; transform: translateY(0); }

        .stats__value {
          font-family: 'Syne', sans-serif;
          font-size: clamp(32px, 4vw, 56px);
          font-weight: 800; color: #ff6ce7; line-height: 1;
        }
        .stats__label {
          font-size: 12px; color: rgba(255,255,255,0.55);
          margin-top: 8px; font-weight: 600;
          letter-spacing: 0.5px; text-transform: uppercase;
        }

        /* ── SERVICES ──────────────────────── */
        .services__header {
          display: flex; flex-direction: column;
          gap: 24px; margin-bottom: 48px;
        }
        @media (min-width: 768px) {
          .services__header {
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-end;
            margin-bottom: 72px;
          }
        }
        .services__header-left { flex-shrink: 0; }
        .services__header-desc {
          max-width: 360px; color: #666; line-height: 1.8;
          font-size: 14px; font-weight: 500;
          opacity: 0; transition: all 0.7s ease 0.15s;
        }
        @media (min-width: 768px) { .services__header-desc { font-size: 15px; } }

        .services__grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
        }
        @media (min-width: 480px) {
          .services__grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 900px) {
          .services__grid { grid-template-columns: repeat(3, 1fr); gap: 20px; }
        }

        .service-card {
          background: #fff; border: 1.5px solid #EAE6E0;
          border-radius: 20px; padding: 28px 24px;
          transition: all 0.35s cubic-bezier(.22,.68,0,1.2);
          cursor: default;
          opacity: 0; transform: translateY(32px);
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
        }
        @media (min-width: 768px) { .service-card { padding: 36px 32px; } }
        .service-card--in { opacity: 1; transform: translateY(0); }
        .service-card--hov {
          background: #1A1A1A; border-color: #ff6ce7;
          box-shadow: 0 20px 60px rgba(0,0,0,0.18);
        }
        .service-card__top {
          display: flex; justify-content: space-between;
          align-items: flex-start; margin-bottom: 20px;
        }
        .service-card__icon { font-size: 26px; color: #ff6ce7; }
        .service-card__tag {
          font-size: 11px; font-weight: 800;
          color: #CCC; letter-spacing: 1px;
        }
        .service-card--hov .service-card__tag { color: rgba(255,255,255,0.3); }
        .service-card__title {
          font-family: 'Syne', sans-serif; font-size: 18px;
          font-weight: 800; color: #1A1A1A;
          margin-bottom: 12px; letter-spacing: -0.3px;
          transition: color 0.3s;
        }
        .service-card--hov .service-card__title { color: #fff; }
        .service-card__desc {
          font-size: 13px; line-height: 1.75; color: #777;
          transition: color 0.3s; font-weight: 500;
        }
        @media (min-width: 768px) { .service-card__desc { font-size: 14px; } }
        .service-card--hov .service-card__desc { color: rgba(255,255,255,0.65); }
        .service-card__link {
          margin-top: 24px; font-size: 13px; font-weight: 700;
          color: #1A1A1A; display: flex; align-items: center; gap: 6px;
          transition: color 0.3s;
        }
        .service-card--hov .service-card__link { color: #ff6ce7; }
        .service-card__arrow { transition: transform 0.3s; display: inline-block; }
        .service-card__arrow--hov { transform: translateX(4px); }

        /* Fade-in utility */
        .fade-in { opacity: 0; transform: translateY(24px); transition: all 0.7s ease; }
        .fade-in--delay { transition-delay: 0.15s; }

        /* ── WORK ──────────────────────────── */
        .work__grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 640px) {
          .work__grid { grid-template-columns: repeat(2, 1fr); gap: 24px; }
        }

        .work-card {
          border-radius: 20px; overflow: hidden;
          position: relative; height: 260px; cursor: pointer;
          opacity: 0; transform: translateY(40px);
          transition: all 0.7s cubic-bezier(.22,.68,0,1.2);
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }
        @media (min-width: 480px) { .work-card { height: 300px; } }
        @media (min-width: 768px) { .work-card { height: 340px; border-radius: 24px; } }
        .work-card--in { opacity: 1; transform: translateY(0); }
        .work-card--hov { box-shadow: 0 24px 64px rgba(0,0,0,0.22); }

        .work-card__img {
          width: 100%; height: 100%; object-fit: cover;
          display: block; transition: transform 0.6s;
        }
        .work-card__img--hov { transform: scale(1.07); }
        .work-card__overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 60%);
          transition: background 0.4s;
        }
        .work-card__overlay--hov {
          background: linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.2) 60%, transparent 100%);
        }
        .work-card__content {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 20px 24px;
        }
        @media (min-width: 768px) { .work-card__content { padding: 28px 32px; } }
        .work-card__category {
          font-size: 10px; font-weight: 800; color: #ba3aff;
          letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 6px;
        }
        @media (min-width: 480px) { .work-card__category { font-size: 11px; } }
        .work-card__bottom {
          display: flex; justify-content: space-between; align-items: flex-end; gap: 8px;
        }
        .work-card__client {
          font-family: 'Syne', sans-serif; font-size: 20px;
          font-weight: 800; color: #fff; letter-spacing: -0.5px;
        }
        @media (min-width: 768px) { .work-card__client { font-size: 24px; } }
        .work-card__result {
          background: #ff6ce7; color: #fff;
          padding: 6px 12px; border-radius: 100px;
          font-size: 11px; font-weight: 800; flex-shrink: 0;
          opacity: 0; transform: translateY(8px);
          transition: all 0.3s;
        }
        @media (min-width: 480px) { .work-card__result { padding: 7px 16px; font-size: 13px; } }
        .work-card__result--hov { opacity: 1; transform: translateY(0); }

        /* ── ABOUT ─────────────────────────── */
        .about__grid {
          display: grid; grid-template-columns: 1fr;
          gap: 48px; align-items: center;
        }
        @media (min-width: 900px) {
          .about__grid { grid-template-columns: 1fr 1fr; gap: 80px; }
        }

        .about__images {
          position: relative; height: 380px;
          opacity: 0; transform: translateX(-40px);
          transition: all 0.9s cubic-bezier(.22,.68,0,1.2);
        }
        @media (min-width: 480px) { .about__images { height: 460px; } }
        @media (min-width: 768px) { .about__images { height: 540px; } }
        .about__images--in { opacity: 1; transform: translateX(0); }

        .about__img-main {
          position: absolute; top: 0; left: 0;
          width: 78%; height: 72%;
          object-fit: cover; border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.14);
        }
        @media (min-width: 640px) { .about__img-main { border-radius: 24px; } }

        .about__img-second {
          position: absolute; bottom: 0; right: 0;
          width: 52%; height: 48%;
          object-fit: cover; border-radius: 16px;
          box-shadow: 0 16px 48px rgba(0,0,0,0.16);
          border: 4px solid #fff;
        }
        @media (min-width: 640px) { .about__img-second { border: 5px solid #fff; border-radius: 20px; } }

        .about__badge {
          position: absolute; top: 40%; right: 8%;
          background: #ff6ce7; border-radius: 14px; padding: 16px 20px;
          box-shadow: 0 12px 40px rgba(109,191,62,0.45);
        }

        .about__text {
          opacity: 0; transform: translateX(40px);
          transition: all 0.9s cubic-bezier(.22,.68,0,1.2) 0.15s;
        }
        .about__text--in { opacity: 1; transform: translateX(0); }
        .about__text .heading-lg { margin-bottom: 20px; margin-top: 8px; }

        .about__pillars {
          display: flex; flex-direction: column; gap: 16px; margin-top: 32px;
        }
        @media (min-width: 480px) {
          .about__pillars { flex-direction: row; flex-wrap: wrap; gap: 20px; }
        }

        .pillar { display: flex; gap: 12px; align-items: flex-start; }
        .pillar__dot {
          width: 20px; height: 20px; border-radius: 50%;
          background: #E8F7D8; border: 2px solid #ff6ce7;
          flex-shrink: 0; margin-top: 2px;
        }
        .pillar__title { font-size: 14px; font-weight: 800; color: #1A1A1A; }
        .pillar__sub { font-size: 13px; color: #888; margin-top: 2px; font-weight: 500; }

       /* ── CLIENTS CAROUSEL ──────────────────── */
.clients {
  padding: 60px 0;
  background: #FAFAF7;
  border-top: 1px solid #EAE6E0;
  border-bottom: 1px solid #EAE6E0;
  overflow: hidden;
}
@media (min-width: 768px) { .clients { padding: 80px 0; } }

.clients__label {
  text-align: center; font-size: 11px; font-weight: 800;
  color: #AAA; letter-spacing: 2.5px; text-transform: uppercase;
  margin-bottom: 36px;
}

@keyframes marquee {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.carousel {
  position: relative;
  width: 100%;
  overflow: hidden;
  /* fade edges */
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 8%,
    black 92%,
    transparent 100%
  );
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 8%,
    black 92%,
    transparent 100%
  );
}

.carousel__track {
  display: flex;
  align-items: center;
  gap: 0;
  width: max-content;
  animation: marquee 22s linear infinite;
}

.carousel__track:hover {
  animation-play-state: paused;
}

.carousel__item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 40px;
  transition: opacity 0.3s, filter 0.3s;
  flex-shrink: 0;
}

.carousel__item:hover {
  opacity: 1;
  filter: grayscale(0);
}

        /* ── TESTIMONIALS ──────────────────── */
        .testimonial {
          background: #F7F4EF; border-radius: 24px;
          padding: 40px 28px; margin-bottom: 32px;
          position: relative; text-align: left;
          opacity: 0; transform: translateY(32px);
          transition: all 0.8s cubic-bezier(.22,.68,0,1.2);
          box-shadow: 0 4px 40px rgba(0,0,0,0.06);
        }
        @media (min-width: 640px) { .testimonial { padding: 56px 64px; border-radius: 28px; } }
        .testimonial--in { opacity: 1; transform: translateY(0); }

        .testimonial__quote-mark {
          font-size: 72px; color: #ff6ce7; line-height: 0.6;
          margin-bottom: 28px; font-family: Georgia, serif; opacity: 0.4;
        }
        .testimonial__text {
          font-size: clamp(15px, 2vw, 22px); line-height: 1.7;
          color: #2C2C2C; font-weight: 500; font-style: italic;
          margin-bottom: 28px;
        }
        .testimonial__author {
          display: flex; align-items: center; gap: 14px;
          justify-content: flex-start;
        }
        .testimonial__avatar {
          width: 44px; height: 44px; border-radius: 50%;
          object-fit: cover; border: 3px solid #ff6ce7; flex-shrink: 0;
        }
        @media (min-width: 640px) { .testimonial__avatar { width: 48px; height: 48px; } }
        .testimonial__name { font-weight: 800; font-size: 14px; color: #1A1A1A; }
        @media (min-width: 480px) { .testimonial__name { font-size: 15px; } }
        .testimonial__role { font-size: 13px; color: #888; font-weight: 500; }

        .testimonial__dots {
          display: flex; gap: 10px; justify-content: center;
        }
        .testimonial__dot {
          height: 10px; width: 10px; border-radius: 100px;
          background: #DDD; border: none; cursor: pointer;
          transition: all 0.3s;
        }
        .testimonial__dot--active { width: 28px; background: #ff6ce7; }

        /* ── CTA ───────────────────────────── */
        .cta-block {
          background: linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%);
          border-radius: 24px; padding: 48px 32px;
          display: flex; flex-direction: column; gap: 32px;
          position: relative; overflow: hidden;
          opacity: 0; transform: translateY(40px);
          transition: all 0.9s cubic-bezier(.22,.68,0,1.2);
        }
        @media (min-width: 640px) { .cta-block { padding: 64px 64px; border-radius: 28px; } }
        @media (min-width: 900px) {
          .cta-block {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding: 80px 80px; border-radius: 32px;
            gap: 60px;
          }
        }
        .cta-block--in { opacity: 1; transform: translateY(0); }

        .cta-block__glow {
          position: absolute; top: -40%; right: 20%;
          width: 400px; height: 400px; border-radius: 50%;
          background: radial-gradient(circle, rgba(109,191,62,0.15) 0%, transparent 70%);
          pointer-events: none;
        }
        .cta-block__text { position: relative; z-index: 1; }
        .cta-block__text .heading-lg { margin: 8px 0 0; }
        .cta-block__actions {
          display: flex; flex-direction: column; gap: 12px;
          flex-shrink: 0; position: relative; z-index: 1;
        }
        @media (min-width: 480px) {
          .cta-block__actions { flex-direction: row; }
        }
        @media (min-width: 900px) {
          .cta-block__actions { flex-direction: column; }
        }

        /* ── FOOTER ────────────────────────── */
        .footer { background: #111; padding: 48px 0 28px; }
        @media (min-width: 768px) { .footer { padding: 60px 0 32px; } }

        .footer__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 36px; margin-bottom: 48px;
        }
        @media (min-width: 640px) {
          .footer__grid { grid-template-columns: 1fr 1fr 1fr; }
        }
        @media (min-width: 900px) {
          .footer__grid { grid-template-columns: 1.8fr 1fr 1fr 1fr; gap: 48px; }
        }

        .footer__brand { grid-column: 1 / -1; }
        @media (min-width: 640px) { .footer__brand { grid-column: 1; } }

        .footer__logo {
          display: flex; align-items: center; gap: 10px; margin-bottom: 14px;
        }
        .footer__logo-icon {
          width: 32px; height: 32px; border-radius: 9px;
          background: linear-gradient(135deg, #ff6ce7, #ba3aff);
          display: flex; align-items: center; justify-content: center;
          font-weight: 900; color: #fff; font-size: 16px; flex-shrink: 0;
        }
        .footer__logo-text {
          font-family: 'Syne', sans-serif; font-weight: 800;
          font-size: 15px; color: #fff;
        }
        .footer__tagline {
          font-size: 13px; color: rgba(255,255,255,0.4);
          line-height: 1.8; font-weight: 500; max-width: 260px;
        }
        .footer__col-title {
          font-size: 11px; font-weight: 800; color: #ff6ce7;
          letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 14px;
        }
        .footer__col-item {
          font-size: 13px; color: rgba(255,255,255,0.4);
          margin-bottom: 9px; cursor: pointer; font-weight: 500;
          transition: color 0.2s;
        }
        .footer__col-item:hover { color: #fff; }
        .footer__bottom {
          border-top: 1px solid rgba(255,255,255,0.08);
          padding-top: 24px; display: flex;
          flex-direction: column; gap: 8px;
          font-size: 12px; color: rgba(255,255,255,0.3); font-weight: 500;
        }
        @media (min-width: 640px) {
          .footer__bottom {
            flex-direction: row;
            justify-content: space-between; align-items: center;
            font-size: 13px;
          }
        }
      `}</style>
      <Navbar />
      <HeroSection />
      <StatsBar />
      <ServicesSection />
      {/* <WorkSection /> */}
      <AboutSection />
      {/* <EmployeesSection /> */}
      <ClientsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </>
  );
}
