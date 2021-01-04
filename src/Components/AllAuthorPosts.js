import React from "react";
import { Row, Col, Empty, Button, Table, Tag, Space, Typography } from "antd";
import Post from "./Post";
import ShowEmpty from "./ShowEmpty";
import { useCurrentRoute } from "react-navi";
import { Link } from "react-navi";
const { Title } = Typography;
export default function PostList({ posts }) {
  let route = useCurrentRoute();
  let data = posts ? posts.data : route.data.data;
  console.log("posts full data", data);
  const columns = [
    {
      title: "Нийтлэгч",
      dataIndex: "author",
      key: "author",
      render: (text) => <Link href={`/profile/${text}`}>{text}</Link>,
    },
    {
      title: "Reputation point",
      dataIndex: "point",
      key: "point",
    },
    {
      title: "Энэ сарийн Reputation point",
      dataIndex: "currentMonthPoint",
      key: "currentMonthPoint",
    },
    {
      title: "Энэ сарийн цалин",
      dataIndex: "salary",
      key: "salary",
      render: (text) => text + "₮",
    },
  ];
  const postsByAuthors = data.reduce((acc, value) => {
    // Group initialization
    if (!acc[value.author]) {
      acc[value.author] = [];
    }
    // Grouping
    acc[value.author].push(value);
    return acc;
  }, {});
  let tableData = [];
  for (const [key, value] of Object.entries(postsByAuthors)) {
    let point = value.reduce((sum, item) => {
      sum += +item.likes;
      let tmp = +item.views * 0.3;
      sum += tmp;
      return sum;
    }, 0);
    let currentMonthPoint = value.reduce((sum, item) => {
      let timestamp = item._id.toString().substring(0, 8);
      let month = new Date(parseInt(timestamp, 16) * 1000).getMonth();
      let currentMonth = new Date().getMonth();
      if (month === currentMonth) {
        sum += +item.likes;
        let tmp = +item.views * 0.3;
        sum += tmp;
      }
      return sum;
    }, 0);

    tableData.push({
      author: key,
      point,
      salary: currentMonthPoint * 1200,
      currentMonthPoint: currentMonthPoint,
    });
  }
  console.log("group", postsByAuthors);
  return (
    <Row justify="center" gutter={[24, 24]}>
      <Col span={24}>
        <Table columns={columns} dataSource={tableData} />
      </Col>
    </Row>
  );
}
