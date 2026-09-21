"use client";

import { useState, useEffect, useRef, type RefObject } from "react";
import Navbar from "@/app/components/Navbar";

/* ─── DATA ──────────────────────────────── */
interface TeamMember {
  name: string;
  role: string;
  img: string;
  quote: string;
}

interface Value {
  icon: string;
  title: string;
  desc: string;
}

interface Milestone {
  year: string;
  event: string;
}

interface CultureImg {
  src: string;
  label: string;
  tall: boolean;
}

const TEAM: TeamMember[] = [
  {
    name: "Aryan Kapoor",
    role: "Founder & CEO",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=85",
    quote: "Strategy is the soul of every campaign we build.",
  },
  {
    name: "Meera Nair",
    role: "Chief Creative Officer",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=85",
    quote: "Great design earns attention before words can.",
  },
  {
    name: "Rohit Desai",
    role: "Head of Performance",
    img: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&q=85",
    quote: "Every rupee should compound. That's the only goal.",
  },
  {
    name: "Sneha Iyer",
    role: "Director of Strategy",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=85",
    quote: "We don't guess. We test, learn, and scale.",
  },
];

const VALUES: Value[] = [
  {
    icon: "◈",
    title: "Transparency",
    desc: "Clear communication, visible progress, and complete clarity at every stage of your product development.",
  },
  {
    icon: "✦",
    title: "Innovation",
    desc: "We embrace AI and emerging technologies to create intelligent, future-ready solutions that move your business forward.",
  },
  {
    icon: "❋",
    title: "Accountability",
    desc: "We take ownership from idea to launch, delivering reliable solutions, measurable progress, and results that matter.",
  },
  {
    icon: "⬡",
    title: "Partnership",
    desc: "We work as an extension of your team, combining your vision with our technology expertise to build what matters.",
  },
];

const MILESTONES: Milestone[] = [
  {
    year: "Discovery Call",
    event:
      "We understand your business, goals, users, challenges, and the problem your product needs to solve.",
  },
  {
    year: "Strategy Blueprint",
    event:
      "We define the product roadmap, features, technology stack, AI opportunities, and development approach.",
  },
  {
    year: "UX & Architecture",
    event:
      "We design intuitive user experiences and build a scalable technical architecture for your application or product.",
  },
  {
    year: "Build & Launch",
    event:
      "COur team develops, integrates, tests, and launches your AI application, software, or SaaS product.",
  },
  {
    year: "Optimization & Scaling",
    event:
      "We monitor performance, improve features, optimize AI capabilities, and scale your product as it grows.",
  },
  {
    year: "Support & Growth",
    event:
      "We provide continuous improvements, technical support, new features, and strategies to help your product evolve.",
  },
];

const CULTURE_IMGS: CultureImg[] = [
  {
    src: "/about/Strategy Sprints.jpeg",
    label: "Aman Singh Rajpoot, CTO",
    tall: true,
  },
  { src: "/about/kiwi2.jpeg", label: "Vaishali Singh , CEO", tall: false },
  { src: "/about/kiwi3.jpeg", label: "Strength", tall: false },
  { src: "/about/kiwi4.jpeg", label: "Kalpana Banwari , CMO", tall: false },
  { src: "/about/office3.jpeg", label: "Founders", tall: false },
];

/* ─── HOOK ──────────────────────────────── */
// Returns a properly typed tuple so TypeScript is happy with ref={ref} on any HTMLElement.
function useInView<T extends HTMLElement = HTMLElement>(
  threshold = 0.1,
): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView];
}

