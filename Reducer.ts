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
    default:
      return state;
  }
};

export default Reducer;
