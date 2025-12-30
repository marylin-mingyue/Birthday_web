// 这是「点开 A/B/C/D 后的相册页配置」：改这里就能改礼物内容 :)
// - title: 顶部标题
// - messages: 泡泡弹幕循环播放的文案
// - photos: 可选，默认展示的照片 URL（比如 "./assets/photos/1.jpg"），也可以留空让他点“选照片”
const CONTENT = {
  A: {
    title: "A · 第一次见面心动了吗？",
    messages: [
      "并非 ovo",
      "只是碰巧把镜头对向你",
      "台湾，澳门，香港，广州，深圳...",
      "我们的脚步会遍布世界ovo",
    ],
    photos: [
      "./assets/photo/photo1.JPG",
      "./assets/photo/photo2.JPG",
      "./assets/photo/photo3.JPG",
      "./assets/photo/photo4.JPG",
      "./assets/photo/photo5.JPG",
      "./assets/photo/photo6.JPG",
      "./assets/photo/photo7.JPG",
      "./assets/photo/photo8.JPG",
      "./assets/photo/photo9.JPG",
      "./assets/photo/photo10.JPG",
    ],
    danmaku: { mode: "static", count: 4 },
  },
  B: {
    title: "B · 我男朋友的 1e9+10 个优点",
    messages: [
      "优点 +1！再 +1！一直加到 1e9+10！",
      "你真的很棒很棒很棒！",
      "这是可莉认证的！嘻嘻！",
    ],
    photos: ["./unnamed.jpg"],
  },
  C: {
    title: "C · 生日到了，有什么想对你说的呢？",
    letter: {
      title: "给你的一封信",
      body: [
        "生日快乐呀！突然意识到你的虚岁和你的真实年龄是不是差一年（？）印象中，我上一次写信应该还在小学，我们平时的无话不谈也让我觉得没有写信表达的必要。",
        "你是一个很有原则很有秩序感的人，每次和你在一起我就会觉得心安，很多崩溃的瞬间我的第一反应都是想要抱抱你，本来挺委屈的，抱完莫名其妙想笑（？）。",
        "即使我小小的脑子里面认为的天大的事情，也只需要闻闻你身上的味道😋好像你在我身边我就没有什么解决不了的事。这个可能就是大家所说的生理性喜欢？我不知道。",
        "你是一个很聪明的人，代码高手，我爸妈这么形容你。不管什么复杂的任务，涉及方方面面，好像你只要略微出手就没什么难事（？）你身上的松弛感是我最羡慕的东西，虽然我也很想得到你的智商（？）",
        "肉麻的话我其实挺懒的说的，因为我知道你一定懒得听。",
        "你是最棒的，去美国之前一定要多带衣服，纽约现在零下二度。",
        "祝你在新的一年得偿所愿，笑口常开，平安喜乐～",
      ],
      sign: "—— 爱你的 徐铭悦",
    },
  },
  D: {
    title: "D · 可以拆礼物了么？",
    messages: [
      "现在！立刻！马上！可以拆啦！",
      "嘻嘻～别眨眼哦！",
      "这份礼物只给你一个人！",
    ],
    photos: ["./unnamed.jpg"],
    danmaku: { mode: "off" },
    giftWall: {
      maxOpen: 3,
      gifts: [
        { photo: "./assets/gift/jellycat.PNG", text: "jellycat" },
        { photo: "./assets/gift/小米书包.jpg", text: "小米书包" },
        { photo: "./assets/gift/斜挎包.PNG", text: "斜挎包" },
        { photo: "./assets/gift/松下便携剃须刀.PNG", text: "松下便携剃须刀" },
        { photo: "./assets/gift/电动牙刷.PNG", text: "电动牙刷" },
        { photo: "./assets/gift/睡衣.PNG", text: "睡衣" },
        { photo: "./assets/gift/科技袜子.PNG", text: "科技袜子" },
        { photo: "./assets/gift/颈部按摩仪.PNG", text: "颈部按摩仪" },
        { photo: "./assets/gift/黑科技眼罩.PNG", text: "黑科技眼罩" },
      ],
      reveal: {
        title: "礼物全部拆开啦！",
        sub: "把照片和想说的话放在这里～",
        note: "（每拆一朵小花，就会在这里出现一张图和一句话）",
      },
    },
  },
};

function $(id) {
  return document.getElementById(id);
}

