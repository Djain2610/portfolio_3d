import * as THREE from "three";

export const ISLAND_RADIUS = 12.5;

export const colliders = [
  // HOUSE
  {
    min: new THREE.Vector3(-2.5, 0, -11),
    max: new THREE.Vector3(2.5, 2, -7),
  },

  // BENCH
  {
    min: new THREE.Vector3(4.2, 0, -5.2),
    max: new THREE.Vector3(6.2, 2, -3.2),
  },

  // PATH LEFT FENCE
  {
    min: new THREE.Vector3(-2.4, 0, -5.5),
    max: new THREE.Vector3(-1.4, 2, 6.5),
  },

  // PATH RIGHT FENCE
  {
    min: new THREE.Vector3(1.4, 0, -5.5),
    max: new THREE.Vector3(2.4, 2, 6.5),
  },
];
