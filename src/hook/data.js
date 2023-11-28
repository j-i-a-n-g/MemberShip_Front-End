
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';

// Home组件侧边导航数据
export const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
  const key = String(index + 1);
  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,
    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});
// Home组件菜单数据
export let navMenu = [
  { permikey: "/home", perminame: "首页", permititle: "首页" },
  { permikey: "/home/root", perminame: "后台管理员", permititle: "后台管理员" },
  { permikey: "0-3", perminame: "会员", permititle: "会员" },
  { permikey: "0-4", perminame: "统计", permititle: "统计" },
  { permikey: "0-5", perminame: "用户代理", permititle: "用户代理" },
]