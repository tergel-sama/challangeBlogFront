import React from "react";
import { Row, Col } from "antd";
import Post from "./Post";
import { useCurrentRoute } from "react-navi";
export default function PostList() {
  let route = useCurrentRoute();
  let data = route.data.data;
  return (
    <Row gutter={[24, 24]}>
      {data.map((item, index) => (
        <Col key={index} md={{ span: 8 }}>
          <Post
            imgUrl={item.img}
            title={item.title}
            author={item.author}
            content={item.content?.content0.split('$content:')[1]?.substring(0, 30).trim()+'...'}
            key={index}
          />
        </Col>
      ))}
    </Row>
  );
}
