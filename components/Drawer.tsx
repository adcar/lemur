import * as React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Tabs from "./Tabs";

// TODO: Delete this
function NotificationsScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Hello</Text>
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Tabs} />
      <Drawer.Screen name="Notifications" component={NotificationsScreen} />
    </Drawer.Navigator>
  );
}
