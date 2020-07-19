import React, { useContext, useState, useEffect } from "react";
import { PageHeader, Button, Tag, Layout, Menu, Avatar, Switch } from "antd";
import { SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-navi";
import Login from "../Components/Login";
import { useCookies } from "react-cookie";
import { ThemeContext, UserContext } from "../contexts";
import { useResource } from "react-request-hook";
const { Header } = Layout;
const { SubMenu } = Menu;
export default function HeaderPage({ paddingRight }) {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [visible, setVisible] = useState(false);
  const { isDark, setIsDark } = useContext(ThemeContext);
  const { user, setUser } = useContext(UserContext);
  const [resultUser, getUser] = useResource((id) => ({
    url: `/user/${id}`,
    method: "get",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.token,
    },
  }));
  useEffect(() => {
    console.log('changed',user.userId)
    user.userId && getUser(user.userId);
  }, [user.userId]);
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
          <Avatar
            src={
              resultUser?.data?.img
                ? resultUser?.data?.img
                : "https://i.ibb.co/8KkkJzb/mrrobot.jpg"
            }
          />
          {resultUser?.data?.username
            ? " "+resultUser?.data?.username
            : " Mr. Rob0t"}
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
            <Menu.Item key={11}>
              <Link href={`/profile/${user.userId}`}>Хувийн мэдээлэл</Link>{" "}
            </Menu.Item>
          ) : null}
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
          {user.userId ? (
            <Menu.Item onClick={() => handleLogout()} key="10">
              Гарах
            </Menu.Item>
          ) : (
            <Menu.Item onClick={() => setVisible(true)} key="9">
              Нэвтрэх
            </Menu.Item>
          )}
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
        </SubMenu>
      </Menu>
    </Header>
  );
}
