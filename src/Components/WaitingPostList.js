import React from "react";
import { Row, Col, Empty ,Button} from "antd";
import Post from "./Post";
import ShowEmpty from './ShowEmpty';
import { useCurrentRoute } from "react-navi";
export default function PostList({ posts }) {
  let route = useCurrentRoute();
  let data = posts ? posts.data : route.data.data;
  console.log('posts data',data)
  return (
    <Row  gutter={[24, 24]}>
      {data.length > 0 ? (
        data.map((item, index) => (
          <Col key={index} md={{ span: 8 }}>
            <Post
              id={item._id}
              imgUrl={item.img}
              title={item.title}
              author={item.author}
              tags={item.tags}
              content={
                item.content?.content0
                  .split("$content:")[1]
                  ?.substring(0, 30)
                  .trim() + "..."
              }
              key={index}
            />
          </Col>
        ))
      ) : (
        <Col style={{margin:'auto'}} md={{ span: 24 }}>
         <ShowEmpty />
        </Col>
      )}
    </Row>
  );
}
