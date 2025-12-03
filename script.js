(function () {
  const body = document.body;
  const THEME_KEY = "genaius-theme";

  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === "light" || savedTheme === "dark") {
    body.setAttribute("data-theme", savedTheme);
  }

  const themeToggle = document.querySelector(".theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current =
        body.getAttribute("data-theme") === "light" ? "dark" : "light";
      body.setAttribute("data-theme", current);
      localStorage.setItem(THEME_KEY, current);
    });
  }

  const header = document.getElementById("site-header");
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 24) {
        header.classList.add("header-scrolled");
      } else {
        header.classList.remove("header-scrolled");
      }
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
  }

  const nav = document.querySelector(".main-nav");
  const navToggle = document.querySelector(".nav-toggle");
  if (nav && navToggle) {
    navToggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#" || targetId === "#!") return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  const animated = document.querySelectorAll("[data-animate]");
  if ("IntersectionObserver" in window && animated.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );
    animated.forEach((el) => observer.observe(el));
  } else {
    animated.forEach((el) => el.classList.add("is-visible"));
  }

  const modal = document.getElementById("contact-modal");
  const CLOSE_ATTR = "[data-close-modal]";
  if (modal) {
    const showModal = () => {
      if (modal.getAttribute("aria-hidden") === "false") return;
      modal.setAttribute("aria-hidden", "false");
    };
    const hideModal = () => {
      modal.setAttribute("aria-hidden", "true");
    };

    setTimeout(showModal, 30000);

    modal.addEventListener("click", (e) => {
      if (e.target.matches(CLOSE_ATTR)) hideModal();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") hideModal();
    });
  }

  const chips = document.querySelectorAll(".chip");
  const priceCards = document.querySelectorAll(".pricing-card[data-category]");

  if (chips.length && priceCards.length) {
    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        const category = chip.getAttribute("data-category");
        chips.forEach((c) => c.classList.remove("chip-active"));
        chip.classList.add("chip-active");

        priceCards.forEach((card) => {
          const cardCat = card.getAttribute("data-category");
          if (category === "all" || cardCat === category) {
            card.style.display = "";
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  }
})();