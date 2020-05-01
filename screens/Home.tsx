import * as React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import Posts from "./Posts";
import Comments from "./Comments";

const Stack = createStackNavigator();
export default function HomeScreen() {
  return (
    <Stack.Navigator initialRouteName="Posts" headerMode={"none"}>
      <Stack.Screen name="Posts" component={Posts} />
      <Stack.Screen name="Comments" component={Comments} />
    </Stack.Navigator>
  );
}
