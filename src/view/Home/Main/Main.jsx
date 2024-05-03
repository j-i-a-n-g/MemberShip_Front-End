import React, { useEffect } from 'react';
import { initCanvas } from './index.js';
import './Main.scss'

export default function Topic() {
  useEffect(() => {
    initCanvas();
  }, [])
  return (
    // 方案1 银河3D效果
    // <React.Fragment>
    //   <div className='main'></div>
    // </React.Fragment>
    <React.Fragment>
      <div className='main'>
        <div className='page01'>
          <h2>古人不见今时月</h2>
          <h4>明月曾经照古人</h4>
        </div>
        <div className='page02'>
          <h2>将军战马今何在</h2>
          <h4>野草鲜花盼着谁人</h4>
        </div>
        <div className='page03'>
          <h2>最是人间留不住</h2>
          <h4>朱颜辞镜花辞树</h4>
        </div>
      </div>
    </React.Fragment>
  )
}