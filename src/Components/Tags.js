import React, { useState, useEffect } from "react";
import { Tag, Popconfirm, Input, Button, message } from "antd";
import { useResource } from "react-request-hook";
import { useNavigation } from "react-navi";
export default function Tags({ tags }) {
  const navigation = useNavigation();
  const [tag, setTag] = useState("");
  const [resultTag, createTag] = useResource((name) => ({
    url: "/tag",
    method: "post",
    data: { name },
  }));
  const [resultDeletedTag, deleteTag] = useResource((id) => ({
    url: `/tag/${id}`,
    method: "DELETE",
  }));
  useEffect(() => {
    if (resultDeletedTag && resultDeletedTag.data) {
        resultDeletedTag.data.status === "success"
        ? message
            .success({
              content: "Амжилттай устгалаа!",
              key: "Deltag",
              duration: 2,
            })
            .then((_) => navigation.navigate(navigation.getCurrentValue()))
        : message.error({ content: "Алдаа гарлаа!", key: "tag", duration: 2 });
    }
  }, [resultDeletedTag]);
  useEffect(() => {
    if (resultTag && resultTag.data) {
      resultTag.data.status === "success"
        ? message
            .success({
              content: "Амжилттай хадгаллаа!",
              key: "tag",
              duration: 2,
            })
            .then((_) => navigation.navigate(navigation.getCurrentValue()))
        : message.error({ content: "Алдаа гарлаа!", key: "tag", duration: 2 });
    }
  }, [resultTag]);
  return (
    <React.Fragment>
         <p>Таг дээр дарж устгана.</p>
        <p>Тагнийхаа нэрний эхний үсгийг томоор бичвэл зүгээр бөлгөө.</p>
      {tags.data.map((item, index) => (
        <Popconfirm
          key={index}
          title={`Энэ ${item.name} тагийг устгахдаа итгэлтэй байна уу?`}
          onConfirm={() => {
            message.loading({ content: "Устгаж байна...", key: "Deltag" });
            deleteTag(item._id);
          }}
          onCancel={() => {}}
          okText="Тийм"
          cancelText="Үгүй"
        >
          <Tag color="blue">{item.name}</Tag>
        </Popconfirm>
      ))}

      <Input
        size="small"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        style={{width:'30%'}}
      />
      <Button
      size='small'
        type="primary"
        onClick={() => {
          message.loading({ content: "Хадгалж байна...", key: "tag" });
          createTag(tag);
        }}
      >
        Хадгалах
      </Button>
    </React.Fragment>
  );
}
