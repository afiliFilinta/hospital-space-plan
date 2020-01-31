import * as THREE from './build/three.module.js';

import { OrbitControls } from './jsm/controls/OrbitControls.js';
import { settings } from './js/settings.js';
import { Point } from './js/geometry/Point.js';
import { Square } from './js/geometry/Square.js';
import utils from './js/utils.js';

var canvas;

var scenes = [],
  renderer;

init();
animate();

function collisionFix(squares) {

  squares.forEach(square => {
    console.log(`${JSON.stringify(square.startPoint)} ::: ${JSON.stringify(square.endPoint)} `)
  })
  for (let i = 0; i < squares.length; i++) {
    let suspiciousSquare = squares[i];
    for (let j = i + 1; j < squares.length; j++) {
      console.log(`--> i: ${i}, j: ${j}`);
      let othreSquare = squares[j];
      if (utils.isCollisionBetweenTwoSquare(suspiciousSquare, othreSquare)) {
        console.log(`Collision between ${suspiciousSquare.name} and ${othreSquare.name}`);
        // Collision is detected
        // let mirrorAxis = _util.getRandomInt(0,2);
        let mirrorAxis = 0;
        if (mirrorAxis === 0) {
          // X Axis
          let shift = 0;
          if (suspiciousSquare.endPoint.x > 0) {
            if (suspiciousSquare.endPoint.x > othreSquare.endPoint.x) {
              shift = suspiciousSquare.endPoint.x;
              othreSquare.startPoint.x += shift;
              othreSquare.endPoint.x += shift;
              othreSquare.updateSquare();
              squares[j] = othreSquare;
            } else {
              shift = othreSquare.endPoint.x;
              suspiciousSquare.startPoint.x += shift;
              suspiciousSquare.endPoint.x += shift;
              suspiciousSquare.updateSquare();
              squares[i] = suspiciousSquare;
            }
          } else {
            if (suspiciousSquare.endPoint.x > othreSquare.endPoint.x) {
              shift = othreSquare.endPoint.x;
              suspiciousSquare.startPoint.x += shift;
              suspiciousSquare.endPoint.x += shift;
              suspiciousSquare.updateSquare();
              squares[i] = suspiciousSquare;
            } else {
              shift = suspiciousSquare.endPoint.x;
              othreSquare.startPoint.x += shift;
              othreSquare.endPoint.x += shift;
              othreSquare.updateSquare();
              squares[j] = othreSquare;
            }
          }
        }

      }
    }
  }
  squares.forEach(square => {
    console.log(`${JSON.stringify(square.startPoint)} ::: ${JSON.stringify(square.endPoint)} `)
  })
}

function shuffle(squares) {
  var currentIndex = squares.length,
    temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = squares[currentIndex];
    squares[currentIndex] = squares[randomIndex];
    squares[randomIndex] = temporaryValue;
  }
  return squares;
}

function createSquare(startPoint, endPoint, width, height, rule, direction) {
  let square = new Square(startPoint, endPoint, width, height, rule, direction);
  console.log(`New Square: ${JSON.stringify(square)}`);
  return square;
}

function generateSpacePlan() {
  let startPoint;
  let endPoint;
  let edgelengths;
  let direction;

  let squares = [];
  let directionArray = [0, 1, 2, 3];
  settings.rules.forEach(rule => {
    console.log(directionArray)
    let index = directionArray.splice(utils.getRandomInt(0, directionArray.length), 1)[0];
    console.log("index:", index)
    utils.print(rule);
    edgelengths = utils.getEdgeLength(rule);
    direction = utils.getDirections(index);
    console.log(JSON.stringify(direction))
    startPoint = new Point(0, 0);
    endPoint = new Point(edgelengths.width * direction.x, edgelengths.height * direction.y);
    let square = createSquare(startPoint, endPoint, edgelengths.width, edgelengths.height, rule, direction);
    squares.push(square);
  });

  console.log(squares);
  shuffle(squares);
  console.log(squares);
  collisionFix(squares);
  return squares;
}

function init() {

  canvas = document.getElementById("c");

  var template = document.getElementById("template").text;
  var content = document.getElementById("content");

  for (var i = 0; i < settings.options.iterator; i++) {

    var scene = new THREE.Scene();

    // make a list item
    var element = document.createElement("div");
    element.className = "list-item";
    element.innerHTML = template.replace('$', i + 1);

    // Look up the element that represents the area
    // we want to render the scene
    scene.userData.element = element.querySelector(".scene");
    content.appendChild(element);

    var camera = new THREE.PerspectiveCamera(50, 1, 1, 100);
    camera.position.z = 50;
    scene.userData.camera = camera;

    var controls = new OrbitControls(scene.userData.camera, scene.userData.element);
    controls.minDistance = 10;
    controls.maxDistance = 50;
    controls.enablePan = false;
    // controls.enableZoom = false;
    scene.userData.controls = controls;

    // add one random mesh to each scene
    let squares = generateSpacePlan();
    let mesh;
    squares.forEach(square => {
      mesh = new THREE.Mesh(square.geometry, square.material);
      scene.add(mesh);
    });

    scene.add(new THREE.HemisphereLight(0xaaaaaa, 0x444444));

    var light = new THREE.DirectionalLight(0xffffff, 0.5);
    light.position.set(1, 1, 1);
    scene.add(light);

    scenes.push(scene);

  }

  renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
  renderer.setClearColor(0xffffff, 1);
  renderer.setPixelRatio(window.devicePixelRatio);

}

function updateSize() {

  var width = canvas.clientWidth;
  var height = canvas.clientHeight;

  if (canvas.width !== width || canvas.height !== height) {

    renderer.setSize(width, height, false);

  }

}

function animate() {

  render();
  requestAnimationFrame(animate);

}

function render() {

  updateSize();

  canvas.style.transform = `translateY(${window.scrollY}px)`;

  renderer.setClearColor(0xffffff);
  renderer.setScissorTest(false);
  renderer.clear();

  renderer.setClearColor(0xe0e0e0);
  renderer.setScissorTest(true);

  scenes.forEach(function (scene) {

    // so something moves
    // scene.children[0].rotation.y = Date.now() * 0.001;

    // get the element that is a place holder for where we want to
    // draw the scene
    var element = scene.userData.element;

    // get its position relative to the page's viewport
    var rect = element.getBoundingClientRect();

    // check if it's offscreen. If so skip it
    if (rect.bottom < 0 || rect.top > renderer.domElement.clientHeight ||
      rect.right < 0 || rect.left > renderer.domElement.clientWidth) {

      return; // it's off screen

    }

    // set the viewport
    var width = rect.right - rect.left;
    var height = rect.bottom - rect.top;
    var left = rect.left;
    var bottom = renderer.domElement.clientHeight - rect.bottom;

    renderer.setViewport(left, bottom, width, height);
    renderer.setScissor(left, bottom, width, height);

    var camera = scene.userData.camera;

    //camera.aspect = width / height; // not changing in this example
    //camera.updateProjectionMatrix();

    //scene.userData.controls.update();

    renderer.render(scene, camera);

  });

}