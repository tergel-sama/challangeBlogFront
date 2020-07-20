import React, { useState, Suspense, useEffect } from "react";
import { message } from "antd";
import Layouts from "./Components/Layout";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import Routes from "./Routes/Routes";
import { ThemeContext, UserContext } from "./contexts";
import { CookiesProvider, useCookies } from "react-cookie";
import { useResource } from "react-request-hook";
function App() {

  const [user, setUser] = useState({});
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [isDark, setIsDark] = useState(true);
  const [resultUser, getUser] = useResource(() => {
    if (!cookies.token) {
      message.error("Та нэвтэрч орнуу");
      window.location.href = "/";
    }
    return {
      url: "/user",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
    };
  });
  useEffect(() => {
    if (!user.userData && cookies.token) getUser();
  }, []);
  useEffect(() => {
    console.log("data", resultUser);
    resultUser.data && setUser(resultUser.data.userData);
  }, [resultUser]);
  const themes = {
    light: `${process.env.PUBLIC_URL}/light-theme.css`,
    dark: `${process.env.PUBLIC_URL}/dark-theme.css`,
  };
  // import(`antd/dist/antd${dark()}.css`).then(() => {
  //   console.log("changed");
  // });

  return (
    <CookiesProvider>
      <ThemeSwitcherProvider
        defaultTheme={isDark ? "dark" : "light"}
        themeMap={themes}
      >
        <ThemeContext.Provider value={{ isDark, setIsDark }}>
          <UserContext.Provider value={{ user, setUser }}>
            <Suspense fallback={null}>
              <Routes />
            </Suspense>
          </UserContext.Provider>
        </ThemeContext.Provider>
      </ThemeSwitcherProvider>
    </CookiesProvider>
  );
}

export default App;
