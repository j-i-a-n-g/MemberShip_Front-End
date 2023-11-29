import React, { useEffect, useState } from 'react';
import { Avatar, Layout, Menu, Popover } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux'
import './Home.scss';
import { navMenu, items2 } from '@/hook/data.js';
import request from '@/utils/request.js';
import { useDispatch } from 'react-redux';
import { useNavigate, Link, Outlet } from 'react-router-dom';
import SettingTopicDialog from '@/components/SettingTopicDialog/SettingTopicDialog.jsx';

export default function Home() {
  const { Header, Content, Sider } = Layout;
  const [settingShow, setSettingShow] = useState(false);
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
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
    }).catch(() => {
      navigate("/")
    })
  }, [dispatch, navigate])
  // 退出登录
  const layout = function () {
    localStorage.removeItem("member_token");
    navigate("/")
  }
  const navigateMenu = function (item) {
    navigate(item.key)
  }
  const ShowTopicDialog = () => {
    setSettingShow(true)
    setOpen(false)
  }
  const OnClose = () => {
    setSettingShow(false)
  }
  const popoverContent = (
    <div className='home_popover' style={{ cursor: "pointer" }}>
      <p style={{ lineHeight: "30px" }}>
        <Link to={"/home/person"}>个人设置</Link>
      </p>
      <p style={{ lineHeight: "30px" }}>
        <span onClick={ShowTopicDialog}>设置主题</span>
      </p>
      <p style={{ lineHeight: "30px" }} onClick={layout}>退出登录</p>
    </div>
  )

  return (
    <Layout className='home'>
      <Header style={{ display: 'flex', alignItems: 'center', }}>
        <div className="logo" />
        <div className='avatar'>
          <span style={{ color: '#fff' }} >{userInfo?.username}</span>
          <Popover open={open} content={popoverContent} title={<p>个人账户</p>} trigger="click">
            <Avatar size={50} icon={<UserOutlined />} onClick={() => { setOpen(true) }}></Avatar>
          </Popover>
        </div>
        <Menu theme="dark" mode="horizontal" items={navMenu} onSelect={navigateMenu} />
      </Header>
      <Layout>
        {/* 侧边栏 */}
        <Sider width={200}>
          <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }} // backgroundColor: '#fd70a1' 
            items={items2}
          />
        </Sider>
        <Layout style={{ padding: '0 10px 24px' }} >
          <Content style={{ padding: 24, margin: 0, minHeight: 280 }}>
            <Outlet></Outlet>
          </Content>
        </Layout>
      </Layout>
      <SettingTopicDialog open={settingShow} onClose={OnClose} />
    </Layout>
  );
}