const els = {
  characterButton: $("characterButton"),
  bubbleTitle: $("bubbleTitle"),
  choices: $("choices"),
  fxLayer: $("fxLayer"),
  homeView: $("homeView"),
  galleryView: $("galleryView"),
  galleryBackBtn: $("galleryBackBtn"),
  galleryTitle: $("galleryTitle"),
  danmakuLayer: $("danmakuLayer"),
  photoInput: $("photoInput"),
  photoUploadLabel: $("photoUploadLabel"),
  photoBubbleWall: $("photoBubbleWall"),
  giftWall: $("giftWall"),
  giftGrid: $("giftGrid"),
  giftHint: $("giftHint"),
  giftResult: $("giftResult"),
  giftResultGrid: $("giftResultGrid"),
  giftResultClose: $("giftResultClose"),
  giftResultBackHome: $("giftResultBackHome"),

  // C letter
  letterScroll: $("letterScroll"),
  letterTitle: $("letterTitle"),
  letterBody: $("letterBody"),
  letterSign: $("letterSign"),

  // CF view (B)
  cfView: $("cfView"),
  cfBackBtn: $("cfBackBtn"),
  runBtn: $("runBtn"),
  submitBtn: $("submitBtn"),
  console: $("console"),
  monacoStatus: $("monacoStatus"),
  monacoHost: $("monaco"),
};

let currentChoice = null;
let danmakuTimer = null;
let danmakuIdx = 0;
let photoObjectUrls = [];
let openedGifts = new Set();
let openedGiftOrder = [];

// Monaco
let monacoEditor = null;
let monacoLoaded = false;

const CPP_TEMPLATE = `/**
 * Definition for a binary tree node.
 * struct Node {
 * string val;
 * Node *left;
 * Node *right;
 * Node(string x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Solution {
public:
    void traverse(Node* root) {
        // TODO: Write your traversal code here
        // Hint: output(root->val) to print virtue
        
    }
};`;

const B_VIRTUES_TEST1 = [
  "聪明",
  "帅气",
  "温柔(almost time)",
  "无论何时都有冷静解决问题的能力",
  "内心坚定",
  "有条理和计划",
  "有底线",
  "高情商",
  "讲原则和义气",
  "明辨是非",
];

function applyRoute(state) {
  // Prefer history state; fallback to hash route (#A/#B/#C/#D)
  const hashChoice = (location.hash || "").replace("#", "").trim().toUpperCase();

  if (hashChoice === "B") {
    showCfView({ pushHistory: false });
    return;
  }
  if (state && state.view === "gallery" && state.choice && CONTENT[state.choice]) {
    showGalleryView(state.choice, { pushHistory: false });
    return;
  }
  if ((!state || state.view === "gallery") && hashChoice && CONTENT[hashChoice]) {
    showGalleryView(hashChoice, { pushHistory: false });
    return;
  }
  showHomeView({ pushHistory: false });
}

function showHomeView({ pushHistory } = { pushHistory: true }) {
  currentChoice = null;
  if (els.cfView) els.cfView.classList.add("view--hidden");
  if (els.homeView) els.homeView.classList.remove("view--hidden");
  if (els.galleryView) els.galleryView.classList.add("view--hidden");
  if (els.letterScroll) els.letterScroll.classList.add("letter--hidden");
  stopDanmaku();
  clearSelectedPhotos();
  resetGiftState();

  if (pushHistory) {
    history.pushState({ view: "home" }, "", "#home");
  }
}

function showCfView(opts = {}) {
  const pushHistory = opts.pushHistory ?? true;
  currentChoice = "B";
  if (els.homeView) els.homeView.classList.add("view--hidden");
  if (els.galleryView) els.galleryView.classList.add("view--hidden");
  if (els.cfView) els.cfView.classList.remove("view--hidden");

  stopDanmaku();
  clearSelectedPhotos();
  resetGiftState();

  if (pushHistory) {
    history.pushState({ view: "cf" }, "", "#B");
  }

  ensureMonaco();
}

function showGalleryView(choice, { pushHistory } = { pushHistory: true }) {
  if (choice === "B") {
    showCfView({ pushHistory });
    return;
  }
  currentChoice = choice;
  const data = CONTENT[choice];
  if (!data) return;

  launchCelebration();

  if (els.homeView) els.homeView.classList.add("view--hidden");
  if (els.galleryView) els.galleryView.classList.remove("view--hidden");

  if (els.galleryTitle) els.galleryTitle.textContent = data.title || `选项 ${choice}`;
  // Mode switch: D uses gift wall; others use photo bubbles + danmaku
  if (choice === "C" && data.letter) {
    showLetterView(data);
  } else if (choice === "D" && data.giftWall) {
    showGiftWall(data);
  } else {
    showPhotoBubbles();
    setupDefaultPhotos(data.photos || []);
    startDanmaku(data.messages || [], data.danmaku || {});
  }

  if (pushHistory) {
    history.pushState({ view: "gallery", choice }, "", `#${choice}`);
  }
}

