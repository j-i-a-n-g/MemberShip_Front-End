import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export const initCanvas02 = () => {
  let main = document.querySelector('.page02')
  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera(
    75,
    main.offsetWidth / main.offsetHeight,
    40,
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
  // // 设置控制器的最大缩放倍数
  // // control.maxDistance = 100;
  // control.target.set(0, 0, 0);
  // control.enableDamping = true;
  // let texture = new THREE.TextureLoader().load("./model/rain.png")
  let texture = new THREE.TextureLoader().load("/model/rain.png")
  const spriteMaterial = new THREE.SpriteMaterial({
    // color: 0xff0000,
    map: texture,
    transparent: true,
  })

  let group = new THREE.Group()
  for (let i = 0; i < 5000; i++) {
    const sprite = new THREE.Sprite(spriteMaterial)
    group.add(sprite);
    sprite.scale.set(0.5, 1.5)
    const x = 200 * (Math.random() - 0.5);
    const y = 20 * Math.random();
    const z = -40 * Math.random() * 2;
    sprite.position.set(x, y, z)
  }
  scene.add(group);

  let render = function () {
    group.children.forEach(sprite => {
      sprite.position.z += 0.5;
      sprite.position.x += 0.1;
      if (sprite.position.z > 20) {
        sprite.position.z = -20
        sprite.position.y = 20 * Math.random();
        sprite.position.x = 1000 * (Math.random() - 0.5);
      }
    })
    renderer.render(scene, camera);
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

