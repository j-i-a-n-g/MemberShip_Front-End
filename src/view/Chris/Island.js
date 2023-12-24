import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Water } from "three/examples/jsm/objects/Water2";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

export const initScene = function () {
  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(1.99, 2, 2);
  camera.updateProjectionMatrix();
  scene.add(camera);

  let renderer = new THREE.WebGLRenderer({
    antialias: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;

  document.body.appendChild(renderer.domElement);

  const skyTexture = new THREE.TextureLoader().load("model/sky.jpg");
  const skyGeometry = new THREE.SphereGeometry(1000, 60, 60);
  skyGeometry.scale(1, 1, -1)
  const skyMaterial = new THREE.MeshBasicMaterial({
    map: skyTexture
  })
  const sky = new THREE.Mesh(skyGeometry, skyMaterial);
  scene.add(sky);
  scene.background = skyTexture;
  scene.environment = skyTexture;

  const water = new Water(new THREE.CircleGeometry(300, 32), {
    textureWidth: 1024,
    textureHeight: 1024,
    color: 0x6dc4e1,
    scale: 1,
    flowDirection: new THREE.Vector2(1, 1),
  })
  water.rotation.x = - Math.PI / 2
  water.position.y = -3.2;
  scene.add(water)

  let control = new OrbitControls(camera, renderer.domElement);
  control.target.set(2, 2, 2)
  control.enableDamping = true;

  let light = new THREE.PointLight(0xffffff, 100);
  light.position.set(5, 5, 5)
  scene.add(light);
  // document.onclick = () => {
  //   console.log(camera.position, '相机位置')
  //   console.log(control.target, '控制器位置')
  // }

  let render = () => {
    renderer.render(scene, camera);
    control.update()
    requestAnimationFrame(render);
  }
  render();

}