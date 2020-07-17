import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Header from "./Header";
import { Link, useLoadingRoute } from "react-navi";
import LoadingBar from "react-top-loading-bar";
import { ContentLayout } from "../contexts";
import { useResource } from "react-request-hook";
const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
export default function CompLayout({ children }) {
  const loadingRoute = useLoadingRoute();
  const [requestTags, getRequestTags] = useResource(() => ({
    url: "/tag",
    method: "get",
  }));
  const [contentLayout, setContentLayout] = useState(200);
  const [bar, setBar] = useState();
  const [tags, setTags] = useState([]);
  useEffect(() => {
    getRequestTags();
  }, []);
  useEffect(() => {
    setTags(requestTags.data);
  }, [requestTags.data]);

  console.log("status", !!loadingRoute, bar);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <LoadingBar height={3} color="#00adb5" onRef={(ref) => setBar(ref)} />
      {!!loadingRoute && bar?.state.progress <= 0
        ? bar?.continuousStart()
        : bar?.state.progress > 0 && bar?.complete()}
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
        <Menu theme="dark"  mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            <Link href={"/"}>Мэдээлэлүүд</Link>
          </Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined />} title="Холбоосууд">
            {tags?.map((item, index) => (
              <Menu.Item key={"tags" + index}>
                <Link href={`/post-tag/${item.name}`}>{item.name}</Link>
              </Menu.Item>
            ))}
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
        <Content
          style={
            contentLayout > 0
              ? { margin: "0 50px", marginTop: 70 }
              : { margin: "0px", marginTop: "70px" }
          }
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              backgroundColor: "rgba(255, 255, 255, 0.08)",
            }}
          >
            <ContentLayout.Provider value={{ contentLayout, setContentLayout }}>
              {children}
            </ContentLayout.Provider>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Mr. Rob0t ©2020 Created by Tergel-sama
        </Footer>
      </Layout>
    </Layout>
  );
}
