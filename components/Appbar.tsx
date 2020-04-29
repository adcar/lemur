import * as React from "react";
import { Appbar, Menu } from "react-native-paper";
import { DrawerActions } from "@react-navigation/native";
import Constants from "expo-constants";
import { useState, useContext } from "react";
import { Context } from "../App";
interface ISort {
  fullname: string;
  name: string;
}
export default function MyAppBar({ navigation }: any) {
  const [sortMenuVisible, setSortMenuVisible] = useState(false);
  const [dotsMenuVisible, setDotsMenuVisible] = useState(false);
  // @ts-ignore
  const [state, dispatch] = useContext(Context);
  function handleSortChange(sort: ISort) {
    console.log("Sort change: " + sort);
    dispatch({ type: "SET_SORT", payload: sort });
  }

  const sorts = [
    { fullname: "Hot", name: "Hot" },
    { fullname: "New", name: "New" },
    { fullname: "Top today", name: "TopDay" },
    { fullname: "Top this week", name: "TopWeek" },
    { fullname: "Top this month", name: "TopMonth" },
    { fullname: "Top this year", name: "TopYear" },
    { fullname: "Top all time", name: "TopAll" },
  ];

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
      <Appbar.Content title="Home" subtitle={state.sort.fullname} />
      <Menu
        onDismiss={() => setSortMenuVisible(false)}
        visible={sortMenuVisible}
        anchor={
          <Appbar.Action
            disabled={false}
            color="white"
            icon="sort-variant"
            onPress={() => setSortMenuVisible(true)}
          />
        }
      >
        {sorts.map((sort, index) => (
          <Menu.Item
            key={index}
            title={sort.fullname}
            onPress={() => handleSortChange(sort)}
          />
        ))}
      </Menu>
      <Menu
        onDismiss={() => setDotsMenuVisible(false)}
        visible={dotsMenuVisible}
        anchor={
          <Appbar.Action
            disabled={false}
            color="white"
            icon="dots-vertical"
            onPress={() => setDotsMenuVisible(true)}
          />
        }
      >
        <Menu.Item
          title="Preferences"
          onPress={() => navigation.navigate("Preferences")}
        />
      </Menu>
    </Appbar>
  );
}
