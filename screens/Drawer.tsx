import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Tabs from "./Tabs";
import { withTheme } from "react-native-paper";
import Preferences from "./Preferences";
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
