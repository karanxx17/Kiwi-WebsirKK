"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Insights", href: "/blog" },
  // { label: "Privacy Policy", href: "/privacy-policy" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@400;500;600;700;800&display=swap');

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
        .navbar__logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
        .navbar__logo-icon {
          width: 32px; height: 32px; border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          font-weight: 900; color: #fff; font-size: 16px; flex-shrink: 0;
          overflow: hidden;
        }
        .navbar__logo-text {
          font-family: 'Syne', sans-serif; font-weight: 800;
          font-size: 15px; color: #1A1A1A; white-space: nowrap;
        }

        /* Desktop links */
        .navbar__links {
          display: none; list-style: none; gap: 32px; align-items: center;
        }
        @media (min-width: 768px) { .navbar__links { display: flex; } }

        .navbar__link {
          font-size: 14px; font-weight: 600; color: #3A3A3A;
          text-decoration: none; transition: color 0.2s;
        }
        .navbar__link:hover { color: #ff6ce7; }

        /* KiwiGram pill link */
        .navbar__link--kiwigram {
          display: inline-flex; align-items: center; gap: 6px;
          background: linear-gradient(135deg, #ff6ce7, #ba3aff);
          color: #fff !important;
          padding: 7px 16px; border-radius: 100px;
          font-size: 13px; font-weight: 700;
          transition: transform 0.2s, box-shadow 0.2s !important;
          box-shadow: 0 4px 16px rgba(255,108,231,0.3);
          white-space: nowrap;
        }
        .navbar__link--kiwigram:hover {
          transform: translateY(-2px) scale(1.04);
          box-shadow: 0 8px 24px rgba(255,108,231,0.45) !important;
          color: #fff !important;
        }
        .navbar__link--kiwigram::before {
          content: "✦";
          font-size: 10px;
          opacity: 0.85;
        }

        /* CTA button */
        .navbar__cta {
          display: none;
          padding: 10px 22px; border-radius: 100px;
          background: #1A1A1A; color: #fff; border: none;
          font-size: 13px; font-weight: 700; cursor: pointer;
          transition: all 0.25s; font-family: 'DM Sans', sans-serif;
          white-space: nowrap;
        }
        @media (min-width: 768px) { .navbar__cta { display: block; } }
        .navbar__cta:hover { background: #ff6ce7; }

        /* Hamburger */
        .navbar__hamburger {
          display: flex; flex-direction: column; gap: 5px;
          background: none; border: none; cursor: pointer; padding: 4px;
        }
        @media (min-width: 768px) { .navbar__hamburger { display: none; } }

        .navbar__hamburger-line {
          display: block; width: 24px; height: 2px;
          background: #1A1A1A; border-radius: 2px; transition: all 0.3s;
        }
        .navbar__hamburger-line.open:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .navbar__hamburger-line.open:nth-child(2) { opacity: 0; }
        .navbar__hamburger-line.open:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* Mobile menu */
        .navbar__mobile-menu {
          display: flex; flex-direction: column; gap: 4px;
          background: #fff; padding: 0 5%;
          max-height: 0; overflow: hidden;
          transition: all 0.4s cubic-bezier(.22,.68,0,1.2);
          border-top: 1px solid transparent;
        }
        .navbar__mobile-menu--open {
          max-height: 500px; padding: 16px 5% 24px;
          border-top-color: #EAE6E0;
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
        }
        .navbar__mobile-link {
          font-size: 17px; font-weight: 600; color: #1A1A1A;
          text-decoration: none; padding: 10px 0;
          border-bottom: 1px solid #F0EDE8; transition: color 0.2s;
        }
        .navbar__mobile-link:hover { color: #ff6ce7; }

        /* KiwiGram mobile link */
        .navbar__mobile-link--kiwigram {
          display: flex; align-items: center; gap: 8px;
          font-size: 17px; font-weight: 700; padding: 12px 0;
          border-bottom: 1px solid #F0EDE8;
          text-decoration: none;
          background: linear-gradient(135deg, #ff6ce7, #ba3aff);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .navbar__cta--mobile {
          display: block; width: 100%; margin-top: 8px;
          padding: 14px; text-align: center; border-radius: 12px;
          background: #1A1A1A; color: #fff; border: none;
          font-size: 15px; font-weight: 700; cursor: pointer;
          font-family: 'DM Sans', sans-serif; text-decoration: none;
        }

        /* Animated dot on KiwiGram link */
        @keyframes kgramPulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.5); }
        }
        .kgram-dot {
          width: 6px; height: 6px; background: #fff;
          border-radius: 50%; display: inline-block;
          animation: kgramPulse 2s infinite;
          flex-shrink: 0;
        }
      `}</style>

      <header className={`navbar${scrolled ? " navbar--scrolled" : ""}`}>
        <div className="navbar__inner">
          {/* Logo */}
          <Link href="/" className="navbar__logo">
            <div className="navbar__logo-icon">
              <img
                src="/kiwilogo.png"
                alt="Kiwi Connect Digital"
                style={{ width: 32, height: 32, objectFit: "contain" }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
            <span className="navbar__logo-text">
              Kiwi Connect <span style={{ color: "#ff6ce7" }}>Digital</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="navbar__links">
            {NAV_LINKS.map((link) =>
            (
                <li key={link.label}>
                  <Link href={link.href} className="navbar__link">
                    {link.label}
                  </Link>
                </li>
              )
            )}
          </ul>

          {/* Desktop CTA */}
          <Link href="/contact">
            <button className="navbar__cta">Get a Free Audit →</button>
          </Link>

          {/* Hamburger (mobile) */}
          <button
            className="navbar__hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`navbar__hamburger-line${menuOpen ? " open" : ""}`} />
            <span className={`navbar__hamburger-line${menuOpen ? " open" : ""}`} />
            <span className={`navbar__hamburger-line${menuOpen ? " open" : ""}`} />
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`navbar__mobile-menu${menuOpen ? " navbar__mobile-menu--open" : ""}`}>
          {NAV_LINKS.map((link) =>
           (
              <Link
                key={link.label}
                href={link.href}
                className="navbar__mobile-link"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            )
          )}
          <Link href="/contact" className="navbar__cta--mobile" onClick={() => setMenuOpen(false)}>
            Get a Free Audit →
          </Link>
        </div>
      </header>
    </>
  );
}