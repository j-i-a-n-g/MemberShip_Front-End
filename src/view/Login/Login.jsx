import React from 'react';
import { useSelector } from 'react-redux'
import { Button } from 'antd';


export default function Login() {
  const user = useSelector((state) => {
    return state.user.userInfo
  })
  return (
    <div>
      <Button></Button>
      123{user}
    </div>
  )
}