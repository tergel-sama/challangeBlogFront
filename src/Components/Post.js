import React from "react";
import { Card, Avatar, Tag } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  EyeOutlined,
} from "@ant-design/icons";

const { Meta } = Card;

export default function Post({ imgUrl ,title,author,content}) {
  return (
    <Card
      hoverable
      cover={
        <div
          style={{
            height: 200,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              display: "block",
              margin: "auto",
            }}
            alt="example"
            src={imgUrl}
          />
        </div>
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
        key="1"
        avatar={<Avatar src="https://i.ibb.co/8KkkJzb/mrrobot.jpg" />}
        title={title}
        description={content}
      />
      <br />
      <Meta
        key="2"
        title={[
          <Tag key="1" color="blue">
            Javascript
          </Tag>,
          <Tag key="3" color="blue">
            React
          </Tag>,
          <Tag key="2" color="blue">
            Node
          </Tag>,
        ]}
      />
    </Card>
  );
}
