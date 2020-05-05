import React, {useContext, useEffect} from "react";
import {AsyncStorage} from "react-native";
import {View, Image} from "react-native";
import {Context} from "../components/Store";


export default function Start({navigation}:any) {
    const [state, dispatch] = useContext(Context);

    useEffect(() => {
        (async () => {
            try {
                const jwt = await AsyncStorage.getItem("jwt");
                if (jwt !== null) {
                    // We have data!!
                    onSuccess(jwt);
                }
                else{
                    navigation.replace("Login");
                }
            } catch (error) {
                // Don't bother the user about this
                console.error(error);
            }
        })();
    }, []);

    function onSuccess(jwt: string) {
        dispatch({ type: "SET_JWT", payload: jwt });
        navigation.replace("Main");
    }

    return (
        <View style={{display: 'flex', justifyContent: 'center'}}>
            <Image style={{width: 100, height: 100}} source={require('../images/logo.png')
            }/>
        </View>
    )
}
