export const incrementCounter = (payload: number) => {
  return {
    type: "INCREMENT",
    payload: payload,
  };
};

export const decrementCounter = (payload: number) => {
  return {
    type: "DECREMENT",
    payload: payload,
  };
};
