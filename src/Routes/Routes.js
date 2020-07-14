import React from "react";
import { Router, View } from "react-navi";
import { mount, route } from "navi";
import PostList from "../Components/PostList";
import Post from "../Components/Post";
import CreatePost from "../Components/CreatePost";
import Layout from "../Components/Layout";
import Axios from 'axios';
export default function Routes() {
  const routes = mount({
    "/": route({
      getData:()=>Axios.get('/api/post'),
      view: <PostList />,
    }),
    "/post/:id": route((req) => {
      return { view: <Post id={req.params.id} /> };
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
