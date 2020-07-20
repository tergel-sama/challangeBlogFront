import React, { useState, useEffect, useContext } from "react";
import { Form, Input, Button, message, Row, Col, Select, Tag } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useResource } from "react-request-hook";
import { useNavigation } from "react-navi";
import { useCookies } from "react-cookie";
import { UserContext } from "../contexts";
const { CheckableTag } = Tag;
const { TextArea } = Input;
const { Option } = Select;
export default function CreatePost({ requestTags }) {
  const { user, setUser } = useContext(UserContext);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const navigation = useNavigation();
  const [resultPost, createPost] = useResource(
    (title, content, author, img, tags) => {
      console.log("content", user.userType);
      return {
        url: "/post",
        method: "post",
        headers:
          user.userType === 1
            ? {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + cookies.token,
              }
            : {},
        data: { title, img, author: user.userId, content, tags },
      };
    }
  );

  const [selectedTags, setSelectedTags] = useState([]);
  const [title, setTitle] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [content, setContent] = useState({});
  useEffect(() => {
    if (resultPost && resultPost.data) {
      resultPost.data.status === "success" &&
        message
          .success({
            content: "Амжилттай хадгаллаа!",
            key: "post",
            duration: 2,
          })
          .then((_) => navigation.navigate("/"));
    }
    resultPost.error &&
      message.error({ content: "Алдаа гарлаа!", key: "post", duration: 2 });
  }, [resultPost]);
  function handleTags(tag, checked) {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    setSelectedTags(nextSelectedTags);
  }
  function onChange(e, type) {
    let data = content;
    data[e.target.name] = type + "$content:" + e.target.value;
    setContent(data);
    console.log("data", content);
  }
  function clone(obj) {
    return Object.assign({}, obj);
  }
  function renameKey(object, key, newKey) {
    const clonedObj = clone(object);
    const targetKey = clonedObj[key];
    delete clonedObj[key];
    clonedObj[newKey] = targetKey;
    return clonedObj;
  }
  return (
    <Form
      name="dynamic_form_item"
      onFinish={() => {
        message.loading({ content: "Хадгалж байна...", key: "post" });
        createPost(title, content, "mr.rob0t", imgUrl, selectedTags);
      }}
    >
      <p>
        Бичиг дээр код бичих бол {"<code>let a;</code>"} гэж бичээрэй. Мөн html
        tag бичих боломжтой.
      </p>
      <Form.Item label="Гарчиг">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Гарчигаа бичээрэй"
        />
      </Form.Item>
      <Row>
        <Col span={24}>
          <Form.Item label="Зураг">
            <Input
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
              placeholder="Зурагныхаа url-ийг оруулаарай"
            />
            <img style={{ width: "100%" }} src={imgUrl} />
          </Form.Item>
        </Col>
      </Row>
      <Form.List name="names">
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map((field, index) => {
                let type = "text";
                return (
                  <Form.Item
                    label={
                      <Select
                        onChange={(e) => {
                          if (e === "delete") {
                            delete content[`content${field.name}`];
                            let data = content;
                            const entries = Object.entries(content);
                            for (let [key, value] of entries) {
                              if (key.substr(key.length - 1) > field.name) {
                                let change = key.substr(key.length - 1) - 1;
                                data = renameKey(
                                  data,
                                  key,
                                  key.replace(/.$/, String(change))
                                );
                                setContent(data);
                              }
                            }
                            remove(field.name);
                          } else {
                            type = e;
                            content[`content${field.name}`] &&
                              onChange(
                                {
                                  target: {
                                    name: `content${field.name}`,
                                    value: content[
                                      `content${field.name}`
                                    ].split(`$content:`)[1],
                                  },
                                },
                                type
                              );
                          }
                        }}
                        defaultValue="text"
                      >
                        <Option value="text">Бичиг</Option>
                        <Option value="code">Код</Option>
                        <Option value="img">Зураг</Option>
                        <Option value="title">Гарчиг</Option>
                        <Option value="delete">Устгах</Option>
                      </Select>
                    }
                    required={false}
                    key={field.key}
                  >
                    <TextArea
                      allowClear
                      name={`content${field.name}`}
                      onChange={(e) => onChange(e, type)}
                      autoSize
                    />
                  </Form.Item>
                );
              })}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  style={{ width: "100%" }}
                >
                  <PlusOutlined /> Нэмэх
                </Button>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>
      <Form.Item label="Холбоосоо сонгоорой">
        {requestTags.data.map((item) => (
          <CheckableTag
            key={item.name}
            checked={selectedTags.indexOf(item.name) > -1}
            onChange={(checked) => handleTags(item.name, checked)}
          >
            {item.name}
          </CheckableTag>
        ))}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Хадгалах
        </Button>
      </Form.Item>
    </Form>
  );
}
