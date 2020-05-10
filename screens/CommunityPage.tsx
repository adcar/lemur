import React from "react";
import CommunityAppbar from "../components/CommunityAppbar";


import Posts from "../components/Posts"


export default function CommmunityPage({navigation, route}: any) {
    const {id} = route.params;
    const {name} = route.params;


    return (
        <>
            <CommunityAppbar navigation={navigation} name={name}/>
            <Posts
            navigation={navigation}
            type="Community"
            id={id}
            name = {name}/>
        </>)
}
