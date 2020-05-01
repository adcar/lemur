import { View } from "react-native";
import {
  List,
  TextInput,
  Switch,
  Portal,
  Modal,
  Button,
  withTheme,
} from "react-native-paper";
import PrefsAppbar from "../components/PrefsAppbar";
import * as React from "react";
import { useContext } from "react";
import { Context } from "../components/Store";

const sorts = [
  { fullname: "Hot", name: "Hot" },
  { fullname: "New", name: "New" },
  { fullname: "Top today", name: "TopDay" },
  { fullname: "Top this week", name: "TopWeek" },
  { fullname: "Top this month", name: "TopMonth" },
  { fullname: "Top this year", name: "TopYear" },
  { fullname: "Top all time", name: "TopAll" },
];

interface ISort {
  fullname: string;
  name: string;
}

function Preferences({ navigation, theme }: any) {
  const [server, setServer] = React.useState("dev.lemmy.ml");
  const [changeServerModal, setChangeServerModal] = React.useState(false);
  const [NSFW, changeNSFW] = React.useState(false);
  const [sortModal, changeSortModal] = React.useState(false);
  const [state, dispatch] = useContext(Context);

  function handleSortChange(sort: ISort) {
    console.log("Sort change: " + sort);
    dispatch({ type: "SET_SORT", payload: sort });
    changeSortModal(false);
  }

  function handleServerChange() {
    console.log("Server change: " + server);
    dispatch({ type: "SET_SERVER", payload: server });
    setChangeServerModal(false);
  }
  const { colors } = theme;
  return (
    <>
      <PrefsAppbar navigation={navigation} />
      <View>
        <List.Section>
          <List.Item
            title="Server"
            description={server}
            onPress={() => {
              setChangeServerModal(true);
            }}
          />
          <List.Item
            title="Default Sort"
            description={state.sort.fullname}
            onPress={() => {
              changeSortModal(true);
            }}
          />
          <List.Item
            title="Show NSFW content"
            right={() => (
              <Switch
                value={NSFW}
                onValueChange={() => {
                  changeNSFW(!NSFW);
                }}
              />
            )}
          />
        </List.Section>
        <Portal>
          <Modal
            visible={changeServerModal}
            onDismiss={() => {
              setChangeServerModal(false);
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: 50,
              }}
            >
              <TextInput
                style={{ display: "flex", flex: 8 }}
                value={server}
                onChangeText={(text) => {
                  setServer(text);
                }}
                onSubmitEditing={handleServerChange}
                onBlur={handleServerChange}
                label="Server"
              />
              <Button
                style={{ display: "flex", flex: 1, justifyContent: "center" }}
                mode="contained"
                onPress={() => {
                  setServer("dev.lemmy.ml");
                }}
              >
                Reset
              </Button>
            </View>
          </Modal>
          <Modal
            visible={sortModal}
            onDismiss={() => {
              changeSortModal(false);
            }}
          >
            <List.Section>
              {sorts.map((sort, index) => (
                <List.Item
                  style={{
                    backgroundColor: colors.surface,
                  }}
                  key={index}
                  title={sort.fullname}
                  onPress={() => {
                    handleSortChange(sort);
                  }}
                />
              ))}
            </List.Section>
          </Modal>
        </Portal>
      </View>
    </>
  );
}

export default withTheme(Preferences);
