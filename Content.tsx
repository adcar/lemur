import Toast from "react-native-easy-toast";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./screens/Login";
import MyDrawer from "./screens/Drawer";
import { Context } from "./components/Store";
import * as React from "react";
import { useContext } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { navigationTheme, paperTheme } from "./theme";
import { createStackNavigator } from "@react-navigation/stack";

export default function Content() {
  const [, dispatch] = useContext(Context);
  const Stack = createStackNavigator();
  const toast = useRef(null);
  useEffect(() => {
    console.log("dispatching: ", toast);
    dispatch({ type: "SET_TOAST_REF", payload: toast });
  }, []);
  return (
    <>
      <Toast ref={toast} />
      <PaperProvider theme={paperTheme}>
        <NavigationContainer theme={navigationTheme}>
          <Stack.Navigator headerMode={"none"}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Main" component={MyDrawer} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </>
  );
}
