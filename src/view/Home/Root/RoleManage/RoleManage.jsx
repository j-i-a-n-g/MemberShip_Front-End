import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Drawer, Select, Tree, message } from 'antd';
import { navMenu } from '../../../../hook/data';
import RoleTable from './RoleTable';
import request from '@/utils/request.js';

export default function RoleManage() {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [treeDataObj, setTreeDataObj] = useState({ checkedKeysValue: [], checkedNodes: [] })
  const [tableData, setTableData] = useState([])
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
    setTreeDataObj({ checkedKeysValue: [], checkedNodes: [] })
    form.resetFields();
  };
  // 提交数据
  const onSubmit = (values) => {
    // console.log(values, treeDataObj.checkedNodes, '要提交的数据')
    let arr = []
    treeDataObj.checkedNodes.forEach(item => {
      arr.push({
        permiKey: item.permikey,
        permiName: item.perminame,
        permiTitle: item.permititle
      })

    })
    let data = {
      roleName: values.roleName,
      roleDesc: values.roleDesc,
      roleLevel: values.roleLevel,
      premissions: arr
    }
    request.post("/api/role/createRole", data).then(res => {
      message.success(res.message)
      onClose()
    }).catch(() => { })
  }
  // 查询表格数据
  useEffect(() => {
    request.get("/api/role/getRoleList").then(res => {
      setTableData(res.data)
    }).catch(() => { })
  }, [])
  // 选中权限
  const setRoleChoosed = (checkedKeysValue, info) => {
    console.log(checkedKeysValue, info);
    setTreeDataObj({ checkedKeysValue: checkedKeysValue, checkedNodes: info.checkedNodes })
  }
  return (
    <>
      <Button type="primary" onClick={showDrawer}>创建角色</Button>
      <Drawer title="创建角色" placement="right" onClose={onClose} open={open}>
        <Form
          form={form}
          layout={"horizontal"}
          initialValues={{ roleName: "", roleDesc: "", roleLevel: 1 }}
          onFinish={onSubmit}
          autoComplete="off"
        >
          <Form.Item name="roleName" label="角色名称">
            <Input placeholder="角色名称" />
          </Form.Item>
          <Form.Item name="roleDesc" label="权限描述">
            <Input placeholder="请输入权限描述" />
          </Form.Item>
          <Form.Item name="roleLevel" label="权限等级">
            <Select defaultValue={1} style={{ width: 120 }}
              options={[
                {
                  value: 1,
                  label: '一级权限',
                },
                {
                  value: 2,
                  label: '二级权限',
                },
                {
                  value: 3,
                  label: '三级权限',
                },
                {
                  value: 4,
                  label: '四级权限',
                  disabled: true,
                },
              ]}
            />
          </Form.Item>
          <Form.Item label="选中权限">
            <Tree
              checkable
              fieldNames={{ title: 'permititle', key: 'permikey', children: 'children' }}
              treeData={navMenu}
              onCheck={setRoleChoosed}
              checkedKeys={treeDataObj.checkedKeysValue}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">提交</Button>
          </Form.Item>
        </Form>
      </Drawer>
      <RoleTable tableData={tableData} />
    </>
  );
}
