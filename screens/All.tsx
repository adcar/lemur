import * as React from "react";
import { useEffect, useState } from "react";
import { Text, View, AsyncStorage } from "react-native";
import { getPosts } from "../api";

export default function HomeScreen() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    (async () => {
      const jwt = await AsyncStorage.getItem("jwt");
      if (jwt !== null) {
        const posts = await getPosts(jwt, "All");
        setPosts(posts);
      }
    })();
  }, []);

  console.log(posts);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>All communities</Text>
    </View>
  );
}
