import React, { useState, useContext, useEffect } from "react";
import { Comment, Avatar, Form, Button, List, Input, message } from "antd";
import { UserContext } from "../contexts";
import { useCookies } from "react-cookie";
import { useResource } from "react-request-hook";
import { useNavigation } from "react-navi";
import ShowEmpty from "./ShowEmpty";
const { TextArea } = Input;
const key = "comment";
export default function PostComments({ postId }) {
  const navigation = useNavigation();
  const [comment, setComment] = useState("");
  const { user, setUser } = useContext(UserContext);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [resultDeleteComment, deleteComment] = useResource((id) => {
    return {
      url: `/comment/${id}`,
      method: "delete",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
    };
  });
  const [resultPostComment, getComment] = useResource(() => {
    return {
      url: `/comment/${postId}`,
      method: "get",
    };
  });
  const [resultComment, createComment] = useResource(
    (content, postId, username) => {
      return {
        url: "/comment",
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies.token,
        },
        data: { content, postId, username },
      };
    }
  );
  useEffect(() => getComment(), []);
  useEffect(() => {
    resultComment.error && message.error({ content: "Алдаа гарлаа", key });
    if (resultComment.data) {
      message.success({ content: "Амжилттай хадгаллаа", key });
      window.location.href = `/post/${postId}`;
    }
  }, [resultComment]);
  useEffect(() => {
    if (resultDeleteComment.data?.status === "success")
      window.location.href = `/post/${postId}`;
  }, [resultDeleteComment]);
  function handleDeleteComment(id) {
    deleteComment(id);
  }
  return (
    <div>
      {resultPostComment.data?.length < 1 ? (
        <ShowEmpty />
      ) : (
        <List
          className="comment-list"
          header={`${resultPostComment.data?.length} Сэтгэгдлүүд`}
          itemLayout="horizontal"
          dataSource={resultPostComment.data}
          renderItem={(item) => (
            <li>
              <Comment
                author={item.userData[0].username}
                avatar={<Avatar src={item.userData[0].img} />}
                content={item.content}
                actions={
                  user.userType === 1
                    ? [
                        <span onClick={() => handleDeleteComment(item._id)}>
                          устгах
                        </span>,
                      ]
                    : null
                }
              />
            </li>
          )}
        />
      )}

      <Comment
        avatar={<Avatar src={user.userImg} alt="Han Solo" />}
        content={
          <div>
            <Form.Item>
              <TextArea
                rows={4}
                onChange={(value) => {
                  setComment(value.target.value);
                }}
                value={comment}
              />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                onClick={() => {
                  if (user.userId) {
                    message.loading({ content: "Уншиж байна", key });
                    createComment(comment, postId, user.username);
                  } else {
                    message.error("Нэвтэрч ороод бичнэ үү");
                  }
                }}
                type="primary"
              >
                Хадгалах
              </Button>
            </Form.Item>
          </div>
        }
      />
    </div>
  );
}
