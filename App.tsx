import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./components/Tabs";
import Login from "./screens/Login";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={"none"}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Main" component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
