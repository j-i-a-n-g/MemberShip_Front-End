import React from 'react';
import { Button, Form, Input } from 'antd';
import { useSelector } from 'react-redux'
import "./Person.scss"
export default function Person() {
  const userInfo = useSelector((state) => {
    return state.user.userInfo;
  })
  console.log(userInfo)
  const onSubmit = (values) => {
    console.log(values, '要提交的数据')
  }
  return (
    userInfo ?
      <div className='person'>
        <Form
          layout={"horizontal"}
          // form={userInfo}
          initialValues={{ layout: "horizontal" }}
          onFinish={onSubmit}
          autoComplete="off"
        >
          <Form.Item name="username" label="账号">
            <span>{userInfo?.username}</span>
          </Form.Item>
          <Form.Item name="usernick" label="昵称">
            <Input placeholder="请输入昵称" />
          </Form.Item>
          <Form.Item name="password" label="密码">
            <Input placeholder="请输入密码" />
          </Form.Item>
          <Form.Item name="username">
            <Button type="primary">提交</Button>
          </Form.Item>
        </Form>
      </div>
      : <></>
  );
};