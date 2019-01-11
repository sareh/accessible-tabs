(function () {
  var tabInterfaces = document.querySelectorAll('.tabs');
  Array.prototype.forEach.call(tabInterfaces, function (tabInterface) {
    // Save elements to memory
    var tablist = tabInterface.querySelector('ul');
    var tabs = tablist.querySelectorAll('a');
    var panels = tabInterface.querySelectorAll('div[id]');
    tablist.setAttribute('role', 'tablist');

    var switchTab = function (oldIndex, newIndex) {
      if (oldIndex > -1) {
        tabs[oldIndex].setAttribute('aria-selected', 'false');
        panels[oldIndex].hidden = true;
      }

      tabs[newIndex].setAttribute('aria-selected', 'true');
      panels[newIndex].hidden = false;
      //panels[newIndex].focus();
    }

    Array.prototype.forEach.call(tabs, function (tab, i) {
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-selected', 'false');
      tab.parentElement.setAttribute('role', 'presentation');
      tab.id = 'tab-'+tab.getAttribute('href').substring(1);

      var panel = panels[i];
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('tabindex', '-1');
      // panel.setAttribute('aria-labelledby', tab.id);
      panel.hidden = true;
    });

    tablist.addEventListener('click', function (e) {
      var selected = tablist.querySelector('[aria-selected=true]');
      var oldIndex = selected ? Array.prototype.indexOf.call(tabs, selected) : undefined;
      var newIndex = Array.prototype.indexOf.call(tabs, e.target);
      switchTab(oldIndex, newIndex);
    });

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