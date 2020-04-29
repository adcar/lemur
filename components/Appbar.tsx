import * as React from "react";
import { Appbar, Menu } from "react-native-paper";
import { DrawerActions } from "@react-navigation/native";
import Constants from "expo-constants";
import { useState, useContext } from "react";
import { Context } from "../App";

export default function MyAppBar({ navigation }: any) {
  const [visible, setVisible] = useState(false);
  // @ts-ignore
  const [, dispatch] = useContext(Context);

  function handleSortChange(sort: string) {
    console.log("Sort change: " + sort);
    dispatch({ type: "SET_SORT", payload: sort });
  }

  return (
    <Appbar
      style={{
        marginTop: Constants.statusBarHeight,
      }}
    >
      <Appbar.Action
        icon="menu"
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      />
      <Appbar.Content title="Lemur" />
      <Appbar.Header>
        <Menu
          onDismiss={() => setVisible(false)}
          visible={visible}
          anchor={
            <Appbar.Action
              disabled={false}
              color="white"
              icon="sort-variant"
              onPress={() => setVisible(true)}
            />
          }
        >
          <Menu.Item title="Hot" onPress={() => handleSortChange("Hot")} />
          <Menu.Item title="New" onPress={() => handleSortChange("New")} />
          <Menu.Item
            title="Top Today"
            onPress={() => handleSortChange("TopDay")}
          />
          <Menu.Item
            title="Top this Week"
            onPress={() => handleSortChange("TopWeek")}
          />
          <Menu.Item
            title="Top this Month"
            onPress={() => handleSortChange("TopMonth")}
          />
          <Menu.Item
            title="Top this Year"
            onPress={() => handleSortChange("TopYear")}
          />
          <Menu.Item
            title="Top All Time"
            onPress={() => handleSortChange("TopAll")}
          />
        </Menu>
      </Appbar.Header>
    </Appbar>
  );
}
