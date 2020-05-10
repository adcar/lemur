import React from "react";
import Posts from "../components/Posts"
import Appbar from "../components/PostsAppbar";



export default function Subscribed({navigation}: any) {
    return (
        <>
            <Appbar navigation={navigation}/>
            <Posts
            navigation={navigation}
            type="Subscribed"
            id= "5678"/>
        </>);
}
