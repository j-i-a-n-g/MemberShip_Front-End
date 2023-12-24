import * as TWEEN from 'three/examples/jsm/libs/tween.module.js'; // 导入补间动画插件
import * as THREE from 'three';

export let ball = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshBasicMaterial({
    color: 0xffff00
  })
)
ball.position.x = -2;

const tween = new TWEEN.Tween(ball.position);
tween.to({ x: 1 }, 1000);
// tween.repeat(5); // 设置循环次数 无数次Infinity
// tween.yoyo(true); //循环往复
// tween.delay(1000); // 延迟
tween.easing(TWEEN.Easing.Quadratic.InOut); // 设置缓动函数(可查看Tween.js)
// 还要再base.js处设置Update，补间动画更新

// 创建第二个动画
const tween2 = new TWEEN.Tween(ball.position);
tween2.to({ y: -2 });
tween.chain(tween2); // 第一个动画完成后，链接执行第二个动画

tween.start();
