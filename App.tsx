import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import Login from "./screens/Login";
import { createStackNavigator } from "@react-navigation/stack";
import MyDrawer from "./screens/Drawer";
import Store from "./components/Store";
const Stack = createStackNavigator();

const theme = {
  dark: true,
  colors: {
    primary: "#8e44ad",
    background: "#252830",
    text: "#ffffff",
    card: "rgb(255, 255, 255)",
    border: "rgb(199, 199, 204)",
  },
};

const paperTheme = {
  ...DefaultTheme,
  ...theme,
  roundness: 2,
  mode: "adaptive",
  colors: {
    ...DefaultTheme.colors,
    accent: "#f1c40f",
    surface: "#121212",
    placeholder: "#7f8c8dff",
  },
};

function App() {
  return (
    <Store>
      <PaperProvider theme={paperTheme}>
        <NavigationContainer theme={theme}>
          <Stack.Navigator headerMode={"none"}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Main" component={MyDrawer} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Store>
  );
}
export default App;
