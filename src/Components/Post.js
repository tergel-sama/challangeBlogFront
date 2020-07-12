import React from "react";
import { Card, Avatar, Tag } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  EyeOutlined,
} from "@ant-design/icons";

const { Meta } = Card;

export default function Post() {
  return (
    <Card
      hoverable
      cover={
        <img
          alt="example"
          src="https://i.ibb.co/3WrhdJD/wallhaven-dgeqoj.jpg"
        />
      }
      actions={
        [
          // <EyeOutlined />,
          // <SettingOutlined key="setting" />,
          // <EditOutlined key="edit" />,
          // <EllipsisOutlined key="ellipsis" />,
        ]
      }
    >
      <Meta
      key='1'
        avatar={
          <Avatar src="https://i.ibb.co/8KkkJzb/mrrobot.jpg" />
        }
        title="Card title"
        description="This is the description"
      />
      <br />
      <Meta
      key='2'
        title={[
          <Tag key='1' color="blue">Javascript</Tag>,
          <Tag key='3' color="blue">React</Tag>,
          <Tag key='2' color="blue">Node</Tag>
        ]}
      />
    </Card>
  );
}
