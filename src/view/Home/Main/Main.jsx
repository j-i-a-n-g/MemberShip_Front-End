import React, { useState, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from "gsap";
import './Main.scss'

export default function Topic() {
  const init3D = () => {
    const mainDom = document.querySelector(".main");
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mainDom.offsetWidth / mainDom.offsetHeight,
      0.1,
      1000
    );
    camera.position.set(0, 50, 0);
    camera.updateProjectionMatrix();
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    renderer.setSize(mainDom.offsetWidth, mainDom.offsetHeight);
    mainDom.appendChild(renderer.domElement);

    let control = new OrbitControls(camera, renderer.domElement);
    control.target.set(5, 50, 0);
    control.enableDamping = true;

    scene.background = new THREE.Color(0x000000);

    // 星星集合
    const starInstance = new THREE.InstancedMesh(
      new THREE.SphereGeometry(0.3, 32, 32),
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0xffffff,
        emissiveIntensity: 10,
      }),
      1000
    );
    for (let i = 0; i < 1000; i++) {
      let x = Math.random() * 400 - 200;
      let y = Math.random() * 400 - 200;
      let z = Math.random() * 400 - 200;
      let matrix = new THREE.Matrix4();
      matrix.setPosition(x, y, z);
      starInstance.setMatrixAt(i, matrix);
    }
    scene.add(starInstance);

    // 使用补间函数让球运动
    let options = {
      angle: 0,
    }
    gsap.to(options, {
      angle: Math.PI * 2,
      duration: 60,
      repeat: -1,
      ease: 'linear',
      onUpdate: () => {
        starInstance.rotation.y = options.angle;
      }
    })

    const render = () => {
      renderer.render(scene, camera);
      control.update();
      requestAnimationFrame(render);
    }
    render();
    // 监听屏幕的大小改变，修改渲染器的宽高，相机的比例
    window.addEventListener("resize", () => {
      camera.aspect = mainDom.offsetWidth / mainDom.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mainDom.offsetWidth, mainDom.offsetHeight);
    });
  }

  useEffect(() => {
    init3D();
  }, [])
  return (
    <div className='main'></div>
  )
}