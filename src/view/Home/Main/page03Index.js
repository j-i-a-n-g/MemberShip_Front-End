import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
// 引入渲染器通道RenderPass
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

export const initCanvas03 = function () {
  let main = document.querySelector('.main')
  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera(
    75,
    main.offsetWidth / main.offsetHeight,
    0.1,
    1000
  )
  camera.position.set(0, 50, 0);
  camera.lookAt(0, 0, 0);
  camera.updateProjectionMatrix();
  scene.add(camera);
  // scene.background = new THREE.Color(0x06022b);

  let renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  })
  // renderer.setSize(window.offsetWidth, window.offsetHeight);
  renderer.setSize(main.offsetWidth, main.offsetHeight);
  main.appendChild(renderer.domElement);

  // let control = new OrbitControls(camera, renderer.domElement);
  // control.target.set(0, 0, 0);
  // control.enableDamping = true;

  let mesh = new THREE.Mesh(
    new THREE.BoxGeometry(10, 10, 10),
    new THREE.MeshBasicMaterial({
      color: 0xff0000,
    })
  )
  mesh.rotation.x = Math.PI / 6
  mesh.rotation.z = Math.PI / 6
  scene.add(mesh)

  let mesh1 = new THREE.Mesh(
    new THREE.BoxGeometry(10, 10, 10),
    new THREE.MeshBasicMaterial({
      color: 0xffff00,
    })
  )
  mesh1.position.set(12, 0, 0)
  mesh1.rotation.x = Math.PI / 6
  mesh1.rotation.z = Math.PI / 6
  scene.add(mesh1)

  const renderPass = new RenderPass(scene, camera);
  const composer = new EffectComposer(renderer);
  // 给EffectComposer添加一个渲染器通道RenderPass。
  composer.addPass(renderPass)

  const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight));
  bloomPass.strength = 1.0;
  composer.addPass(bloomPass)

  let render = function () {
    composer.render();
    // control.update();
    requestAnimationFrame(render);
  }
  render();
  // 监听屏幕的大小改变，修改渲染器的宽高，相机的比例
  window.addEventListener("resize", () => {
    camera.aspect = main.offsetWidth / main.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(main.offsetWidth, main.offsetHeight);
  });


}