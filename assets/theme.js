(function () {
  var KEY = "ai-bina-theme";
  var root = document.documentElement;

  function currentTheme() {
    return root.getAttribute("data-theme") === "light" ? "light" : "dark";
  }

  function applyTheme(theme) {
    if (theme === "light") {
      root.setAttribute("data-theme", "light");
    } else {
      root.removeAttribute("data-theme");
    }
    localStorage.setItem(KEY, theme);
  }

  var saved = localStorage.getItem(KEY);
  if (saved) applyTheme(saved);

  document.addEventListener("DOMContentLoaded", function () {
    var setButtons = document.querySelectorAll("[data-set-theme]");
    var toggleButtons = document.querySelectorAll("[data-toggle-theme]");
    if (!setButtons.length && !toggleButtons.length) return;

    function syncPressedState() {
      var current = currentTheme();
      setButtons.forEach(function (btn) {
        btn.setAttribute("aria-pressed", String(btn.dataset.setTheme === current));
      });
    }

    setButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyTheme(btn.dataset.setTheme);
        syncPressedState();
      });
    });

    toggleButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyTheme(currentTheme() === "light" ? "dark" : "light");
        syncPressedState();
      });
    });

    syncPressedState();
  });
})();
