import React, {useContext, useEffect, useState} from "react";
import {View, Text} from "react-native";
import {Appbar, List, Searchbar} from "react-native-paper";
import {followedCommunities} from "../api";
import {Context} from "../components/Store";
import Constants from "expo-constants";


export default function MyCommunities({navigation}: any) {
    const [state] = useContext(Context);
    let [communities, setCommunities] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);

    useEffect(() => {
        (async () => {
            const communities = await followedCommunities(
                state.jwt,
                state.server
            );

            setCommunities(communities);
            setResults(communities);
        })();
    }, [state]);


    function search(text: string) {
        let newlist = [];
        const regex = new RegExp(text, "i");
        communities.map((community, index) => {
            if (regex.test(community.community_name)) {
                console.log('in');
                newlist.push(community);
            }
        });
        setResults(newlist);
    }


    return (
        <View style={{flex: 1}}>
            <Appbar
                style={{
                    marginTop: Constants.statusBarHeight,
                }}
            >
                <Searchbar
                    placeholder="Search"
                    value={searchTerm}
                    onChangeText={(text) => {
                        setSearchTerm(text);
                        search(text);

                    }}/>

            </Appbar>
            <List.Section>
                {results.map((community, index) => (
                    <List.Item
                        style={{backgroundColor: '#272727', marginTop: 7}}
                        title={community.community_name}
                        key={index}
                    />
                ))}
            </List.Section>
        </View>
    );
}
