import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { withTheme } from "react-native-paper";

interface IProps {
  children: React.ReactNode;
  visible: boolean;
  theme: any;
}

function Toast({ children, visible, theme }: IProps) {
  const { colors } = theme;
  return (
    <View
      style={{
        zIndex: 99500,
        display: "flex",
        opacity: visible ? 1 : 0,
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        top: 0,
        left: 0,
      }}
    >
      <View
        style={{
          backgroundColor: colors.primary,
          paddingTop: 5,
          paddingBottom: 5,
          paddingLeft: 10,
          paddingRight: 10,
          borderRadius: 5,
        }}
      >
        <Text>{children}</Text>
      </View>
    </View>
  );
}

export default withTheme(Toast);
