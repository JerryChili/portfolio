(function () {
  'use strict';

  var cfg = window.SITE_CONFIG;
  var projects = window.PROJECTS || [];
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function isVideo(src) { return /\.(mp4|webm)(\?.*)?$/i.test(src || ''); }
  function initials(t) { return String(t).split(/\s+/).map(function (w) { return w[0] || ''; }).join('').slice(0, 3).toUpperCase(); }

  /* ---------- Static content from config ---------- */
  document.title = cfg.name + ' · ' + cfg.role;
  $$('[data-cfg]').forEach(function (el) { el.textContent = cfg[el.dataset.cfg]; });
  $('#about-text').textContent = cfg.about;
  $('#year').textContent = new Date().getFullYear();

  function chipList(sel, items) {
    $(sel).innerHTML = items.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('');
  }
  chipList('#skills-primary', cfg.skills.primary);
  chipList('#skills-learning', cfg.skills.learning);
  $('#contact-links').innerHTML = cfg.links.map(function (l) {
    var ext = /^https?:/.test(l.url) ? ' target="_blank" rel="noopener"' : '';
    return '<li><a href="' + esc(l.url) + '"' + ext + '>' + esc(l.label) + '</a></li>';
  }).join('');

  /* ---------- Project cards ---------- */
  var grid = $('#project-grid');

  function thumbHTML(p) {
    var img = p.thumb
      ? '<img class="thumb" src="' + esc(p.thumb) + '" alt="" loading="lazy">'
      : '<div class="thumb-placeholder" aria-hidden="true">' + esc(initials(p.title)) + '</div>';
    return '<div class="thumb-wrap">' + img + (p.status ? '<span class="badge">' + esc(p.status) + '</span>' : '') + '</div>';
  }

  projects.forEach(function (p) {
    var wrap = document.createElement('div');
    wrap.className = 'card-wrap' + (p.featured ? ' featured' : '');

    var tags = [p.engine, p.language].concat(p.tags || []).filter(Boolean).slice(0, 5);
    var a = document.createElement('a');
    a.className = 'card';
    a.href = '#project=' + encodeURIComponent(p.id);
    a.dataset.id = p.id;
    a.innerHTML =
      '<div class="card-inner">' +
        thumbHTML(p) +
        '<div class="card-body">' +
          '<h3 class="card-title">' + esc(p.title) + '</h3>' +
          '<p class="card-hook">' + esc(p.hook) + '</p>' +
          (p.role ? '<p class="card-role">Role: <strong>' + esc(p.role) + '</strong></p>' : '') +
          '<ul class="chips">' + tags.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>' +
          '<span class="card-more">View details &rarr;</span>' +
        '</div>' +
        '<span class="card-glare"></span>' +
      '</div>';
    wrap.appendChild(a);
    grid.appendChild(wrap);

    if (canHover && !reduceMotion) {
      a.addEventListener('pointermove', function (e) {
        var r = a.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width;
        var y = (e.clientY - r.top) / r.height;
        a.style.setProperty('--ry', ((x - 0.5) * 14).toFixed(2) + 'deg');
        a.style.setProperty('--rx', ((0.5 - y) * 14).toFixed(2) + 'deg');
        a.style.setProperty('--gx', (x * 100).toFixed(1) + '%');
        a.style.setProperty('--gy', (y * 100).toFixed(1) + '%');
      });
      a.addEventListener('pointerleave', function () {
        a.style.setProperty('--rx', '0deg');
        a.style.setProperty('--ry', '0deg');
      });
    }

    // Hover preview: GIF swaps the still, video plays on top of it
    var wrapEl = $('.thumb-wrap', a);
    var stillImg = $('.thumb', a);
    var stillSrc = p.thumb;
    var video = null;
    a.addEventListener('pointerenter', function () {
      if (!p.preview || reduceMotion) return;
      if (isVideo(p.preview)) {
        video = document.createElement('video');
        video.className = 'thumb-video';
        video.src = p.preview;
        video.muted = true; video.loop = true; video.playsInline = true;
        wrapEl.insertBefore(video, wrapEl.firstChild.nextSibling);
        video.play().catch(function () {});
      } else if (stillImg) {
        stillImg.src = p.preview;
      }
    });
    a.addEventListener('pointerleave', function () {
      if (video) { video.remove(); video = null; }
      if (stillImg && stillSrc && stillImg.src.indexOf(stillSrc) === -1) stillImg.src = stillSrc;
    });
  });

  /* ---------- Detail overlay (hash routing: #project=<id>) ---------- */
  var modal = $('#modal');
  var content = $('#modal-content');
  var lastFocus = null;

  function mediaHTML(m) {
    if (!m || !m.src) return '<div class="detail-media"><div class="thumb-placeholder" aria-hidden="true">&#9654;</div></div>';
    if (m.type === 'embed') return '<div class="detail-media"><iframe src="' + esc(m.src) + '" allowfullscreen loading="lazy" title="Project media"></iframe></div>';
    if (m.type === 'video' || isVideo(m.src)) return '<div class="detail-media"><video src="' + esc(m.src) + '" controls muted loop playsinline autoplay></video></div>';
    return '<div class="detail-media"><img src="' + esc(m.src) + '" alt=""></div>';
  }

  function listSection(title, items, cls) {
    if (!items || !items.length) return '';
    return '<section class="detail-section"><h3>' + title + '</h3><ul class="' + cls + '">' +
      items.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul></section>';
  }

  function openProject(id) {
    var p = projects.filter(function (x) { return x.id === id; })[0];
    if (!p) { closeProject(true); return; }

    var meta = [
      ['Role', p.role], ['Engine', p.engine], ['Language', p.language],
      ['Team', p.team], ['Duration', p.duration], ['Year', p.year]
    ].filter(function (m) { return m[1]; });

    var tech = (p.technical || []).length
      ? '<section class="detail-section"><h3>Technical highlights</h3><div class="tech-list">' +
        p.technical.map(function (t) {
          return '<div class="tech-item"><strong>' + esc(t.title) + '</strong><span>' + esc(t.text) + '</span></div>';
        }).join('') + '</div></section>'
      : '';

    content.innerHTML =
      mediaHTML(p.media) +
      '<div class="detail-body">' +
        '<header class="detail-head">' +
          (p.status ? '<span class="detail-status">' + esc(p.status) + '</span>' : '') +
          '<h2 id="modal-title">' + esc(p.title) + '</h2>' +
          '<p class="detail-hook">' + esc(p.hook) + '</p>' +
        '</header>' +
        '<dl class="detail-meta">' + meta.map(function (m) {
          return '<div><dt>' + m[0] + '</dt><dd>' + esc(m[1]) + '</dd></div>';
        }).join('') + '</dl>' +
        '<section class="detail-section"><h3>Overview</h3>' +
          (p.overview || []).map(function (t) { return '<p>' + esc(t) + '</p>'; }).join('') + '</section>' +
        listSection('What I did', p.responsibilities, 'bullets') +
        tech +
        '<div class="detail-links">' + (p.links || []).map(function (l) {
          return '<a class="btn' + (l.primary ? ' btn-primary' : '') + '" href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.label) + '</a>';
        }).join('') + '</div>' +
      '</div>';

    if (modal.hidden) lastFocus = document.activeElement;
    modal.hidden = false;
    document.body.classList.add('modal-open');
    $('.modal-panel', modal).scrollTop = 0;
    $('.modal-close', modal).focus();
    document.title = p.title + ' · ' + cfg.name;
  }

  function hideModal() {
    modal.hidden = true;
    content.innerHTML = '';
    document.body.classList.remove('modal-open');
    document.title = cfg.name + ' · ' + cfg.role;
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function closeProject(clearHash) {
    if (clearHash && /^#project=/.test(location.hash)) {
      history.replaceState(null, '', location.pathname + location.search);
    }
    hideModal();
  }

  function route() {
    var m = location.hash.match(/^#project=(.+)$/);
    if (m) openProject(decodeURIComponent(m[1]));
    else if (!modal.hidden) hideModal();
  }

  modal.addEventListener('click', function (e) {
    if (e.target.closest('[data-close]')) closeProject(true);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.hidden) closeProject(true);
    // Keep Tab inside the dialog while it is open
    if (e.key === 'Tab' && !modal.hidden) {
      var f = $$('a[href], button, [tabindex="0"]', modal).filter(function (el) { return el.offsetParent !== null; });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  window.addEventListener('hashchange', route);

  /* ---------- Nav highlight ---------- */
  if ('IntersectionObserver' in window) {
    var navLinks = $$('[data-nav]');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          navLinks.forEach(function (l) { l.classList.toggle('active', l.dataset.nav === en.target.dataset.section); });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('[data-section]').forEach(function (s) { io.observe(s); });
  }

  /* ---------- Intro: still frames with a warp/bounce between them ---------- */
  var intro = $('#intro');
  var figure = $('#intro-figure');
  var frameImg = $('#intro-frame');
  var placeholder = $('#intro-placeholder');
  var placeholderSvg = $('svg', placeholder);
  var finished = false;
  var timer = null;

  function finishIntro() {
    if (finished) return;
    finished = true;
    clearTimeout(timer);
    try { sessionStorage.setItem('introSeen', '1'); } catch (e) {}
    intro.classList.add('hide');
    document.body.classList.remove('intro-lock');
    document.body.classList.add('loaded');
    setTimeout(function () { intro.remove(); }, 900);
  }

  function preload(src) {
    return new Promise(function (resolve) {
      var img = new Image();
      img.onload = function () { resolve(true); };
      img.onerror = function () { resolve(false); };
      img.src = src;
    });
  }

  // Squash, overshoot and settle, plus a coloured glow pulse. This is the "bounce".
  var GLOW = ['#3dd5ff', '#ff3d81', '#3dff8a', '#ff9d3d'];
  function bounce(i) {
    if (!figure.animate) return;
    var glow = GLOW[i % GLOW.length];
    figure.animate([
      { transform: 'scale(0.90, 1.07) skewX(-6deg)', filter: 'blur(3px) drop-shadow(0 0 0 ' + glow + ')', offset: 0 },
      { transform: 'scale(1.06, 0.96) skewX(3deg)', filter: 'blur(0) drop-shadow(0 0 26px ' + glow + ')', offset: 0.45 },
      { transform: 'scale(0.99, 1.01) skewX(-1deg)', offset: 0.75 },
      { transform: 'scale(1, 1) skewX(0)', filter: 'drop-shadow(0 0 8px ' + glow + ')', offset: 1 }
    ], { duration: 520, easing: 'cubic-bezier(.3, 1.4, .5, 1)', fill: 'forwards' });
  }

  function startIntro(frames, usable) {
    var n = usable ? frames.length : 4;
    var widths = [1, 0.62, 0.34, 0.7]; // fake "turning" widths for the placeholder
    var i = 0;

    frameImg.hidden = !usable;
    placeholder.hidden = usable;

    function step() {
      if (finished) return;
      if (usable) frameImg.src = frames[i];
      else placeholderSvg.style.transform = 'scaleX(' + widths[i % widths.length] + ')';
      bounce(i);
      i++;
      timer = setTimeout(i < n ? step : function () { timer = setTimeout(finishIntro, cfg.intro.endHoldMs); }, cfg.intro.frameMs);
    }
    step();
  }

  var seen = false;
  try { seen = sessionStorage.getItem('introSeen') === '1'; } catch (e) {}
  var forced = /[?&]intro\b/.test(location.search);
  var deepLink = /^#project=/.test(location.hash); // shared project links should not wait for the intro
  var show = cfg.intro.enabled && !reduceMotion && !deepLink && (forced || cfg.intro.playEveryVisit || !seen);

  $('#intro-skip').addEventListener('click', finishIntro);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !finished && show) finishIntro(); });

  if (show) {
    Promise.all(cfg.intro.frames.map(preload)).then(function (ok) {
      var usable = ok.length > 0 && ok.every(Boolean);
      startIntro(cfg.intro.frames, usable);
    });
  } else {
    finished = true;
    intro.remove();
    document.body.classList.remove('intro-lock');
    document.body.classList.add('loaded');
  }

  route(); // open a project if the page was loaded with #project=<id>
})();
