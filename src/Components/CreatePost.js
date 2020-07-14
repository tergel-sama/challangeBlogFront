import React, { useState, useEffect } from "react";
import { Form, Input, Button, message, Row, Col, Select } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useResource } from "react-request-hook";
const onFinish = (values) => {
  console.log("Received values of form:", values);
};
const { TextArea } = Input;
const { Option } = Select;
export default function CreatePost() {
  const [resultPost, createPost] = useResource(
    (title, content, author, img) => {
      console.log("content", content);
      return {
        url: "/post",
        method: "post",
        data: { title, img, author, content },
      };
    }
  );
  const [title, setTitle] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [content, setContent] = useState({});
  useEffect(() => {
    if (resultPost && resultPost.data) {
      resultPost.data.status === "success"
        ? message
            .success({
              content: "Амжилттай хадгаллаа!",
              key: "post",
              duration: 2.50,
            })
            .then((_) => window.location.reload())
        : message.error({ content: "Алдаа гарлаа!", key: "post", duration: 2 });
    }
  }, [resultPost]);
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
        createPost(title, content, "mr.rob0t", imgUrl);
      }}
    >
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
                >
                  <PlusOutlined /> Нэмэх
                </Button>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Хадгалах
        </Button>
      </Form.Item>
    </Form>
  );
}
