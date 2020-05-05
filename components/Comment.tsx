import React from "react";
import { Text } from "react-native-paper";
interface IProps {
  content: string;
  idsToChildren: idsToChildren;
}

export default function Comment(props: IProps) {
  return <Text>{props.content}</Text>;
}
