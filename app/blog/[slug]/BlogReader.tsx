"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";

const WA_NUMBER = "918305959538";
const WA_MESSAGE =
  "Hi! I found you through your blog and would like to discuss my project.";

const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
  WA_MESSAGE
)}`;

interface Blog {
  content: string;
  _id: string;
  title: string;
  description: string;
  category: string;
  author: string;
  slug: string;
  createdAt: string;
}

function RelatedCard({
  blog,
  apiBase,
}: {
  blog: Blog;
  apiBase: string;
}) {
  const [hov, setHov] = useState(false);

  const photoUrl = `${apiBase}/get-blog-photo/${blog._id}`;

  const date = new Date(blog.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Link
      href={`/blog/${blog.slug}`}
      style={{ textDecoration: "none" }}
    >
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          background: "#fff",
          borderRadius: 18,
          overflow: "hidden",
          border: `1.5px solid ${
            hov ? "#ff6ce7" : "#ECE7E1"
          }`,
          transition: "all .3s ease",
          transform: hov
            ? "translateY(-4px)"
            : "translateY(0)",
          boxShadow: hov
            ? "0 12px 40px rgba(255,108,231,0.12)"
            : "0 2px 12px rgba(0,0,0,0.04)",
        }}
      >
        <div
          style={{
            height: 170,
            overflow: "hidden",
            background: "#F5F0EA",
          }}
        >
          <img
            src={photoUrl}
            alt={blog.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform .4s ease",
              transform: hov
                ? "scale(1.05)"
                : "scale(1)",
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                `https://placehold.co/400x200/F2EEE9/888?text=${encodeURIComponent(
                  blog.category
                )}`;
            }}
          />
        </div>

        <div style={{ padding: 18 }}>
          <span
            style={{
              fontSize: 11,
              fontWeight: 800,
              color: "#ff6ce7",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            {blog.category}
          </span>

          <h4
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 15,
              fontWeight: 800,
              color: "#1A1A1A",
              margin: "10px 0",
              lineHeight: 1.5,
            }}
          >
            {blog.title}
          </h4>

          <span
            style={{
              fontSize: 12,
              color: "#999",
              fontWeight: 600,
            }}
          >
            {date}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function BlogReader({
  blog,
  related,
  apiBase,
}: {
  blog: Blog;
  related: Blog[];
  apiBase: string;
}) {
  const [scrollProgress, setScrollProgress] =
    useState(0);

  const [copied, setCopied] = useState(false);

  const [loaded, setLoaded] = useState(false);

  const articleRef = useRef<HTMLElement | null>(
    null
  );

  const photoUrl = `${apiBase}/get-blog-photo/${blog._id}`;

  const date = new Date(
    blog.createdAt || Date.now()
  ).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const rawDescription =
    blog.description || blog.content || "";

  const plainText = rawDescription.replace(
    /<[^>]+>/g,
    ""
  );

  const readTime = Math.max(
    1,
    Math.ceil(
      plainText.split(" ").filter(Boolean).length /
        200
    )
  );

  const pageUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `https://kiwiconnectdigital.com/blog/${blog.slug}`;

  const hasHTML = /<[a-z][\s\S]*>/i.test(
    rawDescription
  );

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const el = articleRef.current;

      if (!el) return;

      const { top, height } =
        el.getBoundingClientRect();

      const winH = window.innerHeight;

      const progress = Math.min(
        100,
        Math.max(
          0,
          ((winH - top) / height) * 100
        )
      );

      setScrollProgress(progress);
    };

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  const copyLink = () => {
    navigator.clipboard
      .writeText(pageUrl)
      .then(() => {
        setCopied(true);

        setTimeout(() => {
          setCopied(false);
        }, 2200);
      });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@400;500;600;700;800&family=Lora:wght@400;500;600&display=swap');

        *{
          box-sizing:border-box;
          margin:0;
          padding:0;
        }

        html{
          scroll-behavior:smooth;
        }

        body{
          background:#FAFAF7;
          font-family:'DM Sans',sans-serif;
        }

        .prose{
          color:#2A2A2A;
          font-family:'Lora',serif;
          font-size:clamp(17px,1.4vw,19px);
          line-height:1.95;
          font-weight:400;
        }

        .prose p{
          margin-bottom:1.7em;
        }

        .prose h2{
          font-family:'Syne',sans-serif;
          font-size:clamp(28px,2vw,34px);
          font-weight:800;
          line-height:1.2;
          color:#111;
          margin:2em 0 .8em;
        }

        .prose h3{
          font-family:'Syne',sans-serif;
          font-size:clamp(22px,1.8vw,28px);
          font-weight:800;
          line-height:1.3;
          color:#111;
          margin:1.8em 0 .7em;
        }

        .prose ul,
        .prose ol{
          padding-left:1.5em;
          margin-bottom:1.5em;
        }

        .prose li{
          margin-bottom:.6em;
        }

        .prose strong{
          font-weight:700;
          color:#111;
        }

        .prose a{
          color:#b774db;
          text-decoration:underline;
        }

        .prose img{
          width:100%;
          border-radius:18px;
          margin:2em 0;
        }

        .prose blockquote{
          border-left:4px solid #ff6ce7;
          padding:18px 24px;
          margin:2em 0;
          background:#FFF5FC;
          border-radius:0 14px 14px 0;
          color:#555;
          font-style:italic;
        }

        .blog-layout{
          display:grid;
          grid-template-columns:minmax(0,1fr) 340px;
          gap:50px;
        }

        .sidebar{
          position:sticky;
          top:100px;
        }

        @media(max-width:1000px){
          .blog-layout{
            grid-template-columns:1fr;
          }

          .sidebar{
            position:relative;
            top:0;
          }
        }
      `}</style>

      <main
        style={{
          background: "#FAFAF7",
          minHeight: "100vh",
        }}
      >
        {/* PROGRESS */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "#ECE7E1",
            zIndex: 999,
          }}
        >
          <div
            style={{
              width: `${scrollProgress}%`,
              height: "100%",
              background:
                "linear-gradient(90deg,#ff6ce7,#b774db)",
              transition: "width .1s linear",
            }}
          />
        </div>

        <Navbar />

        {/* HERO */}
        <section
          style={{
            padding: "120px 5% 0",
            background:
              "linear-gradient(160deg,#FAFAF7 0%,#EFF9E4 55%,#FAFAF7 100%)",
          }}
        >
          <div
            style={{
              maxWidth: 900,
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#fff",
                border: "1.5px solid #ffd4f6",
                borderRadius: 100,
                padding: "8px 20px",
                marginBottom: 26,
                opacity: loaded ? 1 : 0,
                transform: loaded
                  ? "translateY(0)"
                  : "translateY(20px)",
                transition: "all .6s ease",
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#ff6ce7",
                }}
              />

              <span
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: "1px",
                  color: "#b774db",
                  textTransform: "uppercase",
                }}
              >
                {blog.category}
              </span>
            </div>

            <h1
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(34px,5vw,64px)",
                fontWeight: 800,
                lineHeight: 1.08,
                color: "#111",
                letterSpacing: "-2px",
                marginBottom: 24,
                opacity: loaded ? 1 : 0,
                transform: loaded
                  ? "translateY(0)"
                  : "translateY(30px)",
                transition:
                  "all .8s cubic-bezier(.22,.68,0,1.2)",
              }}
            >
              {blog.title}
            </h1>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 18,
                marginBottom: 50,
              }}
            >
              <span
                style={{
                  fontSize: 14,
                  color: "#555",
                  fontWeight: 700,
                }}
              >
                By {blog.author}
              </span>

              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "#CCC",
                }}
              />

              <span
                style={{
                  fontSize: 14,
                  color: "#777",
                  fontWeight: 600,
                }}
              >
                {date}
              </span>

              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "#CCC",
                }}
              />

              <span
                style={{
                  fontSize: 14,
                  color: "#777",
                  fontWeight: 600,
                }}
              >
                📖 {readTime} min read
              </span>
            </div>
          </div>

          {/* HERO IMAGE */}
          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              borderRadius: "30px 30px 0 0",
              overflow: "hidden",
              boxShadow:
                "0 -8px 60px rgba(0,0,0,0.08)",
            }}
          >
            <img
              src={photoUrl}
              alt={blog.title}
              style={{
                width: "100%",
                aspectRatio: "16/6",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
        </section>

        {/* MAIN LAYOUT */}
       {/* MAIN LAYOUT */}
<section
  style={{
    background: "#fff",
    padding: "60px 5% 90px",
  }}
>
  <style>{`
    .blog-layout{
      display:grid;
      grid-template-columns:minmax(0,1fr) 340px;
      gap:50px;
      align-items:start;
    }

    .sidebar{
      position:sticky;
      top:100px;
      align-self:start;
      height:fit-content;
    }

    @media(max-width:1000px){
      .blog-layout{
        grid-template-columns:1fr;
      }

      .sidebar{
        position:relative;
        top:0;
      }
    }
  `}</style>

  <div
    className="blog-layout"
    style={{
      maxWidth: 1300,
      margin: "0 auto",
    }}
  >
    {/* LEFT CONTENT */}
    <article ref={articleRef}>
      <div
        style={{
          maxWidth: 760,
        }}
      >
        {hasHTML ? (
          <div
            className="prose"
            dangerouslySetInnerHTML={{
              __html: rawDescription,
            }}
          />
        ) : (
          <div className="prose">
            {plainText
              .split("\n")
              .filter(Boolean)
              .map((para, i) => (
                <p key={i}>{para}</p>
              ))}
          </div>
        )}

        {/* CTA */}
        <div
          style={{
            marginTop: 70,
            background:
              "linear-gradient(135deg,#1A1A1A,#2A2A2A)",
            borderRadius: 28,
            padding: "40px 36px",
          }}
        >
          <p
            style={{
              fontSize: 11,
              fontWeight: 800,
              color: "#ff6ce7",
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Need help growing online?
          </p>

          <h3
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(24px,2vw,32px)",
              fontWeight: 800,
              lineHeight: 1.2,
              color: "#fff",
              marginBottom: 14,
            }}
          >
            Let’s grow your business with SEO &
            digital marketing
          </h3>

          <p
            style={{
              fontSize: 15,
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.8,
              marginBottom: 26,
            }}
          >
            We help businesses with website
            development, SEO, branding, Google
            ranking, social media marketing, and
            lead generation.
          </p>

          <div
            style={{
              display: "flex",
              gap: 14,
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/contact"
              style={{
                padding: "14px 28px",
                borderRadius: 100,
                background:
                  "linear-gradient(135deg,#ff6ce7,#b774db)",
                color: "#fff",
                textDecoration: "none",
                fontWeight: 800,
              }}
            >
              Free Consultation
            </Link>

            <a
              href={WA_LINK}
              target="_blank"
              rel="noreferrer"
              style={{
                padding: "14px 28px",
                borderRadius: 100,
                background: "#25D366",
                color: "#fff",
                textDecoration: "none",
                fontWeight: 800,
              }}
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </article>

    {/* RIGHT SIDEBAR */}
    <aside className="sidebar">
      {/* SHARE CARD */}
      <div
  style={{
    background: "#fff",
    border: "1px solid #ECE7E1",
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
  }}
>
  <h3
    style={{
      fontFamily: "'Syne', sans-serif",
      fontSize: 22,
      fontWeight: 800,
      marginBottom: 18,
      color: "#111",
    }}
  >
    Share Article
  </h3>

  <div
    style={{
      display: "flex",
      gap: 12,
      flexWrap: "wrap",
    }}
  >
    {/* WhatsApp Share */}
    <a
      href={`https://wa.me/?text=${encodeURIComponent(
        `${blog.title} - ${pageUrl}`
      )}`}
      target="_blank"
      rel="noreferrer"
      style={{
        flex: 1,
        textAlign: "center",
        padding: "12px 18px",
        borderRadius: 14,
        background: "#25D366",
        color: "#fff",
        textDecoration: "none",
        fontWeight: 700,
      }}
    >
      WhatsApp
    </a>

    {/* Copy Link */}
    <button
      onClick={copyLink}
      style={{
        flex: 1,
        border: "none",
        cursor: "pointer",
        borderRadius: 14,
        background: copied ? "#ff6ce7" : "#F5F5F5",
        color: copied ? "#fff" : "#111",
        fontWeight: 700,
      }}
    >
      {copied ? "Copied" : "Copy Link"}
    </button>
  </div>
</div>

      {/* RELATED BLOGS */}
      {related.length > 0 && (
        <div
          style={{
            background: "#fff",
            border: "1px solid #ECE7E1",
            borderRadius: 24,
            padding: 24,
            marginBottom: 24,
            boxShadow:
              "0 4px 20px rgba(0,0,0,0.04)",
          }}
        >
          <h3
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 24,
              fontWeight: 800,
              marginBottom: 20,
              color: "#111",
            }}
          >
            Related Articles
          </h3>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            {related
              .slice(0, 4)
              .map((b) => (
                <RelatedCard
                  key={b._id}
                  blog={b}
                  apiBase={apiBase}
                />
              ))}
          </div>
        </div>
      )}

      {/* SERVICES CARD */}
      <div
        style={{
          background:
            "linear-gradient(135deg,#FDF3FF,#F7F4FF)",
          border: "1px solid #f2d7ff",
          borderRadius: 24,
          padding: 28,
        }}
      >
        <p
          style={{
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "#b774db",
            marginBottom: 12,
          }}
        >
          What We Do
        </p>

        <h3
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 28,
            lineHeight: 1.2,
            fontWeight: 800,
            color: "#111",
            marginBottom: 18,
          }}
        >
          Digital marketing that drives real
          growth
        </h3>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            marginBottom: 26,
          }}
        >
          {[
            "SEO Services",
            "Website Development",
            "Google Ads",
            "Social Media Marketing",
            "Branding & Design",
            "Content Marketing",
          ].map((item) => (
            <div
              key={item}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontSize: 14,
                fontWeight: 700,
                color: "#222",
              }}
            >
              <span>✓</span>
              {item}
            </div>
          ))}
        </div>

        <a
          href={WA_LINK}
          target="_blank"
          rel="noreferrer"
          style={{
            display: "inline-block",
            width: "100%",
            textAlign: "center",
            padding: "14px 24px",
            borderRadius: 100,
            background:
              "linear-gradient(135deg,#ff6ce7,#b774db)",
            color: "#fff",
            textDecoration: "none",
            fontWeight: 800,
          }}
        >
          Get Free Strategy Call
        </a>
      </div>
    </aside>
  </div>
</section>
        {/* FOOTER */}
        <footer
          style={{
            background: "#111",
            padding: "40px 5% 24px",
          }}
        >
          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              display: "flex",
              justifyContent:
                "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 18,
            }}
          >
            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                textDecoration: "none",
              }}
            >
              <img
                src="/kiwilogo.png"
                alt="Kiwi Connect"
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                }}
              />

              <span
                style={{
                  fontFamily:
                    "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: 16,
                  color: "#fff",
                }}
              >
                Kiwi Connect{" "}
                <span
                  style={{
                    color: "#ff6ce7",
                  }}
                >
                  Digital
                </span>
              </span>
            </Link>

            <div
              style={{
                fontSize: 13,
                color:
                  "rgba(255,255,255,0.35)",
              }}
            >
              © 2026 Kiwi Connect Digital.
              All rights reserved.
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}