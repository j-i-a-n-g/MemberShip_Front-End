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
  return (
    <div className='network_card'>
      <Card title="当前网络情况" style={{ width: 300 }}>
        <p>网络状态：{state}</p>
        <p>延迟：{delay}</p>
        <p>带宽：{bandWidth}</p>
      </Card>
    </div>
  )
}