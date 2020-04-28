import * as React from "react";
import { AsyncStorage, Button, Text, View } from "react-native";
import { getPosts } from "../api";
import { useEffect } from "react";

export default function HomeScreen({ navigation }: any) {
  useEffect(() => {
    (async () => {
      const jwt = await AsyncStorage.getItem("jwt");
      if (jwt !== null) {
        const posts = await getPosts(jwt);
        console.log(posts);
      }
    })();
  });
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Just communities youre subscribed to </Text>
      <Button
        title="Go to Other"
        onPress={() => navigation.navigate("Other")}
      />
    </View>
  );
}
