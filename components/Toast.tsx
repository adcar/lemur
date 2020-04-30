import React from "react";
import { View } from "react-native";
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
        display: "flex",
        opacity: visible ? 1 : 0,
        transition: "all, ease-out, 0.5s",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        top: 10,
        left: 0,
      }}
    >
      <View
        style={{
          backgroundColor: colors.primary,
          color: colors.text,
          paddingTop: 5,
          paddingBottom: 5,
          paddingLeft: 10,
          paddingRight: 10,
          borderRadius: 5,
        }}
      >
        {children}
      </View>
    </View>
  );
}

export default withTheme(Toast);
