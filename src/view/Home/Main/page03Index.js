import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
// 引入渲染器通道RenderPass
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
// 引入OutlinePass通道
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass';

export const initCanvas03 = function () {


  let main = document.querySelector('.page03')
  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera(
    75,
    main.offsetWidth / main.offsetHeight,
    0.1,
    1000
  )
  camera.position.set(0, 50, 0);
  camera.lookAt(0, 0, 0)
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
  // // 设置控制器的最大缩放倍数
  // // control.maxDistance = 100;
  // control.target.set(0, 0, 0);
  // control.enableDamping = true;

  let mesh = new THREE.Mesh(
    new THREE.BoxGeometry(10, 10, 10),
    new THREE.MeshBasicMaterial({
      color: 0x00ffff,
    })
  )
  mesh.rotation.x = Math.PI / 6
  mesh.rotation.z = Math.PI / 6
  scene.add(mesh)

  const renderPass = new RenderPass(scene, camera);
  const composer = new EffectComposer(renderer);
  // 给EffectComposer添加一个渲染器通道RenderPass。
  composer.addPass(renderPass)

  // 创建OutlinePass通道
  const v2 = new THREE.Vector2(window.innerWidth, window.innerHeight);
  let outlinePass = new OutlinePass(v2, scene, camera);

  // outlinePass描边样式调整
  //模型描边颜色，默认白色      
  outlinePass.visibleEdgeColor.set(0xffff00);
  //高亮发光描边厚度 数值越高越不明显
  outlinePass.edgeThickness = 3;
  //高亮描边发光强度 默认是3
  outlinePass.edgeStrength = 6;
  //模型闪烁频率控制，默认0不闪烁
  outlinePass.pulsePeriod = 4;

  outlinePass.selectedObjects = [mesh];
  composer.addPass(outlinePass)

  let render = function () {
    // renderer.render(scene, camera);
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