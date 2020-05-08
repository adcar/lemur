import React, {useContext, useEffect, useState} from "react";
import {View, Text} from "react-native";
import {Appbar, List, Searchbar} from "react-native-paper";
import {followedCommunities} from "../api";
import {Context} from "../components/Store";
import Constants from "expo-constants";


export default function SearchCommunities({navigation}: any) {
    const [state] = useContext(Context);
    let [communities, setCommunities]: [any, any] = useState([]);
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
        let newlist: any = [];
        const regex = new RegExp(text, "i");
        communities.map((community: any, index: number) => {
            if (regex.test(community.community_name)) {
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
                {results.map((community: any, index) => (
                    <List.Item
                        style={{backgroundColor: '#272727', marginTop: 7}}
                        title={community.community_name}
                        key={index}
                        onPress={()=>{navigation.navigate("CommunityPage",{id: community.community_id, name: community.community_name})}}
                    />
                ))}
            </List.Section>
        </View>
    );
}
