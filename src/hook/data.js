
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
  { key: "0-1", label: "首页" },
  { key: "0-2", label: "后台管理员" },
  { key: "0-3", label: "会员" },
  { key: "0-4", label: "统计" },
  { key: "0-5", label: "用户代理" },
]