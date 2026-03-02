/* ======================== Footer ============================
 *  Chi Mei Deepening Plan Footer
 *  - 將整段導覽列 HTML 以 JS 注入
 *  - 兼容 file://、HTTP/HTTPS
 * =========================================================== */

(function () {
  const html = `
  <footer id="footer_fixed" class="fixed bottom-0 left-0 w-full bg-gray-800 text-gray-200 z-50 shadow-inner">
    <div class="container mx-auto flex justify-between items-center py-3 px-6 text-sm">
      <div>
        <p class="m-0 text-gray-400">&copy; 2025 奇美醫院・深耕計畫辦公室</p>
        <p class="m-0 text-gray-400 text-xs">Chi Mei Medical Center</p>
      </div>
      <span id="spanFileInfo" class="text-xs text-gray-400"></span>
    </div>
  </footer>`;

  function initFooter() {
    const target = document.getElementById("footer_layer");
    if (!target) return;
    target.innerHTML = html;
    adjustBodyPadding();
  }

  function adjustBodyPadding() {
    const f = document.getElementById("footer_fixed");
    if (f) document.body.style.paddingBottom = `${f.offsetHeight + 10}px`;
  }

  // 初始化
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFooter);
  } else {
    initFooter();
  }

  // 視窗尺寸變化時重算
  window.addEventListener("resize", adjustBodyPadding);

  // 瀏覽人次判斷（保持你的原本功能）
  if (typeof getFileInfo === "function") getFileInfo("9400");
  if (typeof getCounter === "function") getCounter("59400", "0");
})();
