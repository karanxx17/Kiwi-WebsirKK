"use client";
import { useState, useEffect } from "react";

export default function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade out at 4.5s, fully hide at 5s
    const fadeTimer = setTimeout(() => setFadeOut(true), 4500);
    const hideTimer = setTimeout(() => setVisible(false), 5000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@400;500;600;700;800&display=swap');

        .kiwi-loader {
          position: fixed; inset: 0; z-index: 9999;
          background: #0a0a0a;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          transition: opacity 0.5s ease, transform 0.5s ease;
          overflow: hidden;
        }
        .kiwi-loader--out {
          opacity: 0;
          transform: scale(1.03);
          pointer-events: none;
        }

        /* ── BG particles ── */
        .loader-particles {
          position: absolute; inset: 0; pointer-events: none; overflow: hidden;
        }
        .lp {
          position: absolute; border-radius: 50%;
          animation: lpFloat linear infinite;
          opacity: 0;
        }
        .lp:nth-child(1)  { width:6px;  height:6px;  background:#ff6ce7; left:12%;  animation-duration:4.2s; animation-delay:0.2s; }
        .lp:nth-child(2)  { width:4px;  height:4px;  background:#ba3aff; left:25%;  animation-duration:3.8s; animation-delay:0.8s; }
        .lp:nth-child(3)  { width:8px;  height:8px;  background:#f97316; left:38%;  animation-duration:5.1s; animation-delay:0.4s; }
        .lp:nth-child(4)  { width:5px;  height:5px;  background:#fbbf24; left:55%;  animation-duration:4.5s; animation-delay:1.1s; }
        .lp:nth-child(5)  { width:6px;  height:6px;  background:#ff6ce7; left:68%;  animation-duration:3.6s; animation-delay:0.6s; }
        .lp:nth-child(6)  { width:4px;  height:4px;  background:#ba3aff; left:80%;  animation-duration:4.9s; animation-delay:0.1s; }
        .lp:nth-child(7)  { width:7px;  height:7px;  background:#f97316; left:90%;  animation-duration:4.0s; animation-delay:1.4s; }
        .lp:nth-child(8)  { width:5px;  height:5px;  background:#fbbf24; left:5%;   animation-duration:5.3s; animation-delay:0.9s; }
        @keyframes lpFloat {
          0%   { transform: translateY(100vh) scale(0.5); opacity: 0; }
          10%  { opacity: 0.7; }
          90%  { opacity: 0.4; }
          100% { transform: translateY(-80px) scale(1); opacity: 0; }
        }

        /* ── Center stage ── */
        .loader-stage {
          position: relative;
          display: flex; flex-direction: column;
          align-items: center; gap: 40px;
          z-index: 2;
        }

        /* ── Petal ring ── */
        .petal-ring {
          position: relative; width: 140px; height: 140px;
        }
        .petal {
          position: absolute;
          width: 30px; height: 58px;
          border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
          transform-origin: 50% 100%;
          top: 50%; left: 50%;
          margin-left: -15px; margin-top: -58px;
          animation: petalPop 1.8s cubic-bezier(.22,.68,0,1.2) infinite;
        }
        .petal:nth-child(1)  { background:#7c3aed; --r:0deg;   animation-delay:0s;    }
        .petal:nth-child(2)  { background:#8b37e8; --r:36deg;  animation-delay:0.09s; }
        .petal:nth-child(3)  { background:#a855f7; --r:72deg;  animation-delay:0.18s; }
        .petal:nth-child(4)  { background:#c026d3; --r:108deg; animation-delay:0.27s; }
        .petal:nth-child(5)  { background:#db2777; --r:144deg; animation-delay:0.36s; }
        .petal:nth-child(6)  { background:#f43f5e; --r:180deg; animation-delay:0.45s; }
        .petal:nth-child(7)  { background:#fb7185; --r:216deg; animation-delay:0.54s; }
        .petal:nth-child(8)  { background:#ff6ce7; --r:252deg; animation-delay:0.63s; }
        .petal:nth-child(9)  { background:#f97316; --r:288deg; animation-delay:0.72s; }
        .petal:nth-child(10) { background:#fbbf24; --r:324deg; animation-delay:0.81s; }
        @keyframes petalPop {
          0%   { opacity:0.12; transform:rotate(var(--r)) scaleY(0.45) scaleX(0.75); }
          30%  { opacity:1;    transform:rotate(var(--r)) scaleY(1.1)  scaleX(1.05); }
          65%  { opacity:0.75; transform:rotate(var(--r)) scaleY(1)    scaleX(1);    }
          100% { opacity:0.12; transform:rotate(var(--r)) scaleY(0.45) scaleX(0.75); }
        }

        /* ── Kiwi core ── */
        .kiwi-core {
          position: absolute; top:50%; left:50%;
          width:40px; height:40px; border-radius:50%;
          transform:translate(-50%,-50%);
          background: radial-gradient(circle at 40% 38%, #fef3c7, #fbbf24 50%, #ea580c);
          display:flex; align-items:center; justify-content:center;
          z-index:10;
          animation: corePulse 1.8s ease-in-out infinite;
        }
        @keyframes corePulse {
          0%,100% { transform:translate(-50%,-50%) scale(1); }
          50%      { transform:translate(-50%,-50%) scale(1.12); }
        }

        /* ── Orbit ring ── */
        .orbit-ring {
          position: absolute; top:50%; left:50%;
          width:110px; height:110px;
          border-radius:50%;
          border:1px dashed rgba(255,108,231,0.25);
          transform:translate(-50%,-50%);
          animation:orbitSpin 4s linear infinite;
        }
        .orbit-dot {
          position:absolute; top:-4px; left:50%; margin-left:-4px;
          width:8px; height:8px; border-radius:50%;
          background:#ff6ce7;
          box-shadow:0 0 8px #ff6ce7;
        }
        @keyframes orbitSpin { to { transform:translate(-50%,-50%) rotate(360deg); } }

        /* ── Progress bar ── */
        .loader-progress-wrap {
          width: 200px;
          display: flex; flex-direction: column; align-items: center; gap: 10px;
        }
        .loader-bar-track {
          width: 100%; height: 3px; background: rgba(255,255,255,0.08);
          border-radius: 99px; overflow: hidden;
        }
        .loader-bar-fill {
          height: 100%; border-radius: 99px;
          background: linear-gradient(90deg, #7c3aed, #ff6ce7, #f97316, #fbbf24);
          background-size: 200% 100%;
          animation: barGrow 5s cubic-bezier(.4,0,.2,1) forwards,
                     barShimmer 1.2s linear infinite;
        }
        @keyframes barGrow {
          0%   { width: 0%; }
          100% { width: 100%; }
        }
        @keyframes barShimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }

        /* ── Brand ── */
        .loader-brand {
          font-family: 'Syne', sans-serif;
          font-size: 17px; font-weight: 800;
          color: rgba(255,255,255,0.9);
          letter-spacing: 0.3px;
          animation: brandFade 0.8s ease 0.3s both;
        }
        .loader-brand span { color: #ff6ce7; }
        @keyframes brandFade {
          from { opacity:0; transform:translateY(8px); }
          to   { opacity:1; transform:translateY(0); }
        }

        /* ── Tagline cycling ── */
        .loader-tagline {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; font-weight: 500;
          color: rgba(255,255,255,0.35);
          letter-spacing: 0.4px;
          min-height: 20px;
          animation: taglineFade 0.5s ease;
        }
        @keyframes taglineFade {
          from { opacity:0; transform:translateY(4px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}</style>

      <div className={`kiwi-loader${fadeOut ? " kiwi-loader--out" : ""}`}>

        {/* Floating particles */}
        <div className="loader-particles">
          {[...Array(8)].map((_, i) => <div key={i} className="lp" />)}
        </div>

        <div className="loader-stage">
          {/* Petal bloom + orbit */}
          <div className="petal-ring">
            {[...Array(10)].map((_, i) => <div key={i} className="petal" />)}
            <div className="orbit-ring">
              <div className="orbit-dot" />
            </div>
            <div className="kiwi-core">
              <svg width="26" height="26" viewBox="0 0 26 26">
                <circle cx="13" cy="13" r="12" fill="#fef3c7" opacity="0.85"/>
                <line x1="13" y1="2"  x2="13" y2="24" stroke="#92400e" strokeWidth="0.6" opacity="0.45"/>
                <line x1="2"  y1="13" x2="24" y2="13" stroke="#92400e" strokeWidth="0.6" opacity="0.45"/>
                <line x1="4.5" y1="4.5" x2="21.5" y2="21.5" stroke="#92400e" strokeWidth="0.6" opacity="0.35"/>
                <line x1="21.5" y1="4.5" x2="4.5" y2="21.5" stroke="#92400e" strokeWidth="0.6" opacity="0.35"/>
                <circle cx="13" cy="13" r="3.5" fill="#fbbf24"/>
                <circle cx="13" cy="5.5"  r="1.4" fill="#292524"/>
                <circle cx="13" cy="20.5" r="1.4" fill="#292524"/>
                <circle cx="5.5" cy="13"  r="1.4" fill="#292524"/>
                <circle cx="20.5" cy="13" r="1.4" fill="#292524"/>
                <circle cx="7.5"  cy="7.5"  r="1.2" fill="#292524"/>
                <circle cx="18.5" cy="7.5"  r="1.2" fill="#292524"/>
                <circle cx="7.5"  cy="18.5" r="1.2" fill="#292524"/>
                <circle cx="18.5" cy="18.5" r="1.2" fill="#292524"/>
              </svg>
            </div>
          </div>

          {/* Brand name */}
          <div style={{ textAlign: "center" }}>
            <div className="loader-brand">
              Kiwi Connect <span>Digital</span>
            </div>
            <TaglineCycler />
          </div>

          {/* Progress bar */}
          <div className="loader-progress-wrap">
            <div className="loader-bar-track">
              <div className="loader-bar-fill" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const TAGLINES = [
  "Building brands that grow.",
  "Strategy meets creativity.",
  "Data-driven results.",
  "Your growth partners.",
];

function TaglineCycler() {
  const [idx, setIdx] = useState(0);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIdx(i => (i + 1) % TAGLINES.length);
      setKey(k => k + 1);
    }, 1200);
    return () => clearInterval(t);
  }, []);

  return (
    <div key={key} className="loader-tagline" style={{ marginTop: 6 }}>
      {TAGLINES[idx]}
    </div>
  );
}