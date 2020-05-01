import React, { useContext, useEffect, useRef, useState } from "react";
import { AsyncStorage } from "react-native";
import { View, Text } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { login } from "../api";
import Toast from "../components/Toast";
import { Context } from "../components/Store";

export default function Login({ navigation }: any) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setVisible] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [server, setServer] = useState("dev.lemmy.ml");
  const passwordRef = useRef(null);

  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    (async () => {
      try {
        const jwt = await AsyncStorage.getItem("jwt");
        if (jwt !== null) {
          // We have data!!
          onSuccess();
        }
      } catch (error) {
        // Don't bother the user about this
        console.error(error);
      }
    })();
  }, []);

  async function handleSubmit() {
    try {
      const res = await login(username, password, state.server);

      if (res.status !== 200) {
        showToast(await res.text());
      }

      const json = await res.json();
      const { jwt } = json;
      try {
        await AsyncStorage.setItem("jwt", jwt);
        onSuccess();
      } catch (e) {
        showToast("Error (Couldn't set token): " + e);
      }
    } catch (e) {
      showToast("Error (Fetch failed): " + e);
    }
  }
  function handleServerSubmit() {
    dispatch({ type: "SET_SERVER", payload: server });
  }

  function onSuccess() {
    navigation.replace("Main");
  }

  function showToast(message: string) {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 5000);

    setToastMsg("Error: " + message);
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Toast visible={isVisible}>
        <Text>{toastMsg}</Text>
      </Toast>

      <View style={{ display: "flex", flexDirection: "row", marginBottom: 50 }}>
        <TextInput
          style={{ display: "flex", flex: 8 }}
          value={server}
          onChangeText={(text) => {
            setServer(text);
          }}
          label="Server"
          onSubmitEditing={handleServerSubmit}
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

      <TextInput
        returnKeyType="next"
        label="Username"
        value={username}
        placeholderTextColor="#D50000"
        onChangeText={setUsername}
        onSubmitEditing={() => {
          if (passwordRef !== null) {
            // @ts-ignore
            passwordRef.current.focus();
          }
        }}
      />
      <TextInput
        ref={passwordRef}
        label="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        onSubmitEditing={handleSubmit}
      />
      <Button mode="contained" onPress={handleSubmit}>
        Sign in
      </Button>
    </View>
  );
}
