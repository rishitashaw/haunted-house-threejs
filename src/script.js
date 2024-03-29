import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import { Mesh, MeshBasicMaterial, Side } from "three";

/**
 * Base
 */
const gui = new dat.GUI();

// canva
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// fog
const fog = new THREE.Fog("#262837", 1, 15);
scene.fog = fog;

/**
 * Textures
 */

// texture loader
const textureLoader = new THREE.TextureLoader();

// door texture
const doorColorTexture = textureLoader.load("/textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load("/textures/door/height.jpg");
const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg");
const doorMetalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const doorRoughnessTexture = textureLoader.load("/textures/door/roughness.jpg");

// house walls and outside walls texture
const wallHouseColorTexture = textureLoader.load("/textures/bricks/color.jpg");
const wallHouseAoTexture = textureLoader.load(
  "/textures/bricks/ambientOcclusion.jpg"
);
const wallHouseNormalTexture = textureLoader.load(
  "/textures/bricks/normal.jpg"
);
const wallHouseRoughnessTexture = textureLoader.load(
  "/textures/bricks/roughness.jpg"
);

// grass texture for the floor
const grassColorTexture = textureLoader.load("/textures/grass/color.jpg");
const grassAoTexture = textureLoader.load(
  "/textures/grass/ambientOcclusion.jpg"
);
const grassNormalTexture = textureLoader.load("/textures/grass/normal.jpg");
const grassRoughnessTexture = textureLoader.load(
  "/textures/grass/roughness.jpg"
);

grassColorTexture.repeat.set(8, 8);
grassAoTexture.repeat.set(8, 8);
grassNormalTexture.repeat.set(8, 8);
grassRoughnessTexture.repeat.set(8, 8);

grassColorTexture.wrapS = THREE.RepeatWrapping;
grassAoTexture.wrapS = THREE.RepeatWrapping;
grassNormalTexture.wrapS = THREE.RepeatWrapping;
grassRoughnessTexture.wrapS = THREE.RepeatWrapping;
grassColorTexture.wrapT = THREE.RepeatWrapping;
grassAoTexture.wrapT = THREE.RepeatWrapping;
grassNormalTexture.wrapT = THREE.RepeatWrapping;
grassRoughnessTexture.wrapT = THREE.RepeatWrapping;

// gate texture
const gateColorTexture = textureLoader.load("/textures/gate/color.jpg");
const gateAoTexture = textureLoader.load("/textures/gate/ambientOcclusion.jpg");
const gateHeightTexture = textureLoader.load("/textures/gate/height.jpg");
const gateNormalTexture = textureLoader.load("/textures/gate/normal.jpg");
const gateOpacityTexture = textureLoader.load("/textures/gate/opacity.jpg");
const gateRoughnessTexture = textureLoader.load("/textures/gate/roughness.jpg");

gateColorTexture.repeat.set(2, 1);
gateAoTexture.repeat.set(2, 1);
gateHeightTexture.repeat.set(2, 1);
gateNormalTexture.repeat.set(2, 1);
gateOpacityTexture.repeat.set(2, 1);
gateRoughnessTexture.repeat.set(2, 1);

gateColorTexture.wrapS = THREE.RepeatWrapping;
gateAoTexture.wrapS = THREE.RepeatWrapping;
gateHeightTexture.wrapS = THREE.RepeatWrapping;
gateNormalTexture.wrapS = THREE.RepeatWrapping;
gateOpacityTexture.wrapS = THREE.RepeatWrapping;
gateRoughnessTexture.wrapS = THREE.RepeatWrapping;

gateColorTexture.wrapT = THREE.RepeatWrapping;
gateAoTexture.wrapT = THREE.RepeatWrapping;
gateHeightTexture.wrapT = THREE.RepeatWrapping;
gateNormalTexture.wrapT = THREE.RepeatWrapping;
gateOpacityTexture.wrapT = THREE.RepeatWrapping;
gateRoughnessTexture.wrapT = THREE.RepeatWrapping;

// rotation of the texture in order to put the spikes of the door on top
gateColorTexture.rotation = Math.PI * 1;
gateAoTexture.rotation = Math.PI * 1;
gateHeightTexture.rotation = Math.PI * 1;
gateNormalTexture.rotation = Math.PI * 1;
gateOpacityTexture.rotation = Math.PI * 1;
gateRoughnessTexture.rotation = Math.PI * 1;

// bushes texture
const bushColorTexture = textureLoader.load("/textures/brushes/color.jpg");
const bushAoTexture = textureLoader.load(
  "/textures/brushes/ambientOcclusion.jpg"
);
const bushHeightTexture = textureLoader.load("/textures/brushes/height.jpg");
const bushNormalTexture = textureLoader.load("/textures/brushes/normal.jpg");
const bushroughnessTexture = textureLoader.load(
  "/textures/brushes/roughness.jpg"
);

/**
 * House
 */
// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(20, 20),
  new THREE.MeshStandardMaterial({
    map: grassColorTexture,
    aoMap: grassAoTexture,
    normalMap: grassNormalTexture,
    roughnessMap: grassRoughnessTexture,
  })
);

