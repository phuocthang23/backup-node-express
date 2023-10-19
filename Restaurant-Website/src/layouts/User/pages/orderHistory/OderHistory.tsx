/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
const OderHistory = () => {
  const loginData: any = localStorage.getItem("Auth");
  const getData = JSON.parse(loginData) || "";

  const [user, setUser] = useState<any>(getData.userID);

  // useEffect(() => {}, []);

  console.log(user);
  return (
    <div className="max-w-5xl mx-auto bg-white p-8 shadow-lg rounded-lg border my-8">
      <h1 className="text-3xl font-semibold mb-6 text-center">Order History</h1>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Order #12345</h2>
          <div className="bg-blue-500 text-white px-4 py-2 rounded">
            Processing
          </div>
        </div>
        <div className="flex items-center">
          <FaRegTrashAlt className="text-red-500 cursor-pointer" />
        </div>
      </div>
      <div className="flex mb-8 border-b pb-8">
        <img
          className="w-24 h-24 object-cover mr-8"
          src="product1.jpg"
          alt="Product 1"
        />
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2">Product 1</h3>
          <div className="flex justify-between mb-2">
            <div className="flex items-center">
              <div className="text-gray-600 mr-2">Original Price: $20.00</div>
              <div className="text-gray-600">Quantity: 2</div>
            </div>
            <div className="text-gray-600">
              <div>Additional Cost: $5.00</div>
              <div>Total: $25.00</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex mb-8 border-b pb-8">
        <img
          className="w-24 h-24 object-cover mr-8"
          src="product2.jpg"
          alt="Product 2"
        />
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2">Product 2</h3>
          <div className="flex justify-between mb-2">
            <div className="flex items-center">
              <div className="text-gray-600 mr-2">Original Price: $15.00</div>
              <div className="text-gray-600">Quantity: 1</div>
            </div>
            <div className="text-gray-600">
              <div>Additional Cost: $3.00</div>
              <div>Total: $18.00</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between mb-8">
        <div className="flex-1 pr-4">
          <h3 className="text-xl font-semibold mb-2">Shipping Information</h3>
          <p className="text-gray-600 mb-2">Phone: 123-456-7890</p>
          <p className="text-gray-600">
            Address: 123 Main Street, City, Country
          </p>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2">Payment Information</h3>
          <p className="text-gray-600 mb-2">Payment Method: Credit Card</p>
          <p className="text-gray-600">Card Ending In: **** **** **** 1234</p>
        </div>
      </div>
      <div className="flex justify-between">
        <div>
          <div className="text-2xl font-semibold mb-2">Shipping Fee: $5.00</div>
          <div className="text-4xl text-blue-500">Total: $35.00</div>
        </div>
        <button className="bg-red-500 text-white px-6 py-3 rounded">
          Cancel Order
        </button>
      </div>
    </div>
  );
};

export default OderHistory;
