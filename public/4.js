  (function () {
  var tabInterfaces = document.querySelectorAll('.tabs');
  Array.prototype.forEach.call(tabInterfaces, function (tabInterface) {
    // Save elements to memory
    var tablist = tabInterface.querySelector('ul');
    var tabs = tablist.querySelectorAll('a');
    var panels = tabInterface.querySelectorAll('section[id]');
    tablist.setAttribute('aria-label', 'options');

    var switchTab = function (oldIndex, newIndex) {
      if (oldIndex > -1) {
        tabs[oldIndex].removeAttribute('class');
        var span = document.getElementById('span');
        tabs[oldIndex].removeChild(span);
        panels[oldIndex].hidden = true;
        panels[oldIndex].classList.add('hidden');
      }

      tabs[newIndex].setAttribute('class', 'selected-tab');

      // tabs[newIndex].setAttribute('aria-current', 'true');

      var span = document.createElement('span');
      var spanString = 'Current item, ';
      span.innerHTML = spanString;
      span.setAttribute('id', 'span')
      span.classList.add('gs-u-vh-heydon');
      tabs[newIndex].insertBefore(span, tabs[newIndex].childNodes[0] || null);

      panels[newIndex].hidden = false;
      panels[newIndex].classList.remove('hidden');

      //var p = panels[newIndex].getElementsByTagName('p');
      //p[0].setAttribute('tabindex', '-1');
      //panels[newIndex].focus();
    }

    Array.prototype.forEach.call(tabs, function (tab, i) {
      tab.id = 'tab-'+tab.getAttribute('href').substring(1);

      var panel = panels[i];
      //panel.setAttribute('tabindex', '-1');
      //panel.setAttribute('aria-labelledby', tab.id);
      //var p = panel.getElementsByTagName('p');
      //p[0].setAttribute('tabindex', '-1');
      panel.hidden = true;
      panel.classList.add('hidden');
    });

    tablist.addEventListener('click', function (e) {
      var selected = tablist.querySelector('span').parentNode;
      var oldIndex = selected ? Array.prototype.indexOf.call(tabs, selected) : undefined;
      var newIndex = Array.prototype.indexOf.call(tabs, e.target);
      switchTab(oldIndex, newIndex);
    }, false);

    window.addEventListener('DOMContentLoaded', function () {
      if (window.location.hash) {
        var tabMatch = Array.prototype.indexOf.call(
          tabs,
          document.getElementById('tab-'+window.location.hash.substring(1))
        );
      }
      switchTab(undefined, tabMatch > -1 ? tabMatch : 0);
    });
  });
})();