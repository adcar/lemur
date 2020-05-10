import React, {useContext, useState} from 'react';
import { Appbar, Menu} from "react-native-paper";
import Constants from "expo-constants";
import {Context} from "./Store";

export default function CommunityAppbar(props:any){
    const [sortMenuVisible, setSortMenuVisible] = useState(false);
    const [dotsMenuVisible, setDotsMenuVisible] = useState(false);
    
    const [state, dispatch] = useContext(Context);
    const sorts = [
        { fullname: "Hot", name: "Hot" },
        { fullname: "New", name: "New" },
        { fullname: "Top today", name: "TopDay" },
        { fullname: "Top this week", name: "TopWeek" },
        { fullname: "Top this month", name: "TopMonth" },
        { fullname: "Top this year", name: "TopYear" },
        { fullname: "Top all time", name: "TopAll" },
    ];

    function handleSortChange(sort: any) {
        console.log("Sort change: " + sort);
        dispatch({ type: "SET_SORT", payload: sort });
        setSortMenuVisible(false);
    }
    return(
        <Appbar
            style={{
                marginTop: Constants.statusBarHeight,
            }}
        >
            <Appbar.Action icon="arrow-left" onPress={()=>{props.navigation.goBack()}}/>
            <Appbar.Content title={props.name} />
            <Menu
                onDismiss={() => setSortMenuVisible(false)}
                visible={sortMenuVisible}
                anchor={
                    <Appbar.Action
                        disabled={false}
                        color="white"
                        icon="sort-variant"
                        onPress={() => setSortMenuVisible(true)}
                    />
                }
            >
                {sorts.map((sort, index) => (
                    <Menu.Item
                        key={index}
                        title={sort.fullname}
                        onPress={() => handleSortChange(sort)}
                    />
                ))}
            </Menu>
            <Menu
            onDismiss={() => setDotsMenuVisible(false)}
            visible={dotsMenuVisible}
            anchor={
                <Appbar.Action
                    disabled={false}
                    color="white"
                    icon="dots-vertical"
                    onPress={() => setDotsMenuVisible(true)}
                />
            }
        >
            <Menu.Item
                title="Preferences"
                onPress={() => {
                    props.navigation.navigate("Preferences");
                    setDotsMenuVisible(false);
                }}
            />
        </Menu>

        </Appbar>
    )
}
