AFRAME.registerComponent("balls", {
  init: function () {
    this.bowlBall();
  },
  bowlBall: function () {
    window.addEventListener("keydown", (e) => {
      if (e.key === "z") {
        var bowl = document.createElement("a-entity");

        bowl.setAttribute("geometry", {
          primitive: "sphere",
          radius: 0.3,
        });

        bowl.setAttribute("material", "color", "red");

        var cam = document.querySelector("#camera-rigid");

        pos = cam.getAttribute("position");

        bowl.setAttribute("position", {
          x: pos.x,
          y: pos.y,
          z: pos.z,
        });
        var camera = document.querySelector("#camera").object3D;


        var direction = new THREE.Vector3();
        camera.getWorldDirection(direction);

        bowl.setAttribute("velocity", direction.multiplyScalar(-10));

        var scene = document.querySelector("#scene");

        bowl.setAttribute("dynamic-body", {
          shape: "sphere",
          mass: "0",
        });


        bowl.addEventListener("collide", this.removeBowl);

        scene.appendChild(bowl);


        this.bowlSound();
      }
    });
  },
  removeBall: function (e) {

    var element = e.detail.target.el;

    var elementHit = e.detail.body.el;

    if (elementHit.id.includes("box")) {
      elementHit.setAttribute("material", {
        opacity: 1,
        transparent: true,
      });

      var impulse = new CANNON.Vec3(-2, 2, 1);
      var worldPoint = new CANNON.Vec3().copy(
        elementHit.getAttribute("position")
      );

      elementHit.body.applyImpulse(impulse, worldPoint);

      element.removeEventListener("collide", this.removeBullet);

      var scene = document.querySelector("#scene");
      scene.removeChild(element);
    }
  },
  bowlSound: function () {
    var entity = document.querySelector("#sound1");
    entity.components.sound.playSound();
  },
});

