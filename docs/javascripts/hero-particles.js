/* ===========================================================
   首页 Hero 海面波光粒子
   - 仅在存在 .cl-hero 的首页生效；无依赖
   - 粒子位置/大小/周期随机，闪烁动画本身在 extra.css（.cl-sparkle）
   - 尊重 prefers-reduced-motion：开启时直接不生成
   =========================================================== */
(function () {
  "use strict";

  /* ---------- 可调参数 ---------- */
  var COUNT_DESKTOP = 16;      /* 桌面端粒子数 */
  var COUNT_MOBILE = 9;        /* 手机端粒子数（≤600px） */
  var SEA_X = [45, 98];        /* 粒子水平范围（%）：避开左侧文字区 */
  var SEA_X_MOBILE = [20, 98]; /* 手机端文字占满宽度，范围放宽 */
  var SEA_Y = [55, 92];        /* 粒子垂直范围（%）：横幅下部海面 */
  var SIZE = [2, 4];           /* 粒子直径（px） */
  var DURATION = [3, 6.5];     /* 单次闪烁周期（s） */
  var DELAY = [0, 6];          /* 初始延迟（s），错开闪烁节奏 */
  /* ---------------------------- */

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  function init() {
    var hero = document.querySelector(".cl-hero");
    if (!hero) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    var mobile = window.matchMedia("(max-width: 600px)").matches;
    var count = mobile ? COUNT_MOBILE : COUNT_DESKTOP;
    var xr = mobile ? SEA_X_MOBILE : SEA_X;

    var layer = document.createElement("div");
    layer.className = "cl-hero__sparkles";
    layer.setAttribute("aria-hidden", "true");

    for (var i = 0; i < count; i++) {
      var s = document.createElement("span");
      var size = rand(SIZE[0], SIZE[1]);
      s.className = "cl-sparkle";
      s.style.left = rand(xr[0], xr[1]).toFixed(1) + "%";
      s.style.top = rand(SEA_Y[0], SEA_Y[1]).toFixed(1) + "%";
      s.style.width = size.toFixed(1) + "px";
      s.style.height = size.toFixed(1) + "px";
      s.style.animationDuration = rand(DURATION[0], DURATION[1]).toFixed(2) + "s";
      s.style.animationDelay = rand(DELAY[0], DELAY[1]).toFixed(2) + "s";
      layer.appendChild(s);
    }

    hero.appendChild(layer);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
