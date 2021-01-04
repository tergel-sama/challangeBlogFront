import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { RequestProvider } from "react-request-hook";
import axios from "axios";
import register from "navi-scripts/register";

const axiosInstance = axios.create({
  baseURL: "https://tergelblogback.herokuapp.com",
});
register({
  exports: {
    App,
  },

  async main() {
    let hasStaticContent = process.env.NODE_ENV === "production";
    let renderer = hasStaticContent ? ReactDOM.hydrate : ReactDOM.render;
    renderer(
      <RequestProvider value={axiosInstance}>
        <App />
      </RequestProvider>,
      document.getElementById("root")
    );
  },
});
serviceWorker.unregister();
