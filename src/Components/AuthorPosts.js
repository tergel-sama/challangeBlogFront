import React from "react";
import { Row, Col, Empty, Button, Table, Tag, Space, Typography } from "antd";
import Post from "./Post";
import ShowEmpty from "./ShowEmpty";
import { useCurrentRoute } from "react-navi";
const { Title, Paragraph, Text, Link } = Typography;
export default function PostList({ posts }) {
  const columns = [
    {
      title: "Нийтлэлийн гарчиг",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Таалагдсан байдал",
      dataIndex: "likes",
      key: "likes",
    },
    {
      title: "Харсан хүмүүсийн тоо",
      dataIndex: "views",
      key: "views",
    },
    {
      title: "Зөвшөөрөгдсөн эсэх",
      key: "approve",
      dataIndex: "approve",
      render: (text) =>
        +text === 1 ? (
          <Tag color="success">нийтлэгдсэн</Tag>
        ) : (
          <Tag color="processing">Хүлээгдэж байгаа</Tag>
        ),
    },
  ];
  let point = posts.data.reduce((sum, item) => {
    sum += +item.likes;
    let tmp = +item.views * 0.3;
    sum += tmp;
    return sum;
  }, 0);
  console.log("point", point);
  console.log("sama data", posts);
  return (
    <Row justify="center" gutter={[24, 24]}>
      <Col span={12}>
        <Table columns={columns} dataSource={posts.data} />
      </Col>
      <Col span={12}>
        <Title>Reputation point : {point}</Title>
      </Col>
    </Row>
  );
}
