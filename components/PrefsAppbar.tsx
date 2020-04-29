import { Appbar } from "react-native-paper";
import Constants from "expo-constants";
import * as React from "react";
import { DrawerActions } from "@react-navigation/native";

export default function PresAppbar({ navigation }: any) {
  return (
    <Appbar
      style={{
        marginTop: Constants.statusBarHeight,
      }}
    >
      <Appbar.Action
        icon="menu"
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      />
      <Appbar.Content title="Preferences" />
    </Appbar>
  );
}
