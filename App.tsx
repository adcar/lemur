import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

import Tabs from "./components/Tabs";
import Login from "./screens/Login";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  roundness: 2,
  dark: true,
  mode: "adaptive",
  colors: {
    ...DefaultTheme.colors,
    primary: "#8e44ad",
    accent: "#f1c40f",
    background: "#252830",
    surface: "#2c3e50",
    text: "#ffffff",
    placeholder: "#bdc3c7",
  },
};

function App() {
  return (
    // @ts-ignore
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <Stack.Navigator headerMode={"none"}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Main" component={Tabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
