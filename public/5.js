$(function() {
  var index = 0,
    tabs = $('a.tab');
  tabs.bind({
    keydown: function(ev) {
      var k = ev.which || ev.keyCode;

      if (k >= 37 && k <= 40) {
        if (k == 37 || k == 38) {
          if (index > 0)
            index--;

          else
            index = tabs.length - 1;
        } else if (k == 39 || k == 40) {
          if (index < (tabs.length - 1))
            index++;

          else
            index = 0;
        }
        $(tabs.get(index)).click();
        ev.preventDefault();
      }
    },
    click: function(ev) {
      index = $.inArray(this, tabs.get());
      setFocus();
      ev.preventDefault();
    }
  });
  var setFocus = function() {
    tabs.attr({
      tabindex: '-1',
      'aria-selected': 'false'
    }).removeClass('selected-tab');
    $('.panel').addClass('hidden');

    $(tabs.get(index)).attr({
      tabindex: '0',
      'aria-selected': 'true'
    }).addClass('selected-tab').focus();

    $($(tabs.get(index)).attr('href')).removeClass('hidden');

  };
});