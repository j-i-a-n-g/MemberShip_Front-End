import React, { useEffect } from 'react';
import { initCanvas } from './index.js';
import './Main.scss'

export default function Topic() {
  // const [oldScrollTop, setoldScrollTop] = useState(0);
  // let main = document.querySelector(".main");
  // console.log(main)
  // if (main) {
  //   main.addEventListener('scroll', (e) => {
  //     let scrollTop = main.scrollTop
  //     let top = 0;
  //     // 滚动条滚动的距离
  //     let scrollStep = scrollTop - oldScrollTop;
  //     // 更新——滚动前，滚动条距文档顶部的距离
  //     console.log(scrollTop, oldScrollTop, '123')
  //     if (scrollStep < 0) {
  //       top = (oldScrollTop - main.offsetHeight) > 0 ?
  //         (oldScrollTop - main.offsetHeight) : 0
  //       setoldScrollTop(top)
  //     } else {
  //       top = (oldScrollTop + main.offsetHeight)
  //       setoldScrollTop(top)
  //     }
  //     console.log(top)
  //     main.scrollTop = top;
  //   })
  // }
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
        <div className='page03'>
          <h2>最是人间留不住</h2>
          <h4>朱颜辞镜花辞树</h4>
        </div>
        <div className='page02'>
          <h2>将军战马今何在</h2>
          <h4>野草鲜花盼着谁人</h4>
        </div>
        <div className='page01'>
          <h2>古人不见今时月</h2>
          <h4>明月曾经照古人</h4>
        </div>
      </div>
    </React.Fragment>
  )
}