import React, { useContext, useEffect } from "react";
import { Row, Col, Typography, Card, Button, message } from "antd";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ContentLayout, UserContext } from "../contexts";
import { Parser } from "html-to-react";
import { useNavigation } from "react-navi";
import { useResource } from "react-request-hook";
import { useCookies } from "react-cookie";
import PostComments from "./PostComments";
import DocumentMeta from "react-document-meta";
const { Title, Paragraph, Text } = Typography;
const key = "deletePost";
export default function FullPost({ post }) {
  console.log("fullpost", post.data);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [deleteResultPost, deletePost] = useResource((id) => ({
    url: `/post/${id}`,
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.token,
    },
  }));

  useEffect(() => {
    deleteResultPost.error &&
      message.error({ content: "Амжилтгүй боллоо.", key });
    if (deleteResultPost.data) {
      message.success({ content: "Амжилттай устгалаа.", key });
      navigation.navigate("/");
    }
  }, [deleteResultPost]);
  const navigation = useNavigation();
  const { user, setUser } = useContext(UserContext);
  const { contentLayout, setContentLayout } = useContext(ContentLayout);
  const arrContent = Object.entries(post.data.content);

  const htmlToReactParser = new Parser();
  const meta = {
    meta: {
      charset: "utf-8",
      property: {
        "og:title": post.data.title,
        // 'og:url': 'https://samvikshana.weebly.com/',
        "og:image": post.data.img,
        "og:description": arrContent[0][1].split("$content:")[1],
      },
    },
  };
  return (
    <DocumentMeta {...meta}>
      <div
        style={
          contentLayout > 0 ? { paddingRight: "10%", paddingLeft: "10%" } : {}
        }
      >
        <Row>
          <Col span={20}>
            <Title>{post.data.title}</Title>
          </Col>
          <Col style={{ textAlign: "center" }} span={4}>
            {user.userType === 1 ? (
              <Button
                danger
                type="primary"
                onClick={() => {
                  message.loading({ content: "Уншиж байна", key });
                  deletePost(post.data._id);
                }}
              >
                Устгах
              </Button>
            ) : null}
          </Col>
        </Row>
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
        <br />
        {arrContent.sort().map((item, index) => {
          if (item[1].split("$content:")[0] === "text")
            return (
              <Paragraph
                key={`content${index}`}
                style={{ fontSize: 20, lineHeight: "1.7em" }}
              >
                {htmlToReactParser.parse(item[1].split("$content:")[1])}
              </Paragraph>
            );
          else if (item[1].split("$content:")[0] === "code")
            return (
              <SyntaxHighlighter
                key={`content${index}`}
                language="javascript"
                style={tomorrow}
              >
                {item[1].split("$content:")[1]}
              </SyntaxHighlighter>
            );
          else if (item[1].split("$content:")[0] === "img")
            return (
              <Card key={`content${index}`}>
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
            return (
              <Title key={`content${index}`} level={2}>
                {item[1].split("$content:")[1]}
              </Title>
            );
        })}
        <PostComments postId={post.data._id} />
      </div>
    </DocumentMeta>
  );
}
