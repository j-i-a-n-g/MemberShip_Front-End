import * as THREE from 'three';
import { cube, geo01, plane01, plane01Material } from './geometry.js';
import { ball } from './tween.js'
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import * as TWEEN from 'three/examples/jsm/libs/tween.module.js'; // 导入补间动画插件

export let scene = null;
export let camera = null;
export let renderer = null;
export let initScene = function () {
  scene = new THREE.Scene();
  if (false) {
    // 创建雾
    // scene.fog = new THREE.Fog(0xeeeeee, 0.1, 15) // 线性雾
    scene.fog = new THREE.FogExp2(0xeeeeee, 0.2) // 指数雾
    scene.background = new THREE.Color(0xeeeeee)
  } else {
    let rgbeLoader = new RGBELoader();
    rgbeLoader.load(require("@/assets/model/HDR/little_paris_eiffel_tower_2k.hdr"), (envMap) => {
      envMap.mapping = THREE.EquirectangularReflectionMapping; // 设置球形贴图
      scene.background = envMap; // 设置环境贴图
      scene.environment = envMap; // 设置环境贴图
      plane01Material.envMap = envMap; // 设置物体的环境贴图，可以让物体反射环境图片
    })
  }


  camera = new THREE.PerspectiveCamera(
    45, // 视角，左眼和右眼能看到的极限角度
    window.innerWidth / window.innerHeight, // 宽高比
    0.1, // 最近平面
    1000 // 能看到的最远平面
  )

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // 添加世界坐标辅助器
  const axesHelper = new THREE.AxesHelper(5)
  scene.add(axesHelper)

  // 添加轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // 设置惯性（带阻尼）
  controls.dampingFactor = 0.01; // 设置阻尼系数
  // 设置相机位置
  camera.position.x = 2;
  camera.position.y = 3;
  camera.position.z = 5;
  camera.lookAt(0, 0, 0);

  // 给场景添加物体
  scene.add(cube);
  scene.add(geo01);
  scene.add(plane01);
  scene.add(ball);

  let animation = function () {
    renderer.render(scene, camera)
    // cube.rotation.x += Math.PI / 180;
    controls.update();
    TWEEN.update(); //补间动画更新
    requestAnimationFrame(animation);
  }
  // 渲染
  animation();
  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    // 更新相机的投影矩阵
    camera.updateProjectionMatrix();
  })
}