  (function () {
  var tabInterfaces = document.querySelectorAll('.tabs');

  function addOffscreenText(parent, child) {
    var span = document.createElement('span');
    var text = document.createTextNode('Current item, ');
    span.setAttribute('id', 'current-item');
    span.classList.add('gs-u-vh-heydon');
    span.appendChild(text);
    parent.insertBefore(span, child);
  }

  function removeOffscreenText() {
    if (document.getElementById('current-item')) {
      document.getElementById('current-item').remove();
    }
  }

  Array.prototype.forEach.call(tabInterfaces, function (tabInterface) {
    var tablist = tabInterface.querySelector('ul');
    var tabs = tablist.querySelectorAll('a');
    var panels = tabInterface.querySelectorAll('section[id]');
    tablist.setAttribute('aria-label', 'options');

    Array.prototype.forEach.call(tabs, function (tab, i) {
      tab.id = 'tab-'+tab.getAttribute('href').substring(1);
      var panel = panels[i];
      panel.hidden = true;
      panel.classList.add('hidden');
    });

    var tabPanels = document.querySelectorAll('.tabs .panel');
    var tabs = document.querySelectorAll('.tabs a');

    function switchTabs(oldIndex, newIndex) {
      tabPanels.item(oldIndex).hidden = true;
      tabPanels.item(oldIndex).classList.add('hidden');
      tabs.item(oldIndex).classList.remove('selected-tab');
      tabPanels.item(newIndex).hidden = false;
      tabPanels.item(newIndex).classList.remove('hidden');
      tabs.item(newIndex).classList.add('selected-tab');
      removeOffscreenText();
      var newlySelectedTabLink = tabs.item(newIndex);
      var newlySelectedTabLabel = newlySelectedTabLink.childNodes[0];
      addOffscreenText(newlySelectedTabLink, newlySelectedTabLabel);
    }

    Array.prototype.map.call(tabs, function (tab, i) {
      tab.addEventListener('click', function (e) {
        if(e.target.classList.contains('selected-tab') === false) {
          var oldTab = tablist.querySelector('a.selected-tab');
          var oldIndex = Array.prototype.indexOf.call(tabs, oldTab);
          var newIndex = Array.prototype.indexOf.call(tabs, e.target);
          switchTabs(oldIndex, newIndex);
        } else {
          e.preventDefault();
        }
      });
    });

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
