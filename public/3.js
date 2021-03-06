(function () {
  var tabInterfaces = document.querySelectorAll('.tabs');
  Array.prototype.map.call(tabInterfaces, function (tabInterface) {
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
    }

    Array.prototype.map.call(tabs, function (tab, i) {
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-selected', 'false');
      tab.parentElement.setAttribute('role', 'presentation');
      tab.id = 'tab-'+tab.getAttribute('href').substring(1);

      var panel = panels[i];
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('tabindex', '-1');
      panel.hidden = true;
      panel.classList.add('hidden');
    });

    var tabPanels = document.querySelectorAll('.tabs .panel');

    Array.prototype.map.call(tabs, function (tab, i) {
      tab.addEventListener('click', function (e) {
        var clickedElem = e.target;
        if(clickedElem.getAttribute('aria-selected') === 'false') {
          var oldTab = tablist.querySelector('a[aria-selected=true]');
          var oldIndex = Array.prototype.indexOf.call(tabs, oldTab);
          var newIndex = Array.prototype.indexOf.call(tabs, e.target);

          switchTabs(oldIndex, newIndex);
        } else {
          e.preventDefault();
        }
      });

      tab.addEventListener('keyup', function (e) {
        if(e.which === 32) {
          e.target.click();
        }
      });
    });

    function switchTabs(oldIndex, newIndex) {
      tabs.item(oldIndex).setAttribute('aria-selected', 'false');
      tabs.item(newIndex).setAttribute('aria-selected', 'true');

      tabPanels.item(oldIndex).hidden = true;
      tabPanels.item(oldIndex).classList.add('hidden');
      tabPanels.item(newIndex).hidden = false;
      tabPanels.item(newIndex).classList.remove('hidden');
    }

    switchTabs(0, 0);

    window.addEventListener('DOMContentLoaded', function () {
      if (window.location.hash) {
        var tabMatch = Array.prototype.indexOf.call(
          tabs,
          document.getElementById('tab-'+window.location.hash.substring(1))
        );
      }
      switchTabs(0, tabMatch);
    });
  });
})();