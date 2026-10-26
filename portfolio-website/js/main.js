/* =====================================================================
   MAIN.JS — makes the page interactive
   =====================================================================
   You normally DON'T need to edit this file.
   - To add/change case studies → edit js/case-studies.js
   - To change text → edit index.html
   - To change colours → edit css/style.css

   What this file does:
   1. Builds the case-study cards + filter buttons from CASE_STUDIES
   2. Builds the hero carousel from case studies marked featured: true
   3. Opens PDFs in a popup (desktop) or a new tab (phones)
   4. Small extras: menu shadow on scroll, fade-in animation, footer year
   ===================================================================== */

(function () {
  "use strict";

  // On screens narrower than this (in pixels), PDFs open in a new tab
  // instead of the popup, because phone browsers display PDFs better that way.
  const PHONE_BREAKPOINT = 768;

  // ----- Helper: makes text safe to put inside HTML -----
  function safe(text) {
    const div = document.createElement("div");
    div.textContent = text == null ? "" : String(text);
    return div.innerHTML;
  }

  // ----- Read the case studies list (from js/case-studies.js) -----
  const studies = (typeof CASE_STUDIES !== "undefined" && Array.isArray(CASE_STUDIES)) ? CASE_STUDIES : null;

  const grid = document.getElementById("caseStudyGrid");
  const filterBar = document.getElementById("filterBar");

  if (!studies) {
    // The list has a typo → show a friendly message instead of a blank space
    document.getElementById("caseStudyError").classList.remove("d-none");
  } else {
    buildCards(studies);
    buildFilters(studies);
    buildCarousel(studies.filter(function (s) { return s.featured; }));
    document.getElementById("caseStudyCount").textContent = studies.length;
  }

  /* ===================================================================
     1a. CASE STUDY CARDS
     =================================================================== */
  function buildCards(list) {
    grid.innerHTML = list.map(function (s, i) {
      const tags = (s.tags || []).map(function (t) { return "<li>" + safe(t) + "</li>"; }).join("");
      const label = s.label ? '<span class="cs-label">' + safe(s.label) + "</span>" : "";
      return (
        '<div class="col-12 col-md-6 col-lg-4 cs-col" data-category="' + safe(s.category) + '">' +
          '<article class="cs-card">' +
            '<div class="cs-media">' +
              '<img src="' + safe(s.image) + '" alt="Cover image for ' + safe(s.title) + '" loading="lazy" width="1200" height="750">' +
              label +
            "</div>" +
            '<div class="cs-body">' +
              '<p class="cs-category">' + safe(s.category) + "</p>" +
              '<h3 class="cs-title">' + safe(s.title) + "</h3>" +
              '<p class="cs-summary">' + safe(s.summary) + "</p>" +
              '<ul class="cs-tags">' + tags + "</ul>" +
              '<div class="cs-actions">' +
                // Works as a normal link (new tab) if the popup can't be used
                '<a class="btn btn-brand btn-read js-open-pdf" href="' + safe(s.pdf) + '" target="_blank" rel="noopener" data-index="' + i + '">' +
                  'Read case study <i class="bi bi-arrow-up-right ms-1"></i></a>' +
                '<a class="btn btn-outline-brand" href="' + safe(s.pdf) + '" download aria-label="Download ' + safe(s.title) + ' PDF">' +
                  '<i class="bi bi-download"></i></a>' +
              "</div>" +
            "</div>" +
          "</article>" +
        "</div>"
      );
    }).join("");
  }

  /* ===================================================================
     1b. FILTER BUTTONS ("All", "Fintech", "Consumer app" …)
     Categories are collected automatically from the list.
     =================================================================== */
  function buildFilters(list) {
    const counts = {};
    list.forEach(function (s) { counts[s.category] = (counts[s.category] || 0) + 1; });
    const categories = Object.keys(counts);

    // Hide filters entirely if everything is in one category
    if (categories.length < 2) { filterBar.classList.add("d-none"); return; }

    let html = '<button type="button" class="filter-btn active" data-filter="all" aria-pressed="true">All<span class="count">' + list.length + "</span></button>";
    categories.forEach(function (c) {
      html += '<button type="button" class="filter-btn" data-filter="' + safe(c) + '" aria-pressed="false">' + safe(c) + '<span class="count">' + counts[c] + "</span></button>";
    });
    filterBar.innerHTML = html;

    filterBar.addEventListener("click", function (e) {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;
      const filter = btn.getAttribute("data-filter");

      filterBar.querySelectorAll(".filter-btn").forEach(function (b) {
        b.classList.toggle("active", b === btn);
        b.setAttribute("aria-pressed", b === btn ? "true" : "false");
      });
      grid.querySelectorAll(".cs-col").forEach(function (col) {
        const match = filter === "all" || col.getAttribute("data-category") === filter;
        col.classList.toggle("is-hidden", !match);
      });
    });
  }

  /* ===================================================================
     2. HERO CAROUSEL (only case studies with featured: true)
     =================================================================== */
  function buildCarousel(featured) {
    const carousel = document.getElementById("featuredCarousel");
    if (!featured.length) { carousel.classList.add("d-none"); return; }

    const slides = document.getElementById("carouselSlides");
    const dots = document.getElementById("carouselIndicators");

    slides.innerHTML = featured.map(function (s, i) {
      const index = studies.indexOf(s);
      return (
        '<div class="carousel-item' + (i === 0 ? " active" : "") + '">' +
          '<img src="' + safe(s.image) + '" class="carousel-img" alt="Cover image for ' + safe(s.title) + '">' +
          '<div class="slide-body">' +
            '<p class="cs-category mb-0">' + safe(s.category) + (s.label ? " · " + safe(s.label) : "") + "</p>" +
            "<h3>" + safe(s.title) + "</h3>" +
            "<p>" + safe(s.summary) + "</p>" +
            '<a class="btn btn-outline-brand btn-sm js-open-pdf" href="' + safe(s.pdf) + '" target="_blank" rel="noopener" data-index="' + index + '">' +
              'Read case study <i class="bi bi-arrow-up-right ms-1"></i></a>' +
          "</div>" +
        "</div>"
      );
    }).join("");

    dots.innerHTML = featured.map(function (s, i) {
      return '<button type="button" data-bs-target="#featuredCarousel" data-bs-slide-to="' + i + '"' +
        (i === 0 ? ' class="active" aria-current="true"' : "") + ' aria-label="Slide ' + (i + 1) + '"></button>';
    }).join("");

    // With only one slide, arrows and dots aren't needed
    if (featured.length === 1) {
      carousel.querySelectorAll(".carousel-control-prev, .carousel-control-next, .carousel-indicators")
        .forEach(function (el) { el.classList.add("d-none"); });
    }

    // Don't auto-slide for people who turned off animations
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      carousel.removeAttribute("data-bs-ride");
    }
  }

  /* ===================================================================
     3. PDF VIEWER
     Desktop/tablet → popup with the PDF inside.
     Phone          → the link simply opens the PDF in a new tab.
     =================================================================== */
  const modalEl = document.getElementById("pdfModal");
  const frame = document.getElementById("pdfFrame");
  const pdfModal = new bootstrap.Modal(modalEl);

  document.addEventListener("click", function (e) {
    const link = e.target.closest(".js-open-pdf");
    if (!link || !studies) return;
    if (window.innerWidth < PHONE_BREAKPOINT) return; // let the phone open it in a new tab

    e.preventDefault();
    const s = studies[Number(link.getAttribute("data-index"))];
    document.getElementById("pdfModalTitle").textContent = s.title;
    document.getElementById("pdfOpenTab").href = s.pdf;
    document.getElementById("pdfDownload").href = s.pdf;
    frame.src = s.pdf + "#view=FitH"; // fit the page width
    pdfModal.show();
  });

  // Empty the viewer when the popup closes (stops it using memory)
  modalEl.addEventListener("hidden.bs.modal", function () { frame.src = "about:blank"; });

  /* ===================================================================
     4. SMALL EXTRAS
     =================================================================== */

  // Menu: add a thin border once you scroll down
  const nav = document.getElementById("mainNav");
  function onScroll() { nav.classList.toggle("is-scrolled", window.scrollY > 10); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Phone menu: close it after tapping a link
  const navMenu = document.getElementById("navMenu");
  navMenu.addEventListener("click", function (e) {
    if (e.target.closest("a") && navMenu.classList.contains("show")) {
      bootstrap.Collapse.getOrCreateInstance(navMenu).hide();
    }
  });

  // Fade-in on scroll for anything with class="reveal"
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // Footer year
  document.getElementById("year").textContent = new Date().getFullYear();
})();
