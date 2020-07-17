import React, { useContext, useState } from "react";
import { PageHeader, Button, Tag, Layout, Menu, Avatar, Switch } from "antd";
import { SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-navi";
import Login from "../Components/Login";
import { useCookies } from "react-cookie";
import { ThemeContext, UserContext } from "../contexts";
const { Header } = Layout;
const { SubMenu } = Menu;
export default function HeaderPage({ paddingRight }) {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [visible, setVisible] = useState(false);
  const { isDark, setIsDark } = useContext(ThemeContext);
  const { user, setUser } = useContext(UserContext);
  function handleLogout() {
    setUser({});
    removeCookie("token");
    window.location.href = "/";
  }
  return (
    <Header
      style={{
        position: "fixed",
        zIndex: 1,
        width: "100%",
        paddingRight: paddingRight + 50,
      }}
    >
      <Login visible={visible} setVisible={setVisible} />
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
          style={{
            float: paddingRight !== 0 ? "right" : "unset",
            display: paddingRight !== 0 ? "" : "none",
          }}
          key="2"
          icon={<SettingOutlined style={{ fontSize: 16 }} />}
        >
          {user.userId ? (
            <Menu.Item onClick={() => handleLogout()} key="10">
              Гарах
            </Menu.Item>
          ) : (
            <Menu.Item onClick={() => setVisible(true)} key="9">
              Нэвтрэх
            </Menu.Item>
          )}
          {user.userId ? (
            <Menu.Item key="5">
              <Link href="/create-post">Мэдээлэл үүсгэх</Link>
            </Menu.Item>
          ) : null}
          {user.userId ? (
            <Menu.Item key="6">
              <Link href="/tags">Таг үүсгэх</Link>
            </Menu.Item>
          ) : null}

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
