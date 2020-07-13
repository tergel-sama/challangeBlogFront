import React, { useState } from "react";
import { Form, Input, Button, Upload, Row, Col, Select } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const onFinish = (values) => {
  console.log("Received values of form:", values);
};
const { TextArea } = Input;
const { Option } = Select;
export default function CreatePost() {
  const [imgUrl, setImgUrl] = useState("");
  const [content, setContent] = useState({});
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
    <Form name="dynamic_form_item" onFinish={onFinish}>
      <Form.Item label="Гарчиг">
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Row>
        <Col span={24}>
          <Form.Item label="Зураг">
            <Input
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
              placeholder="image url"
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
                console.log("fields", field, index);
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
                            console.log(entries);
                            remove(field.name);
                          } else type = e;
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
                  <PlusOutlined /> Add field
                </Button>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
