import React from "react";
import { Row, Col } from "antd";
import Post from "./Post";
export default function PostList() {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <Row gutter={[24, 24]} >
      {arr.map((item) => (
        <Col md={{ span: 8 }}>
          <Post />
        </Col>
      ))}
    </Row>
  );
}
