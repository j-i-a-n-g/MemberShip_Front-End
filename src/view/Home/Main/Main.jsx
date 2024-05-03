import React, { useEffect } from 'react';
import { initCanvas } from './index.js'
import './Main.scss'

export default function Topic() {
  useEffect(() => {
    initCanvas();
  }, [])
  return (
    <React.Fragment>
      <div className='main'></div>
    </React.Fragment>
  )
}