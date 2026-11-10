
import { useEffect, useMemo, useRef, useState } from "react";

/* ---------- PERFUME DETAILS ---------- */

const SCENTS = [
  {
    id: "date",
    name: "Date Woman",
    img: "/date-women.png",
    swatch: "#c2557f",
    headline: ["Beautiful Nights", "Begin Here"],
    text: 'Bella Vita means "the beautiful life". Date Woman is made for the evenings that matter: dinners, dates and every moment you want to remember.',
    price: "₹2,499",
    size: "100 ML · EAU DE PARFUM",
    theme: {
      bg: "#7a2f86",
      glow: "#c47ad0",
      sphere: "#c28cf0",
    },
  },
  {
    id: "ceo",
    name: "CEO Man",
    img: "/ceo-man.png",
    swatch: "#16121a",
    ring: "#d6b25e",
    headline: ["Lead With", "Your Scent"],
    text: "Live the beautiful life with confidence. CEO Man is a bold luxury fragrance for the man who walks into every room ready to lead.",
    price: "₹2,799",
    size: "100 ML · EAU DE PARFUM",
    theme: {
      bg: "#3b2c22",
      glow: "#8a6a4a",
      sphere: "#c9a24e",
    },
  },
  {
    id: "fresh",
    name: "Fresh Unisex",
    img: "/fresh-unisex.png",
    swatch: "#12a9a9",
    headline: ["Beautiful Days", "Start Fresh"],
    text: "A beautiful life begins with a fresh start. Fresh Unisex is a light, easy fragrance for anyone, any day, anywhere.",
    price: "₹2,299",
    size: "100 ML · EAU DE TOILETTE",
    theme: {
      bg: "#12767d",
      glow: "#3fd0c9",
      sphere: "#4fd6cd",
    },
  },
];

/* ---------- FLOATING BALLS ---------- */

const BALLS = [
  { x: 24, y: 20, s: 54, dx: 14, dy: -18, dur: 7, d: 0, b: 0 },
  { x: 60, y: 8, s: 70, dx: -16, dy: 14, dur: 8, d: 1, b: 0 },
  { x: 30, y: 54, s: 38, dx: 12, dy: 16, dur: 6, d: 0.5, b: 1 },
  { x: 80, y: 30, s: 92, dx: -18, dy: -12, dur: 9, d: 0.3, b: 0 },
  { x: 84, y: 70, s: 60, dx: 10, dy: -16, dur: 7.5, d: 1.4, b: 2 },
  { x: 10, y: 74, s: 110, dx: 20, dy: -10, dur: 10, d: 0.8, b: 6 },
  { x: 52, y: 78, s: 34, dx: -10, dy: -14, dur: 6.5, d: 0.2, b: 0 },
];

const BUBBLES = [
  { x: 18, y: 30, s: 40, dx: 10, dy: 14, dur: 8, d: 0 },
  { x: 56, y: 26, s: 30, dx: -12, dy: 10, dur: 7, d: 0.6 },
  { x: 66, y: 46, s: 64, dx: 14, dy: -12, dur: 9, d: 1.2 },
  { x: 70, y: 82, s: 26, dx: -8, dy: -14, dur: 6, d: 0.4 },
  { x: 8, y: 52, s: 24, dx: 8, dy: 10, dur: 7, d: 1 },
];

/* ---------- BAG ICON ---------- */

const BagIcon = () => (
  <svg
    width="34"
    height="34"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 8h14l-1 12H6L5 8z" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" />
  </svg>
);

/* ---------- HOME COMPONENT ---------- */