function consoleClear() {
  if (els.console) els.console.textContent = "";
}
function consoleWrite(line) {
  if (!els.console) return;
  els.console.textContent += (els.console.textContent ? "\n" : "") + line;
  els.console.scrollTop = els.console.scrollHeight;
}

function ensureMonaco() {
  if (monacoEditor || monacoLoaded) return;
  if (!els.monacoHost) return;

  ensureMonacoAssets()
    .then(() => {
      if (els.monacoStatus) els.monacoStatus.textContent = "Loading editor…";
      window.require.config({
        paths: { vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.34.1/min/vs" },
      });
      window.require(["vs/editor/editor.main"], () => {
        monacoLoaded = true;
        monacoEditor = window.monaco.editor.create(els.monacoHost, {
          value: CPP_TEMPLATE,
          language: "cpp",
          theme: "vs",
          minimap: { enabled: false },
          fontSize: 13,
          automaticLayout: true,
          scrollbar: { verticalScrollbarSize: 10 },
        });
        if (els.monacoStatus) els.monacoStatus.textContent = "Ready";
      });
    })
    .catch(() => {
      if (els.monacoStatus) els.monacoStatus.textContent = "Monaco unavailable (offline?)";
      // fallback: show template in console so the page still works
      if (els.console && !els.console.textContent) {
        consoleWrite("Monaco CDN 加载失败（可能离线/网络限制）。");
        consoleWrite("你仍然可以点击 Submit 观看“假编译器”动画。");
      }
    });
}

function ensureMonacoAssets() {
  // Load Monaco lazily so the whole site doesn't block when CDN is slow/unavailable.
  const CSS_HREF =
    "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.34.1/min/vs/editor/editor.main.min.css";
  const LOADER_SRC =
    "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.34.1/min/vs/loader.min.js";

  const promises = [];

  // CSS
  if (!document.querySelector(`link[data-name="vs/editor/editor.main"]`)) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.setAttribute("data-name", "vs/editor/editor.main");
    link.href = CSS_HREF;
    document.head.appendChild(link);
  }

  // Loader script
  if (typeof window.require === "undefined") {
    promises.push(
      new Promise((resolve, reject) => {
        const s = document.createElement("script");
        s.src = LOADER_SRC;
        s.async = true;
        s.onload = () => resolve();
        s.onerror = () => reject(new Error("loader failed"));
        document.head.appendChild(s);
      })
    );
  }

  return Promise.all(promises);
}
function getCode() {
  if (monacoEditor) return String(monacoEditor.getValue() || "");
  return CPP_TEMPLATE;
}

function detectTraversalOrder(code) {
  // super light heuristics based on relative order of output vs left/right calls
  const bodyMatch = code.match(/void\s+traverse\s*\([^)]*\)\s*\{([\s\S]*?)\}/);
  const body = bodyMatch ? bodyMatch[1] : code;
  const outIdx = body.search(/\b(output|cout)\b/);
  const leftIdx = body.search(/->left|traverse\s*\(\s*root->left\s*\)/);
  const rightIdx = body.search(/->right|traverse\s*\(\s*root->right\s*\)/);

  if (outIdx === -1) return "unknown";
  const minLR = Math.min(leftIdx === -1 ? 1e9 : leftIdx, rightIdx === -1 ? 1e9 : rightIdx);
  const maxLR = Math.max(leftIdx, rightIdx);
  if (outIdx < minLR) return "pre";
  if (leftIdx !== -1 && rightIdx !== -1 && outIdx > leftIdx && outIdx < rightIdx) return "in";
  if (outIdx > maxLR) return "post";
  return "pre";
}

function buildVirtueTree() {
  const nodes = [
    "温柔",
    "靠谱",
    "幽默",
    "耐心",
    "上进",
    "担当",
    "细心",
    "真诚",
    "热爱",
    "克制",
    "自律",
    "勇敢",
    "可爱",
    "善良",
    "浪漫",
  ];
  // perfect binary tree of 15 nodes in array form
  return nodes.map((val, i) => ({ val, left: 2 * i + 1, right: 2 * i + 2 }));
}

function traversePreview(order) {
  const arr = buildVirtueTree();
  const out = [];
  const dfs = (i) => {
    if (i < 0 || i >= arr.length) return;
    if (order === "pre") out.push(arr[i].val);
    dfs(arr[i].left);
    if (order === "in") out.push(arr[i].val);
    dfs(arr[i].right);
    if (order === "post") out.push(arr[i].val);
  };
  dfs(0);
  return out;
}

