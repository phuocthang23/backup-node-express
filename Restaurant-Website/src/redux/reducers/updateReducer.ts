interface IState {
  update: boolean;
}
const initState: IState = {
  update: true,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateReducer = (state: IState = initState, action: any) => {
  switch (action.type) {
    case "UPDATE":
      return {
        ...state,
        update: !state.update,
      };
    default:
      return state;
  }
};
