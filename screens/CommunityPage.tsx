import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import {Context} from "../components/Store";
import {getCommunity} from "../api";


export default function CommmunityPage({navigation, route}:any){
    const {id} = route.params;
    const {name} = route.params;
    const [state] = useContext(Context);
    let [post, setPost] = useState([]);

    useEffect(() => {
        (async () => {
            const post = await getCommunity(
                state.jwt,
                state.server,
                id,
                name
            );
            setPost(post);
            console.log(post);
        })();
    }, [state]);
    return(<View><Text>hello</Text></View>)
}
