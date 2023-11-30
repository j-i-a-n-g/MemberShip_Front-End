import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import "./NetWork.scss"

export default function NetWork() {
  const [state, setState] = useState("")
  const [delay, setDelay] = useState("")
  const [bandWidth, setBandWidth] = useState("")
  // window.addEventListener('online', (e) => {
  //   console.log('online事件', e)
  // })
  // window.addEventListener('offline', e => {
  //   console.log('offline事件', e)
  // })
  // navigator.connection.onchange = (e) => {
  //   console.log(e, '网络变化了')
  // }
  const updateState = () => {
    let { effectiveType, downlink, rtt } = navigator.connection
    if (rtt === 0 && downlink === 0) {
      setState("无网络")
    } else {
      setState(effectiveType)
    }
    setDelay(rtt + 'ms')
    setBandWidth(downlink + 'Mb/s')
  }
  useEffect(() => {
    updateState()
  })
  setInterval(() => {
    updateState()
  }, 2000)
  let card = document.querySelector(".network_card")
  const onMouseEnter = (e) => {
    card.style.setProperty('cursor', 'move')
    card.style.setProperty('user-select', 'none')
  }
  let startX = 0;
  let startY = 0;
  let cardLeft = 0;
  let cardTop = 0;
  card.onmousedown = (e) => {
    startX = e.pageX;
    startY = e.pageY;
    cardLeft = card.offsetLeft;
    cardTop = card.offsetTop;
    document.onmousemove = (e) => {
      let endX = e.pageX;
      let endY = e.pageY;
      requestAnimationFrame(() => {
        card.style.left = (cardLeft + (endX - startX)) + 'px'
        card.style.top = (cardTop + (endY - startY)) + 'px'
      })
    }
  }
  card.onmouseup = (e) => {
    document.onmousemove = null
  }
  return (
    <div onMouseEnter={onMouseEnter}
      className='network_card'>
      <Card title="当前网络情况" style={{ width: 300 }}>
        <p>网络状态：{state}</p>
        <p>延迟：{delay}</p>
        <p>带宽：{bandWidth}</p>
      </Card>
    </div>
  )
}