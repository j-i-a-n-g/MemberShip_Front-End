import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// 引入CSS2渲染器CSS2DRenderer和CSS2模型对象CSS2DObject
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';

export const initCanvas02 = () => {
  let main = document.querySelector('.page02')
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
  renderer.setSize(main.offsetWidth, main.offsetHeight);
  main.appendChild(renderer.domElement);

  // 创建一个CSS2渲染器CSS2DRenderer
  const css2Renderer = new CSS2DRenderer();
  css2Renderer.setSize(main.offsetWidth, main.offsetHeight);
  main.appendChild(css2Renderer.domElement);

  // 第一个物体
  let mesh = new THREE.Mesh(
    new THREE.BoxGeometry(10, 10, 10),
    new THREE.MeshBasicMaterial({
      color: 0xff0000,
    })
  )
  mesh.rotation.x = Math.PI / 6
  mesh.rotation.z = Math.PI / 6
  scene.add(mesh)
  const div = document.getElementById('tag');
  // 创建标签 在init函数中
  // const earthDiv = document.createElement('div');
  // earthDiv.className = 'label';
  // earthDiv.innerHTML = '地球'
  // HTML元素转化为threejs的CSS2模型对象
  const tag = new CSS2DObject(div)
  tag.position.set(0, 0, 0);
  scene.add(tag);
  mesh.add(tag)
  css2Renderer.domElement.style.position = 'absolute';
  css2Renderer.domElement.style.top = '0px';

  // 第二个物体
  let mesh02 = new THREE.Mesh(
    new THREE.BoxGeometry(10, 10, 10),
    new THREE.MeshBasicMaterial({
      color: 0xffff00,
    })
  )
  mesh02.rotation.x = Math.PI / 6
  mesh02.rotation.z = Math.PI / 6;
  mesh02.position.set(10, 10, 2)
  scene.add(mesh02);
  const div02 = document.createElement("div");
  div02.innerHTML = "黄球"
  div02.className = 'label';
  const meshDiv02 = new CSS2DObject(div02);
  meshDiv02.position.set(0, 0, 0);
  scene.add(meshDiv02);
  mesh02.add(meshDiv02)

  // 标签遮挡效果
  function computePosition() {
    // 标签的位置
    let mesh02Position = meshDiv02.position.clone();
    // 计算相机和标签之间的距离 distanceTo：计算两个点之间的直线距离
    let mesh02Distance = mesh02Position.distanceTo(camera.position);
    // 将标签的位置向量从世界空间投影到摄像机的标准化设备坐标空间(三维坐标到二维屏幕坐标）;
    mesh02Position.project(camera);
    // 根据meshDiv02的屏幕坐标，设置射线的起点和方向
    let raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mesh02Position, camera);
    // 检测射线是否与场景中的其他对象相交
    const intersects = raycaster.intersectObjects(scene.children, true);
    if (!intersects.length) {
      meshDiv02.element.classList.add("visible");
    } else {
      // 如果有交点，需要进一步判断，球体在标签前面还是在标签后面。在标签前面代表挡住了标签，这时隐藏标签。否则显示标签；
      // 获取最近相交点（球体）到相机的距离
      const minDistance = intersects[0].distance;
      console.log(minDistance, mesh02Distance)
      if (minDistance > mesh02Distance) {
        meshDiv02.element.classList.remove("visible");
      } else {
        meshDiv02.element.classList.add("visible");
      }
    }
  }
  computePosition()


  // let control = new OrbitControls(camera, css2Renderer.domElement);
  // control.target.set(0, 0, 0);
  // control.enableDamping = true;

  let render = function () {
    renderer.render(scene, camera);
    css2Renderer.render(scene, camera);
    mesh02.rotateY(1 / 20)
    mesh02.rotateZ(1 / 20)
    mesh02.rotateX(1 / 20)
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

