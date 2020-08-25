function addEventlisteners() {
  var derbySpan = document.querySelector('.derby');
  var derbyImage = document.querySelector('.derby-image');
  var aboutButton = document.querySelector('.button');

  function onSpanMouseEnter() {
    derbyImage.classList.add('show');
  }

  function onSpanMouseLeave() {
    derbyImage.classList.remove('show');
  }

  function onButtonClick(e) {
    e.preventDefault();

    var aboutSection = document.querySelector('.about');
    scrollTo(document.body, aboutSection.offsetTop, 300);
  }

  derbySpan.addEventListener('mouseenter', onSpanMouseEnter);
  derbySpan.addEventListener('mouseleave', onSpanMouseLeave);
  aboutButton.addEventListener('click', onButtonClick);
}

function scrollTo(element, to, duration) {
    if (duration <= 0) return;
    var difference = to - element.scrollTop;
    var perTick = difference / duration * 10;

    setTimeout(function() {
        element.scrollTop = element.scrollTop + perTick;
        if (element.scrollTop === to) return;
        scrollTo(element, to, duration - 10);
    }, 10);
}

function isMobile() {
  return /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function createScene() {
  var containerEl = document.querySelector('.home .container');
  var light = new THREE.PointLight(0x313131, 1, 1000);

  this.scene = new THREE.Scene();
  this.camera = new THREE.PerspectiveCamera( 85, containerEl.clientWidth / containerEl.clientHeight, 0.1, 1000 );
  this.renderer = new THREE.WebGLRenderer({alpha: true});

  light.position.set(0, 0, 0);

  this.scene.add(light);
  this.renderer.setSize( window.innerWidth, window.innerHeight );

  containerEl.appendChild( this.renderer.domElement );
}

function createGeometry() {
  var classScope = this;
  var geometry = new THREE.BoxGeometry( 15, 15, 5 );
  var delay = 0;

  for (var key in this.coordinates) {
    var xCoords = Object.values(this.coordinates[key]);
    var key = Object.keys(this.coordinates[key]).pop();

    xCoords.forEach((properties) => {
      var yCoords = properties.y;
      var zHeight = properties.zHeight;
      var group = new THREE.Group();

      yCoords.forEach((coord) => {
        var tl = gsap.timeline({repeat: -1, duration: 1, delay: delay});
        var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color:  0xFFFFFF } ) );

        object.position.x = key;
    		object.position.y = coord;
    		object.position.z = -300;

        group.add( object );
        tl.to(group.position, 0, {z: 0})
          .to(group.position, .6, {z: zHeight})
          .to(group.position, .2, {z: 0})
      });

      delay += .1;
      classScope.scene.add( group );
    });
  }
  animate();
}

function animate() {
  requestAnimationFrame( animate );

  this.renderer.render( this.scene, this.camera );
};

function init() {
  this.scene = null;
  this.camera = null;
  this.renderer = null;
  this.coordinates =
    [
      {
        "-320": {
            y: [60, 0],
            zHeight: 50
        }
      },{
        "-260": {
          y: [180, 120, 60, 0],
          zHeight: 40

        }
      },{
        "-200": {
          y: [120, 60, 0, -60],
          zHeight: 50

        }
      },{
        "-140": {
          y: [120, 60, 0, -60, -120],
          zHeight: 50

        }
      },{
        "-80": {
          y: [60, 0, -60, -120],
          zHeight: 40

        }
      },{
        "-20": {
          y: [120, 60, 0 -60],
          zHeight: 30

        }
      },{
        "40": {
          y: [180, 120, 60, 0, -60],
          zHeight: 30

        }
      },{
        "100": {
          y: [180, 120, 60, 0, -60],
          zHeight: 40

        }
      },{
        "160": {
          y: [120, 60, 0, -60, -120],
          zHeight: 50
        }
      },{
        "220": {
          y: [60, 0, -60, 120, -180],
          zHeight: 40
        }
      },{
        "280": {
          y: [60, 0, -60, -120],
          zHeight: 30
        }
      },{
        "340": {
          y: [-60],
          zHeight: 50
        }
      }
    ]

  if (!isMobile()) {
    createScene();
    createGeometry();
    addEventlisteners();
  }
}

init();
