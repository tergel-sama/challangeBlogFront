import React, { useState } from "react";
import { Card } from "antd";
import Layouts from './Components/Layout';
import 'antd/dist/antd.dark.css';
function App() {
  // const [defaultTheme, setDefaultTheme] = useState(true);
  // defaultTheme
  //   ? import("antd/dist/antd.css").then(() => {})
  //   : import("antd/dist/antd.dark.css").then(() => {});

  return (
    <React.Fragment>
      <Layouts />
    </React.Fragment>
  );
}

export default App;