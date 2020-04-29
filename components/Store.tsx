import * as React from "react";
import Reducer from "../Reducer";
import { createContext, useReducer } from "react";

const initialState = {
  sort: {
    fullname: "Hot",
    name: "Hot",
  },
};
export const Context = createContext(initialState);

export default function Store({ children }: any) {
  const [state, dispatch] = useReducer(Reducer, initialState);
  // @ts-ignore
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
}