floor.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
);

floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
scene.add(floor);

// House group
const house = new THREE.Group();
scene.add(house);

// walls
const wallsHouse = new THREE.Mesh(
  new THREE.BoxBufferGeometry(4, 2.5, 4),
  new THREE.MeshStandardMaterial({
    map: wallHouseColorTexture,
    aoMap: wallHouseAoTexture,
    normalMap: wallHouseNormalTexture,
    roughnessMap: wallHouseRoughnessTexture,
  })
);

wallsHouse.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(wallsHouse.geometry.attributes.uv.array, 2)
);
wallsHouse.position.y = 1.25;
house.add(wallsHouse);

// roof
const roofHouse = new THREE.Mesh(
  new THREE.ConeBufferGeometry(3.5, 1, 4),
  new THREE.MeshStandardMaterial({ color: "#b35f45" })
);
roofHouse.rotation.y = Math.PI * 0.25;
roofHouse.position.y = 2.5 + 0.5;
house.add(roofHouse);

// door
const doorHouse = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(2.2, 2.2, 100, 100),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    transparent: true,
    alphaMap: doorAlphaTexture,
    aoMap: doorAmbientOcclusionTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.1,
    normalMap: doorNormalTexture,
    metalnessMap: doorMetalnessTexture,
    roughnessMap: doorRoughnessTexture,
  })
);

doorHouse.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(doorHouse.geometry.attributes.uv.array, 2)
);
doorHouse.position.y = 1;
doorHouse.position.z = 2 + 0.01;
house.add(doorHouse);

// bushes
const bushGeometry = new THREE.SphereBufferGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({ color: "#89c854" });

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(1.2, 0.2, 2.2);

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.2 + 0.5, 0.1, 2.1);

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(-1.2, 0.2, 2.2);

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(0.25, 0.25, 0.25);
bush4.position.set(-1.2, 0.05, 2.6);

house.add(bush1, bush2, bush3, bush4);

// low walls
const lowWalls = new THREE.Group();

// outside walls
const lowWallsGeometry = new THREE.BoxBufferGeometry(3, 1, 0.3, 4);
const lowWallMaterial = new THREE.MeshStandardMaterial({
  map: wallHouseColorTexture,
  aoMap: wallHouseAoTexture,
  normalMap: wallHouseNormalTexture,
  roughnessMap: wallHouseRoughnessTexture,
});

wallsHouse.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(wallsHouse.geometry.attributes.uv.array, 2)
);

const backLeftWall = new THREE.Mesh(lowWallsGeometry, lowWallMaterial);
backLeftWall.position.set(-3.5, 0.5, -1.85);

backLeftWall.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(backLeftWall.geometry.attributes.uv.array, 2)
);

const backRightWall = new THREE.Mesh(lowWallsGeometry, lowWallMaterial);
backRightWall.position.set(3.5, 0.5, -1.85);

backRightWall.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(
    backRightWall.geometry.attributes.uv.array,
    2
  )
);

// side walls
const sideLeftWall = new THREE.Mesh(lowWallsGeometry, lowWallMaterial);
sideLeftWall.position.set(-5, 0.5, 1.75);
sideLeftWall.rotation.y = Math.PI * 0.5;
sideLeftWall.scale.x = 2.5;

sideLeftWall.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(sideLeftWall.geometry.attributes.uv.array, 2)
);

const sideRightWall = new THREE.Mesh(lowWallsGeometry, lowWallMaterial);
sideRightWall.position.set(5, 0.5, 1.75);
sideRightWall.rotation.y = Math.PI * 0.5;
sideRightWall.scale.x = 2.5;

sideRightWall.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(
    sideRightWall.geometry.attributes.uv.array,
    2
  )
);

// front bushes
const wallBushGeometry = new THREE.BoxBufferGeometry(2.85, 1, 0.3, 4);
const frontBushMaterial = new THREE.MeshStandardMaterial({
  map: bushColorTexture,
  aoMap: bushAoTexture,
  displacementMap: bushHeightTexture,
  displacementScale: 0.1,
  normalMap: bushNormalTexture,
  roughnessMap: bushroughnessTexture,
});

// front walls
const frontLeftWall = new THREE.Mesh(wallBushGeometry, frontBushMaterial);
frontLeftWall.position.set(-3.42, 0.5, 5.5);