/* ─── HERO ──────────────────────────────── */
function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(155deg,#FAFAF7 0%,#EEF7E4 55%,#FAFAF7 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "130px 5% 80px",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "8%",
          left: "-5%",
          width: "min(500px,60vw)",
          height: "min(500px,60vw)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(109,191,62,0.1) 0%,transparent 65%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "5%",
          right: "-4%",
          width: "min(380px,50vw)",
          height: "min(380px,50vw)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(109,191,62,0.08) 0%,transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.7s cubic-bezier(.22,.68,0,1.2)",
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: "#fff",
          border: "1.5px solid #C8EBAA",
          borderRadius: 100,
          padding: "7px 20px",
          marginBottom: 32,
          boxShadow: "0 2px 16px rgba(109,191,62,0.1)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <span
          style={{
            fontSize: 12,
            fontWeight: 800,
            color: "#b774db",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
          }}
        >
          Our Story
        </span>
      </div>

      <h1
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(28px)",
          transition: "all 0.8s cubic-bezier(.22,.68,0,1.2) 0.1s",
          fontFamily: "'Syne',sans-serif",
          fontSize: "clamp(38px,7vw,96px)",
          fontWeight: 800,
          lineHeight: 1.04,
          letterSpacing: "-3px",
          color: "#141414",
          maxWidth: 960,
          marginBottom: 26,
          position: "relative",
          zIndex: 1,
        }}
      >
        Every idea has
        <br />a{" "}
        <em style={{ fontStyle: "italic", color: "#ff6ce7" }}>
          potential.
        </em>{" "}
        Ours
        <br />
        began with yours.
      </h1>

      <p
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(18px)",
          transition: "all 0.8s cubic-bezier(.22,.68,0,1.2) 0.22s",
          fontSize: "clamp(15px,1.7vw,20px)",
          color: "#5C5C5C",
          maxWidth: 580,
          lineHeight: 1.75,
          fontWeight: 500,
          marginBottom: 52,
          position: "relative",
          zIndex: 1,
        }}
      >
        We are a team of developers, AI specialists, designers, and
        problem-solvers building intelligent digital products that help
        businesses innovate, automate, and scale..
      </p>

      <div
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(40px)",
          transition: "all 1s cubic-bezier(.22,.68,0,1.2) 0.38s",
          position: "relative",
          width: "100%",
          maxWidth: 1100,
        }}
      >
        {/* Mobile layout */}
        <div className="hero-image-mobile">
          <div
            style={{
              borderRadius: 22,
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(0,0,0,0.14)",
              position: "relative",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/about/office.jpeg"
              alt="Team"
              style={{
                width: "100%",
                height: 280,
                objectFit: "cover",
                display: "block",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top,rgba(0,0,0,0.45) 0%,transparent 55%)",
              }}
            />
            <div style={{ position: "absolute", bottom: 18, left: 18 }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: "#ba3aff",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                }}
              >
                Est. 2024
              </div>
              <div
                style={{
                  fontFamily: "'Syne',sans-serif",
                  fontSize: 18,
                  fontWeight: 800,
                  color: "#fff",
                }}
              >
                Bhopal, India
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: 12,
              marginTop: 14,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                background: "#fff",
                borderRadius: 14,
                padding: "13px 18px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                display: "flex",
                gap: 12,
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background: "#E8F7D8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                }}
              >
                🏆
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "'Syne',sans-serif",
                    fontSize: 20,
                    fontWeight: 800,
                    color: "#1A1A1A",
                    lineHeight: 1,
                  }}
                >
                  70+
                </div>
                <div style={{ fontSize: 11, color: "#888", fontWeight: 600 }}>
                  Brands Scaled
                </div>
              </div>
            </div>
            <div
              style={{
                background: "#ff6ce7",
                borderRadius: 14,
                padding: "13px 18px",
                boxShadow: "0 8px 32px rgba(109,191,62,0.35)",
                display: "flex",
                gap: 12,
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "'Syne',sans-serif",
                  fontSize: 20,
                  fontWeight: 800,
                  color: "#fff",
                  lineHeight: 1,
                }}
              >
                5 yrs
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "rgba(255,255,255,0.85)",
                  fontWeight: 600,
                }}
              >
                of Expertise
              </div>
            </div>
          </div>
        </div>

        {/* Desktop layout */}
        <div
          className="hero-image-desktop"
          style={{ position: "relative", height: 480 }}
        >
          <div
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              top: 0,
              width: "44%",
              height: "100%",
              borderRadius: 28,
              overflow: "hidden",
              boxShadow: "0 24px 72px rgba(0,0,0,0.14)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/about/office.jpeg"
              alt="Team"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top,rgba(0,0,0,0.45) 0%,transparent 55%)",
              }}
            />
            <div style={{ position: "absolute", bottom: 24, left: 24 }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  color: "#ba3aff",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                }}
              >
                Est. 2024
              </div>
              <div
                style={{
                  fontFamily: "'Syne',sans-serif",
                  fontSize: 20,
                  fontWeight: 800,
                  color: "#fff",
                }}
              >
                Bhopal, India
              </div>
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              left: "2%",
              top: "10%",
              width: "28%",
              height: "72%",
              borderRadius: 22,
              overflow: "hidden",
              boxShadow: "0 16px 48px rgba(0,0,0,0.12)",
              transform: "rotate(-2deg)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/about/office3.jpeg"
              alt="Strategy"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              right: "2%",
              top: "8%",
              width: "26%",
              height: "68%",
              borderRadius: 22,
              overflow: "hidden",
              boxShadow: "0 16px 48px rgba(0,0,0,0.12)",
              transform: "rotate(1.5deg)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/about/office2.jpeg"
              alt="Creative"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              left: "6%",
              bottom: "2%",
              background: "#fff",
              borderRadius: 16,
              padding: "14px 18px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
              display: "flex",
              gap: 12,
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 11,
                background: "#E8F7D8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
              }}
            >
              🏆
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'Syne',sans-serif",
                  fontSize: 20,
                  fontWeight: 800,
                  color: "#1A1A1A",
                  lineHeight: 1,
                }}
              >
                70+
              </div>
              <div style={{ fontSize: 12, color: "#888", fontWeight: 600 }}>
                Brands Scaled
              </div>
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              right: "6%",
              bottom: "2%",
              background: "#ff6ce7",
              borderRadius: 16,
              padding: "14px 18px",
              boxShadow: "0 8px 32px rgba(109,191,62,0.35)",
              display: "flex",
              gap: 12,
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontFamily: "'Syne',sans-serif",
                fontSize: 20,
                fontWeight: 800,
                color: "#fff",
                lineHeight: 1,
              }}
            >
              5 yrs
            </div>
            <div
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.85)",
                fontWeight: 600,
              }}
            >
              of Expertise
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── MISSION + VISION ──────────────────── */
function MissionVision() {
  const [ref, inView] = useInView<HTMLElement>();
  return (
    <section ref={ref} style={{ padding: "80px 5%", background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="mv-grid">
          <div
            style={{
              background: "#1A1A1A",
              borderRadius: 26,
              padding: "clamp(36px,5vw,60px) clamp(28px,4vw,52px)",
              position: "relative",
              overflow: "hidden",
              opacity: inView ? 1 : 0,
              transform: inView ? "translateX(0)" : "translateX(-40px)",
              transition: "all 0.85s cubic-bezier(.22,.68,0,1.2)",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-30%",
                right: "-10%",
                width: 300,
                height: 300,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle,rgba(109,191,62,0.18) 0%,transparent 70%)",
              }}
            />
            <div
              style={{
                fontSize: 10,
                fontWeight: 800,
                color: "#ff6ce7",
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                marginBottom: 18,
                position: "relative",
              }}
            >
              Our Mission
            </div>
            <div style={{ fontSize: 48, marginBottom: 20, lineHeight: 1 }}>
              🎯
            </div>
            <h2
              style={{
                fontFamily: "'Syne',sans-serif",
                fontSize: "clamp(22px,2.8vw,36px)",
                fontWeight: 800,
                color: "#fff",
                lineHeight: 1.2,
                marginBottom: 20,
                letterSpacing: "-0.8px",
              }}
            >
              Making powerful technology{" "}
              <em style={{ fontStyle: "italic", color: "#ba3aff" }}>
                accessible
              </em>{" "}
              to every business.
            </h2>
            <p
              style={{
                fontSize: 14,
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.85,
                fontWeight: 500,
              }}
            >
              Our mission is to make AI and advanced technology accessible to businesses of every size. We build intelligent applications, custom software, SaaS products, and automation solutions that simplify complex challenges, unlock new opportunities, and help businesses build for the future.
            </p>
          </div>

          <div
            style={{
              background: "linear-gradient(145deg,#F0FAE6,#E4F5D4)",
              borderRadius: 26,
              padding: "clamp(36px,5vw,60px) clamp(28px,4vw,52px)",
              position: "relative",
              overflow: "hidden",
              border: "1.5px solid #C8EBAA",
              opacity: inView ? 1 : 0,
              transform: inView ? "translateX(0)" : "translateX(40px)",
              transition: "all 0.85s cubic-bezier(.22,.68,0,1.2) 0.15s",
            }}
          >
            <div
              style={{
                position: "absolute",
                bottom: "-20%",
                left: "-5%",
                width: 280,
                height: 280,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle,rgba(109,191,62,0.15) 0%,transparent 70%)",
              }}
            />
            <div
              style={{
                fontSize: 10,
                fontWeight: 800,
                color: "#b774db",
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                marginBottom: 18,
              }}
            >
              Our Vision
            </div>
            <div style={{ fontSize: 48, marginBottom: 20, lineHeight: 1 }}>
              🌐
            </div>
            <h2
              style={{
                fontFamily: "'Syne',sans-serif",
                fontSize: "clamp(22px,2.8vw,36px)",
                fontWeight: 800,
                color: "#1A1A1A",
                lineHeight: 1.2,
                marginBottom: 20,
                letterSpacing: "-0.8px",
              }}
            >
              The{" "}
              <em style={{ fontStyle: "italic", color: "#b774db" }}>trusted</em>{" "}
              AI & technology partner for modern businesses.
            </h2>
            <p
              style={{
                fontSize: 14,
                color: "#4A5A3A",
                lineHeight: 1.85,
                fontWeight: 500,
              }}
            >
             To become a trusted global AI and technology partner, recognized for transforming ambitious ideas into intelligent applications, scalable software, and innovative SaaS products. We aim to set new standards in AI, product development, and technology by creating solutions that make businesses smarter, more efficient, and ready for the future.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── TIMELINE ITEM ─────────────────────── */
interface TimelineItemProps {
  m: Milestone;
  i: number;
  inView: boolean;
}

// Extracted so hooks are never called inside a .map() callback
function TimelineItem({ m, i, inView }: TimelineItemProps) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "relative",
        paddingLeft: 32,
        paddingBottom: 36,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateX(0)" : "translateX(24px)",
        transition: `all 0.7s cubic-bezier(.22,.68,0,1.2) ${0.1 + i * 0.1}s`,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: -9,
          top: 4,
          width: 16,
          height: 16,
          borderRadius: "50%",
          background: hov ? "#ff6ce7" : "#fff",
          border: `2px solid ${hov ? "#ff6ce7" : "#CCC"}`,
          transition: "all 0.3s",
          boxShadow: hov ? "0 0 0 5px rgba(109,191,62,0.2)" : "none",
        }}
      />
      <div
        style={{
          fontSize: 11,
          fontWeight: 800,
          color: hov ? "#ff6ce7" : "#AAA",
          letterSpacing: "1.5px",
          marginBottom: 7,
          transition: "color 0.3s",
        }}
      >
        {m.year}
      </div>
      <p
        style={{
          fontSize: 14,
          color: hov ? "#1A1A1A" : "#666",
          lineHeight: 1.7,
          fontWeight: 500,
          transition: "color 0.3s",
        }}
      >
        {m.event}
      </p>
    </div>
  );
}

