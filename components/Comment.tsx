import React from "react";
import { Text, Card, withTheme } from "react-native-paper";
import { View } from "react-native";

interface IProps {
  data: any;
  children: any[];
  indent: number;
  theme?: any;
}

function getIndentColor(indent: number) {
  switch (indent) {
    case 0:
      return "transparent";
    case 1:
      return "#8e44ad";
    case 2:
      return "#2980b9";
    case 3:
      return "#27ae60";
    case 4:
      return "#1abc9c";
    case 5:
      return "#e74c3c";
    default:
      return "#ecf0f1";
  }
}

function Comment(props: IProps) {
  const indentColor = getIndentColor(props.indent);
  console.log(props.data);
  const { colors } = props.theme;
  return (
    <Card
      style={{
        borderLeftColor: indentColor,
        borderLeftWidth: 3,
        margin: 5,
        marginLeft: props.indent * 10,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ padding: 5, color: colors.primary }}>
          {props.data.creator_name}
        </Text>
        <Text style={{ padding: 5, color: colors.placeholder }}>
          {props.data.score}
        </Text>
      </View>

      <Text style={{ padding: 5 }}>{props.data.content}</Text>
      {props.children !== null ? (
        props.children.map((child) => (
          <Comment
            indent={props.indent + 1}
            data={child.data}
            children={child.children}
          />
        ))
      ) : (
        <Text />
      )}
    </Card>
  );
}
// @ts-ignore
export default withTheme(Comment);
