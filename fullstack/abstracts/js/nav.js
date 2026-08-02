/**
 * nav.js — заглушка. Увесь код тепер у js/panels.js.
 * Редагуй тільки js/panels.js — зміниться на всіх сторінках.
 */
(function () {
  var cur  = document.currentScript;
  var src  = cur.src.replace('/abstracts/js/nav.js', '/js/panels.js');
  var s    = document.createElement('script');
  s.src    = src;
  for (var k in cur.dataset) { s.dataset[k] = cur.dataset[k]; }
  document.head.appendChild(s);
})();
