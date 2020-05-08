import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import {Context} from "../components/Store";
import {getCommunity, communityPosts} from "../api";
import Posts from "../components/Posts"



export default function CommmunityPage({navigation, route}:any){
    const {id} = route.params;
    const {name} = route.params;
    const [state] = useContext(Context);
    let [communityInfo, setCommunityInfo] = useState([]);

    useEffect(() => {
        (async () => {
            communityInfo = await getCommunity(
                state.jwt,
                state.server,
                id,
                name
            );
            setCommunityInfo(communityInfo);
        })();



    }, [state]);
    return(<Posts
    navigation={navigation}
    type="Community"
    id={id}/>)
}
