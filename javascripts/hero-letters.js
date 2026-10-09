/* ===========================================================
   首页彩蛋：打字机字母砸香蕉树
   - 字母从左上角 Logo（打字机）跃出，沿抛物线斜向下撞向
     Hero 里的香蕉树，撞击闪光，偶尔砸落一根香蕉
   - 仅在存在 .cl-hero 的首页、且为白天模式时发射
     （slate 夜晚不发射，schedule() 里实时判断）
   - 无依赖，rAF 驱动；尊重 prefers-reduced-motion：开启时不运行
   - 元素一律 position: fixed（视口坐标），z-index 在 extra.css
   =========================================================== */
(function () {
  "use strict";

  /* ---------- 可调参数 ---------- */
  var CHARS = "abcdefghijklmnopqrstuvwxyz"; /* 跃出的字母池 */
  var INTERVAL = [2600, 5200];   /* 发射间隔（ms），区间内随机 */
  var DOUBLE_CHANCE = 0.3;       /* 快速连发第二颗的概率（像打字） */
  var FLIGHT = [1.25, 1.7];      /* 飞行时长（s） */
  var ARC = [70, 130];           /* 抛物线弧高（px） */
  var TREE = { x: 0.81, y: 0.42 };/* 香蕉位置：相对 Hero 宽/高的比例 */
  var BANANA_CHANCE = 0.22;      /* 砸中后掉落香蕉的概率 */
  var MAX_FLYING = 6;            /* 同时在飞的字母上限 */
  /* ---------------------------- */

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  /* Hero 是否足够可见（露出大半才发射，避免飞向屏幕外） */
  function heroTarget() {
    var hero = document.querySelector(".cl-hero");
    if (!hero) return null;
    var r = hero.getBoundingClientRect();
    if (r.bottom < window.innerHeight * 0.35 || r.top > window.innerHeight * 0.7) {
      return null;
    }
    return {
      x: r.left + r.width * TREE.x,
      y: r.top + r.height * TREE.y,
      seaY: r.bottom - 12        /* 香蕉落点：海面高度 */
    };
  }

  /* 撞击闪光：✦ 放大淡出（动画在 extra.css；定位用 left/top，
     避免与 CSS 动画里的 transform 互相覆盖，香蕉同理） */
  function impactFlash(x, y) {
    var f = document.createElement("span");
    f.className = "cl-letter-hit";
    f.textContent = "✦";
    f.style.left = x + "px";
    f.style.top = y + "px";
    document.body.appendChild(f);
    f.addEventListener("animationend", function () { f.remove(); });
  }

  /* 砸落香蕉：靠 CSS 变量 --cl-fall 指定下落距离，动画在 extra.css */
  function dropBanana(x, y, seaY) {
    var b = document.createElement("span");
    b.className = "cl-banana";
    b.textContent = "🍌";
    b.style.left = x + "px";
    b.style.top = y + "px";
    b.style.setProperty("--cl-fall", Math.max(seaY - y, 40) + "px");
    document.body.appendChild(b);
    b.addEventListener("animationend", function () { b.remove(); });
  }

  function launch() {
    var logo = document.querySelector(".md-logo");
    var target = heroTarget();
    if (!logo || !target) return;
    if (document.querySelectorAll(".cl-letter").length >= MAX_FLYING) return;

    var lr = logo.getBoundingClientRect();
    var sx = lr.left + lr.width / 2;   /* 起点：打字机中心 */
    var sy = lr.top + lr.height / 2;
    var ex = target.x + rand(-24, 24); /* 落点：香蕉附近随机散布 */
    var ey = target.y + rand(-14, 14);
    var arc = rand(ARC[0], ARC[1]);
    var dur = rand(FLIGHT[0], FLIGHT[1]) * 1000;
    var spin = rand(0.6, 1.4) * (Math.random() < 0.5 ? -360 : 360);

    var el = document.createElement("span");
    el.className = "cl-letter";
    el.textContent = CHARS.charAt(Math.floor(Math.random() * CHARS.length));
    document.body.appendChild(el);

    var t0 = performance.now();
    function step(now) {
      var t = (now - t0) / dur;
      if (t >= 1) {
        el.remove();
        impactFlash(ex, ey);
        if (Math.random() < BANANA_CHANCE) dropBanana(ex, ey, target.seaY);
        return;
      }
      /* 抛物线：x 匀速，y 在起点-终点连线上叠加开口向下的弧 */
      var x = sx + (ex - sx) * t;
      var y = sy + (ey - sy) * t - arc * 4 * t * (1 - t);
      el.style.transform =
        "translate(" + x.toFixed(1) + "px," + y.toFixed(1) + "px)" +
        " rotate(" + (spin * t).toFixed(1) + "deg)";
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function schedule() {
    setTimeout(function () {
      /* 仅白天模式发射：夜晚（slate）不要这个效果。
         每次到点实时判断，用户在页面上切换昼夜也能立即生效 */
      var night = document.body.getAttribute("data-md-color-scheme") === "slate";
      if (!document.hidden && !night) {
        launch();
        if (Math.random() < DOUBLE_CHANCE) setTimeout(launch, 180);
      }
      schedule();
    }, rand(INTERVAL[0], INTERVAL[1]));
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!document.querySelector(".cl-hero")) return;
  schedule();
})();
