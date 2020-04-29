import { View } from "react-native";
import { Text } from "react-native-paper";
import PrefsAppbar from "../components/PrefsAppbar";
import * as React from "react";

export default function Preferences({ navigation }: any) {
  return (
    <>
      <PrefsAppbar navigation={navigation} />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Hello</Text>
      </View>
    </>
  );
}
