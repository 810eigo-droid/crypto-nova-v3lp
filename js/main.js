/* ===================================================
   Crypto Nova LP — Bright & Rich
   =================================================== */
(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 画像プレースホルダ ----------
     images/ に data-src と同名のファイルを置くと自動で表示される。
     無い間は「ファイル名＋サイズ」のプレースホルダが表示される。 */
  document.querySelectorAll(".ph").forEach((ph) => {
    const name = ph.dataset.src;
    if (!name) return;
    const img = new Image();
    img.alt = ph.dataset.alt || "";
    img.onload = () => {
      ph.classList.add("loaded");
      ph.prepend(img);
    };
    img.onerror = () => { /* 画像未設置：プレースホルダ表示のまま */ };
    img.src = "images/" + name;
  });

  /* ---------- ナビの背景切替 ---------- */
  const nav = document.querySelector(".topnav");
  const onScrollNav = () => nav.classList.toggle("scrolled", window.scrollY > 60);
  window.addEventListener("scroll", onScrollNav, { passive: true });
  onScrollNav();

  /* ---------- 進捗バー ---------- */
  const progress = document.querySelector(".progress-bar i");
  const onScrollProgress = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    if (progress) progress.style.width = `${(window.scrollY / max) * 100}%`;
  };
  window.addEventListener("scroll", onScrollProgress, { passive: true });
  onScrollProgress();

  /* ---------- スクロール出現 ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("is-in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  /* ---------- 疑似乱数（シード付き・見た目再現用） ---------- */
  function mulberry32(seed) {
    let a = seed >>> 0;
    return () => {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /* 成長曲線っぽい点列を作る（装飾用） */
  function growthCurve(seed, n, lift) {
    const rnd = mulberry32(seed);
    const pts = [];
    let v = 0.15 + rnd() * 0.1;
    for (let i = 0; i < n; i++) {
      const p = i / (n - 1);
      v += (rnd() - 0.42) * 0.06 + p * p * lift;
      v = Math.max(0.05, Math.min(0.98, v));
      pts.push(v);
    }
    return pts;
  }

  function pathFrom(pts, w, h, pad = 2) {
    return pts.map((v, i) => {
      const x = (i / (pts.length - 1)) * w;
      const y = pad + (1 - v) * (h - pad * 2);
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(" ");
  }

  /* ---------- コインチップのスパークライン ---------- */
  document.querySelectorAll(".coin-chips .spark").forEach((svg) => {
    const seed = Number(svg.dataset.seed || 1);
    const pts = growthCurve(seed * 97 + 11, 26, 0.05);
    const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
    p.setAttribute("d", pathFrom(pts, 64, 24));
    p.setAttribute("fill", "none");
    p.setAttribute("stroke", "#1B6FD0");
    p.setAttribute("stroke-width", "1.4");
    svg.appendChild(p);
  });

  /* ---------- S3：30銘柄グリッド（イメージ表示） ---------- */
  const grid = document.getElementById("result-grid");
  if (grid) {
    const rnd = mulberry32(20260709);
    const cells = [];
    let sim = 97.8;

    for (let i = 0; i < 30; i++) {
      sim -= rnd() * 1.6 + 0.15;
      const warned = [4, 11, 19, 26].includes(i); // 警告マークのサンプル位置
      const cell = document.createElement("div");
      cell.className = `result-cell${warned ? " warned" : ""}`;

      const pts = growthCurve(i * 31 + 7, 22, 0.045);
      cell.innerHTML =
        `<div class="cell-rank"><span>No.${String(i + 1).padStart(2, "0")}</span>` +
        (warned ? `<span class="cell-warn">⚠</span>` : "") +
        `</div>` +
        `<svg viewBox="0 0 64 20"><path d="${pathFrom(pts, 64, 20)}" fill="none" stroke="${warned ? "#E8833A" : "#4FA3E8"}" stroke-width="1.2" opacity=".9"/></svg>` +
        `<div class="cell-sim">類似 ${sim.toFixed(1)}%</div>`;
      grid.appendChild(cell);
      cells.push(cell);
    }

    // グリッドが見えたら順番にポップ
    const gio = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        cells.forEach((c, i) => {
          setTimeout(() => c.classList.add("pop"), reduceMotion ? 0 : i * 45);
        });
        gio.disconnect();
      }
    }, { threshold: 0.2 });
    gio.observe(grid);
  }

  /* ---------- FAQ：開いたら他を閉じる ---------- */
  const faqs = [...document.querySelectorAll(".faq-item")];
  faqs.forEach((d) => {
    d.addEventListener("toggle", () => {
      if (d.open) faqs.forEach((o) => { if (o !== d) o.open = false; });
    });
  });
})();
