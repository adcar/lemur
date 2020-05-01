import * as React from "react";
import Reducer from "../Reducer";
import { createContext, useReducer } from "react";

const initialState: any = {
  sort: {
    fullname: "Hot",
    name: "Hot",
    server: "dev.lemmy.ml",
  },
};

const myArray: any = [initialState, () => {}];

export const Context = createContext(myArray);

export default function Store({ children }: any) {
  const [state, dispatch] = useReducer(Reducer, initialState);

  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
}
