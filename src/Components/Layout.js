import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Header from "./Header";
import PostList from "./PostList";
import Routes from "../Routes/Routes";
// import "../Style/LayoutCss.css";
const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default function CompLayout() {
  const [collapsed, setCollapsed] = useState(true);
  const [contentLayout, setContentLayout] = useState(200);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        style={{
          // overflow: 'auto',
          zIndex: "1",
          height: "100vh",
          position: "fixed",
          left: 0,
        }}
        onCollapse={(collapsed, type) => {
          collapsed ? setContentLayout(0) : setContentLayout(200);
          console.log(collapsed, type);
        }}
        // collapsible
        // collapsed={collapsed}
        // onCollapse={setCollapsed}
      >
        <div
          style={{
            height: "32px",
            background: "rgba(255, 255, 255, 0.2)",
            margin: "16px",
          }}
        />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Option 1
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Option 2
          </Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined />} title="User">
            <Menu.Item key="3">Tom</Menu.Item>
            <Menu.Item key="4">Bill</Menu.Item>
            <Menu.Item key="5">Alex</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="9" icon={<FileOutlined />} />
        </Menu>
      </Sider>
      <Layout style={{ marginLeft: contentLayout }}>
        <Header paddingRight={contentLayout} />
        <Content style={{ margin: "0 50px", marginTop: 70 }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            }}
          >
            <Routes />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Mr. Rob0t ©2020 Created by Tergel-sama
        </Footer>
      </Layout>
    </Layout>
  );
}
