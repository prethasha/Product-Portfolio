/* =====================================================================
   MAIN.JS — makes the page interactive
   =====================================================================
   You normally DON'T need to edit this file.
   - To add/change case studies → edit js/case-studies.js
   - To change text → edit index.html
   - To change colours → edit css/style.css

   What this file does:
   1. Builds the case-study cards from CASE_STUDIES
   2. Builds the hero carousel from case studies marked featured: true
   3. Case study PDFs open in a new browser tab
   4. Small extras: menu shadow on scroll, fade-in animation, footer year
   ===================================================================== */

(function () {
  "use strict";

  // ----- Helper: makes text safe to put inside HTML -----
  function safe(text) {
    const div = document.createElement("div");
    div.textContent = text == null ? "" : String(text);
    return div.innerHTML;
  }

  // ----- Fade-in on scroll for anything with class="reveal" -----
  // This runs FIRST so the page is always visible, even if something
  // further down has a problem (e.g. a typo in case-studies.js).
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

  // ----- Read the case studies list (from js/case-studies.js) -----
  const studies = (typeof CASE_STUDIES !== "undefined" && Array.isArray(CASE_STUDIES)) ? CASE_STUDIES : null;

  const grid = document.getElementById("caseStudyGrid");

  try {
    if (!studies) throw new Error("CASE_STUDIES list missing or has a typo");
    buildCards(studies);
    buildCarousel(studies.filter(function (s) { return s.featured; }));
    document.getElementById("caseStudyCount").textContent = studies.length;
  } catch (err) {
    // Something is wrong with the list → show a friendly message instead of a blank space
    console.error(err);
    document.getElementById("caseStudyError").classList.remove("d-none");
    document.getElementById("featuredCarousel").classList.add("d-none");
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
                // target="_blank" = open the PDF in a new tab
                '<a class="btn btn-brand btn-read " href="' + safe(s.pdf) + '" target="_blank" rel="noopener">' +
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
     2. HERO CAROUSEL (only case studies with featured: true)
     =================================================================== */
  function buildCarousel(featured) {
    const carousel = document.getElementById("featuredCarousel");
    if (!featured.length) { carousel.classList.add("d-none"); return; }

    const slides = document.getElementById("carouselSlides");
    const dots = document.getElementById("carouselIndicators");

    slides.innerHTML = featured.map(function (s, i) {
      return (
        '<div class="carousel-item' + (i === 0 ? " active" : "") + '">' +
          '<img src="' + safe(s.image) + '" class="carousel-img" alt="Cover image for ' + safe(s.title) + '">' +
          '<div class="slide-body">' +
            '<p class="cs-category mb-0">' + safe(s.category) + (s.label ? " · " + safe(s.label) : "") + "</p>" +
            "<h3>" + safe(s.title) + "</h3>" +
            "<p>" + safe(s.summary) + "</p>" +
            '<a class="btn btn-outline-brand btn-sm " href="' + safe(s.pdf) + '" target="_blank" rel="noopener">' +
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
     3. PDF LINKS
     Every "Read case study" button is a normal link with target="_blank",
     so the PDF opens in a NEW BROWSER TAB using the browser's own PDF
     viewer (zoom, scroll, download all built in). Nothing else needed here.
     =================================================================== */

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

  // Footer year
  document.getElementById("year").textContent = new Date().getFullYear();
})();
