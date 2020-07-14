import React from "react";
import { Row, Col, Typography } from "antd";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
const { Title, Paragraph, Text } = Typography;
export default function FullPost({ post }) {
  console.log("fullpost", post.data);
  const arrContent = Object.entries(post.data.content);
  return (
    <div>
      <img src={post.data.img} />
      <Title>{post.data.title}</Title>
      {arrContent.map((item) => {
        if (item[1].split("$content:")[0] === "text")
          return <Paragraph>{item[1].split("$content:")[1]}</Paragraph>;
        else
          return (
            <SyntaxHighlighter language="javascript" style={tomorrow}>
              {item[1].split("$content:")[1]}
            </SyntaxHighlighter>
          );
      })}
    </div>
  );
}
