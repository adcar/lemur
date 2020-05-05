import React, { useContext, useEffect, useState } from "react";
import { FlatList, View, Text } from "react-native";
import { followedCommunities } from "../api";
import { Context } from "../components/Store";





export default function MyCommunities() {
    const [state] = useContext(Context);
    let [communities, setCommunities]=useState([]);

    useEffect(() => {
        (async () => {
            const communities = await followedCommunities(
                state.jwt,
                state.server
            );

            setCommunities(communities);
        })();
    }, [state]);

    console.log(communities);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>My communities!</Text>
    </View>
  );
}
