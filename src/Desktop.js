import "./desktop.css";
import Card from "./components/card";

import React, { useState, useEffect } from "react";

import CreateArea from "./components/createArea";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  GroupOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import SideDrawer from "./components/Drawer";
import AddGroup from "./components/AddGroup";
import Floating from "./components/Floating";
import ShowHistory from "./components/showHistory";

const { Header, Sider, Content } = Layout;

const Desktop = () => {
  const [initial, setInitial] = useState({});
  const [changed, setChanged] = useState(true);
  const [entryData, setEntryData] = useState([]);
  const [groupData, setGroupData] = useState([]);
  const clickHandler = (e) => {
    setInitial({ slug: e.key });
  };
  async function fetchData() {
    const response = await fetch("http://localhost:8000/api/v1/entries");
    const res = await response.json();
    setEntryData(res.data);
    const response1 = await fetch("http://localhost:8000/api/v1/groups");
    const res1 = await response1.json();
    setGroupData(res1.data);
    setChanged(true);
  }
  useEffect(() => {
    fetchData();
  }, [changed]);

  const result = entryData.filter((ele) => {
    return ele.group === initial.slug;
  });

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <SideDrawer textHide={collapsed} />
        <Menu
          theme="dark"
          mode="inline"
          onClick={clickHandler}
          defaultSelectedKeys={["1"]}
          items={groupData.map((ele) => {
            return {
              key: ele.slug,
              icon: <GroupOutlined />,
              label: ele.group,
            };
          })}
        />
        <AddGroup textHide={collapsed} />
        <ShowHistory />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 600,
            background: colorBgContainer,
          }}
        >
          <CreateArea grp={initial} change={setChanged} />
          <Floating d={groupData} />
          <div className="content">
            {result.map((ele) => {
              return <Card content={ele} key={ele._id} />;
            })}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Desktop;
