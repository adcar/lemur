import * as React from "react";
import { useEffect, useState, useContext } from "react";
import { AsyncStorage, View, FlatList } from "react-native";
import { getPosts } from "../api";
import { Text } from "react-native-paper";
import { Context } from "../components/Store";
import Appbar from "../components/PostsAppbar";

export default function HomeScreen({ navigation }: any) {
  // @ts-ignore
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
          state.sort.name
        );

        setPosts(posts);
      }
    })();
  }, [state]);

  function onLoadMore() {
    console.log("Load more");

    if (jwt !== "" && !loading) {
      setLoading(true);
      getPosts(jwt, "Subscribed", page + 1, state.sort.name).then(
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
          return (
            <Text
              style={{
                height: 200,
              }}
            >
              {item.name}
            </Text>
          );
        }}
        refreshing={true}
        onEndReachedThreshold={0.99}
        onEndReached={onLoadMore}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
}
