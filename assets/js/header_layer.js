(function () {
  const navHTML = `
  <header class="bg-white shadow-sm">
    <div class="container mx-auto flex items-center justify-between min-h-16 md:h-18 px-4">
      <!-- 左側：Logo + 網站名稱 -->
      <div class="flex items-center gap-3">
        <a href="index.html" class="flex items-center gap-3 group">
          <img src="assets/images/chi_mei_medical_center_blue.png" alt="奇美醫院標誌" class="h-10 md:h-12 w-auto">
          <h1 class="hidden md:block text-xl sm:text-2xl font-bold text-gray-800 group-hover:text-cyan-700 transition-colors">
            奇美醫院健康台灣深耕計畫
          </h1>
        </a>
      </div>
    </div>
  </header>

  <!-- 導覽列 -->
  <nav class="bg-cyan-500 text-white shadow-md relative z-50">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between min-h-16 md:h-18">
        <!-- 手機模式：上方網站名稱 + 右側按鈕 -->
        <div class="md:hidden w-full px-2 flex items-center justify-between">
          <a href="index.html" class="text-white text-base font-semibold hover:underline hover:underline-offset-2">
            奇美醫院健康台灣深耕計畫
          </a>
          <button id="mobile-menu-button"
            class="inline-flex items-center justify-center px-3 py-2 rounded-lg
                   bg-white border border-cyan-600 text-cyan-700 font-medium shadow
                   hover:bg-cyan-600 hover:text-white focus:outline-none
                   focus:ring-2 focus:ring-cyan-300 transition duration-200"
            aria-controls="mobile-menu" aria-expanded="false">
            <i class="fa-solid fa-bars text-lg"></i><span class="ml-2 text-sm">選單</span>
          </button>
        </div>

        <!-- 桌機主選單 -->
        <div id="mainNav" class="hidden md:flex items-center gap-4 md:gap-6 mx-auto order-2 flex-wrap">
          <a href="index.html" class="nav-link md:text-base lg:text-lg text-white hover:bg-cyan-600 px-3 py-2 rounded-md font-medium transition">計畫介紹</a>
		  <!-- 下拉選單 -->
          <div class="relative group">
            <button class="text-white hover:bg-cyan-600 px-3 py-2 md:text-base lg:text-lg rounded-md font-medium flex items-center focus:outline-none transition">
              最新消息 <i class="fa-solid fa-chevron-down ml-1 text-sm transition-transform duration-200 dd-caret"></i>
            </button>
            <div class="dropdownMenu hidden absolute left-0 mt-2 w-40 bg-white rounded-md shadow-lg ring-1 ring-black/10 z-50">
              <a href="events.html" class="dropdown-item block px-4 py-2 md:text-base lg:text-lg text-gray-700 hover:bg-cyan-100 text-base">活動公告</a>
              <a href="news.html" class="dropdown-item block px-4 py-2 md:text-base lg:text-lg text-gray-700 hover:bg-cyan-100 text-base">媒體報導</a>
            </div>
          </div>
		  <!-- 下拉選單 -->
          <div class="relative group">
            <button class="text-white hover:bg-cyan-600 px-3 py-2 md:text-base lg:text-lg rounded-md font-medium flex items-center focus:outline-none transition">
              活動成果 <i class="fa-solid fa-chevron-down ml-1 text-sm transition-transform duration-200 dd-caret"></i>
            </button>
            <div class="dropdownMenu hidden absolute left-0 mt-2 w-40 bg-white rounded-md shadow-lg ring-1 ring-black/10 z-50">
              <a href="epaper.html" class="dropdown-item block px-4 py-2 md:text-base lg:text-lg text-gray-700 hover:bg-cyan-100 text-base">電子報</a>
              <a href="review.html" class="dropdown-item block px-4 py-2 md:text-base lg:text-lg text-gray-700 hover:bg-cyan-100 text-base">活動回顧</a>
            </div>
          </div>
          <!--<a href="member.html" class="nav-link md:text-base lg:text-lg text-white hover:bg-cyan-600 px-3 py-2 rounded-md font-medium transition">成員簡介</a>-->
		  <a href="mech.html" class="nav-link md:text-base lg:text-lg text-white hover:bg-cyan-600 px-3 py-2 rounded-md font-medium transition">管考機制</a>
          <!--<a href="report.html" class="nav-link md:text-base lg:text-lg text-white hover:bg-cyan-600 px-3 py-2 rounded-md font-medium transition">指標填報</a>-->
          <a href="law.html" class="nav-link md:text-base lg:text-lg text-white hover:bg-cyan-600 px-3 py-2 rounded-md font-medium transition">相關辦法</a>
          <a href="form.html" class="nav-link md:text-base lg:text-lg text-white hover:bg-cyan-600 px-3 py-2 rounded-md font-medium transition">表單下載</a>
          <!--<a href="courses.html" class="nav-link md:text-base lg:text-lg text-white hover:bg-cyan-600 px-3 py-2 rounded-md font-medium transition">教學課程</a>-->
          <a href="links.html" class="nav-link md:text-base lg:text-lg text-white hover:bg-cyan-600 px-3 py-2 rounded-md font-medium transition">好站連結</a>
        </div>
      </div>
    </div>

    <!-- 手機選單 -->
    <div id="mobile-menu" class="md:hidden hidden bg-cyan-600">
      <div class="px-4 pt-2 pb-4 space-y-1">
        <a href="index.html" class="nav-link block text-white text-lg hover:bg-cyan-700 px-3 py-2 rounded-md">計畫介紹</a>
		<!-- 下拉選單 -->
		<button class="m-sub-toggle w-full text-left text-white text-lg hover:bg-cyan-700 px-3 py-2 rounded-md flex items-center justify-between">
		  <span>最新消息</span>
		  <i class="m-sub-caret fa-solid fa-chevron-down text-base"></i>
		</button>
		<div class="m-sub-menu hidden ml-3 mt-1 space-y-1">
		  <a href="events.html" class="dropdown-item block text-white/90 text-lg hover:bg-cyan-700 px-3 py-2 rounded-md">活動公告</a>
		  <a href="news.html" class="dropdown-item block text-white/90 text-lg hover:bg-cyan-700 px-3 py-2 rounded-md">媒體報導</a>
		</div>
		<!-- 下拉選單 -->
		<button class="m-sub-toggle w-full text-left text-white text-lg hover:bg-cyan-700 px-3 py-2 rounded-md flex items-center justify-between">
		  <span>活動成果</span>
		  <i class="m-sub-caret fa-solid fa-chevron-down text-base"></i>
		</button>
		<div class="m-sub-menu hidden ml-3 mt-1 space-y-1">
		  <a href="epaper.html" class="dropdown-item block text-white/90 text-lg hover:bg-cyan-700 px-3 py-2 rounded-md">電子報</a>
		  <a href="review.html" class="dropdown-item block px-4 py-2 md:text-base lg:text-lg text-gray-700 hover:bg-cyan-100 text-base">活動回顧</a>
		</div>
        <!--<a href="member.html" class="nav-link block text-white text-lg hover:bg-cyan-700 px-3 py-2 rounded-md">成員簡介</a>-->
		<a href="mech.html" class="nav-link block text-white text-lg hover:bg-cyan-700 px-3 py-2 rounded-md">管考機制</a>
        <!--<a href="report.html" class="nav-link block text-white text-lg hover:bg-cyan-700 px-3 py-2 rounded-md">指標填報</a>-->
        <a href="law.html" class="nav-link block text-white text-lg hover:bg-cyan-700 px-3 py-2 rounded-md">相關辦法</a>
        <a href="form.html" class="nav-link block text-white text-lg hover:bg-cyan-700 px-3 py-2 rounded-md">表單下載</a>
        <!--<a href="courses.html" class="nav-link block text-white text-lg hover:bg-cyan-700 px-3 py-2 rounded-md">教學課程</a>-->
        <a href="links.html" class="nav-link block text-white text-lg hover:bg-cyan-700 px-3 py-2 rounded-md">好站連結</a>
      </div>
    </div>
  </nav>
  `;

  function mountNav() {
    const target = document.getElementById("header") || document.getElementById("header_layer");
    if (!target) return;
    target.innerHTML = navHTML;

    // 手機選單開關
    const btn = document.getElementById("mobile-menu-button");
    const menu = document.getElementById("mobile-menu");
    btn?.addEventListener("click", () => menu.classList.toggle("hidden"));

    // ==============================
	// 手機版「多組子選單」穩定控制（最終版）
	// ==============================
	const mobileToggles = document.querySelectorAll(".m-sub-toggle");

	mobileToggles.forEach(toggle => {
	  const menu = toggle.nextElementSibling;
	  const caret = toggle.querySelector(".m-sub-caret");

	  if (!menu) return;

	  toggle.addEventListener("click", (e) => {
		e.preventDefault();

		const isOpen = !menu.classList.contains("hidden");

		// 先關閉全部子選單
		document.querySelectorAll(".m-sub-menu").forEach(m => m.classList.add("hidden"));
		document.querySelectorAll(".m-sub-caret").forEach(c => c.classList.remove("rotate-180"));

		// 只打開目前這一組
		if (!isOpen) {
		  menu.classList.remove("hidden");
		  caret?.classList.add("rotate-180");
		}
	  });
	});

    // ==============================
	// 桌機版「多組」下拉選單 hover 控制（可正常點擊版）
	// ==============================
	const dropdownGroups = document.querySelectorAll(".relative.group");

	// 點擊按鈕開關
	dropdownGroups.forEach(group => {
	  const button = group.querySelector("button");
	  const menu = group.querySelector(".dropdownMenu");
	  const caret = button?.querySelector(".dd-caret");

	  if (!button || !menu) return;

	  button.addEventListener("click", (e) => {
		e.preventDefault();
		e.stopPropagation();

		const isOpen = !menu.classList.contains("hidden");

		// 關閉全部
		document.querySelectorAll(".dropdownMenu").forEach(m => m.classList.add("hidden"));
		document.querySelectorAll(".dd-caret").forEach(c => c.classList.remove("rotate-180"));

		// 只開自己
		if (!isOpen) {
		  menu.classList.remove("hidden");
		  caret?.classList.add("rotate-180");
		}
	  });

	  // 點擊選單內部，不關閉
	  menu.addEventListener("click", (e) => {
		e.stopPropagation();
	  });
	});

	// 點擊畫面其他地方 → 全部關閉
	document.addEventListener("click", () => {
	  document.querySelectorAll(".dropdownMenu").forEach(m => m.classList.add("hidden"));
	  document.querySelectorAll(".dd-caret").forEach(c => c.classList.remove("rotate-180"));
	});
    
    // ==============================
	// 主選單 / 下拉選單 Active 效果（最終強化版）
	// ==============================

	// 取得目前網址最後一段（支援 /news、/news.html、?tab、#hash）
	const rawPath = location.pathname.toLowerCase();
	const currentPage = rawPath.endsWith("/")
	  ? rawPath.split("/").slice(-2, -1)[0]
	  : rawPath.split("/").pop().replace(".html", "");

	const navLinks = document.querySelectorAll(".nav-link");
	const dropLinks = document.querySelectorAll(".dropdown-item");

	function clearActive() {
	  [...navLinks, ...dropLinks].forEach(link => {
		link.classList.remove(
		  "bg-cyan-700",
		  "text-white",
		  "font-semibold",
		  "active"
		);
	  });
	}

	function setActive(link) {
	  clearActive();

	  // 讓「下拉項目」真的看得出有亮
	  link.classList.remove("text-gray-700");
	  link.classList.add(
		"bg-cyan-700",
		"text-white",
		"font-semibold",
		"active"
	  );

	  // 同步點亮上層 button（最新消息、管考機制）
	  const parentGroup = link.closest(".relative.group");
	  if (parentGroup) {
		const parentBtn = parentGroup.querySelector("button");
		parentBtn?.classList.add(
		  "bg-cyan-700",
		  "text-white",
		  "font-semibold"
		);
	  }
	}

	// 自動比對目前頁面
	let activeLink =
	  Array.from([...navLinks, ...dropLinks]).find(link => {
		const hrefRaw = (link.getAttribute("href") || "")
		  .toLowerCase()
		  .split("?")[0]
		  .split("#")[0]
		  .replace(".html", "");

		return hrefRaw === currentPage;
	  });

	// 初始化高亮
	if (activeLink) setActive(activeLink);

	// 點擊即時高亮
	[...navLinks, ...dropLinks].forEach(link => {
	  link.addEventListener("click", () => setActive(link));
	});

  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountNav);
  } else {
    mountNav();
  }
})();
