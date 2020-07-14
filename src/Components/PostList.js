import React from "react";
import { Row, Col } from "antd";
import Post from "./Post";
export default function PostList() {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <Row gutter={[24, 24]} >
      {/* {arr.map((item,index) => (
        <Col key={index} md={{ span: 8 }}>
          <Post imgUrl={'https://media.giphy.com/media/13FrpeVH09Zrb2/giphy.gif'} key={index} />
        </Col>
      ))} */}
       <Col key={1} md={{ span: 8 }}>
          <Post imgUrl={'https://miro.medium.com/max/700/1*OF0xEMkWBv-69zvmNs6RDQ.gif'} key={1} />
        </Col>
        <Col key={2} md={{ span: 8 }}>
          <Post imgUrl={'https://media.giphy.com/media/zOvBKUUEERdNm/giphy.gif'} key={2} />
        </Col>
        <Col key={3} md={{ span: 8 }}>
          <Post imgUrl={'https://media.giphy.com/media/5ntdy5Ban1dIY/giphy.gif'} key={3} />
        </Col>
        <Col key={4} md={{ span: 8 }}>
          <Post imgUrl={'https://media.giphy.com/media/QHE5gWI0QjqF2/giphy.gif'} key={4} />
        </Col>
        <Col key={5} md={{ span: 8 }}>
          <Post imgUrl={'https://media.giphy.com/media/ZVik7pBtu9dNS/giphy.gif'} key={5} />
        </Col>
        <Col key={6} md={{ span: 8 }}>
          <Post imgUrl={'https://media.giphy.com/media/rMS1sUPhv95f2/giphy.gif'} key={6} />
        </Col>
    </Row>
  );
}
