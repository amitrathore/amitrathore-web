// Navigation enhances a document that is fully readable without JavaScript.
(function () {
  function followHash() {
    var name;
    try { name = decodeURIComponent(window.location.hash.slice(1)); } catch (_) { return; }
    if (!name) return;
    if (name === 'amitgpt') name = 'amitavatar';
    var target = document.getElementById(name);
    if (!target) return;
    var parent = target;
    while (parent) {
      if (parent.tagName === 'DETAILS') parent.open = true;
      parent = parent.parentElement;
    }
    // Native details must open before the browser can scroll to their contents.
    if (target.tagName === 'DETAILS' || name === 'amitavatar') {
      requestAnimationFrame(function () { target.scrollIntoView({ block: 'start', behavior: 'instant' }); });
    }
  }
  followHash();
  window.addEventListener('hashchange', followHash);
})();