/* ─── STORY / TIMELINE ──────────────────── */
function StorySection() {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <section style={{ padding: "80px 5%", background: "#FAFAF7" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="story-grid">
          {/* Left text */}
          <div ref={ref}>
            <div
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(24px)",
                transition: "all 0.7s ease",
                marginBottom: 10,
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  color: "#ff6ce7",
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                }}
              >
                Our Story
              </span>
            </div>
            <h2
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(24px)",
                transition: "all 0.75s ease 0.08s",
                fontFamily: "'Syne',sans-serif",
                fontSize: "clamp(28px,3.5vw,50px)",
                fontWeight: 800,
                color: "#1A1A1A",
                lineHeight: 1.1,
                letterSpacing: "-1.5px",
                marginBottom: 24,
              }}
            >
              Built on trust,
              <br />
              driven by{" "}
              <em style={{ fontStyle: "italic", color: "#ff6ce7" }}>
                results.
              </em>
            </h2>
            <div
              style={{
                opacity: inView ? 1 : 0,
                transition: "all 0.8s ease 0.16s",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              {[
                "Every idea has a story — and ours began with a simple belief: technology should be intelligent, accessible, and built to solve real business problems.",
                "What started as a small team with a passion for technology has evolved into an AI and software company building intelligent applications, scalable SaaS products, and custom digital solutions for businesses across industries.",
                "Our journey is built on innovation, technology, and the value we create for our clients. And we're just getting started.",
              ].map((text, i) => (
                <p
                  key={i}
                  style={{
                    fontSize: 15,
                    lineHeight: 1.85,
                    color: "#555",
                    fontWeight: 500,
                  }}
                >
                  {text}
                </p>
              ))}
            </div>
            <div
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(24px)",
                transition: "all 0.9s ease 0.28s",
                marginTop: 36,
                borderRadius: 18,
                overflow: "hidden",
                height: 240,
                position: "relative",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/about/office.jpeg"
                alt="Office"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to right,rgba(0,0,0,0.4) 0%,transparent 60%)",
                }}
              />
              <div style={{ position: "absolute", bottom: 20, left: 20 }}>
                <div
                  style={{
                    fontFamily: "'Syne',sans-serif",
                    fontSize: 17,
                    fontWeight: 800,
                    color: "#fff",
                  }}
                >
                  Our Bhopal Office
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "rgba(255,255,255,0.7)",
                    fontWeight: 500,
                  }}
                >
                  Where every great campaign begins
                </div>
              </div>
            </div>
          </div>

          {/* Right timeline — hooks live in TimelineItem, not in .map() */}
          <div
            style={{
              paddingLeft: 28,
              borderLeft: "2px solid #E2DDD6",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {MILESTONES.map((m, i) => (
              <TimelineItem key={i} m={m} i={i} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── VALUE CARD ────────────────────────── */
interface ValueCardProps {
  v: Value;
  i: number;
  inView: boolean;
}

function ValueCard({ v, i, inView }: ValueCardProps) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "#1A1A1A" : "#F7F4EF",
        borderRadius: 22,
        padding: "clamp(28px,3vw,40px) clamp(22px,2.5vw,30px)",
        transition: "all 0.35s cubic-bezier(.22,.68,0,1.2)",
        cursor: "default",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transitionDelay: `${0.09 * i}s`,
        border: `1.5px solid ${hov ? "#ff6ce7" : "transparent"}`,
        boxShadow: hov ? "0 20px 56px rgba(0,0,0,0.16)" : "none",
      }}
    >
      <div style={{ fontSize: 28, color: "#ff6ce7", marginBottom: 20 }}>
        {v.icon}
      </div>
      <h3
        style={{
          fontFamily: "'Syne',sans-serif",
          fontSize: 19,
          fontWeight: 800,
          color: hov ? "#fff" : "#1A1A1A",
          marginBottom: 12,
          letterSpacing: "-0.3px",
          transition: "color 0.3s",
        }}
      >
        {v.title}
      </h3>
      <p
        style={{
          fontSize: 14,
          lineHeight: 1.8,
          color: hov ? "rgba(255,255,255,0.6)" : "#777",
          transition: "color 0.3s",
          fontWeight: 500,
        }}
      >
        {v.desc}
      </p>
    </div>
  );
}

/* ─── VALUES ────────────────────────────── */
function ValuesSection() {
  const [ref, inView] = useInView<HTMLElement>();
  return (
    <section ref={ref} style={{ padding: "80px 5%", background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            textAlign: "center",
            marginBottom: 56,
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.7s ease",
          }}
        >
          <div
            style={{
              fontSize: 10,
              fontWeight: 800,
              color: "#ff6ce7",
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            What Drives Us
          </div>
          <h2
            style={{
              fontFamily: "'Syne',sans-serif",
              fontSize: "clamp(28px,3.8vw,52px)",
              fontWeight: 800,
              color: "#1A1A1A",
              letterSpacing: "-1.5px",
            }}
          >
            Our core{" "}
            <em style={{ fontStyle: "italic", color: "#ff6ce7" }}>values.</em>
          </h2>
        </div>
        <div className="values-grid">
          {VALUES.map((v, i) => (
            <ValueCard key={i} v={v} i={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── TEAM CARD ─────────────────────────── */
interface TeamCardProps {
  t: TeamMember;
  i: number;
  inView: boolean;
}

function TeamCard({ t, i, inView }: TeamCardProps) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: 20,
        overflow: "hidden",
        background: "#fff",
        boxShadow: hov
          ? "0 20px 60px rgba(0,0,0,0.15)"
          : "0 4px 16px rgba(0,0,0,0.06)",
        transition: "all 0.35s cubic-bezier(.22,.68,0,1.2)",
        transform: hov ? "translateY(-6px)" : "translateY(0)",
        opacity: inView ? 1 : 0,
        transitionDelay: `${0.1 * i}s`,
      }}
    >
      <div style={{ height: 240, overflow: "hidden", position: "relative" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={t.img}
          alt={t.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.6s",
            transform: hov ? "scale(1.07)" : "scale(1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: hov
              ? "linear-gradient(to top,rgba(26,26,26,0.85) 0%,transparent 55%)"
              : "linear-gradient(to top,rgba(0,0,0,0.4) 0%,transparent 55%)",
            transition: "background 0.4s",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 14,
            left: 14,
            right: 14,
            opacity: hov ? 1 : 0,
            transform: hov ? "translateY(0)" : "translateY(10px)",
            transition: "all 0.35s",
            fontSize: 13,
            color: "rgba(255,255,255,0.85)",
            fontStyle: "italic",
            fontWeight: 500,
            lineHeight: 1.6,
          }}
        >
          &ldquo;{t.quote}&rdquo;
        </div>
      </div>
      <div style={{ padding: "17px 20px" }}>
        <div
          style={{
            fontFamily: "'Syne',sans-serif",
            fontSize: 16,
            fontWeight: 800,
            color: "#1A1A1A",
            marginBottom: 3,
          }}
        >
          {t.name}
        </div>
        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: "#ff6ce7",
            letterSpacing: "0.5px",
          }}
        >
          {t.role}
        </div>
      </div>
    </div>
  );
}

/* ─── TEAM ──────────────────────────────── */
// function TeamSection() {
//   const [ref, inView] = useInView<HTMLElement>();
//   return (
//     <section ref={ref} style={{ padding: "80px 5%", background: "#F2F0EA" }}>
//       <div style={{ maxWidth: 1200, margin: "0 auto" }}>
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56, flexWrap: "wrap", gap: 20 }}>
//           <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s ease" }}>
//             <div style={{ fontSize: 10, fontWeight: 800, color: "#ff6ce7", letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 12 }}>The People</div>
//             <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(28px,3.8vw,50px)", fontWeight: 800, color: "#1A1A1A", letterSpacing: "-1.5px", lineHeight: 1.1 }}>
//               Meet the minds<br />behind the <em style={{ fontStyle: "italic", color: "#ff6ce7" }}>magic.</em>
//             </h2>
//           </div>
//           <p style={{ maxWidth: 320, color: "#666", lineHeight: 1.8, fontSize: 14, fontWeight: 500, opacity: inView ? 1 : 0, transition: "all 0.7s ease 0.15s" }}>
//             60+ specialists across strategy, creative, performance, and tech — all united by one goal: your growth.
//           </p>
//         </div>
//         <div className="team-grid">
//           {TEAM.map((t, i) => (
//             <TeamCard key={i} t={t} i={i} inView={inView} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

/* ─── CULTURE ───────────────────────────── */
function CultureSection() {
  const [ref, inView] = useInView<HTMLElement>();
  return (
    <section ref={ref} style={{ padding: "80px 5%", background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            textAlign: "center",
            marginBottom: 44,
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s ease",
          }}
        >
          <div
            style={{
              fontSize: 10,
              fontWeight: 800,
              color: "#ff6ce7",
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Life at Kiwi
          </div>
          <h2
            style={{
              fontFamily: "'Syne',sans-serif",
              fontSize: "clamp(24px,3vw,42px)",
              fontWeight: 800,
              color: "#1A1A1A",
              letterSpacing: "-1px",
            }}
          >
            We work hard. We celebrate harder.
          </h2>
        </div>
        <div
          className="culture-grid"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(32px)",
            transition: "all 0.9s cubic-bezier(.22,.68,0,1.2) 0.1s",
          }}
        >
          {CULTURE_IMGS.map((img, i) => (
            <div
              key={i}
              className={img.tall ? "culture-tall" : ""}
              style={{
                borderRadius: 18,
                overflow: "hidden",
                position: "relative",
                minHeight: 180,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.label}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.5s",
                  display: "block",
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLImageElement>) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLImageElement>) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 12,
                  left: 12,
                  background: "rgba(255,255,255,0.92)",
                  borderRadius: 9,
                  padding: "5px 11px",
                  backdropFilter: "blur(6px)",
                }}
              >
                <span
                  style={{ fontSize: 11, fontWeight: 700, color: "#1A1A1A" }}
                >
                  {img.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ───────────────────────────────── */
function CTASection() {
  const [ref, inView] = useInView<HTMLElement>();
  return (
    <section ref={ref} style={{ padding: "0 5% 80px", background: "#FAFAF7" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          className="cta-block"
          style={{
            background: "linear-gradient(135deg,#ff6ce7 0%,#8a41d0 100%)",
            borderRadius: 28,
            position: "relative",
            overflow: "hidden",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(36px)",
            transition: "all 0.9s cubic-bezier(.22,.68,0,1.2)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-30%",
              right: "20%",
              width: 360,
              height: 360,
              borderRadius: "50%",
              background:
                "radial-gradient(circle,rgba(255,255,255,0.12) 0%,transparent 70%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-40%",
              left: "10%",
              width: 280,
              height: 280,
              borderRadius: "50%",
              background:
                "radial-gradient(circle,rgba(0,0,0,0.08) 0%,transparent 70%)",
            }}
          />
          <div className="cta-inner">
            <div>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  color: "rgba(255,255,255,0.7)",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  marginBottom: 14,
                }}
              >
                Join 340+ brands
              </div>
              <h2
                style={{
                  fontFamily: "'Syne',sans-serif",
                  fontSize: "clamp(26px,3.5vw,46px)",
                  fontWeight: 800,
                  color: "#fff",
                  lineHeight: 1.1,
                  letterSpacing: "-1px",
                  maxWidth: 500,
                }}
              >
                Ready to write your
                <br />
                own growth story?
              </h2>
            </div>
            <div
              style={{
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
                flexShrink: 0,
              }}
            >
              <button
                style={{
                  padding: "16px 36px",
                  borderRadius: 100,
                  background: "#fff",
                  color: "#1A1A1A",
                  border: "none",
                  fontSize: 14,
                  fontWeight: 800,
                  cursor: "pointer",
                  fontFamily: "'DM Sans',sans-serif",
                  boxShadow: "0 8px 28px rgba(0,0,0,0.15)",
                  transition: "all 0.25s",
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.currentTarget.style.transform = "scale(1.04)";
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                Get a Free Audit →
              </button>
              <button
                style={{
                  padding: "16px 36px",
                  borderRadius: 100,
                  background: "transparent",
                  color: "#fff",
                  border: "2px solid rgba(255,255,255,0.5)",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "'DM Sans',sans-serif",
                  transition: "all 0.25s",
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.currentTarget.style.borderColor = "#fff";
                  e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                Meet the Team
              </button>
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
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Logo Image */}
          <img
            src="/kiwilogo.png"
            alt="Kiwi Connect Logo"
            style={{
              width: 32,
              height: 32,
              borderRadius: 9,
              objectFit: "cover",
            }}
          />
          <span
            style={{
              fontFamily: "'Syne',sans-serif",
              fontWeight: 800,
              fontSize: 15,
              color: "#fff",
            }}
          >
            Kiwi Connect <span style={{ color: "#ff6ce7" }}>Digital</span>
          </span>
        </div>
        <div
          style={{
            fontSize: 13,
            color: "rgba(255,255,255,0.3)",
            fontWeight: 500,
            textAlign: "center",
          }}
        >
          © 2026 Kiwi Connect Digital. All rights reserved.
        </div>
        <div
          style={{
            fontSize: 13,
            color: "rgba(255,255,255,0.3)",
            fontWeight: 500,
          }}
        >
          Crafted by KiwiConnect
        </div>
      </div>
    </footer>
  );
}

/* ─── ROOT ──────────────────────────────── */
export default function AboutPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #FAFAF7; font-family: 'DM Sans', sans-serif; }

        .hero-image-mobile { display: block; }
        .hero-image-desktop { display: none; }
        @media (min-width: 860px) {
          .hero-image-mobile { display: none; }
          .hero-image-desktop { display: block; }
        }

        .mv-grid { display: grid; grid-template-columns: 1fr; gap: 20px; }
        @media (min-width: 768px) { .mv-grid { grid-template-columns: 1fr 1fr; gap: 28px; } }

        .story-grid { display: grid; grid-template-columns: 1fr; gap: 48px; align-items: flex-start; }
        @media (min-width: 900px) { .story-grid { grid-template-columns: 1fr 1.1fr; gap: 80px; } }

        .values-grid { display: grid; grid-template-columns: 1fr; gap: 14px; }
        @media (min-width: 480px) { .values-grid { grid-template-columns: repeat(2,1fr); gap: 16px; } }
        @media (min-width: 900px) { .values-grid { grid-template-columns: repeat(4,1fr); gap: 20px; } }

        .team-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 16px; }
        @media (min-width: 960px) { .team-grid { grid-template-columns: repeat(4,1fr); gap: 22px; } }

        .culture-grid { display: grid; grid-template-columns: repeat(2,1fr); grid-auto-rows: 180px; gap: 12px; }
        @media (min-width: 640px) {
          .culture-grid { grid-template-columns: 1.2fr 0.8fr 1fr; grid-template-rows: 220px 220px; gap: 16px; }
          .culture-tall { grid-row: 1 / 3; }
        }

        .cta-inner { padding: clamp(36px,5vw,80px) clamp(24px,5vw,80px); display: flex; flex-direction: column; gap: 28px; position: relative; z-index: 1; }
        @media (min-width: 768px) { .cta-inner { flex-direction: row; justify-content: space-between; align-items: center; gap: 48px; } }
      `}</style>
      <Navbar />
      <HeroSection />
      <MissionVision />
      <StorySection />
      <ValuesSection />
      {/* <TeamSection /> */}
      <CultureSection />
      <CTASection />
      <Footer />
    </>
  );
}
