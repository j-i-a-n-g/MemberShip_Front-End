import React, { useEffect } from 'react';
import { Avatar, Layout, Menu, Popover } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux'
import './Home.scss';
import { navMenu, items2 } from '@/hook/data.js';
import request from '@/utils/request.js';
import { useDispatch } from 'react-redux'

export default function Home() {
  const { Header, Content, Sider } = Layout;
  const userInfo = useSelector(state => {
    return state.user.userInfo;
  })
  const dispatch = useDispatch()
  useEffect(() => {
    request({
      method: 'get',
      url: "/api/user/autoLogin",
    }).then(res => {
      dispatch({ type: "user/setUserInfo", data: res.data })
    }).catch(() => { })
  }, [])
  const popoverContent = (
    <div>
      <p>个人设置</p>
      <p>退出登录</p>
    </div>
  )

  return (
    <Layout className='home'>
      <Header style={{ display: 'flex', alignItems: 'center', }}>
        <div className="logo" />
        <div className='avatar'>
          <span style={{ color: '#fff' }} >{userInfo?.username}</span>
          <Popover content={popoverContent} title={<p>个人账户</p>} trigger="click">
            <Avatar size={50} icon={<UserOutlined />}></Avatar>
          </Popover>
        </div>
        <Menu theme="dark" mode="horizontal" items={navMenu} />
      </Header>
      <Layout>
        {/* 侧边栏 */}
        <Sider width={200}>
          <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }} // backgroundColor: '#fd70a1' 
            items={items2}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }} >
          <Content style={{ padding: 24, margin: 0, minHeight: 280, backgroundColor: '#febcd3' }}>
            Content
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

