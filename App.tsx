import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import Login from "./screens/Login";
import { createStackNavigator } from "@react-navigation/stack";
import MyDrawer from "./components/Drawer";
import { createContext, useReducer } from "react";
import Reducer from "./Reducer";
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
    surface: "#121212",
    text: "#ffffff",
    placeholder: "#7f8c8dff",
  },
};
const initialState = { sort: "Hot" };

function App() {
  const [state, dispatch] = useReducer(Reducer, initialState);

  return (
    <Context.Provider value={[state, dispatch]}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <Stack.Navigator headerMode={"none"}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Main" component={MyDrawer} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Context.Provider>
  );
}
export const Context = createContext(initialState);
export default App;
