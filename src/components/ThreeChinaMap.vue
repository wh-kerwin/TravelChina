<template>
  <div ref="containerRef" class="three-wrap"></div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const containerRef = ref(null);

let renderer;
let scene;
let camera;
let controls;
let frameId = 0;

const MAP_WIDTH = 16;
const MAP_HEIGHT = 10;

const cityMarkers = [
  { name: "北京", lng: 116.4, lat: 39.9 },
  { name: "上海", lng: 121.47, lat: 31.23 },
  { name: "广州", lng: 113.27, lat: 23.13 },
  { name: "深圳", lng: 114.06, lat: 22.55 },
  { name: "杭州", lng: 120.15, lat: 30.28 },
  { name: "成都", lng: 104.06, lat: 30.67 },
  { name: "西安", lng: 108.94, lat: 34.34 },
  { name: "重庆", lng: 106.55, lat: 29.56 },
  { name: "武汉", lng: 114.31, lat: 30.52 },
];

function lonLatToPlane(lng, lat, bounds) {
  const nx = (lng - bounds.minX) / (bounds.maxX - bounds.minX);
  const ny = (lat - bounds.minY) / (bounds.maxY - bounds.minY);
  const x = nx * MAP_WIDTH - MAP_WIDTH / 2;
  const y = MAP_HEIGHT / 2 - ny * MAP_HEIGHT;
  return { x, y };
}

function createTextSprite(text) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 192;
  canvas.height = 64;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const x = 8;
  const y = 8;
  const w = 176;
  const h = 48;
  const r = 16;
  ctx.fillStyle = "rgba(31,111,255,0.9)";
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 28px Microsoft YaHei, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, 96, 34);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthTest: false,
  });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(1.6, 0.53, 1);
  return sprite;
}

function getGeoBounds(features) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (const feature of features) {
    const rings = getRings(feature.geometry);
    for (const ring of rings) {
      for (const point of ring) {
        if (!Array.isArray(point) || point.length < 2) continue;
        const [x, y] = point;
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }

  return { minX, minY, maxX, maxY };
}

function getRings(geometry) {
  if (!geometry || !geometry.type || !geometry.coordinates) return [];

  if (geometry.type === "Polygon") {
    return geometry.coordinates;
  }

  if (geometry.type === "MultiPolygon") {
    return geometry.coordinates.flatMap((polygon) => polygon);
  }

  return [];
}

async function initThree() {
  const el = containerRef.value;
  if (!el) return;

  scene = new THREE.Scene();
  scene.background = null;

  camera = new THREE.PerspectiveCamera(
    45,
    el.clientWidth / el.clientHeight,
    0.1,
    1000,
  );
  camera.position.set(0, 2.8, 13);
  camera.lookAt(0, 0, 0);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(el.clientWidth, el.clientHeight);
  el.appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enablePan = false;
  controls.enableDamping = true;
  controls.minDistance = 8;
  controls.maxDistance = 20;
  controls.maxPolarAngle = Math.PI / 2.05;
  controls.minPolarAngle = Math.PI / 3.5;

  const ambient = new THREE.AmbientLight(0xffffff, 0.86);
  scene.add(ambient);
  const dir = new THREE.DirectionalLight(0xffffff, 1.05);
  dir.position.set(3, 8, 6);
  scene.add(dir);

  const textureLoader = new THREE.TextureLoader();
  const mapTexture = textureLoader.load("/pageImage/纯净卡通地图.png");
  mapTexture.colorSpace = THREE.SRGBColorSpace;

  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(MAP_WIDTH, MAP_HEIGHT, 1, 1),
    new THREE.MeshStandardMaterial({
      map: mapTexture,
      transparent: true,
      roughness: 0.95,
      metalness: 0.02,
    }),
  );
  scene.add(plane);

  const response = await fetch("/3D/China.geojson");
  const geo = await response.json();
  const features = geo.features || [];
  const bounds = getGeoBounds(features);

  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x6be2ff,
    transparent: true,
    opacity: 0.85,
  });

  for (const feature of features) {
    const rings = getRings(feature.geometry);
    for (const ring of rings) {
      const pts = ring
        .filter((point) => Array.isArray(point) && point.length >= 2)
        .map(([lng, lat]) => {
          const { x, y } = lonLatToPlane(lng, lat, bounds);
          return new THREE.Vector3(x, y, 0.015);
        });
      if (pts.length < 2) continue;
      const geometry = new THREE.BufferGeometry().setFromPoints(pts);
      const line = new THREE.Line(geometry, lineMaterial);
      scene.add(line);
    }
  }

  for (const marker of cityMarkers) {
    const pos = lonLatToPlane(marker.lng, marker.lat, bounds);
    const dot = new THREE.Mesh(
      new THREE.CircleGeometry(0.08, 24),
      new THREE.MeshBasicMaterial({ color: 0x00d4ff }),
    );
    dot.position.set(pos.x, pos.y, 0.03);
    scene.add(dot);

    const label = createTextSprite(marker.name);
    label.position.set(pos.x, pos.y + 0.32, 0.05);
    scene.add(label);
  }

  const onResize = () => {
    if (!renderer || !camera || !el) return;
    camera.aspect = el.clientWidth / el.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(el.clientWidth, el.clientHeight);
  };

  window.addEventListener("resize", onResize);

  const animate = () => {
    controls.update();
    renderer.render(scene, camera);
    frameId = requestAnimationFrame(animate);
  };
  animate();

  onBeforeUnmount(() => {
    window.removeEventListener("resize", onResize);
    cancelAnimationFrame(frameId);
    controls?.dispose();
    renderer?.dispose();
    if (renderer?.domElement && renderer.domElement.parentElement) {
      renderer.domElement.parentElement.removeChild(renderer.domElement);
    }
  });
}

onMounted(() => {
  initThree();
});
</script>

<style scoped>
.three-wrap {
  width: 100%;
  height: 100%;
}
</style>
