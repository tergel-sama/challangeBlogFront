import React, { useState, Suspense } from "react";
import { Card } from "antd";
import Layouts from "./Components/Layout";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import Routes from "./Routes/Routes";
import { ThemeContext } from "./contexts";
function App() {
  const [isDark, setIsDark] = useState(true);

  const themes = {
    light: `${process.env.PUBLIC_URL}/light-theme.css`,
    dark: `${process.env.PUBLIC_URL}/dark-theme.css`,
  };
  // import(`antd/dist/antd${dark()}.css`).then(() => {
  //   console.log("changed");
  // });

  return (
    <ThemeSwitcherProvider
      defaultTheme={isDark ? "dark" : "light"}
      themeMap={themes}
    >
      <ThemeContext.Provider value={{ isDark, setIsDark }}>
        {/* <Layouts /> */}
        <Suspense fallback={null}>
          <Routes />
        </Suspense>
      </ThemeContext.Provider>
    </ThemeSwitcherProvider>
  );
}

export default App;
