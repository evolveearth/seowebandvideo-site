/**
 * DOES: Enforces Joseph's "Not Too Much Scrolling" Law across every local Evolve Studio & Business HTML page
 *       by turning stacked multi-section pages into a clean 1-section-at-a-time tabbed deck and paginating
 *       large card grids (>6 cards), tables (>10 rows), and tall vertical stacks using ONLY native chakras.css classes
 *       (.sc-toolbar, .sc-filters, .sc-filter-group, .sc-pill, .sc-pill.is-active, .bp-hidden, [hidden]).
 * IN:   Any page on :7863, :7871, :7872, :8094, :8655, :8941 that includes <script src="/ee-compact-deck.js" defer></script>.
 * OUT:  Compact single-screen views (~750px-1200px tall) alongside #ee-header and #ee-footer from /refineme-widget.js.
 * LAWS: Zero <style> tags, zero inline style="..." attributes, zero emojis.
 */
(function () {
  "use strict";
  if (window.__EE_COMPACT_DECK_LOADED__) return;
  window.__EE_COMPACT_DECK_LOADED__ = true;

  var MAX_CARDS_PER_PAGE = 6;
  var MAX_ROWS_PER_PAGE = 10;
  var MAX_STACK_BLOCKS = 3;

  function cleanLabel(text, fallback, index) {
    var raw = (text || "").replace(/\s+/g, " ").trim();
    if (!raw) raw = fallback || ("Section " + (index + 1));
    raw = raw.replace(/^(?:branch|section|step|part|class)?\s*\d+\s*[\u00b7\-:.]?\s*/i, "").trim();
    if (raw.length > 26) raw = raw.slice(0, 24).trim() + "..";
    var num = (index + 1) < 10 ? "0" + (index + 1) : String(index + 1);
    return num + " \u00b7 " + (raw || ("View " + num));
  }

  function findSectionLabel(sec, idx) {
    var h = sec.querySelector("h1, h2, h3, .h1, .h2, .h3, .sc-title, .ffp-role-title, .bp-block-title");
    if (h && h.textContent.trim()) return cleanLabel(h.textContent, "Section", idx);
    var k = sec.querySelector(".kicker, .bp-block-kicker, .label");
    if (k && k.textContent.trim()) return cleanLabel(k.textContent, "Section", idx);
    if (sec.id) return cleanLabel(sec.id.replace(/[-_]+/g, " "), "Section", idx);
    return cleanLabel("", "Section", idx);
  }

  function setHidden(el, hide) {
    if (!el) return;
    if (hide) {
      el.hidden = true;
      el.classList.add("bp-hidden");
    } else {
      el.hidden = false;
      el.classList.remove("bp-hidden");
    }
  }

  function paginateChildren(container, children, perPage, itemNoun) {
    if (!container || container.getAttribute("data-ee-paginated") === "1") return;
    if (children.length <= perPage) return;
    container.setAttribute("data-ee-paginated", "1");

    var currentPage = 0;
    var totalPages = Math.ceil(children.length / perPage);

    var bar = document.createElement("div");
    bar.className = "sc-filters";
    var leftGroup = document.createElement("div");
    leftGroup.className = "sc-filter-group";
    var statusSpan = document.createElement("span");
    statusSpan.className = "sc-status";
    leftGroup.appendChild(statusSpan);

    var rightGroup = document.createElement("div");
    rightGroup.className = "sc-filter-group";

    var prevBtn = document.createElement("button");
    prevBtn.type = "button";
    prevBtn.className = "sc-pill";
    prevBtn.textContent = "Previous";

    var pagePills = [];
    var maxPills = Math.min(totalPages, 8);
    for (var p = 0; p < maxPills; p++) {
      (function (pageIdx) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "sc-pill";
        btn.textContent = String(pageIdx + 1);
        btn.addEventListener("click", function () {
          renderPage(pageIdx);
        });
        pagePills.push(btn);
        rightGroup.appendChild(btn);
      })(p);
    }

    var nextBtn = document.createElement("button");
    nextBtn.type = "button";
    nextBtn.className = "sc-pill sc-pill--action";
    nextBtn.textContent = "Next";

    prevBtn.addEventListener("click", function () {
      if (currentPage > 0) renderPage(currentPage - 1);
    });
    nextBtn.addEventListener("click", function () {
      if (currentPage < totalPages - 1) renderPage(currentPage + 1);
    });

    rightGroup.insertBefore(prevBtn, rightGroup.firstChild);
    rightGroup.appendChild(nextBtn);
    bar.appendChild(leftGroup);
    bar.appendChild(rightGroup);

    container.parentNode.insertBefore(bar, container);

    function renderPage(pIdx) {
      currentPage = pIdx;
      var start = pIdx * perPage;
      var end = start + perPage;
      for (var i = 0; i < children.length; i++) {
        setHidden(children[i], !(i >= start && i < end));
      }
      var shownEnd = Math.min(end, children.length);
      statusSpan.textContent = "Showing " + (start + 1) + "\u2013" + shownEnd + " of " + children.length + " " + itemNoun + " (Page " + (pIdx + 1) + " of " + totalPages + ")";
      for (var j = 0; j < pagePills.length; j++) {
        if (j === pIdx) pagePills[j].classList.add("is-active");
        else pagePills[j].classList.remove("is-active");
      }
    }

    renderPage(0);
  }

  function paginateGrid(grid) {
    if (!grid || grid.getAttribute("data-ee-paginated") === "1") return;
    if (grid.closest("[data-ee-custom-deck='1']")) return;
    var children = Array.prototype.slice.call(grid.children).filter(function (c) {
      return c.tagName !== "SCRIPT" && c.tagName !== "TEMPLATE" && !c.classList.contains("sc-filters");
    });
    if (children.length <= MAX_CARDS_PER_PAGE) return;
    paginateChildren(grid, children, MAX_CARDS_PER_PAGE, "cards");
  }

  function paginateTable(table) {
    if (!table || table.getAttribute("data-ee-paginated") === "1") return;
    if (table.closest("[data-ee-custom-deck='1']")) return;
    var tbody = table.querySelector("tbody") || table;
    var allRows = Array.prototype.slice.call(tbody.querySelectorAll("tr")).filter(function (tr) {
      return !tr.querySelector("th");
    });
    if (allRows.length <= MAX_ROWS_PER_PAGE) return;
    var wrap = table.closest(".sc-table-wrap, .bp-ledger-table-wrap") || table;
    paginateChildren(wrap, allRows, MAX_ROWS_PER_PAGE, "rows");
  }

  function findCandidateSections() {
    var main = document.querySelector("main") || document.body;
    if (main.getAttribute("data-ee-custom-deck") === "1" || document.body.getAttribute("data-ee-custom-deck") === "1") {
      return [];
    }
    var tree = main.querySelector(".tree");
    if (tree) {
      var branches = Array.prototype.slice.call(tree.querySelectorAll(":scope > .tree-branch, :scope > section"));
      var hero = main.querySelector(":scope > .tree-hero, :scope > section.hero");
      if (branches.length >= 2) {
        return hero ? [hero].concat(branches) : branches;
      }
    }
    var directSecs = Array.prototype.slice.call(main.querySelectorAll(":scope > section, :scope > .section, :scope > .bp-block, :scope > .oocss-section, :scope > article"));
    if (directSecs.length >= 2) return directSecs;

    var firstDiv = main.querySelector(":scope > div.container, :scope > div.stack, :scope > div.oocss-shell, :scope > div.wrap, :scope > div");
    if (firstDiv) {
      var innerSecs = Array.prototype.slice.call(firstDiv.querySelectorAll(":scope > section, :scope > .section, :scope > .bp-block, :scope > .oocss-section, :scope > article"));
      if (innerSecs.length >= 2) return innerSecs;
    }

    var bodySecs = Array.prototype.slice.call(document.body.querySelectorAll(":scope > section, :scope > .section, :scope > .bp-block"));
    if (bodySecs.length >= 2) return bodySecs;

    return [];
  }

  function compactTallSection(sec) {
    if (!sec || sec.getAttribute("data-ee-sec-compacted") === "1") return;
    sec.setAttribute("data-ee-sec-compacted", "1");
    if (document.documentElement.scrollHeight <= 1250) return;

    var target = sec.querySelector(":scope > .container, :scope > .stack, :scope > .oocss-shell") || sec;
    var blocks = Array.prototype.slice.call(target.children).filter(function (el) {
      if (el.tagName === "SCRIPT" || el.tagName === "TEMPLATE" || el.id === "ee-header" || el.id === "ee-footer" || el.id === "ee-compact-section-deck") return false;
      if (el.classList.contains("sc-toolbar") || el.classList.contains("sc-filters")) return false;
      return true;
    });
    if (blocks.length > MAX_STACK_BLOCKS) {
      paginateChildren(blocks[0], blocks, MAX_STACK_BLOCKS, "blocks");
    }
  }

  function buildSectionDeck(sections) {
    if (!sections || sections.length < 2) return;
    if (document.getElementById("ee-compact-section-deck")) return;

    var activeIdx = 0;
    var deck = document.createElement("div");
    deck.id = "ee-compact-section-deck";
    deck.className = "sc-toolbar container";

    var topRow = document.createElement("div");
    topRow.className = "sc-toolbar__top";

    var titleWrap = document.createElement("div");
    titleWrap.className = "sc-title-wrap";
    var deckTitle = document.createElement("span");
    deckTitle.className = "sc-title";
    deckTitle.textContent = (document.title || "Studio Workspace").split("\u2014")[0].split("|")[0].trim();
    var deckSub = document.createElement("span");
    deckSub.className = "sc-subtitle";
    titleWrap.appendChild(deckTitle);
    titleWrap.appendChild(deckSub);

    var navControls = document.createElement("div");
    navControls.className = "sc-controls";
    var prevSecBtn = document.createElement("button");
    prevSecBtn.type = "button";
    prevSecBtn.className = "sc-pill";
    prevSecBtn.textContent = "Previous Section";

    var nextSecBtn = document.createElement("button");
    nextSecBtn.type = "button";
    nextSecBtn.className = "sc-pill sc-pill--action";
    nextSecBtn.textContent = "Next Section";

    navControls.appendChild(prevSecBtn);
    navControls.appendChild(nextSecBtn);
    topRow.appendChild(titleWrap);
    topRow.appendChild(navControls);

    var filterRow = document.createElement("div");
    filterRow.className = "sc-filters";
    var pillGroup = document.createElement("div");
    pillGroup.className = "sc-filter-group";

    var tabButtons = [];
    for (var i = 0; i < sections.length; i++) {
      (function (idx) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "sc-pill";
        btn.textContent = findSectionLabel(sections[idx], idx);
        btn.addEventListener("click", function () {
          activateSection(idx);
        });
        tabButtons.push(btn);
        pillGroup.appendChild(btn);
      })(i);
    }

    filterRow.appendChild(pillGroup);
    deck.appendChild(topRow);
    deck.appendChild(filterRow);

    prevSecBtn.addEventListener("click", function () {
      var prev = (activeIdx - 1 + sections.length) % sections.length;
      activateSection(prev);
    });
    nextSecBtn.addEventListener("click", function () {
      var next = (activeIdx + 1) % sections.length;
      activateSection(next);
    });

    var firstSec = sections[0];
    firstSec.parentNode.insertBefore(deck, firstSec);

    function activateSection(idx) {
      activeIdx = idx;
      for (var k = 0; k < sections.length; k++) {
        setHidden(sections[k], k !== idx);
        if (k === idx) tabButtons[k].classList.add("is-active");
        else tabButtons[k].classList.remove("is-active");
      }
      deckSub.textContent = "Section " + (idx + 1) + " of " + sections.length + " \u00b7 Minimal-Scroll View";
      compactTallSection(sections[idx]);
    }

    document.addEventListener("click", function (e) {
      var a = e.target && e.target.closest ? e.target.closest("a[href^='#']") : null;
      if (!a) return;
      var hash = a.getAttribute("href");
      if (!hash || hash === "#") return;
      var targetEl = document.getElementById(hash.slice(1));
      if (!targetEl) return;
      for (var s = 0; s < sections.length; s++) {
        if (sections[s] === targetEl || sections[s].contains(targetEl)) {
          e.preventDefault();
          activateSection(s);
          window.scrollTo(0, 0);
          return;
        }
      }
    });

    activateSection(0);
  }

  function bootCompactDeck() {
    if (window.self !== window.top) return;

    var grids = document.querySelectorAll(".grid, .tree-leaves, .oocss-grid, .oocss-grid--2, .oocss-grid--3, .oocss-grid--4, .bp-two-grid, .bp-three-grid, .bp-four-grid, .tp-claude-cards, .gsp-grid");
    for (var g = 0; g < grids.length; g++) {
      paginateGrid(grids[g]);
    }

    var tables = document.querySelectorAll("table");
    for (var t = 0; t < tables.length; t++) {
      paginateTable(tables[t]);
    }

    var secs = findCandidateSections();
    if (secs.length >= 2 && document.documentElement.scrollHeight > 1100) {
      buildSectionDeck(secs);
    } else if (document.documentElement.scrollHeight > 1250) {
      var main = document.querySelector("main") || document.body;
      if (main.getAttribute("data-ee-custom-deck") !== "1") {
        compactTallSection(main);
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      setTimeout(bootCompactDeck, 25);
    });
  } else {
    setTimeout(bootCompactDeck, 25);
  }
})();
