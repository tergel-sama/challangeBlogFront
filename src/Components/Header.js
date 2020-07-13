import React from "react";
import { PageHeader, Button, Tag, Layout, Menu, Avatar, Switch } from "antd";
import { SettingOutlined, UserOutlined } from "@ant-design/icons";
const { Header } = Layout;
const { SubMenu } = Menu;
export default function HeaderPage({ paddingRight, setIsDark, isDark }) {
  return (
    <Header
      style={{
        position: "fixed",
        zIndex: 1,
        width: "100%",
        paddingRight: paddingRight + 50,
      }}
    >
      <Menu theme="dark" mode="horizontal">
        <Menu.Item key="1">
          <Avatar src="https://i.ibb.co/8KkkJzb/mrrobot.jpg" /> Mr. Rob0t
        </Menu.Item>
        <Menu.Item disabled key="4">
          <Switch
            key="switch"
            checked={isDark}
            onChange={() => {
              setIsDark(!isDark);
              console.log("dark", !isDark);
            }}
            checkedChildren="Dark"
            unCheckedChildren="Light"
          />
        </Menu.Item>
        <SubMenu
          style={{ float: "right" }}
          key="2"
          icon={<SettingOutlined style={{ fontSize: 16 }} />}
        >
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
        </SubMenu>
      </Menu>
    </Header>
    // <PageHeader
    //   title="Mr. Rob0t"
    //   style={{position:'fixed',width:'100%',zIndex:'1'}}
    //   //   subTitle="admin"
    // //   tags={[
    // //     <Tag color="blue">Javascript</Tag>,
    // //     <Tag color="blue">React</Tag>,
    // //     <Tag color="blue">Javascript</Tag>,
    // //     // <Tag color="blue">Javascript</Tag>,
    // //     // <Tag color="blue">Javascript</Tag>,
    // //     // <Tag color="blue">Javascript</Tag>,
    // //     // <Tag color="blue">Javascript</Tag>,
    // //     // <Tag color="blue">Javascript</Tag>,
    // //     // <Tag color="blue">Javascript</Tag>,
    // //     // <Tag color="blue">Javascript</Tag>,
    // //     // <Tag color="blue">Javascript</Tag>,
    // //     // <Tag color="blue">Javascript</Tag>,
    // //     // <Tag color="blue">Javascript</Tag>,
    // //     // <Tag color="blue">Javascript</Tag>,
    // //     // <Tag color="blue">Javascript</Tag>,
    // //     // <Tag color="blue">Javascript</Tag>,
    // //   ]}
    //   extra={<SettingOutlined style={{fontSize:'25px'}} />}
    //   avatar={{
    //     src: "https://avatars1.githubusercontent.com/u/8186664?s=460&v=4",
    //   }}
    // />
  );
}
