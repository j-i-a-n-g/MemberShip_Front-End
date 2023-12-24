import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// 导入FontLoader
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
// 导入TextGeometry
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import gsap from "gsap";

export const initLogo = (dom) => {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(
    45,
    dom.offsetWidth / dom.offsetHeight,
    0.1,
    1000
  );
  // camera.position.set(-0.34, -14.23, 7.96);
  camera.position.set(0, 0, 400);
  camera.updateProjectionMatrix();
  scene.add(camera);

  const renderer = new THREE.WebGLRenderer({
    antialias: true
  })
  renderer.setSize(dom.offsetWidth, dom.offsetHeight)
  dom.appendChild(renderer.domElement);

  const control = new OrbitControls(camera, renderer.domElement);
  // control.target.set(0, -10, 0)
  control.target.set(0, 0, 0)
  control.enableDamping = true;

  let texture = new THREE.TextureLoader().load('/font/room.jpg')
  console.log(texture)
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = new THREE.Color(0xd5b2ac);
  scene.backgroundBlurriness = 0.5;
  scene.environment = texture;

  // dom.onclick = () => {
  //   console.log(camera.position, control.target)
  // }

  const fontLoader = new FontLoader();
  fontLoader.load('/fonts/FangSong_Regular.json', font => {
    const genmary = new TextGeometry("新年快乐", {
      font: font,
      size: 80, // 字体大小
      height: 15, // 字体厚度
      curveSegments: 12, // 曲线分段数
      bevelEnabled: true, // 是否启用斜角
      bevelThickness: 2, // 斜角厚度
      bevelSize: 1, // 斜角大小
      bevelSegments: 1, // 斜角分段数
    });
    genmary.center();
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xeeeeff,
      roughness: 0,
      reflectivity: 1,
      thickness: 80,
      ior: 1.5,
      transmission: 1,
      side: THREE.DoubleSide,
      emissive: 0xffeeff,
      emissiveIntensity: 0.1,
    });
    const mesh = new THREE.Mesh(genmary, material);
    scene.add(mesh);

    let options = {
      angle: 0,
    }
    gsap.to(options, {
      angle: Math.PI * 2,
      duration: 10,
      repeat: -1,
      ease: 'linear',
      onUpdate: () => {
        mesh.rotation.y = options.angle;
      }
    })
  })

  const render = () => {
    renderer.render(scene, camera);
    control.update();
    requestAnimationFrame(render);
  }
  render();
  // 监听屏幕的大小改变，修改渲染器的宽高，相机的比例
  window.addEventListener("resize", () => {
    camera.aspect = dom.offsetWidth / dom.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(dom.offsetWidth, dom.offsetHeight);
  });
}