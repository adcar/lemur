import * as React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Tabs from "./Tabs";
import { withTheme } from "react-native-paper";

// TODO: Delete this
function Preferences() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Hello</Text>
    </View>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer({ theme }: any) {
  const { colors } = theme;
  return (
    <>
      <Drawer.Navigator
        initialRouteName="Tabs"
        drawerStyle={{
          backgroundColor: colors.background,
        }}
      >
        <Drawer.Screen name="Tabs" component={Tabs} />
        <Drawer.Screen name="Preferences" component={Preferences} />
      </Drawer.Navigator>
    </>
  );
}

export default withTheme(MyDrawer);
