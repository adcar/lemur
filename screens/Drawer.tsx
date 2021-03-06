import * as React from "react";
import { createDrawerNavigator, DrawerItem } from "@react-navigation/drawer";
import Tabs from "./Tabs";
import { withTheme } from "react-native-paper";
import Preferences from "./Preferences";
const Drawer = createDrawerNavigator();

import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { AsyncStorage } from "react-native";
function CustomDrawerContent({ nav, ...props }: any) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={async () => {
          await AsyncStorage.removeItem("jwt");
          nav.replace("Login");
        }}
      />
    </DrawerContentScrollView>
  );
}

function MyDrawer({ theme, navigation }: any) {
  const { colors } = theme;
  return (
    <>
      <Drawer.Navigator
        drawerContent={(props: any) => (
          <CustomDrawerContent {...props} nav={navigation} />
        )}
        initialRouteName="Home"
        drawerStyle={{
          backgroundColor: colors.background,
        }}
      >
        <Drawer.Screen name="Home" component={Tabs} />
        <Drawer.Screen name="Preferences" component={Preferences} />
      </Drawer.Navigator>
    </>
  );
}

export default withTheme(MyDrawer);
