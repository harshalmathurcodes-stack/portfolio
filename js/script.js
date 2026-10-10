// ==========================================================
// Harshal Mathur - Portfolio
// Dark / light toggle, mobile menu, active nav link, footer year
// ==========================================================

(function () {
  var root = document.documentElement;
  var themeBtn = document.getElementById("theme-toggle");
  var menuBtn = document.getElementById("menu-toggle");
  var navLinks = document.getElementById("nav-links");

  // ---------- Dark / Light mode ----------
  function getSavedTheme() {
    try {
      return localStorage.getItem("theme");
    } catch (e) {
      return null;
    }
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    themeBtn.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
    );
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {
      /* storage unavailable, ignore */
    }
  }

  var saved = getSavedTheme();
  if (saved === "light" || saved === "dark") {
    applyTheme(saved);
  } else {
    applyTheme("dark");
  }

  themeBtn.addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
  });

  // ---------- Mobile menu ----------
  menuBtn.addEventListener("click", function () {
    var open = navLinks.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.setAttribute("aria-label", "Open menu");
    });
  });

  // ---------- Highlight the nav link of the section in view ----------
  var sections = document.querySelectorAll("main section[id]");
  var links = navLinks.querySelectorAll("a");

  function setActive() {
    var scrollPos = window.scrollY + 140;
    var currentId = "";
    sections.forEach(function (section) {
      if (section.offsetTop <= scrollPos) {
        currentId = section.id;
      }
    });
    links.forEach(function (link) {
      link.classList.toggle("active", link.getAttribute("href") === "#" + currentId);
    });
  }

  window.addEventListener("scroll", setActive, { passive: true });
  setActive();

  // ---------- Footer year ----------
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
