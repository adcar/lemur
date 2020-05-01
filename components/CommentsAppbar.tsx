import { Appbar } from "react-native-paper";
import Constants from "expo-constants";
import * as React from "react";

interface IProps {
  navigation: any;
}
export default function CommentsAppbar({ navigation }: IProps) {
  return (
    <Appbar
      style={{
        marginTop: Constants.statusBarHeight,
      }}
    >
      <Appbar.Action icon="arrow-left" onPress={() => navigation.goBack()} />
      <Appbar.Content title="Comments" />
    </Appbar>
  );
}
