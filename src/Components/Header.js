import React from "react";
import { PageHeader, Button, Tag } from "antd";
import { SettingOutlined } from "@ant-design/icons";
export default function Header() {
  return (
    <PageHeader
      title="Mr. Rob0t"
      //   subTitle="admin"
    //   tags={[
    //     <Tag color="blue">Javascript</Tag>,
    //     <Tag color="blue">React</Tag>,
    //     <Tag color="blue">Javascript</Tag>,
    //     // <Tag color="blue">Javascript</Tag>,
    //     // <Tag color="blue">Javascript</Tag>,
    //     // <Tag color="blue">Javascript</Tag>,
    //     // <Tag color="blue">Javascript</Tag>,
    //     // <Tag color="blue">Javascript</Tag>,
    //     // <Tag color="blue">Javascript</Tag>,
    //     // <Tag color="blue">Javascript</Tag>,
    //     // <Tag color="blue">Javascript</Tag>,
    //     // <Tag color="blue">Javascript</Tag>,
    //     // <Tag color="blue">Javascript</Tag>,
    //     // <Tag color="blue">Javascript</Tag>,
    //     // <Tag color="blue">Javascript</Tag>,
    //     // <Tag color="blue">Javascript</Tag>,
    //   ]}
      extra={<SettingOutlined style={{fontSize:'25px'}} />}
      avatar={{
        src: "https://avatars1.githubusercontent.com/u/8186664?s=460&v=4",
      }}
    />
  );
}
