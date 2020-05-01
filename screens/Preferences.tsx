import {View} from "react-native";
import {Text, List, TextInput, Menu, Portal, Modal, Button, ToggleButton} from "react-native-paper";
import PrefsAppbar from "../components/PrefsAppbar";
import * as React from "react";
import { useContext } from "react";
import { Context } from "../components/Store";


const sorts = [
    {fullname: "Hot", name: "Hot"},
    {fullname: "New", name: "New"},
    {fullname: "Top today", name: "TopDay"},
    {fullname: "Top this week", name: "TopWeek"},
    {fullname: "Top this month", name: "TopMonth"},
    {fullname: "Top this year", name: "TopYear"},
    {fullname: "Top all time", name: "TopAll"},
];
interface ISort {
    fullname: string;
    name: string;
}


export default function Preferences({navigation}: any) {
    const [server, setServer] = React.useState("dev.lemmy.ml");
    const [changeServerModal, setChangeServerModal] = React.useState(false);
    const [NSFW, changeNSFW]=React.useState(false);
    const [sortModal, changeSortModal] = React.useState(false);
    const [state, dispatch] = useContext(Context);
    function handleSortChange(sort: ISort) {
        console.log("Sort change: " + sort);
        dispatch({ type: "SET_SORT", payload: sort });
        changeSortModal(false);
    }
    return (
        <>
            <PrefsAppbar navigation={navigation}/>
            <View>
                <List.Section>
                    < List.Item title="Change server"
                                description={server}
                                onPress={() => {
                                    setChangeServerModal(true)
                                }}/>
                    <List.Item title="Change Sort"
                               description={state.sort.fullname}
                               onPress={() => {
                                   changeSortModal(true)
                               }}>
                    </List.Item>
                    <List.Item title="Show NSFW content"
                    right={()=>(<ToggleButton
                    icon="bluetooth"
                    value="bluetooth"
                    />)}>

                    </List.Item>
                </List.Section>
                <Portal>
                    <Modal visible={changeServerModal}
                           onDismiss={() => {
                               setChangeServerModal(false)
                           }}>
                        <View style={{display: 'flex', flexDirection: 'row', marginBottom: 50}}>
                            <TextInput
                                style={{display: 'flex', flex: 8}}
                                value={server}
                                onChangeText={(text) => {
                                    setServer(text)
                                }}
                                label="Server"/>
                            <Button style={{display: 'flex', flex: 1, justifyContent: 'center'}} mode="contained"
                                    onPress={() => {
                                        setServer("dev.lemmy.ml")
                                    }}>Reset</Button>
                        </View></Modal>
                    <Modal visible={sortModal}
                           onDismiss={() => {
                               changeSortModal(false)
                           }}>
                        <List.Section>
                            {sorts.map((sort) => (
                                <List.Item
                                    title={sort.fullname}
                                    onPress={()=>{handleSortChange(sort)}}
                                />
                            ))}
                        </List.Section>
                    </Modal>
                </Portal>
            </View>
        </>
    );
}
