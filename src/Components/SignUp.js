import React, { useState, useEffect, useContext } from "react";
import { Form, Input, Button, Modal, message } from "antd";
import { UserOutlined, LockOutlined , MailOutlined } from "@ant-design/icons";
import { useCookies } from "react-cookie";
import { useResource } from "react-request-hook";
const messageKey = "login";
export default function SignUp({ visible, setVisible }) {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [loginUserData, setLoginUser] = useState({});
  const [resultUser, loginUser] = useResource((email, password) => {
    return {
      url: "/user/login",
      method: "POST",
      data: { email, password },
    };
  });
  const [resultSignUpUser, SignUp] = useResource(
    (username, email, password) => {
      return {
        url: "/user/signup",
        method: "POST",
        data: { username, email, password },
      };
    }
  );
  useEffect(() => {
    resultSignUpUser.error && message.error("Имейл эсвэр нэр давхардсан байна");
    if (resultSignUpUser.data) {
      loginUser(loginUserData.email, loginUserData.password);
    }
  }, [resultSignUpUser]);
  useEffect(() => {
    console.log("userdata DESU", resultUser);
    resultUser.error &&
      message.error({
        content: "Нууц үг эсвэл имейл буруу байна!",
        key: messageKey,
        style: {
          marginTop: "15vh",
        },
      });
    if (resultUser.data) {
      message.success({
        content: "Амжилттай нэвтэрлээ!",
        key: messageKey,
        style: {
          marginTop: "15vh",
        },
      });
      let d = new Date();
      d.setTime(d.getTime() + 60 * 60 * 1000);
      setCookie("token", resultUser.data.token, { path: "/", expires: d });
      window.location.href = "/";
    }
  }, [resultUser]);

  const onFinish = (value) => {
    message.loading({
      content: "Уншиж байна.",
      key: messageKey,
      style: {
        marginTop: "15vh",
      },
    });
    SignUp(value.username, value.email, value.password);
    setLoginUser(value);
  };
  return (
    <Modal
      title="Бүртгүүлэх"
      onCancel={() => setVisible(false)}
      visible={visible}
      footer={false}
    >
      <Form
        name="normal_login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Нэрээ оруулаарай!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Нэр" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Имейлээ оруулаарай!" }]}
        >
          <Input prefix={<MailOutlined />} placeholder="Имейл" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Нууц үгээ оруулаарай!" }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Нууц үг"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Нэвтрэх
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