function syntaxCheck(code) {
  const src = String(code || "");
  const trimmed = src.trim();
  if (!trimmed) return { ok: false, msg: "Compilation Error\nEmpty source file" };

  if (/\bboyfriend\b/.test(src) && !/\bhusband\b/.test(src)) {
    return {
      ok: false,
      msg: "Compilation Error\nerror: 'boyfriend' was not declared in this scope. Did you mean 'husband'?",
    };
  }

  if (!src.includes(";")) {
    const lineX = src.split("\n").length;
    return { ok: false, msg: `Compilation Error\nExpected ';' at line ${lineX}` };
  }

  if (!src.includes("->left") && !src.includes("->right")) {
    return { ok: false, msg: "Compilation Error\nAre you sure you are traversing the tree?" };
  }

  // silly MLE easter egg
  if (/\bnew\b/.test(src) && /\bvector\b/.test(src)) {
    return {
      ok: false,
      msg: "Memory Limit Exceeded: My love for you occupies more than 256MB.",
      mle: true,
    };
  }

  return { ok: true };
}

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function runSimulation({ mode }) {
  consoleClear();
  const code = getCode();
  const check = syntaxCheck(code);
  if (!check.ok) {
    consoleWrite(check.msg);
    return;
  }

  consoleWrite("Compiling...");
  await sleep(1000);

  if (mode === "run") {
    consoleWrite("Running on test 1...");
    for (const v of B_VIRTUES_TEST1) {
      await sleep(180);
      consoleWrite(`output: ${v}`);
    }
    consoleWrite("Finished.");
    return;
  }

  // Submit: mimic CF judge scrolling through tests (no direct output for test 1)
  for (let i = 1; i <= 10; i++) {
    consoleWrite(`Running on test ${i}...`);
    await sleep(220);
  }
  consoleWrite("Running on test 11...");
  await sleep(2000);
  consoleWrite("Time Limit Exceeded");
  consoleWrite("1s内想不出来，不过没关系，时间还长，现在超时也没有关系");
}
function launchCelebration() {
  // 彩带 + 泡泡：短暂飘动后自动销毁
  if (!els.fxLayer) return;
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const now = Date.now();
  const seed = (now % 100000) / 100000;
  const confettiCount = 26;
  const bubbleCount = 14;

  const colors = [
    "#ff5a4f",
    "#ff7a62",
    "#ffb54a",
    "#ffe08a",
    "#ffffff",
    "#ffd1a8",
  ];

  const layer = els.fxLayer;

  for (let i = 0; i < confettiCount; i++) {
    const d = document.createElement("div");
    d.className = "fx fx-confetti";
    const left = Math.random() * 100;
    const sizeW = 7 + Math.random() * 8;
    const sizeH = 10 + Math.random() * 16;
    const rot = -40 + Math.random() * 80;
    const drift = (-18 + Math.random() * 36).toFixed(2);
    const duration = 900 + Math.random() * 800;
    const delay = Math.random() * 120;
    const color = colors[Math.floor(Math.random() * colors.length)];

    d.style.left = `${left}%`;
    d.style.width = `${sizeW}px`;
    d.style.height = `${sizeH}px`;
    d.style.background = color;
    d.style.setProperty("--fx-rot", `${rot}deg`);
    d.style.setProperty("--fx-drift", `${drift}vw`);
    d.style.setProperty("--fx-dur", `${duration}ms`);
    d.style.animationDelay = `${delay}ms`;

    layer.appendChild(d);
    window.setTimeout(() => d.remove(), duration + delay + 120);
  }

  for (let i = 0; i < bubbleCount; i++) {
    const b = document.createElement("div");
    b.className = "fx fx-bubble";
    const left = 10 + Math.random() * 80;
    const size = 10 + Math.random() * 22;
    const drift = (-10 + Math.random() * 20).toFixed(2);
    const duration = 1100 + Math.random() * 1100;
    const delay = Math.random() * 160;
    const hue = Math.floor(22 + (seed * 40 + Math.random() * 20));

    b.style.left = `${left}%`;
    b.style.width = `${size}px`;
    b.style.height = `${size}px`;
    b.style.setProperty("--fx-drift", `${drift}vw`);
    b.style.setProperty("--fx-dur", `${duration}ms`);
    b.style.animationDelay = `${delay}ms`;
    b.style.setProperty("--fx-hue", String(hue));

    layer.appendChild(b);
    window.setTimeout(() => b.remove(), duration + delay + 160);
  }

  // Extra: 星屑 + 魔法圆环（“元素感”）
  const starCount = 14;
  const ringCount = 2;
  for (let i = 0; i < starCount; i++) {
    const s = document.createElement("div");
    s.className = "fx fx-star";
    const left = 20 + Math.random() * 60;
    const top = 24 + Math.random() * 46;
    const size = 6 + Math.random() * 12;
    const duration = 700 + Math.random() * 650;
    const delay = Math.random() * 120;
    const drift = (-10 + Math.random() * 20).toFixed(2);
    const hue = Math.floor(195 + Math.random() * 35); // bluish

    s.style.left = `${left}%`;
    s.style.top = `${top}%`;
    s.style.width = `${size}px`;
    s.style.height = `${size}px`;
    s.style.setProperty("--fx-drift", `${drift}vw`);
    s.style.setProperty("--fx-dur", `${duration}ms`);
    s.style.animationDelay = `${delay}ms`;
    s.style.setProperty("--fx-hue", String(hue));
    els.fxLayer.appendChild(s);
    window.setTimeout(() => s.remove(), duration + delay + 160);
  }

  for (let i = 0; i < ringCount; i++) {
    const r = document.createElement("div");
    r.className = "fx fx-ring";
    const left = 54 + (Math.random() * 10 - 5);
    const top = 38 + (Math.random() * 10 - 5);
    const size = 180 + Math.random() * 120;
    const duration = 900 + Math.random() * 700;
    const delay = 30 + Math.random() * 120;
    const hue = Math.floor(190 + Math.random() * 40);

    r.style.left = `${left}%`;
    r.style.top = `${top}%`;
    r.style.width = `${size}px`;
    r.style.height = `${size}px`;
    r.style.setProperty("--fx-dur", `${duration}ms`);
    r.style.animationDelay = `${delay}ms`;
    r.style.setProperty("--fx-hue", String(hue));
    els.fxLayer.appendChild(r);
    window.setTimeout(() => r.remove(), duration + delay + 200);
  }
}

