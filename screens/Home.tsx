import * as React from "react";
import { useEffect, useState, useContext } from "react";
import { AsyncStorage } from "react-native";
import { View, FlatList } from "react-native";
import { getPosts } from "../api";
import { Context } from "../components/Store";
import Appbar from "../components/PostsAppbar";
import Post from "../components/Post";

export default function HomeScreen({ navigation }: any) {
  const [state] = useContext(Context);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [jwt, setJwt] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("mounted");
    (async () => {
      const newJwt = await AsyncStorage.getItem("jwt");
      if (newJwt !== null) {
        console.log(newJwt);
        setJwt(newJwt);
      }

      if (newJwt !== null) {
        const posts = await getPosts(
          newJwt,
          "Subscribed",
          page,
          state.sort.name,
          state.server
        );

        setPosts(posts);
      }
    })();
  }, [state]);

  function onLoadMore() {
    console.log("Load more");
    console.log("Server: " + state.server);
    if (jwt !== "" && !loading) {
      setLoading(true);
      getPosts(jwt, "Subscribed", page + 1, state.sort.name, state.server).then(
        (newPosts) => {
          // @ts-ignore
          setPosts(posts.concat(newPosts));
          setPage(page + 1);
          setLoading(false);
        }
      );
    }
  }

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
      }}
    >
      <Appbar navigation={navigation} />
      <FlatList
        contentContainerStyle={{}}
        data={posts}
        extraData={loading}
        renderItem={({ item }: any) => {
          return <Post {...item} />;
        }}
        refreshing={true}
        onEndReachedThreshold={0.99}
        onEndReached={onLoadMore}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
