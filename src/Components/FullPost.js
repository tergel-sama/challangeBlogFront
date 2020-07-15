import React, { useContext } from "react";
import { Row, Col, Typography, Card } from "antd";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ContentLayout } from "../contexts";
import { Parser } from "html-to-react";
const { Title, Paragraph, Text } = Typography;
export default function FullPost({ post }) {
  console.log("fullpost", post.data);
  const { contentLayout, setContentLayout } = useContext(ContentLayout);
  const arrContent = Object.entries(post.data.content);
 
  const htmlToReactParser = new Parser();

  return (
    <div
      style={
        contentLayout > 0 ? { paddingRight: "10%", paddingLeft: "10%" } : {}
      }
    >
      <Title>{post.data.title}</Title>
      <Card>
        <img
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            display: "block",
            margin: "auto",
          }}
          src={post.data.img}
        />
      </Card>

      {arrContent.map((item) => {
        if (item[1].split("$content:")[0] === "text")
          return (
            <Paragraph style={{ fontSize: 20, lineHeight: "1.7em" }}>
              {htmlToReactParser.parse(item[1].split("$content:")[1])}
            </Paragraph>
          );
        else if (item[1].split("$content:")[0] === "code")
          return (
            <SyntaxHighlighter language="javascript" style={tomorrow}>
              {item[1].split("$content:")[1]}
            </SyntaxHighlighter>
          );
        else if (item[1].split("$content:")[0] === "img")
          return (
            <Card>
              <img
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  display: "block",
                  margin: "auto",
                }}
                src={item[1].split("$content:")[1]}
              />
            </Card>
          );
        else if (item[1].split("$content:")[0] === "title")
          return <Title level={2} >{item[1].split("$content:")[1]}</Title>;
      })}
    </div>
  );
}
