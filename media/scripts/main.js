function isMobile() {
  return false;
  var windowWidth = window.innerWidth;
  return windowWidth < 768 || /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function createScene() {
  this.renderer = new THREE.WebGLRenderer({ alpha: true });
  this.scene = new THREE.Scene();
  this.camera = new THREE.PerspectiveCamera(85, window.innerWidth / window.innerHeight, 1, 600);

  // Add light
  var light = new THREE.PointLight(0x8c4646, 5, 1000);
  light.position.set(0, 0, 0);
  this.scene.add(light);

  // Add directional light
  const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
	directionalLight.position.set(0, 0, 0);
  this.scene.add(directionalLight);

  // Add renderer to DOM
  this.renderer.setSize(window.innerWidth, window.innerHeight);
  var containerEl = document.querySelector('.home .container');
  containerEl.appendChild(this.renderer.domElement);
}
function debounce(func) {
  var timer;
  return function(event) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(func, 100, event);
  };
}
function onResize() {
  window.addEventListener('resize', debounce(function() {
    if (this.isMobile() && this.scene && this.scene.children.length) {
      this.scene.remove.apply(this.scene, this.scene.children);
      while(this.scene.children.length > 0){ 
        this.scene.remove(this.scene.children[0]); 
      }
      var canvas = document.querySelector('canvas');
      if (canvas) {
        canvas.remove();
      }
    }
    if (!this.isMobile() && this.scene && this.scene.children.length === 0) {
      createScene();
      createGeometry();
    }
  }));
}
function createGeometry() {
  var classScope = this;
  var geometry = new THREE.BoxGeometry(15, 15, 5);
  var delay = 0;
  var material = new THREE.MeshLambertMaterial({ color: 0x9933f5, emissive: 0x82c0d4 });

  for (var key in this.coordinates) {
    var xCoords = Object.values(this.coordinates[key]);
    var key = Object.keys(this.coordinates[key]).pop();

    xCoords.forEach((properties) => {
      var yCoords = properties.y;
      var zHeight = properties.zHeight;
      var group = new THREE.Group();

      yCoords.forEach((coord) => {
        var tl = gsap.timeline({ repeat: -1, duration: 1, delay: delay });
        var object = new THREE.Mesh(geometry, material);

        object.position.x = key;
    		object.position.y = coord;
    		object.position.z = -300;

        group.add(object);
        tl.to(group.position, 0, { z: 0 })
          .to(group.position, .6, { z: zHeight })
          .to(group.position, .2, { z: 0 })
      });

      delay += .1;
      classScope.scene.add(group);
    });
  }  
  animate();
}

function animate() {
  if (this.scene) {
    requestAnimationFrame(animate);
    this.renderer.render(this.scene, this.camera);
  }
};

function init() {
  this.scene = null;
  this.camera = null;
  this.renderer = null;
  this.coordinates = [
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
  ];

  if (!isMobile()) {
    createScene();
    createGeometry();
  }

  onResize();
}

init();