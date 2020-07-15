import React from "react";
import { Router, View } from "react-navi";
import { mount, route } from "navi";
import PostList from "../Components/PostList";
import Post from "../Components/Post";
import CreatePost from "../Components/CreatePost";
import Layout from "../Components/Layout";
import FullPost from "../Components/FullPost";
import Axios from "axios";
export default function Routes() {
  const routes = mount({
    "/": route({
      getData: () => Axios.get("/api/post"),
      view: <PostList />,
    }),
    "/post/:id": route({
      async getView(request) {
        let post = await Axios.get(`/api/post/${request.params.id}`)
        return <FullPost post={post} />
      }
    }),
    "/create-post": route({ view: <CreatePost /> }),
  });
  return (
    <Router routes={routes}>
      <Layout>
        <View />
      </Layout>
    </Router>
  );
}