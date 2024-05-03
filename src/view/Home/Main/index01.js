import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
// 引入渲染器通道RenderPass
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';


export const initCanvas = () => {
  let main = document.querySelector('.main')
  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera(
    75,
    main.offsetWidth / main.offsetHeight,
    0.1,
    1000
  )
  camera.position.set(-6.19, 1, 6.14);
  camera.updateProjectionMatrix();
  scene.add(camera);
  scene.background = new THREE.Color(0x000000);

  let renderer = new THREE.WebGLRenderer({
    antialias: true,
  })
  // renderer.setSize(window.offsetWidth, window.offsetHeight);
  renderer.setSize(main.offsetWidth, main.offsetHeight);
  main.appendChild(renderer.domElement);

  let control = new OrbitControls(camera, renderer.domElement);
  // 设置控制器的最大缩放倍数
  control.maxDistance = 100;
  control.target.set(0, 0, 0);
  control.enableDamping = true;
  control.autoRotate = true;
  control.autoRotateSpeed = 0.7
  // document.addEventListener('click', () => {
  //   console.log(camera.position)
  // })
  let parameters = {
    count: 10000,
    size: 0.02,
    radius: 5,
    branches: 3,
    spin: 1,
    randomness: 0.2,
    randomnessPower: 3,
  }
  let insideColor = '#ff6030';
  let outsideColor = '#1b3984';
  let points = null;
  let geometry = null;
  let material = null;
  const generatorGalaxy = () => {
    if (points) {
      geometry.dispose();
      material.dispose();
      scene.remove(points)
    }

    geometry = new THREE.BufferGeometry();
    // 创建一个长度为parameters.count * 3的数组，数组只能存Number类型数据，默认为0
    let position = new Float32Array(parameters.count * 3);
    let colors = new Float32Array(parameters.count * 3);
    for (let i = 0; i < parameters.count; i++) {
      let i3 = i * 3;
      const radius = Math.random() * parameters.radius;
      const randomX = Math.random() ** parameters.randomnessPower
        * (Math.random() < 0.5 ? 1 : -1)
        * parameters.randomness
        * radius
      const randomY = Math.random() ** parameters.randomnessPower
        * (Math.random() < 0.5 ? 1 : -1)
        * parameters.randomness
        * radius
      const randomZ = Math.random() ** parameters.randomnessPower
        * (Math.random() < 0.5 ? 1 : -1)
        * parameters.randomness
        * radius
      const spinAngle = radius * parameters.spin;
      // 渐变
      const mixedColor = new THREE.Color(insideColor).clone()
      mixedColor.lerpColors(new THREE.Color(insideColor), new THREE.Color(outsideColor), radius / parameters.radius)
      const branchesAngle = ((i % parameters.branches) / parameters.branches) * Math.PI * 2
      position[i3] = Math.cos(branchesAngle + spinAngle) * radius + randomX
      position[i3 + 1] = randomY
      position[i3 + 2] = Math.sin(branchesAngle + spinAngle) * radius + randomZ
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(position, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    material = new THREE.PointsMaterial({
      size: parameters.size,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true, // 开启才能为每个顶点设置颜色
    })
    points = new THREE.Points(geometry, material);
    scene.add(points)
  }
  generatorGalaxy();

  for (let i = 0; i < 100; i++) {
    let box = 0.005 * Math.random() * 10
    let geometry01 = new THREE.SphereGeometry(box);
    // 渐变
    const mixedColor = new THREE.Color(0x0000ff).clone()
    mixedColor.lerpColors(new THREE.Color(0x0000ff), new THREE.Color(0xffffff), Math.random())
    let boxMaterial = new THREE.MeshBasicMaterial({
      color: mixedColor,
      map: new THREE.TextureLoader().load(`/model/starTextures/star${i % 16}.jpg`)
    })
    let boxMesh = new THREE.Mesh(geometry01, boxMaterial)
    let x = Math.random() * 20 - 10;
    let y = Math.random() * 20 - 10;
    let z = Math.random() * 20 - 10;
    boxMesh.rotation.x = Math.PI / (Math.random() * 10)
    boxMesh.rotation.z = Math.PI / (Math.random() * 10)
    boxMesh.position.set(x, y, z)
    scene.add(boxMesh)
  }

  // 新添渲染通道
  let composer = new EffectComposer(renderer);
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass)
  const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight));
  bloomPass.strength = 1.0;
  composer.addPass(bloomPass)

  let render = function () {
    // renderer.render(scene, camera);
    composer.render();
    control.update();
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
