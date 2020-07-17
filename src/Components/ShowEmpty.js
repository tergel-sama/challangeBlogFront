import React, { useState } from "react";
import { Modal, Empty, Button } from "antd";
export default function ShowEmpty() {
  const [visible, setVisible] = useState(false);
  return (
    <React.Fragment>
      <Modal
        title="Юуно-чан"
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
        footer={[
          <Button
            key="back"
            onClick={() => {
              setVisible(false);
            }}
          >
            За
          </Button>,
        ]}
      >
        <img
          style={{ maxWidth: "100%", maxHeight: "100%" }}
          src={require("../assets/yuno.jpg")}
        />
        <p>Хөөе!</p>
        <p>Байхгүй гээд байхад дахиж хайж яах гээд байгаан!</p>
        <p>Чи яг save дарсныхаа дараа дахиж 2-3 дардаг төрлийн хүн байхаа.</p>
      </Modal>
      <Empty description="Өө! олдсонгүй ээ.">
        <Button onClick={() => setVisible(true)}>Дахин хайх</Button>
      </Empty>
    </React.Fragment>
  );
}
