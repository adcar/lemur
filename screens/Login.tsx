import React, { useEffect, useRef, useState } from "react";
import { View, AsyncStorage } from "react-native";
import Toast from "react-native-easy-toast";
import { Button, TextInput } from "react-native-paper";
import { login } from "../api";

export default function Login({ navigation }: any) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const toast = useRef(null);
  const passwordRef = useRef(null);

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
      const res = await login(username, password);

      if (res.status !== 200) {
        showToast(await res.text());
      }

      const json = await res.json();
      const { jwt } = json;
      try {
        await AsyncStorage.setItem("jwt", jwt);
        onSuccess();
      } catch (e) {
        showToast("Error: " + e);
      }
    } catch (e) {
      showToast("Error" + e);
    }
  }
  function onSuccess() {
    navigation.navigate("Main");
  }

  function showToast(message: string) {
    if (toast !== null) {
      // @ts-ignore
      toast.current.show(message);
    }
  }
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Toast ref={toast} />
      <TextInput
        returnKeyType="next"
        label={"Username"}
        value={username}
        onChangeText={setUsername}
        onSubmitEditing={() => {
          if (passwordRef !== null) {
            passwordRef.current.focus();
          }
        }}
      />
      <TextInput
        ref={passwordRef}
        label={"Password"}
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
1;
