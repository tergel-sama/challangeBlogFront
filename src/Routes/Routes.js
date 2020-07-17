import React from "react";
import { Router, View } from "react-navi";
import { mount, route } from "navi";
import PostList from "../Components/PostList";
import Tags from "../Components/Tags";
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
    "/post-tag/:name": route({
      async getView(request) {
        let posts = await Axios.get(`/api/post/tag-of/${request.params.name}`);
        return <PostList posts={posts} />;
      },
    }),
    "/post/:id": route({
      async getView(request) {
        let post = await Axios.get(`/api/post/${request.params.id}`);
        return <FullPost post={post} />;
      },
    }),
    "/create-post": route({
      async getView(request){
        let tags = await Axios.get('/api/tag');
        return <CreatePost requestTags={tags} />
      }
    }),
    "/tags": route({
      async getView(request) {
        let tags = await Axios.get("/api/tag");
        return <Tags tags={tags} />;
      },
    }),
  });
  return (
    <Router routes={routes}>
      <Layout>
        <View />
      </Layout>
    </Router>
  );
}
