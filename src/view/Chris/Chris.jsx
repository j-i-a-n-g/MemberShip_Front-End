import React, { useEffect } from 'react'
// import { initScene } from './Chirs.js';
import { initScene } from './Island.js';
import './Chris.css'
export default function Three() {
  useEffect(() => {
    initScene();
  }, [])
  return (
    <></>
  )
}