function showPhotoBubbles() {
  if (els.giftWall) els.giftWall.classList.add("gift-wall--hidden");
  if (els.photoBubbleWall) els.photoBubbleWall.classList.remove("photo-bubble-wall--hidden");
  if (els.letterScroll) els.letterScroll.classList.add("letter--hidden");
  if (els.danmakuLayer) els.danmakuLayer.style.display = "";
  if (els.photoUploadLabel) els.photoUploadLabel.style.display = "";
}

function showLetterView(data) {
  stopDanmaku();
  if (els.danmakuLayer) els.danmakuLayer.style.display = "none";
  if (els.photoUploadLabel) els.photoUploadLabel.style.display = "none";
  if (els.photoBubbleWall) els.photoBubbleWall.classList.add("photo-bubble-wall--hidden");
  if (els.giftWall) els.giftWall.classList.add("gift-wall--hidden");
  if (!els.letterScroll) return;

  const letter = data.letter || {};
  if (els.letterTitle) els.letterTitle.textContent = letter.title || "给你的一封信";
  if (els.letterSign) els.letterSign.textContent = letter.sign || "";

  if (els.letterBody) {
    els.letterBody.innerHTML = "";
    const parts = Array.isArray(letter.body) ? letter.body : [String(letter.body || "")];
    parts.filter((p) => String(p).trim().length).forEach((p) => {
      const div = document.createElement("p");
      div.className = "letter__p";
      div.textContent = String(p);
      els.letterBody.appendChild(div);
    });
  }

  // restart open animation by cloning paper node
  const paper = els.letterScroll.querySelector(".letter__paper");
  if (paper) {
    const clone = paper.cloneNode(true);
    paper.replaceWith(clone);
  }

  els.letterScroll.classList.remove("letter--hidden");
}

function showGiftWall(data) {
  stopDanmaku();
  if (els.danmakuLayer) els.danmakuLayer.style.display = "none";
  if (els.letterScroll) els.letterScroll.classList.add("letter--hidden");
  if (els.photoUploadLabel) els.photoUploadLabel.style.display = "";

  if (els.photoBubbleWall) els.photoBubbleWall.classList.add("photo-bubble-wall--hidden");
  if (els.giftWall) els.giftWall.classList.remove("gift-wall--hidden");

  resetGiftState();

  const gw = data.giftWall || {};
  const maxOpen = Number(gw.maxOpen ?? 3);
  if (els.giftHint) els.giftHint.textContent = `可以拆 ${maxOpen} 朵小花哦～`;

  // 清空每个格子的内容（回到“只显示小花”）
  if (els.giftGrid) {
    els.giftGrid.querySelectorAll("button.gift").forEach((btn) => {
      const img = btn.querySelector(".gift__img");
      const text = btn.querySelector(".gift__text");
      if (img) img.removeAttribute("src");
      if (text) text.textContent = "";
    });
  }
}

