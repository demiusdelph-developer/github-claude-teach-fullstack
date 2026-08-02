/**
 * panels.js — єдиний файл для всіх панелей і навігації
 *
 * Кореневі сторінки:  <script src="js/panels.js" data-root="abstracts"></script>
 * abstracts/html/*.html та abstracts/css/*.html:
 *   через заглушку abstracts/js/nav.js  АБО
 *   <script src="../../js/panels.js" data-root=".."></script>
 * abstracts/plan.html: <script src="js/nav.js" data-root="."></script>
 * practice/tasks/*.html: <script src="../../js/panels.js" data-root="../../abstracts"></script>
 */
(function () {
  const script = document.currentScript;
  const root   = (script && script.dataset.root) || 'abstracts';
  const path   = window.location.pathname.replace(/\\/g, '/');

  function r(p)    { return root + '/' + p; }
  function prac(p) { return root + '/../practice/' + p; }
  const homeUrl    = root + '/../index.html';

  /* ── Розділ поточної сторінки ── */
  const isHtmlSection     = path.includes('/html/');
  const isCssSection      = path.includes('/css/') && !path.includes('/js/');
  const isTaskSection     = path.includes('/tasks/');
  const isSolutionSection = path.includes('/solutions/');
  const isPlanPage        = path.endsWith('/plan.html');

  const tagColor = isHtmlSection ? '#ffa657'
                 : (isTaskSection || isSolutionSection) ? '#7ee787'
                 : isPlanPage ? '#ffa657'
                 : '#388bfd';

  /* ── Активне посилання ── */
  const currentFile = path.split('/').pop();
  function activeLink(file) {
    return file.split('/').pop() === currentFile ? ' class="nav-active"' : '';
  }
  function activeSide(file, group) {
    if (file.split('/').pop() !== currentFile) return '';
    return group === 'html'
      ? ' style="color:#ffa657;border-left-color:#ffa657;background:rgba(255,166,87,.06)"'
      : ' style="color:#79c0ff;border-left-color:#79c0ff;background:rgba(121,192,255,.06)"';
  }

  /* ══════════════════════════════════════════════
     РЕДАГУЙ ЦЕ МІСЦЕ — зміниться скрізь
     ══════════════════════════════════════════════ */
  const HTML_PAGES = [
    ['html/01-structure.html',    '01 — Структура'],
    ['html/02-text.html',         '02 — Текст'],
    ['html/03-semantic.html',     '03 — Семантика'],
    ['html/04-lists-links.html',  '04 — Списки і посилання'],
    ['html/05-images-media.html', '05 — Зображення'],
    ['html/06-tables.html',       '06 — Таблиці'],
    ['html/07-forms.html',        '07 — Форми'],
  ];
  const CSS_PAGES = [
    ['css/01-basics.html',        '01 — Основи CSS'],
    ['css/02-box-model.html',     '02 — Блокова модель'],
    ['css/03-positioning.html',   '03 — Позиціонування'],
    ['css/04-flexbox.html',       '04 — Flexbox'],
    ['css/05-grid.html',          '05 — Grid'],
    ['css/06-media-queries.html', '06 — Медіа-запити'],
    ['css/07-animations.html',    '07 — Анімації'],
    ['css/08-variables.html',     '08 — Змінні'],
    ['css/09-icons.html',         '09 — Іконки'],
    ['css/10-fonts.html',         '10 — Шрифти'],
  ];
  const TASKS = [
    ['tasks/task-01.html', '01 — Картка розробника'],
    ['tasks/task-02.html', '02 — Позиціонування'],
    ['tasks/task-03.html', '03 — Flexbox'],
    ['tasks/task-04.html', '04 — CSS Grid'],
  ];
  const SOLUTIONS = [
    ['solutions/solution-01.html', '01 — Картка розробника'],
    ['solutions/solution-02.html', '02 — Позиціонування'],
    ['solutions/solution-03.html', '03 — Flexbox'],
  ];

  /* ── Прогрес курсу
     status: 'done' | 'active' | 'pending'
     done / total — оновлюй вручну в цьому файлі
  ── */
  const PROGRESS = {
    phase:       1,
    totalPhases: 6,
    phaseName:   'HTML + CSS основи',
    pct:         11,
    topics: [
      { label: 'HTML',  done: 7, total: 7,  color: '#ffa657', status: 'done'    },
      { label: 'CSS',   done: 4, total: 10, color: '#388bfd', status: 'active'  },
      { label: 'JS',    done: 0, total: 8,  color: '#7ee787', status: 'pending' },
      { label: 'React', done: 0, total: 6,  color: '#61dafb', status: 'pending' },
      { label: 'Node',  done: 0, total: 5,  color: '#68a063', status: 'pending' },
    ],
  };
  /* ══════════════════════════════════════════════ */

  /* ── Іконка статусу технології ── */
  function topicIcon(t) {
    if (t.status === 'done') {
      return '<svg width="13" height="13" viewBox="0 0 13 13" style="vertical-align:middle;margin-right:3px">'
        + '<circle cx="6.5" cy="6.5" r="5.5" fill="none" stroke="' + t.color + '" stroke-width="1.5"/>'
        + '<path d="M4 6.5l2 2 3-3.5" fill="none" stroke="' + t.color + '" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>'
        + '</svg>';
    }
    if (t.status === 'active') {
      var circ = 28.27;
      var dash = (t.total > 0 ? t.done / t.total : 0) * circ;
      return '<svg width="13" height="13" viewBox="0 0 13 13" style="vertical-align:middle;margin-right:3px;transform:rotate(-90deg)">'
        + '<circle cx="6.5" cy="6.5" r="4.5" fill="none" stroke="#30363d" stroke-width="1.5"/>'
        + '<circle cx="6.5" cy="6.5" r="4.5" fill="none" stroke="' + t.color + '" stroke-width="1.5"'
        + ' stroke-dasharray="' + dash.toFixed(1) + ' ' + circ.toFixed(1) + '" stroke-linecap="round"/>'
        + '</svg>';
    }
    return '<svg width="13" height="13" viewBox="0 0 13 13" style="vertical-align:middle;margin-right:3px">'
      + '<circle cx="6.5" cy="6.5" r="4.5" fill="none" stroke="#30363d" stroke-width="1.5"/>'
      + '</svg>';
  }

  /* ── CSS ── */
  const css = [
    /* Топ-навбар */
    '.topnav{background:#161b22;border-bottom:1px solid #30363d;padding:0 40px;position:sticky;top:0;z-index:100}',
    '.nav-inner{display:flex;align-items:center;gap:8px;height:48px;max-width:1368px;margin:0 auto}',
    '.nav-brand{font-size:14px;font-weight:700;color:#e6edf3;text-decoration:none;flex-shrink:0}',
    '.nav-brand:hover{color:#79c0ff;text-decoration:none}',
    '.nav-items{display:flex;align-items:center;flex:1;margin-left:8px}',
    '.nav-dropdown{position:relative}',
    '.nav-dropdown::after{content:"";position:absolute;top:100%;left:-8px;right:-8px;height:10px;z-index:195}',
    '.nav-btn{background:none;border:none;border-bottom:2px solid transparent;color:#8b949e;cursor:pointer;font-size:13px;font-weight:600;padding:6px 12px;font-family:inherit;height:48px;transition:color .15s,border-color .15s;white-space:nowrap}',
    '.nav-dropdown:hover .nav-btn,.nav-btn.is-active{color:#e6edf3}',
    '.nav-btn.is-html{border-bottom-color:#ffa657;color:#e6edf3}',
    '.nav-btn.is-css{border-bottom-color:#79c0ff;color:#e6edf3}',
    '.nav-btn.is-tasks{border-bottom-color:#d2a8ff;color:#e6edf3}',
    '.nav-btn.is-solutions{border-bottom-color:#7ee787;color:#e6edf3}',
    '.nav-link-plain{font-size:13px;font-weight:600;padding:0 12px;height:48px;display:flex;align-items:center;color:#8b949e;text-decoration:none;border-bottom:2px solid transparent;transition:color .15s,border-color .15s;white-space:nowrap}',
    '.nav-link-plain:hover{color:#e6edf3;text-decoration:none}',
    '.nav-link-plain.is-plan{border-bottom-color:#ffa657;color:#e6edf3}',
    '.dropdown-menu{position:absolute;top:100%;left:0;background:#161b22;border:1px solid #30363d;border-radius:8px;padding:6px;min-width:230px;opacity:0;pointer-events:none;transform:translateY(-4px);transition:opacity .15s,transform .15s;z-index:200;box-shadow:0 8px 24px rgba(0,0,0,.5)}',
    '.nav-dropdown:hover .dropdown-menu{opacity:1;pointer-events:auto;transform:translateY(0)}',
    '.dropdown-menu a{display:block;padding:7px 12px;border-radius:6px;font-size:13px;text-decoration:none;color:#8b949e;transition:background .1s}',
    '.dropdown-menu a:hover,.dropdown-menu a.nav-active{background:#21262d;color:#e6edf3;text-decoration:none}',
    '.html-menu a{color:#ffa657}.css-menu a{color:#79c0ff}.task-menu a{color:#d2a8ff}.solution-menu a{color:#7ee787}',
    '.nav-back{margin-left:auto;font-size:12px;font-weight:600;padding:5px 12px;border-radius:6px;border:1px solid #30363d;color:#8b949e;text-decoration:none;white-space:nowrap;flex-shrink:0;transition:color .15s,border-color .15s}',
    '.nav-back:hover{color:#e6edf3;border-color:#6e7681;text-decoration:none}',

    /* Бургер */
    '.nav-burger{display:none;background:none;border:1px solid #30363d;border-radius:6px;padding:5px 9px;color:#8b949e;cursor:pointer;font-size:18px;line-height:1;margin-left:auto;transition:color .15s,border-color .15s}',
    '.nav-burger:hover{color:#e6edf3;border-color:#6e7681}',
    '.nav-burger.is-open{color:#e6edf3;border-color:#6e7681}',

    /* Мобільне меню */
    '.nav-mobile{display:none;position:fixed;top:48px;left:0;right:0;bottom:0;background:#0d1117;border-top:1px solid #30363d;z-index:99;overflow-y:auto;padding:16px 20px}',
    '.nav-mobile.is-open{display:block}',
    '.nm-section{margin-bottom:20px}',
    '.nm-label{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#6e7681;margin-bottom:6px;padding:0 4px;display:block}',
    '.nm-link{display:block;padding:9px 12px;border-radius:8px;font-size:14px;color:#8b949e;text-decoration:none;transition:background .1s}',
    '.nm-link:hover{background:#161b22;color:#e6edf3;text-decoration:none}',
    '.nm-html{color:#ffa657}.nm-css{color:#79c0ff}.nm-task{color:#7ee787}.nm-solution{color:#d2a8ff}',
    '.nm-divider{height:1px;background:#21262d;margin:16px 0}',
    '.nm-home{font-size:14px;font-weight:600;color:#e6edf3;text-decoration:none;display:flex;align-items:center;gap:8px;padding:10px 4px}',
    '.nm-plan{font-size:14px;font-weight:600;color:#ffa657;text-decoration:none;display:flex;align-items:center;gap:8px;padding:9px 12px;border-radius:8px}',
    '.nm-plan:hover{background:#161b22;text-decoration:none}',

    /* Прогрес курсу */
    '.course-progress{background:#161b22;border-bottom:1px solid #21262d;padding:8px 40px}',
    '.course-progress-inner{max-width:1368px;margin:0 auto;display:flex;align-items:center;gap:12px;min-height:32px}',
    '.cp-phase{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#8b949e;white-space:nowrap;flex-shrink:0}',
    '.cp-phase em{color:#e6edf3;font-style:normal}',
    '.cp-bar-wrap{flex:1;min-width:60px;background:#21262d;border-radius:4px;height:6px;overflow:hidden}',
    '.cp-bar-fill{height:100%;border-radius:4px;background:linear-gradient(90deg,#ffa657 0%,#388bfd 100%)}',
    '.cp-pct{font-size:11px;font-weight:700;color:#6e7681;white-space:nowrap;flex-shrink:0}',
    '.cp-topics{display:flex;gap:10px;flex-shrink:0;flex-wrap:wrap}',
    '.cp-topic{font-size:11px;font-weight:600;white-space:nowrap;display:flex;align-items:center}',
    '.cp-topic.dim{color:#30363d}',

    /* Шапка сторінки */
    '.page-header{padding:28px 40px 20px;border-bottom:1px solid #21262d;text-align:center}',
    '.page-tag{font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:' + tagColor + ';margin-bottom:8px}',
    '.page-title{font-size:32px;font-weight:800;margin-bottom:8px}',
    '.page-desc{font-size:15px;color:#8b949e;max-width:600px;margin:8px auto 0}',

    /* 3-колонний макет */
    '.page-body{display:grid;grid-template-columns:220px 1fr 200px;max-width:1368px;margin:0 auto;align-items:start}',
    '.content{padding:24px 36px 80px;min-width:0}',

    /* Лівий сайдбар */
    '.sidebar-left{border-right:1px solid #21262d;position:sticky;top:48px;height:calc(100vh - 48px);overflow-y:auto;scrollbar-width:thin;scrollbar-color:#30363d transparent}',
    '.sidebar-left summary{padding:10px 14px;cursor:pointer;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#e6edf3;list-style:none;display:flex;align-items:center;justify-content:space-between;user-select:none;border-bottom:1px solid #21262d;transition:color .1s,background .1s}',
    '.sidebar-left summary::-webkit-details-marker{display:none}',
    '.sidebar-left summary::after{content:"▾";font-size:10px;transition:transform .2s}',
    '.sidebar-left details:not([open]) summary::after{transform:rotate(-90deg)}',
    '.sidebar-left summary:hover{background:#1c2128}',
    '.sidebar-left .sidebar-links a{display:block;padding:5px 14px 5px 16px;font-size:12px;color:#8b949e;text-decoration:none;border-left:2px solid transparent;transition:all .1s;line-height:1.4}',
    '.sidebar-left .html-group .sidebar-links a:hover{color:#ffa657;border-left-color:#ffa657;background:rgba(255,166,87,.06);text-decoration:none}',
    '.sidebar-left .css-group .sidebar-links a:hover{color:#79c0ff;border-left-color:#79c0ff;background:rgba(121,192,255,.06);text-decoration:none}',

    /* Правий сайдбар */
    '.sidebar-right{border-left:1px solid #21262d;padding:20px 14px;position:sticky;top:48px;height:calc(100vh - 48px);overflow-y:auto}',
    '.sb-title{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#e6edf3;margin-bottom:10px;display:block}',
    '.sb-title+.sb-title,.sb-gap{margin-top:16px}',
    '.sidebar-right a{display:flex;flex-direction:column;padding:7px 8px;font-size:12px;color:#8b949e;text-decoration:none;border-radius:5px;margin-bottom:3px;border-left:2px solid transparent;transition:all .1s}',
    '.sb-tasks a:hover{color:#d2a8ff;background:rgba(210,168,255,.06);border-left-color:#d2a8ff;text-decoration:none}',
    '.sb-tasks a:hover .task-num{color:#7948d3}',
    '.sb-tasks a.task-active{color:#d2a8ff;background:rgba(210,168,255,.06);border-left-color:#d2a8ff;text-decoration:none}',
    '.sb-tasks a.task-active .task-num{color:#7948d3}',
    '.sb-solutions a:hover{color:#7ee787;background:rgba(126,231,135,.06);border-left-color:#7ee787;text-decoration:none}',
    '.sb-solutions a:hover .task-num{color:#2ea043}',
    '.sb-solutions a.sol-active{color:#7ee787;background:rgba(126,231,135,.06);border-left-color:#7ee787;text-decoration:none}',
    '.sb-solutions a.sol-active .task-num{color:#2ea043}',
    '.task-num{font-size:10px;font-family:monospace;color:#6e7681}',

    /* nav-pills */
    '.nav-pills{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:32px;padding-top:24px}',
    '.nav-pill{font-size:12px;font-weight:600;padding:4px 12px;border-radius:20px;background:#1c2128;border:1px solid #30363d;color:#8b949e;text-decoration:none}',
    'a.nav-pill:hover{border-color:#388bfd;color:#388bfd;text-decoration:none}',

    /* ── Адаптивність ── */

    /* 1100px: правий сайдбар зникає */
    '@media(max-width:1100px){',
    '.page-body{grid-template-columns:220px 1fr}',
    '.sidebar-right{display:none}',
    '}',

    /* 820px: лівий сайдбар зникає */
    '@media(max-width:820px){',
    '.page-body{grid-template-columns:1fr}',
    '.sidebar-left{display:none}',
    '.topnav{padding:0 16px}',
    '.course-progress{padding:8px 16px}',
    '.nav-items,.nav-back{display:none}',
    '.nav-burger{display:flex;align-items:center;justify-content:center}',
    '}',

    /* 540px: менший хедер, компактний контент */
    '@media(max-width:540px){',
    '.page-header{padding:20px 16px 16px;text-align:left}',
    '.page-title{font-size:24px}',
    '.content{padding:16px 16px 60px}',
    '.cp-topics{display:none}',
    '.cp-pct{display:none}',
    '.cp-phase{font-size:10px}',
    '}',
  ].join('');

  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  /* ── Топ-навбар ── */
  function btn(label, section, active) {
    var cls = 'nav-btn' + (active ? ' is-' + section : '');
    return '<button class="' + cls + '">' + label + ' ▾</button>';
  }

  const navEl = document.createElement('nav');
  navEl.className = 'topnav';
  navEl.innerHTML =
    '<div class="nav-inner">' +
      '<a href="' + homeUrl + '" class="nav-brand">Вивчаємо Fullstack</a>' +
      '<div class="nav-items">' +
        '<div class="nav-dropdown">' +
          btn('HTML', 'html', isHtmlSection) +
          '<div class="dropdown-menu html-menu">' +
            HTML_PAGES.map(function(p) { return '<a href="' + r(p[0]) + '"' + activeLink(p[0]) + '>' + p[1] + '</a>'; }).join('') +
          '</div></div>' +
        '<div class="nav-dropdown">' +
          btn('CSS', 'css', isCssSection) +
          '<div class="dropdown-menu css-menu">' +
            CSS_PAGES.map(function(p) { return '<a href="' + r(p[0]) + '"' + activeLink(p[0]) + '>' + p[1] + '</a>'; }).join('') +
          '</div></div>' +
        '<div class="nav-dropdown">' +
          btn('Задачі', 'tasks', isTaskSection) +
          '<div class="dropdown-menu task-menu">' +
            TASKS.map(function(p) { return '<a href="' + prac(p[0]) + '"' + activeLink(p[0]) + '>' + p[1] + '</a>'; }).join('') +
          '</div></div>' +
        '<div class="nav-dropdown">' +
          btn('Рішення', 'solutions', isSolutionSection) +
          '<div class="dropdown-menu solution-menu">' +
            SOLUTIONS.map(function(p) { return '<a href="' + prac(p[0]) + '"' + activeLink(p[0]) + '>' + p[1] + '</a>'; }).join('') +
          '</div></div>' +
        '<a href="' + r('plan.html') + '" class="nav-link-plain' + (isPlanPage ? ' is-plan' : '') + '">📍 Повний план дій</a>' +
      '</div>' +
      '<a href="' + homeUrl + '" class="nav-back">← На головну</a>' +
      '<button class="nav-burger" id="navBurger" aria-label="Меню">☰</button>' +
    '</div>';

  document.body.insertBefore(navEl, document.body.firstChild);

  /* ── Мобільне меню ── */
  const mobileMenu = document.createElement('div');
  mobileMenu.className = 'nav-mobile';
  mobileMenu.id = 'navMobile';

  function nmLinks(pages, cls, urlFn) {
    return pages.map(function(p) {
      return '<a href="' + urlFn(p[0]) + '" class="nm-link ' + cls + '">' + p[1] + '</a>';
    }).join('');
  }

  mobileMenu.innerHTML =
    '<a href="' + homeUrl + '" class="nm-home">← На головну</a>' +
    '<div class="nm-divider"></div>' +
    '<div class="nm-section"><span class="nm-label">HTML</span>' + nmLinks(HTML_PAGES, 'nm-html', r) + '</div>' +
    '<div class="nm-section"><span class="nm-label">CSS</span>'  + nmLinks(CSS_PAGES,  'nm-css',  r) + '</div>' +
    '<div class="nm-section"><span class="nm-label">Задачі</span>'   + nmLinks(TASKS,     'nm-task',     prac) + '</div>' +
    '<div class="nm-section"><span class="nm-label">Рішення</span>'  + nmLinks(SOLUTIONS, 'nm-solution', prac) + '</div>' +
    '<div class="nm-divider"></div>' +
    '<a href="' + r('plan.html') + '" class="nm-plan">📍 Повний план дій</a>';

  document.body.appendChild(mobileMenu);

  /* Burger toggle */
  document.getElementById('navBurger').addEventListener('click', function() {
    var open = mobileMenu.classList.toggle('is-open');
    this.classList.toggle('is-open', open);
    this.textContent = open ? '✕' : '☰';
    document.body.style.overflow = open ? 'hidden' : '';
  });

  /* Закрити при кліку на посилання або поза меню */
  mobileMenu.addEventListener('click', function(e) {
    if (e.target.tagName === 'A') {
      mobileMenu.classList.remove('is-open');
      document.getElementById('navBurger').classList.remove('is-open');
      document.getElementById('navBurger').textContent = '☰';
      document.body.style.overflow = '';
    }
  });

  /* ── Прогрес курсу ── */
  const pageHeader = document.querySelector('.page-header');
  if (pageHeader) {
    const topicsHtml = PROGRESS.topics.map(function(t) {
      if (t.status === 'pending') {
        return '<span class="cp-topic dim">' + topicIcon(t) + t.label + '</span>';
      }
      var countStr = t.done + '/' + t.total;
      return '<span class="cp-topic" style="color:' + t.color + '">'
        + topicIcon(t) + t.label + ' ' + countStr + '</span>';
    }).join('');

    const progressEl = document.createElement('div');
    progressEl.className = 'course-progress';
    progressEl.innerHTML =
      '<div class="course-progress-inner">' +
        '<span class="cp-phase">Фаза <em>' + PROGRESS.phase + '</em> / ' + PROGRESS.totalPhases
          + ' — ' + PROGRESS.phaseName + '</span>' +
        '<div class="cp-bar-wrap"><div class="cp-bar-fill" style="width:' + PROGRESS.pct + '%"></div></div>' +
        '<span class="cp-pct">' + PROGRESS.pct + '%</span>' +
        '<div class="cp-topics">' + topicsHtml + '</div>' +
      '</div>';
    pageHeader.insertAdjacentElement('afterend', progressEl);
  }

  /* ── Бічні панелі ── */
  const pageBody = document.querySelector('.page-body');
  if (!pageBody) return;

  /* Лівий сайдбар */
  const sidebarLeft = document.createElement('aside');
  sidebarLeft.className = 'sidebar-left';
  sidebarLeft.innerHTML =
    '<details open class="html-group"><summary>HTML</summary><div class="sidebar-links">' +
    HTML_PAGES.map(function(p) { return '<a href="' + r(p[0]) + '"' + activeSide(p[0], 'html') + '>' + p[1] + '</a>'; }).join('') +
    '</div></details>' +
    '<details open class="css-group"><summary>CSS</summary><div class="sidebar-links">' +
    CSS_PAGES.map(function(p)  { return '<a href="' + r(p[0]) + '"' + activeSide(p[0], 'css')  + '>' + p[1] + '</a>'; }).join('') +
    '</div></details>';
  pageBody.insertBefore(sidebarLeft, pageBody.firstChild);

  /* Правий сайдбар */
  function activeRight(file, type) {
    if (file.split('/').pop() !== currentFile) return '';
    return ' class="' + (type === 'task' ? 'task-active' : 'sol-active') + '"';
  }

  const sidebarRight = document.createElement('aside');
  sidebarRight.className = 'sidebar-right';
  sidebarRight.innerHTML =
    '<span class="sb-title">Задачі</span>' +
    '<div class="sb-tasks">' +
    TASKS.map(function(p) {
      var num   = p[0].replace('tasks/task-', '').replace('.html', '');
      var label = p[1].replace(/^\d+ — /, '');
      return '<a href="' + prac(p[0]) + '"' + activeRight(p[0], 'task') + '><span class="task-num">task-' + num + '</span>' + label + '</a>';
    }).join('') +
    '</div>' +
    '<span class="sb-title sb-gap">Рішення</span>' +
    '<div class="sb-solutions">' +
    SOLUTIONS.map(function(p) {
      var num   = p[0].replace('solutions/solution-', '').replace('.html', '');
      var label = p[1].replace(/^\d+ — /, '');
      return '<a href="' + prac(p[0]) + '"' + activeRight(p[0], 'sol') + '><span class="task-num">solution-' + num + '</span>' + label + '</a>';
    }).join('') +
    '</div>';
  pageBody.appendChild(sidebarRight);
})();
