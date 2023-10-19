import axios from "axios";
import { IProduct } from "../type";

interface IState {
  listProduct: IProduct[];
}

const initState: IState = {
  listProduct: [],
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const productReducer = (state: IState = initState, action: any) => {
  const handleDeleteApi = async (id: number) => {
    await axios.delete(`http://localhost:8080/products/${id}`);
  };
  switch (action.type) {
    case "GET_PRODUCT":
      return {
        ...state,
        listProduct: action.payload,
      };
    case "ADD_PRODUCT":
      return state;
    case "EDIT_PRODUCT":
      return state;
    case "DELETE_PRODUCT":
      // return {
      //   ...state,
      //   listProduct: state.listProduct.filter(
      //     (product) => product.id !== action.payload
      //   ),
      // };

      handleDeleteApi(action.payload);
      return {
        ...state,
        listProduct: state.listProduct.filter(
          (product) => product.id !== action.payload
        ),
      };
    default:
      return state;
  }
};
