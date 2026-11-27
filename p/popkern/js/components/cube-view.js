import * as THREE from "three";
import { OrbitControls } from "../vendor/three/OrbitControls.js";
import { randomColors } from "../lib/random-colors.js";
import { store } from "../store.js";

const rad = Math.PI / 180;
const MAX = 255; // highest value of an RGB channel
const HALF = MAX / 2;

// Corners of the RGB cube: x = red, y = green, z = blue (x and z are centered)
const ORIGIN = [-HALF, 0, -HALF];

// [line color, destination], all starting at the black corner
const AXES = [
  ["rgb(255,0,0)", [HALF, 0, -HALF]],
  ["rgb(0,0,255)", [-HALF, 0, HALF]],
  ["rgb(0,255,0)", [-HALF, MAX, -HALF]],
  ["rgb(0,255,255)", [-HALF, MAX, HALF]],
  ["rgb(255,0,255)", [HALF, 0, HALF]],
  ["rgb(255,255,0)", [HALF, MAX, -HALF]],
  ["rgb(255,255,255)", [HALF, MAX, HALF]],
];

// Remaining edges of the cube, drawn in grey
const EDGES = [
  [[HALF, 0, -HALF], [HALF, MAX, -HALF]],
  [[HALF, 0, -HALF], [HALF, 0, HALF]],
  [[HALF, 0, HALF], [HALF, MAX, HALF]],
  [[-HALF, 0, HALF], [HALF, 0, HALF]],
  [[-HALF, MAX, -HALF], [HALF, MAX, -HALF]],
  [[-HALF, MAX, -HALF], [-HALF, MAX, HALF]],
  [[-HALF, 0, HALF], [-HALF, MAX, HALF]],
  [[HALF, MAX, -HALF], [HALF, MAX, HALF]],
  [[HALF, MAX, HALF], [-HALF, MAX, HALF]],
];

const createLine = (color, origin, destination) => {
  const geometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(...origin),
    new THREE.Vector3(...destination),
  ]);
  return new THREE.Line(geometry, new THREE.LineBasicMaterial({ color }));
};

const createLines = () => {
  const group = new THREE.Group();
  group.add(
    ...AXES.map(([color, destination]) => createLine(color, ORIGIN, destination)),
    ...EDGES.map(([from, to]) => createLine("rgb(80,80,80)", from, to))
  );
  return group;
};

/** One small box per color, placed at its (red, green, blue) position. */
const createColorBoxes = () => {
  const group = new THREE.Group();
  const geometry = new THREE.BoxGeometry(1, 1, 1);

  randomColors.forEach((color) => {
    const material = new THREE.MeshBasicMaterial({ color: color.hex });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(color.red - HALF, color.green, color.blue - HALF);
    mesh.name = color.spinalCase;
    group.add(mesh);
  });

  return group;
};

/** The picked colors in RGB space. Drag to orbit, scroll to zoom. */
class CubeView extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<div class="three-scene"></div>`;
    const container = this.querySelector(".three-scene");

    try {
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch (error) {
      console.error(error);
      container.innerHTML = "<p>This browser could not start WebGL.</p>";
      return;
    }

    const { renderer } = this;
    renderer.setPixelRatio(window.devicePixelRatio);
    container.append(renderer.domElement);

    this.scene = new THREE.Scene();
    this.scene.position.y = (-MAX - 1) * 0.5;

    const camera = new THREE.PerspectiveCamera(75, 1, 0.1);
    camera.position.set(0, 340, 0);

    this.controls = new OrbitControls(camera, renderer.domElement);
    this.controls.minPolarAngle = 75 * rad;
    this.controls.maxPolarAngle = 120 * rad;
    this.controls.minDistance = 7.5;
    this.controls.maxDistance = 500;
    this.controls.enablePan = false;

    const grid = new THREE.GridHelper(MAX, 25);
    const lines = createLines();
    this.scene.add(createColorBoxes(), grid, lines);

    // Follow the size of the container (window resize, side panel, fullscreen)
    this.observer = new ResizeObserver(() => {
      const { clientWidth: width, clientHeight: height } = container;
      if (!width || !height) return;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.render(this.scene, camera); // avoids a blank frame
    });
    this.observer.observe(container);

    renderer.setAnimationLoop(() => {
      const { grid: showGrid, lines: showLines, pause, sceneRotation } = store.state;
      this.controls.update();
      if (!pause) this.scene.rotation.y += sceneRotation * 0.01;
      grid.visible = showGrid;
      lines.visible = showLines;
      renderer.render(this.scene, camera);
    });
  }

  disconnectedCallback() {
    if (!this.scene) return;
    this.renderer.setAnimationLoop(null);
    this.observer.disconnect();
    this.controls.dispose();
    this.scene.traverse((object) => {
      object.geometry?.dispose();
      object.material?.dispose();
    });
    this.renderer.dispose();
    this.renderer.forceContextLoss();
    this.scene = undefined;
  }
}

customElements.define("pk-cube-view", CubeView);