function resetGiftState() {
  openedGifts = new Set();
  openedGiftOrder = [];
  if (els.giftGrid) {
    els.giftGrid.querySelectorAll("button.gift").forEach((b) => {
      b.classList.remove("gift--opened", "gift--shake", "gift--disabled");
      b.disabled = false;
    });
  }
  if (els.giftResult) els.giftResult.classList.add("gift-result--hidden");
  if (els.danmakuLayer) els.danmakuLayer.style.display = "";
}

function showGiftResult() {
  const data = CONTENT.D?.giftWall;
  const gifts = Array.isArray(data?.gifts) ? data.gifts : [];
  const picked = openedGiftOrder.slice(0, 3);
  if (!els.giftResult || !els.giftResultGrid) return;

  const items = els.giftResultGrid.querySelectorAll(".gift-result__item");
  items.forEach((itemEl, i) => {
    const idx = picked[i];
    const g = typeof idx === "number" ? gifts[idx] : null;
    const img = itemEl.querySelector(".gift-result__img");
    const text = itemEl.querySelector(".gift-result__text");
    if (img) img.src = g?.photo || "./unnamed.jpg";
    if (text) text.textContent = g?.text || "";
  });

  els.giftResult.classList.remove("gift-result--hidden");
}

function setupDefaultPhotos(photoUrls) {
  const bubbles = document.querySelectorAll(".photo-bubble img");
  bubbles.forEach((img) => {
    img.removeAttribute("src");
    img.style.opacity = "0";
  });
  if (!Array.isArray(photoUrls) || !photoUrls.length) return;
  for (let i = 0; i < bubbles.length && i < photoUrls.length; i++) {
    bubbles[i].src = photoUrls[i];
    bubbles[i].style.opacity = "1";
  }
}

function clearSelectedPhotos() {
  // revoke object urls
  for (const u of photoObjectUrls) URL.revokeObjectURL(u);
  photoObjectUrls = [];
  if (els.photoInput) els.photoInput.value = "";
}

function applySelectedPhotos(files) {
  clearSelectedPhotos();
  // D：在礼物墙界面选照片，就把照片依次作为每个“花朵礼物”的内容图（仅本次打开有效）
  if (currentChoice === "D" && els.giftWall && !els.giftWall.classList.contains("gift-wall--hidden")) {
    const gw = CONTENT.D?.giftWall;
    if (gw && Array.isArray(gw.gifts)) {
      const list = Array.from(files || []).slice(0, gw.gifts.length);
      list.forEach((file, idx) => {
        const url = URL.createObjectURL(file);
        photoObjectUrls.push(url);
        gw.gifts[idx] = { ...(gw.gifts[idx] || {}), photo: url };
      });
    }
    return;
  }

  const bubbles = document.querySelectorAll(".photo-bubble img");
  const list = Array.from(files || []).slice(0, bubbles.length);
  list.forEach((file, idx) => {
    const url = URL.createObjectURL(file);
    photoObjectUrls.push(url);
    const img = bubbles[idx];
    if (!img) return;
    img.src = url;
    img.style.opacity = "1";
  });
}

