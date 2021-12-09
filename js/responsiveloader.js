export function sayHi(name) {
  alert('Hello ' + name);
}
export function responsiveLoader() {
  $(window).bind("load resize", function() {
    $(".rl-figure").each(function(index, el) {
      var figure = $(this),
        widths = [],
        currentWidth = $(this).innerWidth();
      if(figure.find('.rl-option').length) {
        $(el).find('.rl-option').each(function(test, option) {
          var currentWidth = parseInt($(option).attr("data-width"))
          //widths.push()
          if( currentWidth >= 0 && $(option).attr("data-src") != "" ) {
            widths.push(currentWidth);
          }
        });
        widths = widths.sort(function(a, b){return a-b});
        var found = widths.find(function(compare) {
          return compare >= currentWidth;
        });
        if(found) {
          var img = figure.find('.rl-option[data-width="' + found + '"]').attr('data-src');
        } else {
          widths = widths.sort(function(a, b){return b-a});
          found = widths.find(function(compare) {
            return compare <= currentWidth;
          });
          var img = figure.find('.rl-option[data-width="' + found + '"]').attr('data-src');
        }
        figure.find('.rl-img').attr('src', img);
      }
    });
  });
}
