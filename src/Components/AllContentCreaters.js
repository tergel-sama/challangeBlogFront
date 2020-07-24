import React from "react";
import { List, Avatar } from "antd";
export default function AllContentCreaters({creators}) {
    console.log('creators',creators);
  return (
    <List
    itemLayout="vertical"
    size="large"
  
    dataSource={creators.data}
    footer={
      <div>
        <b>Mr. Rob0t</b> Админууд
      </div>
    }
    renderItem={item => (
      <List.Item
      
        key={item.title}
        extra={<div style={{
            height: 200,
            display: "flex",
            justifyContent: "center",
          }} >
          <img
            style={{
                maxWidth: "100%",
                maxHeight: "100%",
                display: "block",
                margin: "auto",
              }}
            alt="logo"
            src={item.img}
          />
          </div>
        }
      >
        <List.Item.Meta
          title={item.username}
        />
        {item.description}
      </List.Item>
    )}
  />
  );
}
