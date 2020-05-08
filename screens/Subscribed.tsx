import React from "react";
import Posts from "../components/Posts"


export default function Subscribed({ navigation }: any) {
  return(<Posts
  navigation={navigation}
  type = "Subscribed"
  id = "5678"
  />);
}
