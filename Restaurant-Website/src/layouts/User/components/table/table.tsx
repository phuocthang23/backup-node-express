// import { Button } from "@material-tailwind/react";
import { useState } from "react";

const Table = () => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };
  console.log(quantity);

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };
  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className=" text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Product name
          </th>
          <th scope="col">Quantity</th>
          <th scope="col" className="px-6 py-3">
            Price
          </th>
          <th scope="col" className="px-6 py-3">
            Total
          </th>
          <th scope="col" className="px-2 py-3">
            Remove
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            Apple MacBook Pro 17"
          </th>
          <td>
            <div className=" w-[58%] border border-gray-600 rounded bg-gray-200">
              <button
                type="button"
                className="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75"
                onClick={handleDecrement}
              >
                −
              </button>
              <input
                type="number"
                id="Quantity"
                value={quantity}
                className="h-10 w-16 border-transparent text-center   [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
              />
              <button
                type="button"
                className="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75"
                onClick={handleIncrement}
              >
                +
              </button>
            </div>
          </td>
          <td className="px-6 py-4">Laptop</td>
          <td className="px-6 py-4">$2999</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
