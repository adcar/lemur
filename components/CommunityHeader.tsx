import {Button, Text} from "react-native-paper";
import React, {useContext, useEffect, useState} from "react";
import {Context} from "./Store";
import {getCommunity, subscribeToCommunity} from "../api";

interface IProps {
    name: string
    id: number
}


export default function CommunityHeader(props: IProps) {
    let [communityInfo, setCommunityInfo] = useState([]);
    const [title, setTitle] = useState("");
    const [subscribed, setSubscribed] = useState(false);
    const [subscribers, setSubscribers] = useState("");
    const [state] = useContext(Context);


    useEffect(() => {
        (async () => {
            communityInfo = await getCommunity(
                state.jwt,
                state.server,
                props.id,
                props.name
            );
            setCommunityInfo(communityInfo);
            console.log(communityInfo);
            setTitle(communityInfo.community.title);
            setSubscribed(communityInfo.community.subscribed);
            setSubscribers(communityInfo.community.number_of_subscribers);
        })();

    }, [state]);

    return (
        <>
            <Text>
                {title}
                {subscribers}
            </Text>

            <Button mode="contained" onPress={() => {
                setSubscribed(!subscribed);
                subscribeToCommunity(state.jwt, state.server, props.id, subscribed)
            }}>
                {subscribed ? "Unsubscribe" : "Subscribe"}
            </Button>

        </>
    )
}
