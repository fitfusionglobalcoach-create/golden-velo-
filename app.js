/* Golden Velo — comportamento da página (sem dependências). Edita os textos/links em config.js. */
(function () {
  "use strict";
  var C = window.GV || {};
  var OF = /^https:\/\/onlyfans\.com\//;
  var MAIN = OF.test(C.ofUrl || "") ? C.ofUrl : "https://onlyfans.com/goldenvelo";
  var doc = document.documentElement;
  var store = {
    get: function (k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} },
  };
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ── Origem do visitante (?src=) ── */
  var ALIASES = { ig: "instagram", insta: "instagram", instagram: "instagram", tt: "tiktok", tiktok: "tiktok", x: "x", twitter: "x" };
  var ua = navigator.userAgent || "";
  var inApp = /Instagram|FBAN|FBAV/i.test(ua) ? "instagram" : /musical_ly|BytedanceWebview|TikTok/i.test(ua) ? "tiktok" : /Twitter/i.test(ua) ? "x" : "";
  var params = new URLSearchParams(location.search);
  var src = ALIASES[(params.get("src") || "").toLowerCase()] || store.get("gv_src") || inApp || "";
  if (src) store.set("gv_src", src);

  /* ── Link do OnlyFans: link de rastreio da rede, se existir; senão o principal ── */
  var tracked = (C.trackingLinks || {})[src];
  var href = tracked && OF.test(tracked) ? tracked : MAIN;
  var priceHref = C.promo && C.promo.enabled && OF.test(C.promo.url || "") ? C.promo.url : href;
  $$("[data-cta]").forEach(function (a) { a.href = a.dataset.pos === "pricing" ? priceHref : href; });

  /* ── Preço ── */
  if (C.price) $$("[data-price]").forEach(function (el) { el.textContent = C.price; });

  /* ── Frase de boas-vindas por rede ── */
  var lines = {
    instagram: "Came from Instagram? This is the part I don't post there.",
    tiktok: "Came from TikTok? This is the part I don't post there.",
    x: "Came from X? Welcome to the full ride.",
  };
  if (lines[src]) { var sl = $("#src-line"); sl.textContent = lines[src]; sl.classList.add("on"); }

  /* ── Promoção real (só se ligada em config.js) ── */
  if (C.promo && C.promo.enabled && C.promo.label) { var pr = $("#promo"); pr.textContent = C.promo.label; pr.classList.add("on"); }

  /* ── Vantagens extra (só as confirmadas; ?preview=1 mostra as por confirmar) ── */
  var preview = params.get("preview") === "1";
  var checkIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>';
  (C.extraPerks || []).forEach(function (p) {
    if (!p || !p.title || (!p.enabled && !preview)) return;
    var li = document.createElement("li");
    if (!p.enabled) li.className = "placeholder";
    li.innerHTML = checkIcon + "<div><strong></strong><span></span></div>";
    li.querySelector("strong").textContent = p.title;
    li.querySelector("div span").textContent = p.body || "";
    $("#perks").appendChild(li);
  });

  /* ── Redes do Golden Velo (só se preenchidas) ── */
  var names = { instagram: "Instagram", tiktok: "TikTok", x: "X" };
  var socials = C.socials || {};
  var row = $("#follow-row"), anySocial = false;
  Object.keys(names).forEach(function (k) {
    var url = socials[k];
    if (!url || !/^https:\/\//.test(url)) return;
    var a = document.createElement("a");
    a.href = url; a.rel = "me noopener"; a.textContent = names[k];
    a.setAttribute("aria-label", "Golden Velo on " + names[k]);
    row.appendChild(a); anySocial = true;
  });
  if (anySocial) $("#follow").classList.add("on");

  $("#year").textContent = String(new Date().getFullYear());

  /* ── Copiar link (para abrir fora do Instagram/TikTok) ── */
  var toast = $("#toast");
  function pageUrl() {
    var u = new URL(location.href);
    u.hash = "";
    u.searchParams.delete("preview");
    if (src) u.searchParams.set("src", src);
    return u.toString();
  }
  function copy(btn) {
    var text = pageUrl();
    var done = function () {
      var old = btn.textContent;
      btn.textContent = "Link copied";
      toast.textContent = "Link copied. Paste it into Safari or Chrome.";
      setTimeout(function () { btn.textContent = old; }, 2000);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () { fallback(text); done(); });
    } else { fallback(text); done(); }
  }
  function fallback(text) {
    var i = document.createElement("input");
    i.value = text; i.readOnly = true; i.style.position = "fixed"; i.style.opacity = "0";
    document.body.appendChild(i); i.select();
    try { document.execCommand("copy"); } catch (e) {}
    document.body.removeChild(i);
  }
  $$("[data-copy]").forEach(function (b) { b.addEventListener("click", function () { copy(b); }); });

  /* ── Aviso dentro do Instagram / TikTok ── */
  if (inApp && inApp !== "x" && store.get("gv_inapp") !== "hidden") {
    var ios = /iPhone|iPad|iPod/i.test(ua);
    var msg = {
      instagram: ios
        ? "You're viewing this inside Instagram. For a smoother sign-up, tap ••• (top right) and choose “Open in external browser”."
        : "You're viewing this inside Instagram. For a smoother sign-up, tap ⋮ (top right) and choose “Open in Chrome”.",
      tiktok: "You're viewing this inside TikTok. For a smoother sign-up, tap ••• and choose “Open in browser”.",
    }[inApp];
    $("#inapp-text").textContent = msg;
    $("#inapp").classList.add("on");
  }
  $("#inapp-close").addEventListener("click", function () {
    $("#inapp").classList.remove("on");
    store.set("gv_inapp", "hidden");
  });

  /* ── Verificação de idade ── */
  var gate = $("#gate"), main = $("#main"), footer = $("#footer"), sticky = $("#sticky");
  var gateOpen = !doc.classList.contains("age-ok") && location.hash !== "#enter";
  function setInert(on) {
    [main, footer, sticky].forEach(function (el) {
      if (on) { el.setAttribute("inert", ""); el.setAttribute("aria-hidden", "true"); }
      else { el.removeAttribute("inert"); el.removeAttribute("aria-hidden"); }
    });
  }
  if (gateOpen) {
    doc.classList.add("gate-open");
    setInert(true);
    // Foco automático só com teclado/rato (em ecrãs táteis o anel de foco só distrai)
    if (window.matchMedia("(pointer: fine)").matches) $("#gate-enter").focus({ preventScroll: true });
    gate.addEventListener("keydown", function (e) {
      if (e.key !== "Tab") return;
      var f = [$("#gate-enter"), $("#gate-leave")];
      var i = f.indexOf(document.activeElement);
      e.preventDefault();
      f[(i + (e.shiftKey ? f.length - 1 : 1)) % f.length].focus();
    });
  } else {
    doc.classList.add("age-ok");
  }
  $("#gate-enter").addEventListener("click", function (e) {
    e.preventDefault();
    store.set("gv_age", "ok");
    doc.classList.add("age-ok");
    doc.classList.remove("gate-open");
    gateOpen = false;
    setInert(false);
    var h = $("#hero-title");
    h.focus({ preventScroll: true });
    sheen();
    updateSticky();
  });
  $("#gate-leave").href = C.leaveUrl || "https://www.google.com";
  $("#gate-leave").addEventListener("click", function (e) {
    e.preventDefault();
    location.replace(C.leaveUrl || "https://www.google.com");
  });

  /* ── Brilho no botão principal (uma vez) ── */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function sheen() {
    if (reduce) return;
    var b = $("#hero-cta");
    setTimeout(function () { b.classList.add("sheen"); }, 900);
    setTimeout(function () { b.classList.remove("sheen"); void b.offsetWidth; b.classList.add("sheen"); }, 9000);
  }
  if (!gateOpen) sheen();

  /* ── Barra fixa: aparece depois do botão principal sair do ecrã; esconde-se perto de outros botões ── */
  var heroCta = $("#hero-cta");
  var visible = new Set();
  var watch = [heroCta, $("#price-cta"), $("#finish"), footer];
  function updateSticky() {
    var past = heroCta.getBoundingClientRect().bottom < 0;
    var kb = window.visualViewport ? window.visualViewport.height < window.innerHeight * 0.75 : false;
    var show = !gateOpen && past && visible.size === 0 && !kb;
    sticky.classList.toggle("on", show);
  }
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { en.isIntersecting ? visible.add(en.target) : visible.delete(en.target); });
      updateSticky();
    });
    watch.forEach(function (el) { if (el) io.observe(el); });
    if (window.visualViewport) window.visualViewport.addEventListener("resize", updateSticky);
  }

  /* ── Voltar do OnlyFans (bfcache): não pedir a idade outra vez ── */
  window.addEventListener("pageshow", function (e) { if (e.persisted && store.get("gv_age") === "ok") { gateOpen = false; doc.classList.add("age-ok"); doc.classList.remove("gate-open"); setInert(false); } });
})();
