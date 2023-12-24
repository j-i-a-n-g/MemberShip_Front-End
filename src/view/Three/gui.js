import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
import { cube, plane01Material, texture01 } from './geometry.js';
import * as THREE from 'three';
const event = {
  fullScreen: function () {
    // renderer.domElement.requestFullscreen();
    document.body.requestFullscreen();
  },
  exitFullScreen: function () {
    document.exitFullscreen();
  }
}
const colorParam = {
  cubeColor: '#00ff00'
}

const gui = new GUI();

// 添加按钮
gui.add(event, "fullScreen").name("全屏")
gui.add(event, "exitFullScreen").name("退出全屏")
// let folder = gui.addFolder("立方体设置");
gui.addColor(colorParam, 'cubeColor')
  .name("立方体颜色")
  .onChange((val) => {
    cube.material.color.set(val)
  })


gui.add(plane01Material, 'aoMapIntensity').min(0).max(1).name('ao贴图透明度')
gui.add(texture01, 'colorSpace', {
  sRGB: THREE.SRGBColorSpace,
  Linear: THREE.LinearSRGBColorSpace,
}).onChange(() => {
  texture01.needsUpdate = true;
})
  .name("井盖材质线性颜色")