import * as React from "react";
import Reducer from "../Reducer";
import { createContext, useReducer, useState } from "react";
import { AsyncStorage } from "react-native";

const initialState: any = {
  sort: {
    fullname: "Hot",
    name: "Hot",
  },
  server: "dev.lemmy.ml",
  jwt: "",
  toast: null
};

const myArray: any = [initialState, () => {}];

export const Context = createContext(myArray);

export default function Store({ children }: any) {
  const [server, setServer] = useState(initialState.server);
  const [sort, setSort] = useState(initialState.sort);
  (async () => {
    setServer(await AsyncStorage.getItem("@Prefs:server"));
    setSort(JSON.parse((await AsyncStorage.getItem("@Prefs:sort")) as string));
  })();

  const defaultState = {
    ...initialState,
    sort,
    server,
  };
  const [state, dispatch] = useReducer(Reducer, defaultState);

  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
}