function startDanmaku(messages, danmakuConfig) {
  stopDanmaku();
  danmakuIdx = 0;
  const list = Array.isArray(messages) && messages.length ? messages : ["嘻嘻～"];
  if (!els.danmakuLayer) return;

  // 清空旧弹幕
  els.danmakuLayer.innerHTML = "";

  const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mode = (danmakuConfig && danmakuConfig.mode) || "float";

  if (mode === "off") return;

  if (mode === "static") {
    const count = Math.max(4, Math.min(18, Number(danmakuConfig.count ?? 12)));
    const bubbles = [];

    // 更均匀：用“网格 + 小抖动”的方式铺满屏幕（顶部也要有泡泡）
    const minTop = 10;
    const maxTop = 92;
    const minLeft = 6;
    const maxLeft = 94;
    const cols = 4;
    const rows = Math.ceil(count / cols);
    const cellW = (maxLeft - minLeft) / cols;
    const cellH = (maxTop - minTop) / rows;

    for (let i = 0; i < count; i++) {
      const b = document.createElement("div");
      b.className = "danmaku danmaku--static";
      b.textContent = list[i % list.length];

      const col = i % cols;
      const row = Math.floor(i / cols);
      const baseLeft = minLeft + col * cellW + cellW * 0.5;
      const baseTop = minTop + row * cellH + cellH * 0.5;
      const left = baseLeft + (Math.random() - 0.5) * cellW * 0.55;
      const top = baseTop + (Math.random() - 0.5) * cellH * 0.55;
      const size = 12 + Math.random() * 5;
      const bobDur = 2400 + Math.random() * 2200;
      const bobAmp = 6 + Math.random() * 10;
      const phase = Math.random() * 1000;

      b.style.left = `${left}%`;
      b.style.top = `${top}%`;
      b.style.fontSize = `${size}px`;
      b.style.setProperty("--bob-dur", `${bobDur}ms`);
      b.style.setProperty("--bob-amp", `${bobAmp}px`);
      b.style.animationDelay = `${phase}ms`;

      if (reduced) {
        b.style.animation = "none";
        b.style.opacity = "0.92";
      }

      els.danmakuLayer.appendChild(b);
      bubbles.push(b);
    }

    // 循环更新文字：每次换一个泡泡的内容，营造“弹幕在冒泡”的感觉
    let tick = 0;
    danmakuTimer = window.setInterval(() => {
      if (!els.danmakuLayer || els.galleryView.classList.contains("view--hidden")) return;
      const idx = tick % bubbles.length;
      const nextText = list[danmakuIdx % list.length];
      danmakuIdx++;
      tick++;

      const el = bubbles[idx];
      if (!el) return;
      el.classList.remove("danmaku--pop");
      // reflow to restart animation
      void el.offsetWidth;
      el.textContent = nextText;
      el.classList.add("danmaku--pop");
      window.setTimeout(() => el.classList.remove("danmaku--pop"), 420);
    }, 900);
    return;
  }

  // default: floating bubbles (previous behavior)
  if (reduced) return;

  const spawn = () => {
    if (!els.danmakuLayer || els.galleryView.classList.contains("view--hidden")) return;
    const text = list[danmakuIdx % list.length];
    danmakuIdx++;

    const b = document.createElement("div");
    b.className = "danmaku";
    b.textContent = text;

    const startX = 8 + Math.random() * 84; // %
    const startY = 70 + Math.random() * 20; // %
    const driftX = (-10 + Math.random() * 20).toFixed(2);
    const dur = 5200 + Math.random() * 2200;
    const size = 12 + Math.random() * 4;

    b.style.left = `${startX}%`;
    b.style.top = `${startY}%`;
    b.style.fontSize = `${size}px`;
    b.style.setProperty("--d-drift", `${driftX}vw`);
    b.style.setProperty("--d-dur", `${dur}ms`);

    els.danmakuLayer.appendChild(b);
    window.setTimeout(() => b.remove(), dur + 200);
  };

  for (let i = 0; i < 6; i++) spawn();
  danmakuTimer = window.setInterval(spawn, 900);
}

function stopDanmaku() {
  if (danmakuTimer) window.clearInterval(danmakuTimer);
  danmakuTimer = null;
  if (els.danmakuLayer) els.danmakuLayer.innerHTML = "";
}

