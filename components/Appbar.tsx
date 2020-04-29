import * as React from "react";
import { Appbar } from "react-native-paper";
import { DrawerActions } from "@react-navigation/native";
import Constants from "expo-constants";

export default function MyAppBar({ navigation }: any) {
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
      <Appbar.Content title="Lemur" />
    </Appbar>
  );
}
