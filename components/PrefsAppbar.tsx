import { Appbar } from "react-native-paper";
import Constants from "expo-constants";
import * as React from "react";
export default function PresAppbar({ navigation }: any) {
  return (
    <Appbar
      style={{
        marginTop: Constants.statusBarHeight,
      }}
    >
      <Appbar.Action icon="arrow-left" onPress={() => navigation.goBack()} />
      <Appbar.Content title="Preferences" />
    </Appbar>
  );
}
