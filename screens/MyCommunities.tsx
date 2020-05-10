import * as React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import SearchCommunities from "./SearchCommunities";
import CommunityPage from "./CommunityPage";



const Stack = createStackNavigator();
export default function MyCommunities() {
    return (
        <Stack.Navigator initialRouteName="Posts" headerMode={"none"}>
            <Stack.Screen name="SearchCommunities" component={SearchCommunities} />
            <Stack.Screen name="CommunityPage" component={CommunityPage} />

        </Stack.Navigator>
    );
}
