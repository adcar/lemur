import * as React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import Subscribed from "./Subscribed";
import Comments from "./Comments";

const Stack = createStackNavigator();
export default function HomeScreen() {
  return (
    <Stack.Navigator initialRouteName="Posts" headerMode={"none"}>
      <Stack.Screen name="Subscribed" component={Subscribed} />
      <Stack.Screen name="Comments" component={Comments} />
    </Stack.Navigator>
  );
}
