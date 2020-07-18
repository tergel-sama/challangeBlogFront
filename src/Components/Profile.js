import React, { useState,useEffect } from "react";
import { Row, Col, Avatar, Input, Button,message } from "antd";
import { useResource } from "react-request-hook";
import { useCookies } from "react-cookie";
const key = 'userkey';
export default function Profile({ profile }) {
  const [userData, setUserData] = useState(profile.data);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [resultUser, createUser] = useResource((update) => ({
    url: `/user/${profile.data._id}`,
    method: "patch",
    data:{update},
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.token,
    },
  }));
  useEffect(()=>{
    resultUser.error && message.error({content:'Алдаа гарлаа',key});
    if(resultUser.data){
        message.success({content:'Амжилттай хадгаллаа',key});
    }
  },[resultUser])
  function handleSave() {
    message.loading({content:'Уншиж байна',key});
    let data = { ...userData };
    delete data.__v;
    delete data._id;
    createUser(data);
  }
  function handleChange(value) {
    let data = { ...userData };
    data[value.target.name] = value.target.value;
    console.log("userData", data);
    setUserData(data);
  }
  console.log("profile", profile);
  return (
    <Row gutter={[24, 24]} align="middle" justify="center">
      <Col span={3}>
        <Avatar src={userData.img} size={100} />
      </Col>
      <Col span={21}>
        <Input
          value={userData.img}
          onChange={handleChange}
          name="img"
          placeholder="Зурагны url-ийг оруулаарай"
        />
      </Col>
      <Col span={3}> Нэр :</Col>
      <Col span={9}>
        <Input
          onChange={handleChange}
          name="username"
          value={userData.username}
          placeholder="Нэрээ оруулаарай"
        />
      </Col>
      <Col span={3}> Имейл :</Col>
      <Col span={9}>
        <Input
          onChange={handleChange}
          name="email"
          value={userData.email}
          placeholder="Имейлээ оруулаарай"
        />
      </Col>
      <Col span={24}> Танилцуулга :</Col>
      <Col span={24}>
        <Input.TextArea
          onChange={handleChange}
          name="description"
          value={userData.description}
          placeholder="Ямар нэгэн өөрийгөө тодорхойлох зүйл бичээрэй"
        />
      </Col>
      <Button onClick={handleSave}>Хадгалах</Button>
    </Row>
  );
}
