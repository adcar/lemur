interface IAction {
  type: string;
  payload: any;
}

const Reducer = (state: any, action: IAction) => {
  switch (action.type) {
    case "SET_SORT":
      return {
        ...state,
        sort: action.payload,
      };
    case "SET_SERVER":
      return {
        ...state,
        server: action.payload,
      };
    case "SET_JWT":
      return {
        ...state,
        jwt: action.payload,
      };
    case "SET_TOAST_REF":
      return {
        ...state,
        toast: action.payload
      };
    default:
      return state;
  }
};

export default Reducer;
