import * as React from "react";
import { Appbar } from "react-native-paper";
import { DrawerActions } from "@react-navigation/native";
export default function MyAppBar({ navigation }: any) {
  return (
    <Appbar>
      <Appbar.Action
        icon="menu"
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      />
    </Appbar>
  );
}
