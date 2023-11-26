import { Button, Checkbox, Form, Input, message } from 'antd';
import request from '@/utils/request.js';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import './login.scss';

export default function Login() {
  const navigate = useNavigate(); // 必须在组件顶层作用域使用
  const dispatch = useDispatch();
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

        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16, }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16, }}>
          <Button type="primary" htmlType="submit">登录</Button>
        </Form.Item>
      </Form>
    </div>
  );
}
