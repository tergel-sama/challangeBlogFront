import React, { useEffect } from "react";
import { Card, Avatar, Tag } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useNavigation } from "react-navi";
import { useResource } from "react-request-hook";
const { Meta } = Card;

export default function Post({ imgUrl, title, author, content, id, tags }) {
  const [resultUser, getUser] = useResource(() => ({
    url: `/user/post-creator/${author}`,
    method: "get",
  }));
  useEffect(() => getUser(), []);
  const navigation = useNavigation();
  return (
    <Card
      hoverable
      onClick={() => {
        navigation.navigate(`/post/${id}`);
      }}
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
        avatar={
          <Avatar
            src={
              resultUser?.data?.img
                ? resultUser?.data?.img
                : "https://i.ibb.co/8KkkJzb/mrrobot.jpg"
            }
          />
        }
        title={title}
        description={content}
      />
      <br />
      <Meta
        key="2"
        title={tags.map((item, index) => (
          <Tag key={index} color="blue">
            {item}
          </Tag>
        ))}
      />
    </Card>
  );
}