frontLeftWall.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(
    frontLeftWall.geometry.attributes.uv.array,
    2
  )
);

const frontRightWall = new THREE.Mesh(wallBushGeometry, frontBushMaterial);
frontRightWall.position.set(3.42, 0.5, 5.5);

frontRightWall.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(
    frontRightWall.geometry.attributes.uv.array,
    2
  )
);

lowWalls.add(
  backLeftWall,
  backRightWall,
  sideRightWall,
  sideLeftWall,
  frontLeftWall,
  frontRightWall
);
scene.add(lowWalls);

// gate
const gate = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(4, 1.5),
  new THREE.MeshStandardMaterial({
    map: gateColorTexture,
    aoMap: gateAoTexture,
    displacementMap: gateHeightTexture,
    displacementScale: 0.3,
    normalMap: gateNormalTexture,
    opacity: gateOpacityTexture,
    roughnessMap: gateRoughnessTexture,
  })
);

gate.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(gate.geometry.attributes.uv.array, 2)
);

gate.material.side = THREE.DoubleSide;
console.log(gate);

gate.position.set(0, 0.75, 5.5);
house.add(gate);

// graves
const graves = new THREE.Group();
scene.add(graves);

const graveGeometry = new THREE.BoxBufferGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({ color: "#b2b6b1" });

for (let i = 0; i < 50; i++) {
  const angle = Math.random() * Math.PI * 2;
  const radius = 3 + Math.random() * 6.2;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;

  const graveMesh = new THREE.Mesh(graveGeometry, graveMaterial);
  graveMesh.position.set(x, 0.3, z);
  graveMesh.rotation.y = (Math.random() - 0.5) * 4;
  graveMesh.rotation.z = (Math.random() - 0.5) * 0.5;
  graveMesh.castShadow = true;
  graves.add(graveMesh);
}

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight("#b9d5ff", 0.12);
gui.add(ambientLight, "intensity").min(0).max(1).step(0.001);
scene.add(ambientLight);

// directional light
const mooLight = new THREE.DirectionalLight("#b9d5ff", 0.12);
gui.add(mooLight, "intensity").min(0).max(1).step(0.001);
scene.add(mooLight);

// door light
const doorLight = new THREE.PointLight("#ff7d46", 1, 7);
doorLight.position.set(0, 2.2, 2.7);
house.add(doorLight);

/**
 * Ghosts
 */
const ghots1 = new THREE.PointLight("#ff00ff", 2, 3);
const ghots2 = new THREE.PointLight("#00ffff", 2, 3);
const ghots3 = new THREE.PointLight("#ffff00", 2, 3);
scene.add(ghots1, ghots2, ghots3);

/**
 *  Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);

camera.position.x = 3;
camera.position.y = 2;
camera.position.z = 7;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor("#262837");

/**
 * Shadows
 */
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
mooLight.castShadow = true;
doorLight.castShadow = true;
ghots1.castShadow = true;
ghots2.castShadow = true;
ghots3.castShadow = true;

wallsHouse.castShadow = true;
bush1.castShadow = true;
bush2.castShadow = true;
bush3.castShadow = true;
bush4.castShadow = true;

floor.receiveShadow = true;

doorLight.shadow.mapSize.width = 256;
doorLight.shadow.mapSize.height = 256;
doorLight.shadow.camera.far = 7;

ghots1.shadow.mapSize.width = 256;
ghots1.shadow.mapSize.height = 256;
ghots1.shadow.camera.far = 7;

ghots2.shadow.mapSize.width = 256;
ghots2.shadow.mapSize.height = 256;
ghots2.shadow.camera.far = 7;

ghots3.shadow.mapSize.width = 256;
ghots3.shadow.mapSize.height = 256;
ghots3.shadow.camera.far = 7;

/**
 * Animate
 */
const clock = new THREE.Clock();

const animate = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update ghosts
  const ghost1Angle = elapsedTime * 0.5;
  ghots1.position.x = Math.cos(ghost1Angle) * 4;
  ghots1.position.z = Math.sin(ghost1Angle) * 4;
  ghots1.position.y = Math.sin(elapsedTime * 4);

  const ghost2Angle = -elapsedTime * 0.3;
  ghots2.position.x = Math.cos(ghost2Angle) * 5;
  ghots2.position.z = Math.sin(ghost2Angle) * 5;
  ghots2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

  const ghost3Angle = elapsedTime * 0.18;
  ghots3.position.x =
    Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32));
  ghots3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5));
  ghots3.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

  // update controls
  controls.update();
  // render
  renderer.render(scene, camera);

  // call animate function on the next requestAnimationFrame
  window.requestAnimationFrame(animate);
};

animate();
