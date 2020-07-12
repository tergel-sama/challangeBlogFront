import React, { useState } from "react";
import { Card } from "antd";
import Layouts from "./Components/Layout";
// import 'antd/dist/antd.dark.css';
function App() {
  const [isDark, setIsDark] = useState(true);
  function dark() {
    if (isDark) return ".dark";
    else return "";
  }
 

  // import(`antd/dist/antd${dark()}.css`).then(() => {
  //   console.log("changed");
  // });

  return (
    <React.Fragment>
      <Layouts isDark={isDark} setIsDark={setIsDark} />
    </React.Fragment>
  );
}

export default App;
