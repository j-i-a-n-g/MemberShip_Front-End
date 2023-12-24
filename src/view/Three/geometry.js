import * as THREE from 'three';

export let cube = null;

// 创建几何体
const genmetry = new THREE.BoxGeometry(1, 1, 30);
// 创建材质
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// 创建网格(即物体)
cube = new THREE.Mesh(genmetry, material);


let geometry = new THREE.BufferGeometry();
// 创建顶点数据
const vertices = new Float32Array([
  -1, -1, 0,
  1, -1, 0,
  0, 1, 0
])
// 创建顶点数据
geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
// 创建材质
const material01 = new THREE.MeshBasicMaterial({
  color: 0xff0000,
});
export let geo01 = new THREE.Mesh(geometry, material01)

// 带纹理的图片

let textureLoader = new THREE.TextureLoader(); // 纹理加载器
export let texture01 = textureLoader.load(require("@/assets/model/ManholeCover/ManholeCover009.png"))
texture01.colorSpace = THREE.SRGBColorSpace;
// texture01.colorSpace = THREE.LinearSRGBColorSpace; // 默认的线性颜色设置
// 加载ao贴图(环境光遮蔽)
// let aoMap = textureLoader.load(require("@/assets/model/ManholeCover/ManholeCover009_1K-JPG_AmbientOcclusion.jpg"))
// 透明度贴图
// let alphaMap = textureLoader.load(require("@/assets/model/ManholeCover/ManholeCover009_1K-JPG_Opacity.jpg"))
// 光照贴图
// let lightMap = textureLoader.load(require("@/assets/model/ManholeCover/ManholeCover009_1K-JPG_Color.jpg"))
// 高光贴图
let specularMap = textureLoader.load("@/assets/model/ManholeCover/ManholeCover009_1K-JPG_Metalness.jpg")
let plane01Geometry = new THREE.PlaneGeometry(1, 1);
export let plane01Material = new THREE.MeshBasicMaterial({
  color: '#fff',
  // 纹理贴图
  map: texture01,
  transparent: true,
  // aoMap: aoMap,
  specularMap: specularMap,
  reflectivity: 0.8, // 反射强度
  // alphaMap: alphaMap,
  // lightMap: lightMap
});
export let plane01 = new THREE.Mesh(plane01Geometry, plane01Material)
plane01.position.x = 0
plane01.position.y = 1.5