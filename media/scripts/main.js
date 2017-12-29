


  console.log('hit')

  var tl = new TimelineMax(),
      box = $('.box');

  $('document').find('.hero').mouseenter(function() {
    console.log('entered');
    var _this = $(this)
    tl.staggerFrom(_this, .5, {
      ease: Bounce.easeIn,
    }, .1)
  tl.staggerTo(_this, .5, {
    y: window.innerHeight - (window.innerHeight / 2),
    ease: Bounce.easeIn
  }, 0.1)
  });
