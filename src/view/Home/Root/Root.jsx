import React from 'react'
import { Tabs } from 'antd';
import RoleManage from './RoleManage/RoleManage';
import UserManage from './UserManage/UserManage';

export default function Root() {
  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: '1',
      label: '角色管理',
      children: <RoleManage />,
    },
    {
      key: '2',
      label: '用户管理',
      children: <UserManage />,
    },
  ];
  return (
    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
  )
}