import React, { useContext, useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import Appbar from "./PostsAppbar";
import Post from "./Post";
import { getPosts } from "../api";
import { Context } from "./Store";

export default function Posts(props:any) {
    const [state] = useContext(Context);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            const posts = await getPosts(
                state.jwt,
                props.type,
                page,
                state.sort.name,
                state.server,
                props.id
            );

            setPosts(posts);
        })();
    }, [state]);

    function onLoadMore() {
        console.log("Load more");
        console.log("Server: " + state.server);
        setLoading(true);
        getPosts(
            state.jwt,
            props.type,
            page,
            state.sort.name,
            state.server,
            props.id
        ).then((newPosts) => {
            // @ts-ignore
            setPosts(posts.concat(newPosts));
            setPage(page + 1);
            setLoading(false);
        });
    }
    return (
        <View
            style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
            }}
        >
            <Appbar navigation={props.navigation} />
            <FlatList
                contentContainerStyle={{}}
                data={posts}
                extraData={loading}
                renderItem={({ item }: any) => {
                    return <Post {...item} navigation={props.navigation} />;
                }}
                refreshing={true}
                onEndReachedThreshold={0.99}
                onEndReached={onLoadMore}
                keyExtractor={(item) => {
                    //@ts-ignore
                    return item.id.toString();
                }}
            />
        </View>
    );
}
