import React, { useEffect } from 'react'
import { initScene } from './base.js'
import './gui.js';
export default function Three() {
  useEffect(() => {
    initScene();
  }, [])
  return (
    <></>
  )
}