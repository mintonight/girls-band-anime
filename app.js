/* ============================================================
   app.js — 交互与动效
   原生 JS：IntersectionObserver / SVG 生成 / Canvas 频谱 / 状态机
   ============================================================ */
(function () {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const rand = (a, b) => a + Math.random() * (b - a);
  const SVGNS = "http://www.w3.org/2000/svg";
  const deep = (c) => c; // 占位，保持可读

  /* ==========================================================
     0. 视频录制模式：?video=1 时自动进入、隐藏播放器与控制层
     ========================================================== */
  const VIDEO_MODE = new URLSearchParams(location.search).has("video");
  if (VIDEO_MODE) document.documentElement.classList.add("is-video");

  /* ==========================================================
     1. 开场遮罩
     ========================================================== */
  const curtain = $("#curtain");
  let opened = false;

  function openSite() {
    if (opened) return;
    opened = true;
    curtain.classList.add("gone");
    document.body.classList.remove("is-locked");
    document.body.classList.add("is-ready");
    setTimeout(() => curtain.remove(), 1000);
  }

  document.body.classList.add("is-locked");
  if (VIDEO_MODE) { setTimeout(openSite, 60); }
  curtain.addEventListener("click", openSite);
  curtain.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") openSite();
  });
  window.addEventListener("wheel", openSite, { passive: true, once: true });
  window.addEventListener("touchmove", openSite, { passive: true, once: true });
  if (!VIDEO_MODE) setTimeout(openSite, 2600);

  /* ==========================================================
     1. 滚动进度 & 侧边导航
     ========================================================== */
  const bar = $("#bar");
  const dotsBox = $("#dots");
  const sections = [];
  $$("main > section, .hero").forEach((sec) => {
    const label = sec.dataset.nav || sec.id || "section";
    const b = document.createElement("button");
    b.type = "button";
    b.dataset.label = label;
    b.setAttribute("aria-label", label);
    b.addEventListener("click", () => {
      if (sec.classList.contains("hero")) window.scrollTo({ top: 0, behavior: "smooth" });
      else sec.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    dotsBox.appendChild(b);
    sections.push({ el: sec, btn: b });
  });

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      bar.style.width = (p * 100).toFixed(2) + "%";

      const mid = window.scrollY + window.innerHeight * 0.42;
      let active = 0;
      sections.forEach((s, i) => {
        if (s.el.offsetTop <= mid) active = i;
      });
      sections.forEach((s, i) => s.btn.classList.toggle("on", i === active));
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  /* ==========================================================
     2. 进场揭示
     ========================================================== */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-on");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
  );
  $$("[data-reveal]").forEach((el) => io.observe(el));

  /* ==========================================================
     3. 舞台 SVG（剪影乐队 + 灯光 + 音符 + 波形）
     ========================================================== */
  function figures(band, n) {
    // 用官方立绘站在舞台上（mix-blend-mode:multiply 让白色背景融进暖色灯光）
    const list = band.members;
    const total = list.length;
    let out = "";
    const spread = 620;
    const order = total <= 4 ? [0, 1, 2, 3] : [1, 0, 2, 3, 4];
    for (let k = 0; k < total; k++) {
      const i = order[k] !== undefined ? k : k;
      const m = list[i];
      const t = total === 1 ? 0.5 : k / (total - 1);
      const x = 600 - spread / 2 + t * spread;
      const isSinger = i === 0;
      const h = isSinger ? 292 : 254;
      const w = h * 0.66;
      const rx = 18;
      const baseY = 470 + (k % 2 ? 10 : 0);
      const cid = "pc-" + band.id + "-" + k;
      out +=
        '<g transform="translate(' + x.toFixed(1) + ',' + baseY + ')">' +
          '<ellipse cx="0" cy="8" rx="' + (w * 0.42).toFixed(0) + '" ry="12" fill="' + band.c1 + '" opacity=".20"/>' +
          '<g class="fig" style="animation-delay:' + (k * 0.42).toFixed(2) + 's;animation-duration:' + (3.4 + (k % 3) * 0.8).toFixed(1) + 's">' +
            '<defs><clipPath id="' + cid + '"><rect x="' + (-w / 2).toFixed(1) + '" y="' + (-h) + '" width="' + w.toFixed(1) +
              '" height="' + h + '" rx="' + rx + '"/></clipPath></defs>' +
            '<rect x="' + (-w / 2).toFixed(1) + '" y="' + (-h) + '" width="' + w.toFixed(1) + '" height="' + h +
              '" rx="' + rx + '" fill="#fff" stroke="' + m.color + '" stroke-opacity=".45" stroke-width="1.5"/>' +
            '<image href="' + m.img + '" x="' + (-w / 2).toFixed(1) + '" y="' + (-h) + '" width="' + w.toFixed(1) + '" height="' + h +
              '" preserveAspectRatio="xMidYMin slice" clip-path="url(#' + cid + ')"/>' +
            '<rect x="' + (-w / 2).toFixed(1) + '" y="' + (-h) + '" width="' + w.toFixed(1) + '" height="' + h +
              '" rx="' + rx + '" fill="none" stroke="' + m.color + '" stroke-opacity=".55" stroke-width="1.5"/>' +
          '</g>' +
        '</g>';
    }
    return out;
  }

  function stageSVG(band, n) {
    const gid = "st" + band.id;
    let notes = "";
    for (let i = 0; i < 14; i++) {
      const x = 190 + Math.random() * 820;
      const y = 190 + Math.random() * 190;
      const s = 0.7 + Math.random() * 0.9;
      notes +=
        '<g class="note" style="animation-delay:' + (i * 0.55).toFixed(2) + 's;animation-duration:' + (6 + Math.random() * 4).toFixed(1) + 's">' +
          '<g transform="translate(' + x.toFixed(0) + ',' + y.toFixed(0) + ') scale(' + s.toFixed(2) + ')" fill="' + (i % 3 ? band.c1 : band.c2) + '" opacity=".85">' +
            '<ellipse cx="0" cy="0" rx="7" ry="5.2" transform="rotate(-22)"/>' +
            '<rect x="5" y="-26" width="2" height="26"/>' +
            '<path d="M7 -26 q10 4 10 12 q-4 -6 -10 -7 Z"/>' +
          '</g>' +
        '</g>';
    }

    let waves = "";
    for (let i = 0; i < 56; i++) {
      const h = 8 + Math.abs(Math.sin(i * 0.7)) * 36;
      waves += '<rect class="wave" x="' + (150 + i * 16) + '" y="' + (486 - h * 0.62) + '" width="5" height="' + (h * 0.62).toFixed(1) +
               '" rx="2.5" fill="' + (i % 5 === 0 ? band.c2 : band.c1) + '" opacity="' + (0.35 + (i % 4) * 0.15).toFixed(2) +
               '" style="animation-delay:' + (i * 0.045).toFixed(2) + 's"/>';
    }

    return '' +
      '<svg class="stage__svg" viewBox="0 0 1200 525" xmlns="' + SVGNS + '" preserveAspectRatio="xMidYMid slice" role="img" aria-label="' + band.name + ' 舞台示意">' +
        '<defs>' +
          '<linearGradient id="' + gid + 'bg" x1="0" y1="0" x2="0" y2="1">' +
            '<stop offset="0%" stop-color="#ffffff"/>' +
            '<stop offset="58%" stop-color="' + band.c1 + '" stop-opacity=".16"/>' +
            '<stop offset="100%" stop-color="' + band.c2 + '" stop-opacity=".20"/>' +
          '</linearGradient>' +
          '<radialGradient id="' + gid + 'spot" cx="50%" cy="4%" r="78%">' +
            '<stop offset="0%" stop-color="' + band.c1 + '" stop-opacity=".55"/>' +
            '<stop offset="58%" stop-color="' + band.c1 + '" stop-opacity=".12"/>' +
            '<stop offset="100%" stop-color="' + band.c1 + '" stop-opacity="0"/>' +
          '</radialGradient>' +
          '<filter id="' + gid + 'blur"><feGaussianBlur stdDeviation="24"/></filter>' +
          '<filter id="whiten-' + band.id + '" x="-10%" y="-10%" width="120%" height="120%" color-interpolation-filters="sRGB">' +
            '<feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  -1.6 -1.6 -1.6 0 4.5"/>' +
          '</filter>' +
        '</defs>' +

        '<rect width="1200" height="525" fill="#ffffff"/>' +
        '<rect width="1200" height="525" fill="url(#' + gid + 'bg)" opacity=".85"/>' +
        '<ellipse cx="600" cy="110" rx="540" ry="310" fill="url(#' + gid + 'spot)"/>' +

        // 光束
        '<g filter="url(#' + gid + 'blur)" opacity=".55">' +
          '<polygon class="beam" points="320,0 236,470 404,470" fill="' + band.c1 + '" style="animation-delay:0s"/>' +
          '<polygon class="beam" points="600,0 536,470 664,470" fill="' + band.c2 + '" style="animation-delay:-2s"/>' +
          '<polygon class="beam" points="884,0 800,470 964,470" fill="' + band.c1 + '" style="animation-delay:-4s"/>' +
        '</g>' +

        // 远处观众剪影
        '<g fill="' + band.c1 + '" opacity=".18">' +
          Array.from({ length: 26 }).map((_, i) => {
            const x = 40 + i * 45;
            const h = 26 + ((i * 37) % 22);
            return '<circle cx="' + x + '" cy="' + (503 - h) + '" r="9"/>' +
                   '<rect x="' + (x - 12) + '" y="' + (510 - h) + '" width="24" height="' + h + '" rx="9"/>';
          }).join("") +
        '</g>' +

        // 舞台地板
        '<path d="M0 470 H1200 V525 H0 Z" fill="#ffffff" opacity=".55"/>' +
        '<path d="M0 470 H1200" stroke="' + band.c1 + '" stroke-opacity=".45" stroke-width="1.6"/>' +

        figures(band, n) +
        notes +
        '<g opacity=".9">' + waves + '</g>' +

        // 角落标记
        '<g stroke="' + band.c1 + '" stroke-opacity=".45" fill="none" stroke-width="1.4" stroke-linecap="round">' +
          '<path d="M28 28 h34 M28 28 v34"/><path d="M1172 28 h-34 M1172 28 v34"/>' +
          '<path d="M28 497 h34 M28 497 v-30"/><path d="M1172 497 h-34 M1172 497 v-30"/>' +
        '</g>' +
        '<text x="600" y="512" text-anchor="middle" font-size="11" letter-spacing="7" fill="' + band.c1 +
          '" font-family="Impact, sans-serif" opacity=".85">' + band.en + '</text>' +
      '</svg>';
  }

  $$(".band__scene").forEach((el) => {
    el.style.setProperty("--scene", 'url("' + el.dataset.scene + '")');
  });

  /* ==========================================================
     3.5 B站 跳转：曲目行点击直达对应视频
     ========================================================== */
  /* 曲名归一化：去括号补充说明、空格、符号差异，便于本地文件名与曲目表对齐 */
  function normalizeSong(s) {
    return String(s || "")
      .replace(/\([^)]*\)|（[^）]*）|【[^】]*】/g, "")
      .replace(/[\s　・·、,，.。!！?？'"“”‘’\-—–_~～]/g, "")
      .toLowerCase();
  }

  /* B站 视频地址：支持 BV 号，可指定起播时间 */
  function biliURL(bv) {
    return "https://www.bilibili.com/video/" + bv + "/";
  }

  /* 新标签页打开；被拦截时回退为当前页跳转 */
  function openBili(bv, row) {
    const url = biliURL(bv);
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (!win) location.href = url;
    if (row) {
      row.classList.add("is-leaving");
      setTimeout(() => row.classList.remove("is-leaving"), 900);
    }
  }

  /* ==========================================================
     4. 渲染：舞台 / 歌词 / 成员 / 曲目
     ========================================================== */
  const counts = { bocchi: 4, mygo: 5, gbc: 5 };

  Object.keys(BANDS).forEach((key) => {
    const band = BANDS[key];

    // 舞台
    const stage = $("#stage-" + key);
    if (stage) stage.outerHTML = stageSVG(band, counts[key] || 5);

    // 漂浮歌词
    const ly = $("#lyrics-" + key);
    if (ly) {
      band.lyrics.slice(0, 2).forEach((w, i) => {
        const s = document.createElement("span");
        s.textContent = w;
        s.style.cssText =
          "right:" + (2 + i * 12 + rand(-2, 2)).toFixed(1) + "%;bottom:" + (6 + i * 46).toFixed(1) + "%;" +
          "font-size:" + (i === 0 ? "clamp(34px,6.4vw,102px)" : "clamp(24px,4vw,66px)") + ";" +
          "animation-delay:-" + (i * 5).toFixed(1) + "s;opacity:" + (0.6 - i * 0.2).toFixed(2);
        ly.appendChild(s);
      });
    }

    // 成员卡
    const wrap = $("#members-" + key);
    if (wrap) {
      band.members.forEach((m, i) => {
        const card = document.createElement("button");
        card.className = "mcard";
        card.type = "button";
        card.style.setProperty("--c1", m.color);
        card.style.setProperty("--d", (i * 0.06).toFixed(2) + "s");
        card.setAttribute("data-reveal", "zoom");
        card.setAttribute("aria-label", m.name + " · " + m.role);
        card.innerHTML =
          '<div class="mcard__inner">' +
            '<div class="mcard__face mcard__face--front">' +
              '<div class="mcard__art"><img src="' + m.img + '" alt="' + m.name + ' 官方立绘" loading="lazy" decoding="async" width="300" height="740"></div>' +
              '<div class="mcard__grad"></div>' +
              '<span class="mcard__badge">' + m.tag + '</span>' +
              '<div class="mcard__name"><b>' + m.name + '</b><span>' + m.jp + '</span></div>' +
            '</div>' +
            '<div class="mcard__face mcard__face--back">' +
              '<span class="role">' + m.role + '</span>' +
              '<b>' + m.name + '</b>' +
              '<p>' + m.desc + '</p>' +
              '<dl>' +
                '<div><dt>爱称</dt><dd>' + m.nick + '</dd></div>' +
                '<div><dt>担当</dt><dd>' + m.inst + '</dd></div>' +
                '<div><dt>CV</dt><dd>' + m.cv + '</dd></div>' +
              '</dl>' +
            '</div>' +
          '</div>';
        card.addEventListener("click", () => card.classList.toggle("flip"));
        const img = card.querySelector("img");
        img.addEventListener("error", () => {
          img.style.display = "none";
          card.querySelector(".mcard__art").insertAdjacentHTML("beforeend",
            '<div style="font-size:11px;color:#7d7490;text-align:center;padding:10px">立绘未找到<br>' + m.img + '</div>');
        });
        wrap.appendChild(card);
        io.observe(card);
      });
    }

    // 曲目：本地有真实音频就播本地，否则给出 B站 直达链接
    const list = $("#songs-" + key);
    if (list) {
      // 全部曲目统一跳到 B站，不再读取本地音乐库
      const tracks = band.songs.map((s) => ({
        name: s.name, cn: s.cn, use: s.use, year: s.year, bili: s.bili
      }));

      tracks.forEach((s, i) => {
        const row = document.createElement("div");
        row.className = "song song--bili";
        row.style.setProperty("--c1", band.c1);
        if (s.bili) row.dataset.bili = s.bili;

        // 整行就是一个链接：点哪里都跳 B站
        row.innerHTML =
          '<a class="song__hit" href="' + (s.bili ? biliURL(s.bili) : "#") + '"' +
            ' target="_blank" rel="noopener noreferrer"' +
            ' aria-label="在 B站 打开 ' + s.name + '">' +
            '<div class="song__no">' + String(i + 1).padStart(2, "0") + '</div>' +
            '<div class="song__name">' +
              '<div class="song__wave">' + Array.from({ length: 5 }).map((_, k) => '<i style="--i:' + k + '"></i>').join("") + '</div>' +
              '<div><b>' + s.name + '</b><small>' + (s.cn || "") + '</small></div>' +
            '</div>' +
            '<div class="song__use">' + (s.use || "") + '</div>' +
            '<div class="song__time">' + (s.year || "") + '</div>' +
            '<span class="song__play" aria-hidden="true">↗</span>' +
          '</a>';

        row.querySelector("a").addEventListener("click", () => {
          row.classList.add("is-leaving");
          setTimeout(() => row.classList.remove("is-leaving"), 900);
        });
        list.appendChild(row);
      });
    }
  });

  /* ==========================================================
     5. 假播放器 & Canvas 频谱
     ========================================================== */
  /* 所有曲目改为跳转 B站，本地播放器与音频元素已移除；
     这里保留 Canvas 频谱作为背景动效（跟随当前悬停的乐队配色）。 */
  let playingBand = null;

  /* 悬停到某个乐队的曲目区时，频谱换成该队的配色 */
  $$(".band").forEach((sec) => {
    const key = sec.id;
    const band = BANDS[key];
    if (!band) return;
    sec.addEventListener("mouseenter", () => { playingBand = band; });
  });

  const canvas = document.createElement("canvas");
  canvas.className = "viz";
  canvas.setAttribute("aria-hidden", "true");
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  let W = 0, H = 0;
  const DPR = Math.min(window.devicePixelRatio || 1, 2);
  function sizeCanvas() {
    W = canvas.clientWidth;
    H = canvas.clientHeight;
    canvas.width = Math.floor(W * DPR);
    canvas.height = Math.floor(H * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  window.addEventListener("resize", sizeCanvas);
  sizeCanvas();

  const BARS = 84;
  const levels = new Array(BARS).fill(0.08);
  let phase = 0;
  let rafId = 0;

  function tick() {
    rafId = requestAnimationFrame(tick);
    if (document.hidden) return;

    phase += 0.014;
    const active = !!playingBand;
    const c1 = playingBand ? playingBand.c1 : "#8b7cf6";
    const c2 = playingBand ? playingBand.c2 : "#ff5f95";
    const energy = active ? 0.95 : 0.34;

    ctx.clearRect(0, 0, W, H);
    const bw = W / BARS;
    for (let i = 0; i < BARS; i++) {
      const n =
        Math.sin(phase * 2 + i * 0.29) * 0.30 +
        Math.sin(phase * 1.31 + i * 0.71) * 0.22 +
        Math.sin(phase * 3.7 + i * 0.13) * 0.16 +
        0.34;
      const target = Math.max(0.06, Math.min(1, n)) * energy;
      levels[i] += (target - levels[i]) * (active ? 0.22 : 0.06);
      const h = levels[i] * H * 0.92;
      const x = i * bw + 1.2;
      const w = Math.max(1.4, bw - 2.6);
      const g = ctx.createLinearGradient(0, H, 0, H - h);
      g.addColorStop(0, c1);
      g.addColorStop(1, c2);
      ctx.fillStyle = g;
      ctx.globalAlpha = active ? 0.5 : 0.26;
      ctx.fillRect(x, H - h, w, h);
    }
    ctx.globalAlpha = 1;
  }
  tick();

  /* ==========================================================
     6. 羁绊网络（节点用官方立绘做圆形头像）
     ========================================================== */
  const POS = {
    b1: [212, 258], b2: [104, 150], b3: [96, 366], b4: [318, 148],
    m1: [520, 404], m2: [404, 526], m3: [648, 520], m4: [660, 318], m5: [406, 296],
    g1: [824, 200], g2: [706, 92], g3: [946, 104], g4: [948, 300], g5: [780, 372]
  };
  const NODECOLOR = { bocchi: "#f7b733", mygo: "#8b7cf6", gbc: "#28b0d6" };

  const bondSvg = $("#bondSvg");
  if (bondSvg) {
    const ns = SVGNS;
    const nodes = BOND.nodes.map((n) => Object.assign({}, n, { x: POS[n.id][0], y: POS[n.id][1] }));
    const byId = {};
    nodes.forEach((n) => (byId[n.id] = n));

    const defs = document.createElementNS(ns, "defs");
    bondSvg.appendChild(defs);

    const gLinks = document.createElementNS(ns, "g");
    const gNodes = document.createElementNS(ns, "g");
    bondSvg.appendChild(gLinks);
    bondSvg.appendChild(gNodes);

    // 背景网格
    const grid = document.createElementNS(ns, "g");
    for (let x = 100; x < 1000; x += 100) {
      const l = document.createElementNS(ns, "line");
      l.setAttribute("x1", x); l.setAttribute("y1", 40);
      l.setAttribute("x2", x); l.setAttribute("y2", 620);
      l.setAttribute("stroke", "#5a406e"); l.setAttribute("stroke-opacity", ".09");
      grid.appendChild(l);
    }
    for (let y = 100; y < 640; y += 100) {
      const l = document.createElementNS(ns, "line");
      l.setAttribute("x1", 40); l.setAttribute("y1", y);
      l.setAttribute("x2", 960); l.setAttribute("y2", y);
      l.setAttribute("stroke", "#5a406e"); l.setAttribute("stroke-opacity", ".09");
      grid.appendChild(l);
    }
    bondSvg.insertBefore(grid, gLinks);

    // 头像裁切
    nodes.forEach((n) => {
      const cp = document.createElementNS(ns, "clipPath");
      cp.setAttribute("id", "clip-" + n.id);
      const c = document.createElementNS(ns, "circle");
      c.setAttribute("cx", 0); c.setAttribute("cy", 0);
      c.setAttribute("r", n.r - 1.5);
      cp.appendChild(c);
      defs.appendChild(cp);
    });

    const linkEls = [];
    BOND.links.forEach((lk, idx) => {
      const a = byId[lk.a], b = byId[lk.b];
      if (!a || !b) return;
      const mx = (a.x + b.x) / 2 + (b.y - a.y) * 0.12;
      const my = (a.y + b.y) / 2 - (b.x - a.x) * 0.12;
      const p = document.createElementNS(ns, "path");
      p.setAttribute("d", "M" + a.x + "," + a.y + " Q" + mx.toFixed(1) + "," + my.toFixed(1) + " " + b.x + "," + b.y);
      p.setAttribute("fill", "none");
      p.setAttribute("stroke", lk.cross ? "#7d7490" : NODECOLOR[a.band]);
      p.setAttribute("stroke-width", lk.cross ? 1.2 : 0.9 + lk.w * 0.8);
      p.setAttribute("stroke-opacity", lk.cross ? 0.28 : 0.34 + lk.w * 0.15);
      p.setAttribute("class", "link");
      if (lk.cross) {
        p.setAttribute("stroke-dasharray", "4 7");
      } else {
        p.style.strokeDasharray = "1";
        p.style.strokeDashoffset = "1";
        p.style.transition = "stroke-dashoffset 1.1s cubic-bezier(.16,1,.3,1) " + (idx * 0.045).toFixed(2) + "s, stroke-opacity .3s";
      }
      p.dataset.a = lk.a; p.dataset.b = lk.b; p.dataset.w = lk.w; p.dataset.cross = lk.cross ? "1" : "0";
      gLinks.appendChild(p);
      linkEls.push(p);
    });

    // 提示文字
    const tip = document.createElementNS(ns, "text");
    tip.setAttribute("x", 500); tip.setAttribute("y", 646);
    tip.setAttribute("text-anchor", "middle");
    tip.setAttribute("font-size", "12.5");
    tip.setAttribute("letter-spacing", "2");
    tip.setAttribute("fill", "#7d7490");
    tip.textContent = "把鼠标停在人物上，看关系";
    bondSvg.appendChild(tip);

    const nodeEls = {};
    nodes.forEach((n) => {
      const g = document.createElementNS(ns, "g");
      g.setAttribute("class", "node");
      g.setAttribute("transform", "translate(" + n.x + "," + n.y + ")");
      const col = NODECOLOR[n.band];

      if (n.r > 24) {
        const ring = document.createElementNS(ns, "circle");
        ring.setAttribute("r", n.r + 10);
        ring.setAttribute("fill", "none");
        ring.setAttribute("stroke", col);
        ring.setAttribute("stroke-opacity", ".55");
        ring.setAttribute("stroke-width", "1.4");
        ring.style.transformBox = "fill-box";
        ring.style.transformOrigin = "center";
        ring.style.animation = "pulseRing 3.4s ease-out infinite";
        g.appendChild(ring);
      }

      const halo = document.createElementNS(ns, "circle");
      halo.setAttribute("r", n.r + 14);
      halo.setAttribute("fill", col);
      halo.setAttribute("opacity", ".14");
      g.appendChild(halo);

      const disc = document.createElementNS(ns, "circle");
      disc.setAttribute("r", n.r);
      disc.setAttribute("fill", "#ffffff");
      disc.setAttribute("stroke", col);
      disc.setAttribute("stroke-width", "2");
      g.appendChild(disc);

      // 头像图片（裁切 + 缩放取头肩）
      const img = document.createElementNS(ns, "image");
      img.setAttribute("href", n.img);
      img.setAttributeNS("http://www.w3.org/1999/xlink", "href", n.img);
      img.setAttribute("x", -n.r * 2.1);
      img.setAttribute("y", -n.r * 1.75);
      img.setAttribute("width", n.r * 4.2);
      img.setAttribute("height", n.r * 4.2);
      img.setAttribute("preserveAspectRatio", "xMidYMin slice");
      img.setAttribute("clip-path", "url(#clip-" + n.id + ")");
      g.appendChild(img);

      const t = document.createElementNS(ns, "text");
      t.setAttribute("text-anchor", "middle");
      t.setAttribute("dy", n.r + 19);
      t.setAttribute("font-size", "11.5");
      t.setAttribute("letter-spacing", "1.5");
      t.setAttribute("fill", "#4b4457");
      t.setAttribute("font-weight", "600");
      t.textContent = n.short;
      g.appendChild(t);

      g.addEventListener("mouseenter", () => focusNode(n.id));
      g.addEventListener("mouseleave", blurNode);
      g.addEventListener("click", () => focusNode(n.id));
      gNodes.appendChild(g);
      nodeEls[n.id] = g;
    });

    function focusNode(id) {
      const related = new Set([id]);
      BOND.links.forEach((lk) => {
        if (lk.a === id) related.add(lk.b);
        if (lk.b === id) related.add(lk.a);
      });
      Object.keys(nodeEls).forEach((k) => nodeEls[k].classList.toggle("dim", !related.has(k)));
      linkEls.forEach((p) => {
        const on = p.dataset.a === id || p.dataset.b === id;
        p.classList.toggle("dim", !on);
        if (!on) p.setAttribute("stroke-opacity", ".06");
      });
      const node = byId[id];
      const labels = BOND.links
        .filter((lk) => lk.a === id || lk.b === id)
        .map((lk) => lk.label)
        .slice(0, 3);
      tip.textContent = node ? node.name + " · " + labels.join(" / ") : "";
    }
    function blurNode() {
      Object.keys(nodeEls).forEach((k) => nodeEls[k].classList.remove("dim"));
      linkEls.forEach((p) => {
        p.classList.remove("dim");
        const cross = p.dataset.cross === "1";
        p.setAttribute("stroke-opacity", cross ? ".28" : String(0.34 + Number(p.dataset.w) * 0.15));
      });
      tip.textContent = "把鼠标停在人物上，看关系";
    }

    const bondObs = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (!e.isIntersecting) return;
        linkEls.forEach((p) => { p.style.strokeDashoffset = "0"; });
        bondObs.disconnect();
      });
    }, { threshold: 0.2 });
    bondObs.observe(bondSvg);
  }

  /* ==========================================================
     7. 雷达图
     ========================================================== */
  const radar = $("#radar");
  if (radar) {
    const R = 132, CX = 210, CY = 208;
    const n = RADAR.axes.length;
    const ns = SVGNS;
    const pt = (i, v) => {
      const ang = -Math.PI / 2 + (i * 2 * Math.PI) / n;
      return [CX + Math.cos(ang) * R * v, CY + Math.sin(ang) * R * v];
    };

    for (let k = 1; k <= 4; k++) {
      const poly = document.createElementNS(ns, "polygon");
      const pts = [];
      for (let i = 0; i < n; i++) { const p = pt(i, k / 4); pts.push(p[0].toFixed(1) + "," + p[1].toFixed(1)); }
      poly.setAttribute("points", pts.join(" "));
      poly.setAttribute("fill", k === 4 ? "rgba(90,64,110,.04)" : "none");
      poly.setAttribute("stroke", "rgba(90,64,110,.14)");
      poly.setAttribute("stroke-width", "1");
      radar.appendChild(poly);
    }

    RADAR.axes.forEach((ax, i) => {
      const p = pt(i, 1);
      const l = document.createElementNS(ns, "line");
      l.setAttribute("x1", CX); l.setAttribute("y1", CY);
      l.setAttribute("x2", p[0]); l.setAttribute("y2", p[1]);
      l.setAttribute("stroke", "rgba(90,64,110,.14)");
      radar.appendChild(l);

      const lp = pt(i, 1.2);
      const t = document.createElementNS(ns, "text");
      t.setAttribute("x", lp[0].toFixed(1)); t.setAttribute("y", lp[1].toFixed(1));
      t.setAttribute("text-anchor", "middle");
      t.setAttribute("dy", "4");
      t.setAttribute("font-size", "11");
      t.setAttribute("letter-spacing", "2");
      t.setAttribute("fill", "#7d7490");
      t.textContent = ax;
      radar.appendChild(t);
    });

    const dots = [];
    RADAR.series.forEach((s, si) => {
      const pts = s.values.map((v, i) => pt(i, v / 100));
      const poly = document.createElementNS(ns, "polygon");
      poly.setAttribute("points", pts.map((p) => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" "));
      poly.setAttribute("fill", s.color);
      poly.setAttribute("fill-opacity", ".13");
      poly.setAttribute("stroke", s.color);
      poly.setAttribute("stroke-width", "2");
      poly.setAttribute("stroke-linejoin", "round");
      poly.style.transformOrigin = CX + "px " + CY + "px";
      poly.style.transform = "scale(.2)";
      poly.style.opacity = "0";
      poly.style.transition = "transform 1s cubic-bezier(.16,1,.3,1) " + (si * 0.16) + "s, opacity .8s " + (si * 0.16) + "s";
      radar.appendChild(poly);
      s._poly = poly;

      pts.forEach((p, i) => {
        const c = document.createElementNS(ns, "circle");
        c.setAttribute("cx", p[0]); c.setAttribute("cy", p[1]);
        c.setAttribute("r", "3");
        c.setAttribute("fill", s.color);
        c.setAttribute("opacity", "0");
        c.style.transition = "opacity .5s " + (0.5 + si * 0.16 + i * 0.03) + "s";
        radar.appendChild(c);
        dots.push(c);
      });
    });

    const rObs = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (!e.isIntersecting) return;
        RADAR.series.forEach((s) => { s._poly.style.transform = "scale(1)"; s._poly.style.opacity = "1"; });
        dots.forEach((c) => c.setAttribute("opacity", "1"));
        rObs.disconnect();
      });
    }, { threshold: 0.3 });
    rObs.observe(radar);
  }

  /* ==========================================================
     8. 键盘 & 收尾
     ========================================================== */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      $$(".mcard.flip").forEach((c) => c.classList.remove("flip"));
    }
  });

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    $$("[data-reveal]").forEach((el) => el.classList.add("is-on"));
    document.body.classList.add("is-ready");
  }

  window.addEventListener("load", () => {
    setTimeout(() => document.body.classList.add("is-ready"), 120);
    onScroll();
  });
})();
