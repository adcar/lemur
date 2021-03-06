import React from "react";
// @ts-ignore
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import Home from "./Home";
import All from "./All";
import MyCommunities from "./MyCommunities";
import Inbox from "./Inbox";
const Tab = createMaterialBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="white"
      style={{ backgroundColor: "red" }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="All"
        component={All}
        options={{
          tabBarLabel: "All",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="widgets" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="MyCommunities"
        component={MyCommunities}
        options={{
          tabBarLabel: "My Communities",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-multiple"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Inbox"
        component={Inbox}
        options={{
          tabBarLabel: "Inbox",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="email" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