function main() {
  // Initialize route based on hash
  const hashChoice = (location.hash || "").replace("#", "").trim().toUpperCase();
  if (hashChoice === "B") {
    history.replaceState({ view: "cf" }, "", "#B");
    showCfView({ pushHistory: false });
  } else if (hashChoice && CONTENT[hashChoice]) {
    history.replaceState({ view: "gallery", choice: hashChoice }, "", `#${hashChoice}`);
    showGalleryView(hashChoice, { pushHistory: false });
  } else {
    history.replaceState({ view: "home" }, "", "#home");
    showHomeView({ pushHistory: false });
  }

  // Bubble is always visible; clicking character just gives a tiny "nudge" animation.
  if (els.characterButton) {
    els.characterButton.addEventListener("click", () => {
      els.characterButton.animate(
        [
          { transform: "translateY(0)" },
          { transform: "translateY(-6px)" },
          { transform: "translateY(0)" },
        ],
        { duration: 260, easing: "ease-out" }
      );
    });
  }

  const onChoiceClick = (e) => {
    const btn = e.target instanceof Element ? e.target.closest("button.choice") : null;
    if (!btn) return;
    const choice = btn.getAttribute("data-choice");
    if (!choice || !CONTENT[choice]) return;
    showGalleryView(choice, { pushHistory: true });
  };

  // Prefer delegated handler on #choices, but also add a document fallback to avoid “click no response”
  if (els.choices) els.choices.addEventListener("click", onChoiceClick);
  document.addEventListener("click", onChoiceClick);

  // Extra-hard fallback: capture pointer events (in case something stops click bubbling)
  const onChoicePointer = (e) => {
    const t = e.target;
    const btn = t instanceof Element ? t.closest("button.choice") : null;
    if (!btn) return;
    const choice = btn.getAttribute("data-choice");
    if (!choice || !CONTENT[choice]) return;
    // avoid double-trigger with click
    e.preventDefault?.();
    e.stopPropagation?.();
    showGalleryView(choice, { pushHistory: true });
  };
  document.addEventListener("pointerdown", onChoicePointer, { capture: true });

  // Absolute fallback: bind directly on every choice button and navigate via hash (no History API dependency).
  document.querySelectorAll("button.choice").forEach((b) => {
    b.addEventListener(
      "click",
      (e) => {
        const choice = b.getAttribute("data-choice");
        if (!choice || !CONTENT[choice]) return;
        e.preventDefault();
        e.stopPropagation();
        location.hash = `#${choice}`;
        showGalleryView(choice, { pushHistory: false });
      },
      { capture: true }
    );
  });

  // "返回"：点一下就回主页（稳定、直观）
  if (els.galleryBackBtn) {
    els.galleryBackBtn.addEventListener("click", () => showHomeView({ pushHistory: true }));
  }

  window.addEventListener("popstate", (e) => {
    applyRoute(e.state);
  });

  // CF view actions
  if (els.cfBackBtn) els.cfBackBtn.addEventListener("click", () => showHomeView({ pushHistory: true }));
  if (els.runBtn) els.runBtn.addEventListener("click", () => runSimulation({ mode: "run" }));
  if (els.submitBtn) els.submitBtn.addEventListener("click", () => runSimulation({ mode: "submit" }));

  // Gift wall interaction (D)
  if (els.giftGrid) {
    els.giftGrid.addEventListener("click", (e) => {
      const btn = e.target instanceof Element ? e.target.closest("button.gift") : null;
      if (!btn) return;
      if (btn.classList.contains("gift--opened") || btn.classList.contains("gift--disabled")) return;
      if (currentChoice !== "D") return;

      const data = CONTENT.D?.giftWall;
      const maxOpen = Number(data?.maxOpen ?? 3);
      const gifts = Array.isArray(data?.gifts) ? data.gifts : [];
      if (openedGifts.size >= maxOpen) return;

      const id = btn.getAttribute("data-gift") || "";
      const idx = Number(id);
      openedGifts.add(id);
      openedGiftOrder.push(idx);

      // 剧烈晃动
      btn.classList.remove("gift--shake");
      void btn.offsetWidth;
      btn.classList.add("gift--shake");
      window.setTimeout(() => btn.classList.remove("gift--shake"), 560);

      // 标记已拆
      btn.classList.add("gift--opened");
      btn.disabled = true;

      // 产生一个图片和文字（显示在对应格子里）
      const item = gifts[idx] || {};
      window.setTimeout(() => {
        const img = btn.querySelector(".gift__img");
        const text = btn.querySelector(".gift__text");
        if (img) img.src = item.photo || "./unnamed.jpg";
        if (text) text.textContent = item.text || "";
      }, 220);

      if (openedGifts.size >= maxOpen) {
        // 全部拆完（指允许拆的数量）：只喷彩带，不需要展示“全部礼物”
        els.giftGrid.querySelectorAll("button.gift").forEach((b) => {
          if (!b.classList.contains("gift--opened")) {
            b.classList.add("gift--disabled");
            b.disabled = true;
          }
        });
        if (els.giftHint) els.giftHint.textContent = "拆完啦～嘻嘻！";
        launchCelebration();
        showGiftResult();
      } else {
        const left = maxOpen - openedGifts.size;
        if (els.giftHint) els.giftHint.textContent = `再拆 ${left} 朵小花～`;
      }
    });
  }

  // Gift result overlay actions
  if (els.giftResultClose) {
    els.giftResultClose.addEventListener("click", () => {
      if (els.giftResult) els.giftResult.classList.add("gift-result--hidden");
    });
  }
  if (els.giftResultBackHome) {
    els.giftResultBackHome.addEventListener("click", () => showHomeView({ pushHistory: true }));
  }

  if (els.photoInput) {
    els.photoInput.addEventListener("change", (e) => {
      const input = e.target;
      if (!(input instanceof HTMLInputElement) || !input.files) return;
      applySelectedPhotos(input.files);
    });
  }
}

try {
  main();
  window.__gift_app_loaded = true;
} catch (e) {
  // Surface fatal errors to the UI (users may not open devtools)
  const msg = e instanceof Error ? e.message : String(e);
  try {
    // eslint-disable-next-line no-console
    console.error(e);
  } catch {}
  const bubbleTitle = document.getElementById("bubbleTitle");
  if (bubbleTitle) bubbleTitle.textContent = `JS错误：${msg}`;
}


