import React from "react";
import { Text } from "react-native-paper";
import { View } from "react-native";

interface IProps {
  data: any;
  children: any[];
  indent: number;
}

export default function Comment(props: IProps) {
  return (
    <View
      style={{
        backgroundColor: "red",
        marginLeft: props.indent * 10,
      }}
    >
      <Text>{props.data.content}</Text>
      {props.children !== null ? (
        props.children.map((child) => (
          <Comment
            indent={props.indent + 1}
            data={child.data}
            children={child.children}
          />
        ))
      ) : (
        <Text></Text>
      )}
    </View>
  );
}
