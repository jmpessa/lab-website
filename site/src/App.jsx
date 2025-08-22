// site/src/App.jsx — Stylish single-file template with unique micro-interactions
import React, { useEffect, useMemo, useRef, useState } from "react";

function App() {
  // --- UI state ---
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    document.documentElement.classList.add("js");
  }, []);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const pct = height > 0 ? (scrolled / height) * 100 : 0;
      setScrollPct(pct);
      // lightweight parallax on elements with data-parallax
      document.querySelectorAll('[data-parallax]')?.forEach((el) => {
        const speed = parseFloat(el.getAttribute('data-parallax')) || 0.2;
        const y = scrolled * speed;
        el.style.transform = `translate3d(0, ${y}px, 0)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fancy, subtle gradient seed that changes per refresh
  const gradientSeed = useMemo(() => Math.floor(Math.random() * 360), []);

  // Smooth scroll for in-page nav
  useEffect(() => {
    const links = Array.from(document.querySelectorAll('a[href^="#"]'));
    const handler = (e) => {
      const id = e.currentTarget.getAttribute("href").slice(1);
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    links.forEach((a) => a.addEventListener("click", handler));
    return () => links.forEach((a) => a.removeEventListener("click", handler));
  }, []);

  // Magnetic cursor effect for CTA buttons (pure vanilla, light)
  const magnetsRef = useRef([]);
  useEffect(() => {
    const magnets = magnetsRef.current;
    const onMove = (e) => {
      magnets.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        const dist = Math.hypot(x, y);
        const strength = Math.max(0, 1 - dist / 250);
        el.style.transform = `translate(${x * 0.12 * strength}px, ${y * 0.12 * strength}px)`;
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div style={styles.page}>
      {/* Global styles + keyframes */}
      <style>{globalCss(gradientSeed)}</style>

      {/* Top progress bar (reading indicator) */}
      <div style={{ ...styles.progress, width: `${scrollPct}%` }} aria-hidden="true" />

      {/* Header */}
      <header style={styles.header}>
        <div style={styles.brand}>João Peça Lab</div>
        <nav style={styles.nav}>
          <a href="#about">About</a>
          <a href="#research">Research</a>
          <a href="#gallery">Gallery</a>
          <a href="#team">Team</a>
          <a href="#publications">Publications</a>
          <a href="#contact">Contact</a>
        </nav>
        <button
          aria-label="Toggle theme"
          onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
          style={styles.themeToggle}
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </header>

      {/* Hero with parallax blobs + marquee */}
      <section style={styles.hero}>
        <div style={styles.heroInner}>
          <h1 style={styles.title}>Exploring the Neural Circuits of Behavior</h1>
          <p style={styles.lede}>
            We study how neuronal circuits shape cognition, behavior, and disease —
            combining molecular precision with systems-level tools.
          </p>
          <div style={styles.ctaRow}>
            <a
              href="#research"
              ref={(el) => (magnetsRef.current[0] = el)}
              style={{ ...styles.cta, ...styles.ctaPrimary }}
            >
              See our research
            </a>
            <a
              href="#publications"
              ref={(el) => (magnetsRef.current[1] = el)}
              style={{ ...styles.cta, ...styles.ctaGhost }}
            >
              Latest publications
            </a>
          </div>
        </div>
        <div style={styles.blobOne} data-parallax="0.05" />
        <div style={styles.blobTwo} data-parallax="0.03" />
        <div className="marquee" style={styles.marquee}>
          <div className="marquee__track" style={styles.marqueeTrack}>
            {["synapses", "organoids", "circuit plasticity", "optogenetics", "human iPSC", "connectivity"].map((w, i) => (
              <span key={i} style={styles.pill}>{w}</span>
            ))}
            {["synapses", "organoids", "circuit plasticity", "optogenetics", "human iPSC", "connectivity"].map((w, i) => (
              <span key={`b-${i}`} style={styles.pill}>{w}</span>
            ))}
          </div>
        </div>
      </section>

      {/* About — glassmorphism card */}
      <section id="about" style={styles.section}>
        <div style={styles.glassCard}>
          <h2 style={styles.h2}>About Us</h2>
          <p>
            We are a research group at the University of Coimbra exploring the cellular and
            molecular mechanisms of brain function and dysfunction. Our toolkit spans
            human brain organoids, multi-electrode recordings, and mechanistic genetics.
          </p>
        </div>
      </section>

      {/* Research — hover-tilt cards */}
      <section id="research" style={styles.section}>
        <h2 style={styles.h2}>Research Areas</h2>
        <div style={styles.cardGrid}>
          {[
            {
              title: "Synaptic plasticity & maturation",
              text:
                "Activity-driven maturation, excitatory/inhibitory balance, and circuit refinement.",
            },
            {
              title: "Neurodevelopmental disorders",
              text:
                "Mechanistic insights into SHANK3, CASPR2 and related pathways using human models.",
            },
            {
              title: "Organoids & computation",
              text:
                "Structured activity in cortical organoids; emergent dynamics and learning paradigms.",
            },
          ].map((c, i) => (
            <article key={i} style={styles.researchCard} className="tilt">
              <h3 style={styles.h3}>{c.title}</h3>
              <p>{c.text}</p>
              <div style={styles.cardShine} aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>

      {/* Gallery — responsive media grid with Ken Burns + parallax */}
      <section id="gallery" style={styles.section}>
        <h2 style={styles.h2}>Gallery</h2>
        <p style={{opacity:.9, marginTop:4}}>Drop your lab photos into <code>site/public/media/</code> and update the URLs below.</p>
        <div style={styles.mediaGrid}>
          {[ 
            {src: "/media/organoid.jpg", alt: "Human cortical organoid", cap: "Human cortical organoid (DAPI/Map2)", kb: true, depth: 0.08},
            {src: "/media/rig.jpg", alt: "Electrophysiology rig", cap: "Multi-electrode recording rig", kb: false, depth: 0.12},
            {src: "/media/team.jpg", alt: "Lab team", cap: "Team retreat in Serra da Lousã", kb: true, depth: 0.06},
            {src: "/media/microscope.jpg", alt: "Two-photon microscope", cap: "Two‑photon imaging", kb: false, depth: 0.1},
          ].map((m, i) => (
            <figure key={i} style={styles.mediaTile} data-parallax={m.depth}>
              <div
                style={{
                  ...styles.mediaImg,
                  ...(m.kb ? styles.kenBurns : {}),
                  backgroundImage: `url(${m.src})`
                }}
                role="img"
                aria-label={m.alt}
              />
              <figcaption style={styles.mediaCaption}>{m.cap}</figcaption>
            </figure>
          ))}
        </div>
        {/* Animated Lab Accent (SVG stroke-dashoffset reveal) */}
        <div style={{marginTop: "1.2rem"}}>
          <svg viewBox="0 0 600 80" width="100%" height="80" style={{maxWidth: 800}} aria-hidden="true">
            <path d="M5 60 Q 120 10, 240 60 T 475 60 T 595 60" fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round">
              <animate attributeName="stroke-dasharray" from="0,700" to="700,0" dur="2s" fill="freeze"/>
            </path>
          </svg>
        </div>
      </section>

      {/* Team — minimalist placeholder */}
      <section id="team" style={styles.section}>
        <h2 style={styles.h2}>Meet the Team</h2>
        <p>Team profiles coming soon. Interested in joining? <a href="#contact">Get in touch</a>.</p>
      </section>

      {/* Publications — vertical timeline */}
      <section id="publications" style={styles.section}>
        <h2 style={styles.h2}>Selected Publications</h2>
        <div style={styles.timeline}>
          {[
            { year: 2025, title: "Human organoid circuits and plasticity", journal: "Journal of Neurochemistry" },
            { year: 2024, title: "CASPR2 gates circuit maturation", journal: "Neuron" },
            { year: 2023, title: "SHANK3 and excitability homeostasis", journal: "Nature Neuroscience" },
          ].map((p, i) => (
            <div key={i} style={styles.timelineItem}>
              <div style={styles.timelineDot} />
              <div style={styles.timelineContent}>
                <div style={styles.timelineYear}>{p.year}</div>
                <div>
                  <div style={styles.pubTitle}>{p.title}</div>
                  <div style={styles.pubMeta}>{p.journal}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact — compact card with microcopy */}
      <section id="contact" style={styles.section}>
        <div style={styles.contactCard}>
          <h2 style={styles.h2}>Contact</h2>
          <p>Email: <a href="mailto:joao.peca@uc.pt">joao.peca@uc.pt</a></p>
          <p>Twitter: <a href="https://twitter.com/yourhandle" target="_blank" rel="noreferrer">@yourhandle</a></p>
          <p>Campus: University of Coimbra, Portugal</p>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>© {new Date().getFullYear()} João Peça Lab • Built with ❤️ and curiosity</p>
      </footer>
    </div>
  );
}

// --- styles ---
const styles = {
  mediaGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "1rem",
    marginTop: "0.75rem",
  },
  mediaTile: {
    position: "relative",
    overflow: "hidden",
    borderRadius: 16,
    border: "1px solid var(--hairline)",
    background: "var(--bg-elev)",
  },
  mediaImg: {
    width: "100%",
    aspectRatio: "4 / 3",
    minHeight: 220,
    backgroundSize: "cover",
    backgroundPosition: "center",
    transform: "translate3d(0,0,0)",
    transition: "transform 800ms cubic-bezier(.2,.6,0,1)",
  },
  kenBurns: {
    animation: "kenburns 14s ease-in-out infinite alternate",
  },
  mediaCaption: {
    position: "absolute",
    left: 10,
    bottom: 10,
    padding: "0.3rem 0.55rem",
    borderRadius: 12,
    fontSize: 13,
    background: "color-mix(in oklab, var(--bg) 70%, transparent)",
    border: "1px solid var(--hairline)",
    backdropFilter: "blur(4px)",
  },
  page: {
    fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
    margin: 0,
    padding: 0,
    color: "var(--fg)",
    background: "linear-gradient(180deg, var(--bg) 0%, var(--bg-soft) 100%)",
  },
  progress: {
    position: "fixed",
    top: 0,
    left: 0,
    height: 3,
    background: "var(--accent)",
    zIndex: 1000,
    transition: "width 0.15s ease-out",
  },
  header: {
    position: "sticky",
    top: 0,
    zIndex: 999,
    display: "grid",
    gridTemplateColumns: "1fr auto auto",
    alignItems: "center",
    gap: "1rem",
    padding: "0.9rem 1.2rem",
    backdropFilter: "saturate(140%) blur(8px)",
    background: "color-mix(in oklab, var(--bg) 85%, transparent)",
    borderBottom: "1px solid var(--hairline)",
  },
  brand: {
    fontWeight: 700,
    letterSpacing: 0.25,
    fontSize: "1.05rem",
  },
  nav: {
    display: "flex",
    gap: "1rem",
  },
  themeToggle: {
    border: "1px solid var(--hairline)",
    background: "var(--bg-elev)",
    color: "var(--fg)",
    padding: "0.45rem 0.6rem",
    borderRadius: 10,
    cursor: "pointer",
  },
  hero: {
    position: "relative",
    overflow: "hidden",
    padding: "7rem 1.5rem 6rem",
  },
  heroInner: {
    maxWidth: 980,
    margin: "0 auto",
    textAlign: "center",
  },
  title: {
    fontSize: clampPx(28, 56),
    lineHeight: 1.05,
    letterSpacing: -0.5,
    margin: 0,
  },
  lede: {
    maxWidth: 820,
    margin: "1rem auto 2rem",
    opacity: 0.9,
    fontSize: clampPx(16, 20),
  },
  ctaRow: {
    display: "flex",
    gap: "0.8rem",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  cta: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.8rem 1.05rem",
    borderRadius: 14,
    textDecoration: "none",
    border: "1px solid var(--hairline)",
    transition: "transform 180ms ease, background 180ms ease",
    willChange: "transform",
  },
  ctaPrimary: {
    background: "var(--accent)",
    color: "white",
    border: "1px solid color-mix(in oklab, var(--accent) 85%, black)",
  },
  ctaGhost: {
    background: "var(--bg-elev)",
    color: "var(--fg)",
  },
  blobOne: baseBlob(800, 800, 18, 0.3),
  blobTwo: baseBlob(600, 600, -12, 0.22),
  marquee: {
    position: "absolute",
    bottom: 12,
    left: 0,
    right: 0,
    overflow: "hidden",
    pointerEvents: "none",
  },
  marqueeTrack: {
    display: "inline-block",
    whiteSpace: "nowrap",
    animation: "marquee 22s linear infinite",
  },
  pill: {
    display: "inline-block",
    margin: "0 0.5rem",
    padding: "0.35rem 0.7rem",
    borderRadius: 999,
    background: "color-mix(in oklab, var(--accent) 20%, var(--bg-elev))",
    border: "1px solid var(--hairline)",
    fontSize: 13,
  },
  section: {
    padding: "3rem 1.2rem",
    maxWidth: 1100,
    margin: "0 auto",
  },
  glassCard: {
    background: "color-mix(in oklab, var(--bg-elev) 70%, transparent)",
    border: "1px solid var(--hairline)",
    borderRadius: 16,
    padding: "1.5rem",
    boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
    backdropFilter: "blur(6px)",
  },
  h2: {
    fontSize: clampPx(20, 28),
    margin: "0 0 0.75rem 0",
  },
  h3: {
    margin: "0 0 0.5rem 0",
    fontSize: 18,
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "1rem",
    marginTop: "1rem",
  },
  researchCard: {
    position: "relative",
    overflow: "hidden",
    padding: "1.1rem",
    borderRadius: 16,
    background: "var(--bg-elev)",
    border: "1px solid var(--hairline)",
    transition: "transform 200ms ease, box-shadow 200ms ease",
  },
  cardShine: {
    position: "absolute",
    inset: -1,
    background:
      "radial-gradient(600px 120px at var(--mx,50%) -10%, color-mix(in oklab, white 30%, transparent) 0%, transparent 60%)",
    opacity: 0,
    transition: "opacity 180ms ease",
    pointerEvents: "none",
  },
  timeline: {
    position: "relative",
    marginTop: "1.5rem",
    paddingLeft: 18,
  },
  timelineItem: {
    position: "relative",
    paddingLeft: 18,
    borderLeft: "2px dashed var(--hairline)",
    marginBottom: "1rem",
  },
  timelineDot: {
    position: "absolute",
    left: -6,
    top: 6,
    width: 10,
    height: 10,
    borderRadius: 999,
    background: "var(--accent)",
    boxShadow: "0 0 0 4px color-mix(in oklab, var(--accent) 30%, transparent)",
  },
  timelineContent: {
    display: "flex",
    gap: "0.8rem",
    alignItems: "baseline",
  },
  timelineYear: { fontWeight: 700, minWidth: 48 },
  pubTitle: { fontWeight: 600 },
  pubMeta: { opacity: 0.8, fontSize: 14 },
  contactCard: {
    border: "1px solid var(--hairline)",
    background: "var(--bg-elev)",
    borderRadius: 16,
    padding: "1.2rem",
  },
  footer: {
    textAlign: "center",
    padding: "2rem 1rem 3rem",
    opacity: 0.8,
  },
};

// --- helpers & CSS ---
function clampPx(min, max) {
  return `clamp(${min}px, calc(${min}px + 2vw), ${max}px)`;
}

function baseBlob(w, h, rot, opacity) {
  return {
    position: "absolute",
    inset: "auto",
    right: -w * 0.25,
    top: -h * 0.25,
    width: w,
    height: h,
    filter: "blur(60px)",
    transform: `rotate(${rot}deg)`,
    background: "conic-gradient(from 90deg at 50% 50%, var(--accent), transparent 60%)",
    opacity,
    pointerEvents: "none",
  };
}

function globalCss(seedHue) {
  return `
  :root {
    --bg: oklch(16% 0.02 ${seedHue}deg);
    --bg-soft: oklch(20% 0.03 ${seedHue + 8}deg);
    --bg-elev: oklch(22% 0.03 ${seedHue + 12}deg);
    --fg: oklch(93% 0.02 ${seedHue + 180}deg);
    --accent: oklch(65% 0.16 ${seedHue + 120}deg);
    --hairline: color-mix(in oklab, var(--fg) 12%, var(--bg));
  }
  [data-theme="light"] {
    --bg: oklch(97% 0.02 ${seedHue}deg);
    --bg-soft: oklch(99% 0.02 ${seedHue + 6}deg);
    --bg-elev: white;
    --fg: oklch(20% 0.02 ${seedHue + 180}deg);
    --accent: oklch(60% 0.15 ${seedHue + 120}deg);
    --hairline: color-mix(in oklab, var(--fg) 10%, var(--bg));
  }

  html, body, #root { height: 100%; }
  body { margin: 0; }
  a { color: inherit; text-decoration: none; opacity: 0.9; }
  a:hover { opacity: 1; }

  /* Tilt + shine on research cards */
  .tilt { transform-style: preserve-3d; }
  .tilt:hover { box-shadow: 0 16px 40px rgba(0,0,0,0.2); }
  .tilt:hover .cardShine { opacity: 1; }

  /* Auto-reveal sections (only when JS is enabled) */
  html.js section { opacity: 0; translate: 0 12px; transition: opacity .5s ease, translate .5s ease; }
  html.js section.appear { opacity: 1; translate: 0 0; }

  /* Marquee */
  @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

  /* Ken Burns subtle zoom-pan */
  @keyframes kenburns {
    0% { transform: scale(1.02) translate3d(0,0,0); }
    100% { transform: scale(1.08) translate3d(0,-8px,0); }
  }

  /* Motion safety */
  @media (prefers-reduced-motion: reduce) {
    * { animation-duration: .001ms !important; animation-iteration-count: 1 !important; transition-duration: 0ms !important; }
  }

  figure:hover > div { transform: scale(1.06); }
  `;
}

// Reveal on scroll via IntersectionObserver
(function initObservers() {
  if (typeof window === "undefined") return;
  const on = () => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("appear");
      });
    }, { threshold: 0.08 });
    document.querySelectorAll("section").forEach((s) => io.observe(s));
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", on);
  else on();
})();

export default App;