export default function Home() {
  const [active, setActive] = useState(0);
  const [shown, setShown] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [modal, setModal] = useState(false);

  const stageRef = useRef(null);
  const timer = useRef(null);

  const sc = SCENTS[active];
  const bottle = SCENTS[shown];

  /* ---------- CHANGE PERFUME ---------- */

  const choose = (i) => {
    if (i === active) return;

    clearTimeout(timer.current);

    setActive(i);
    setLeaving(true);

    timer.current = setTimeout(() => {
      setShown(i);
      setLeaving(false);
    }, 800);
  };

  useEffect(() => {
    return () => clearTimeout(timer.current);
  }, []);

  /* ---------- MOUSE PARALLAX ---------- */

  const onMove = (e) => {
    const el = stageRef.current;

    if (!el) return;

    el.style.setProperty(
      "--px",
      (e.clientX / window.innerWidth - 0.5).toFixed(3)
    );

    el.style.setProperty(
      "--py",
      (e.clientY / window.innerHeight - 0.5).toFixed(3)
    );
  };

  /* ---------- BACKGROUND THEME ---------- */

  const themeVars = useMemo(
    () => ({
      "--bg": sc.theme.bg,
      "--glow": sc.theme.glow,
      "--sphere": sc.theme.sphere,
    }),
    [sc]
  );

  return (
    <main
      className="hero"
      style={themeVars}
      onMouseMove={onMove}
    >
      <div className={`page${modal ? " blurred" : ""}`}>

        {/* BRAND */}

        <header className="brand">
          Bella Vita
        </header>

        {/* HERO CONTENT */}

        <section
          className="copy"
          key={sc.id + "-copy"}
        >
          <h1>
            {sc.headline[0]}
            <br />
            {sc.headline[1]}
          </h1>

          <p>{sc.text}</p>
        </section>

        {/* PERFUME STAGE */}

        <section
          className="stage"
          ref={stageRef}
        >
          <div className="glow" />

          {/* BUBBLES */}

          <div className="layer far">
            {BUBBLES.map((b, i) => (
              <span
                key={i}
                className="bubble"
                style={{
                  left: `${b.x}%`,
                  top: `${b.y}%`,
                  width: b.s,
                  height: b.s,
                  "--dx": `${b.dx}px`,
                  "--dy": `${b.dy}px`,
                  animationDuration: `${b.dur}s`,
                  animationDelay: `${b.d}s`,
                }}
              />
            ))}
          </div>

          {/* BOTTLE IMAGE */}

          <div className="bottle-wrap">
            <img
              key={shown}
              src={bottle.img}
              alt={bottle.name}
              className={`bottle${leaving ? " out" : ""}`}
            />
          </div>

          {/* FLOATING BALLS */}

          <div className="layer near">
            {BALLS.map((b, i) => (
              <span
                key={i}
                className="ball"
                style={{
                  left: `${b.x}%`,
                  top: `${b.y}%`,
                  width: b.s,
                  height: b.s,
                  filter: b.b ? `blur(${b.b}px)` : "none",
                  "--dx": `${b.dx}px`,
                  "--dy": `${b.dy}px`,
                  animationDuration: `${b.dur}s`,
                  animationDelay: `${b.d}s`,
                }}
              />
            ))}
          </div>

          {/* PRICE */}

          <div
            className="price"
            key={sc.id + "-price"}
          >
            <strong>{sc.price}</strong>
            <small>{sc.size}</small>
          </div>
        </section>

        {/* PERFUME SELECTOR */}

        <aside className="picker">
          <span className="label">
            SCENT
          </span>

          <h2 key={sc.id + "-name"}>
            {sc.name}
          </h2>

          <div className="swatches">
            {SCENTS.map((s, i) => (
              <button
                key={s.id}
                aria-label={s.name}
                className={`swatch${i === active ? " on" : ""}`}
                style={{
                  background: s.swatch,
                  "--ring": s.ring || "#fff",
                }}
                onClick={() => choose(i)}
              />
            ))}
          </div>

          <button
            className="buy"
            onClick={() => setModal(true)}
          >
            Buy Now
          </button>
        </aside>
      </div>

      {/* BUY MODAL */}

      {modal && (
        <div
          className="overlay"
          onClick={() => setModal(false)}
        >
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close"
              aria-label="Close"
              onClick={() => setModal(false)}
            >
              ×
            </button>

            <div className="m-icon">
              <BagIcon />
            </div>

            <h3>Coming Soon</h3>

            <p>
              The <b>{sc.name}</b> will be available
              for purchase very soon! Stay tuned.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
