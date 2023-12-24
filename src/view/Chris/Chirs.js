import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { Water } from "three/examples/jsm/objects/Water2";
import gsap from "gsap";
// import { useState } from 'react';
// let { index, setIndex } = useState(0);

export let initScene = function () {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(-19.99, 0.27, -63.02);
  camera.updateProjectionMatrix();

  const renderer = new THREE.WebGLRenderer({
    // 设置抗锯齿
    antialias: true,
  });
  // 设置色调映射
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.5;
  renderer.shadowMap.enabled = true;
  renderer.physicallyCorrectLights = true; // 按照物理的光照效果

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // 初始化控制器
  const orbitControls = new OrbitControls(camera, renderer.domElement);
  orbitControls.target.set(-8, 2, 0);
  orbitControls.enableDamping = true;

  // 加载环境纹理
  const rgbeLoader = new RGBELoader();
  rgbeLoader.load("textures/sky.hdr", texture => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;
    scene.environment = texture;
  })

  // 加载模型
  const sceneLoader = new GLTFLoader();
  // 创建解码器
  const dencoderLoader = new DRACOLoader()
  dencoderLoader.setDecoderPath("/denco/");
  sceneLoader.setDRACOLoader(dencoderLoader);
  sceneLoader.load("/model/chirs.glb", gltf => {
    const model = gltf.scene
    model.traverse((child) => {
      // 隐藏模型里的水面
      if (child.name === "Plane") {
        child.visible = false;
      }
      if (child.isMesh) {
        child.castShadow = true; // 允许投射阴影
        child.receiveShadow = true; // 允许接收阴影
      }
    })
    scene.add(model)
  })
  // 创建水面
  const waterGeometry = new THREE.CircleGeometry(300, 32);
  const water = new Water(waterGeometry, {
    textureWidth: 1024,
    textureHeight: 1024,
    color: 0xeeeeff,
    flowDirection: new THREE.Vector2(1, 1),
    scale: 100,
  });
  water.rotation.x = -Math.PI / 2;
  water.position.y = -3.2;
  scene.add(water);

  // 添加光源
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(0, 50, 0);
  scene.add(light);

  const pointLight = new THREE.PointLight(0xffffff, 50);
  pointLight.position.set(2, -0.5, -48);
  pointLight.castShadow = true; // 允许投射阴影
  scene.add(pointLight)

  // 创建点光源组
  const pointLightGroup = new THREE.Group();
  pointLightGroup.position.set(0, 0, -50);
  let pointLightArr = [];
  let radius = 3;

  for (let i = 0; i < 3; i++) {
    // 创建球体当灯泡
    let sphereGeometry = new THREE.SphereGeometry(0.2, 32, 32);
    let sphereMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff, // 发光
      emissiveIntensity: 10, // 发光强度
    })
    let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(
      radius * Math.cos((i * 2 * Math.PI) / 3),
      Math.cos((i * 2 * Math.PI) / 3),
      radius * Math.sin((i * 2 * Math.PI) / 3)
    )
    let point = new THREE.PointLight(0xffffff, 10);
    sphere.add(point);
    pointLightArr.push(sphere)
    pointLightGroup.add(sphere);
    // scene.add(sphere);
  }
  scene.add(pointLightGroup);
  // 使用补间函数让球运动
  let options = {
    angle: 0,
  }
  gsap.to(options, {
    angle: Math.PI * 2,
    duration: 10,
    repeat: -1,
    ease: 'linear',
    onUpdate: () => {
      pointLightGroup.rotation.y = options.angle;
      pointLightArr.forEach((item, index) => {
        item.position.set(
          radius * Math.cos((index * 2 * Math.PI) / 3),
          Math.cos((index * 2 * Math.PI) / 3 + options.angle * 5),
          radius * Math.sin((index * 2 * Math.PI) / 3)
        );
      })
    }
  })
  // setInterval(() => {
  //   console.log(camera.position)
  // }, 3000)
  function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    orbitControls.update();
  }
  render();
  // document.onclick = () => {
  //   console.log(camera.position, '相机位置')
  //   console.log(orbitControls.target, '控制器位置')
  // }
  let sceneArr = [
    {
      text: '圣诞快乐',
      callback: () => {
        // 切换场景
        translateCamera(
          new THREE.Vector3(-8.52, -1.83, -61.86),
          new THREE.Vector3(2.86, -1.34, -1.98)
        )
      },
    },
    {
      text: '元旦快乐',
      callback: () => {
        // 切换场景
        translateCamera(
          new THREE.Vector3(-44.73, 20.22, -10.85),
          new THREE.Vector3(-17.06, 2.97, -22.67)
        )
      },
    },
    {
      text: '春节快乐',
      callback: () => {
        // 切换场景
        translateCamera(
          new THREE.Vector3(9.79, 1.36, -52.43),
          new THREE.Vector3(-10.36, -6.05, -48.38)
        )
      },
    },
    {
      text: '元宵快乐',
      callback: () => {
        // 切换场景
        translateCamera(
          new THREE.Vector3(-41.00, 1.37, -73.77),
          new THREE.Vector3(-10.38, -6.01, -48.38)
        );
      },
    }
  ];
  let index = 0
  // 监听鼠标滚轮事件
  window.addEventListener('wheel', (e) => {
    if (e.deltaY > 0) {
      // setIndex(index++);
      index++;
      if (index > sceneArr.length - 1) {
        // setIndex(0)
        index = 0;
      }
      sceneArr[index].callback();
    }
  }, false);
  let timeLine1 = gsap.timeline();
  let timeLine2 = gsap.timeline();
  // 移动相机事件
  function translateCamera(position, target) {
    timeLine1.to(camera.position, {
      x: position.x,
      y: position.y,
      z: position.z,
      duration: 1,
      ease: "power2.inOut"
    });
    timeLine2.to(orbitControls.target, {
      x: target.x,
      y: target.y,
      z: target.z,
      duration: 1,
      ease: "power2.inOut"
    })
  }
  // 制作星星
  let starInstance = new THREE.InstancedMesh(
    new THREE.SphereGeometry(0.3, 32, 32),
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 10,
    }),
    200
  )
  let starArr = [];
  for (let i = 0; i < 200; i++) {
    let x = Math.random() * 400 - 200;
    let y = Math.random() * 100 + 50;
    let z = Math.random() * 400 - 200;
    starArr.push(new THREE.Vector3(x, y, z));
    let matrix = new THREE.Matrix4();
    matrix.setPosition(x, y, z);
    starInstance.setMatrixAt(i, matrix);
  }
  scene.add(starInstance);
}