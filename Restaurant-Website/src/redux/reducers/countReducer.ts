interface IState {
  count: number;
}
const initState: IState = {
  count: 0,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const reducerCounter = (state: IState = initState, action: any) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        count: state.count + action.payload,
      };
    case "DECREMENT":
      return {
        ...state,
        count: state.count - action.payload,
      };
    default:
      return state;
  }
};
