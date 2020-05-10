import React, { useContext, useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import CommunityHeader from "./CommunityHeader";
import Post from "./Post";
import { getPosts } from "../api";
import { Context } from "./Store";

interface IProps {
  navigation: any;
  type: string;
  id: number;
  name: string;
}

export default function Posts(props: IProps) {
  const [state] = useContext(Context);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const posts = await getPosts(
        state.jwt,
        props.type,
        1,
        state.sort.name,
        state.server,
        props.id
      );

      setPosts(posts);
    })();
  }, [state]);

  function onLoadMore() {
    console.log("Load more");
    console.log("Server: " + state.server);
    setLoading(true);
    getPosts(
      state.jwt,
      props.type,
      page,
      state.sort.name,
      state.server,
      props.id
    ).then((newPosts) => {
      // @ts-ignore
      setPosts(posts.concat(newPosts));
      setPage(page + 1);
      setLoading(false);
    });
  }
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
      }}
    >
      <FlatList
        contentContainerStyle={{}}
        data={posts}
        extraData={loading}
        renderItem={({ item }: any) => {
          return <Post {...item} navigation={props.navigation} />;
        }}
        refreshing={true}
        ListHeaderComponent={
          props.type === "Community" ? (
            <CommunityHeader name={props.name} id={props.id} />
          ) : null
        }
        onEndReachedThreshold={0.99}
        onEndReached={onLoadMore}
        keyExtractor={(item) => {
          //@ts-ignore
          return item.id.toString() + Math.random().toString();
        }}
      />
    </View>
  );
}
