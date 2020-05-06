import React from "react";
import { Text } from "react-native-paper";

interface IProps {
  data: any;
  children: any[];
  indent: number;
}

export default function Comment(props: IProps) {
  return <Text>{props.data.content}</Text>;
}
