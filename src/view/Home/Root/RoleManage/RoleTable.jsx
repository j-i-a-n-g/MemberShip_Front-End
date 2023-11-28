import React from 'react'
import { Table, Space } from 'antd';

export default function RoleTable(props) {
  // console.log(props, "props")
  const columns = [
    {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName',
    },
    {
      title: '角色描述',
      dataIndex: 'roleDesc',
      key: 'roleDesc',
    },
    {
      title: '权限等级',
      dataIndex: 'roleLevel',
      key: 'roleLevel',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <span>Invite</span>
          <span>Delete</span>
        </Space>
      ),
    },
  ];
  return (
    <div style={{ marginTop: "10px" }}>
      <Table rowKey={(record) => { return record.tag }} columns={columns} dataSource={props.tableData} />
    </div>
  )
}