(function() {

    makeRect = function () {
      var color = '#'+ Math.round(0xffffff * Math.random()).toString(16);

      $newRect = $('<div/>').css({
          'width': '5px',
          'height': '3px',
          'background-color': color
      });

      var posx = (Math.random() * ($(document).width() - 5)).toFixed();
      var posy = (Math.random() * ($(document).height() - 3)).toFixed();

      $newRect.css({
          'class': 'divy',
          'position': 'absolute',
          'left': posx + 'px',
          'top': posy + 'px'
      }).appendTo('.random-div-container')
        .addClass('random-div');
    };

    for(x=0; x<80; x++) {
      makeRect();
    }

})();
