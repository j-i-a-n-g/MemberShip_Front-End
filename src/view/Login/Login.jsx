import { Button, Checkbox, Form, Input, message } from 'antd';
import request from '@/utils/request.js';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './login.scss';
import SettingTopicDialog from '@/components/SettingTopicDialog/SettingTopicDialog.jsx';
import { useState } from 'react';

export default function Login() {
  const [settingShow, useSettingShow] = useState(false)
  const [checked, useChecked] = useState(false)
  const navigate = useNavigate(); // 必须在组件顶层作用域使用
  const dispatch = useDispatch();
  const useSettingTopic = () => {
    useChecked(true)
    useSettingShow(true)
  }
  const OnClose = () => {
    useSettingShow(false)
    useChecked(false)
  }
  const onFinish = (values) => {
    request({
      url: '/api/user/login',
      method: 'Post',
      data: values
    }).then(res => {
      console.log(res)
      message.success(res.message)
      dispatch({ type: "user/setUserInfo", data: res.data.user })
      localStorage.setItem('member_token', res.data.token)
      navigate("/home")
    }).catch(() => { })
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className='login'>
      <h2>会员系统</h2>
      <Form
        name="login"
        initialValues={{ remember: true, }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="账号" name="username" rules={[{ required: true, message: '请输入账号!', },]}>
          <Input />
        </Form.Item>

        <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码!', },]}>
          <Input.Password />
        </Form.Item>

        <div style={{ display: 'flex', justifyContent: "space-between" }}>
          <Checkbox>Remember me</Checkbox>
          <Checkbox checked={checked} onChange={useSettingTopic}>设置主题</Checkbox>
        </div>
        <Form.Item wrapperCol={{ offset: 8, span: 16, }} style={{ marginTop: "20px" }}>
          <Button type="primary" htmlType="submit">登录</Button>
        </Form.Item>
      </Form>
      <SettingTopicDialog open={settingShow} onClose={OnClose} />
    </div>
  );
}
