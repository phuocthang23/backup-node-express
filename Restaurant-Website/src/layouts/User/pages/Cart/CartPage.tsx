/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { DeleteCartByUser, getAllCartByUser } from "../../../../api";
import { FaRegTrashCan } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";

const CartPage: React.FC = () => {
  const [cartItem, setCartItem] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [formData, setFormData] = useState({
    phone: "",
    address: "",
    ship: 13000,
    district: "Hải Châu", // Mặc định chọn Hải Châu
  });

  useEffect(() => {
    const data = async () => {
      const response = await getAllCartByUser();
      console.log(response);
      setCartItem(response);
    };
    data();
  }, [loading]);

  console.log(cartItem?.data);

  //* --------------------------------------(delete) --------------------------------------

  const handldeDelete = async (id: any) => {
    const response = await DeleteCartByUser(id);
    if ((response as any).status === 200) {
      toast.success("đã xoá sản phẩm thành công");
    } else {
      toast.error("xoá thất bại");
    }
    setLoading(!loading);
  };

  //* ---------------------------------(tính tổng)----------------------------
  const calculateTotal = (cartItems) => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.product.price * item.size.priceSize * item.quantity;
    });
    return total;
  };

  useEffect(() => {
    if (cartItem) {
      const cartItems = cartItem.data;
      const total = calculateTotal(cartItems);
      setTotal(total);
    }
  }, [cartItem]);

  //* ------------------------------(shipments) ------------------------------
  let ship = 0;
  if (total >= 100000) {
    ship = 10000;
  } else {
    ship = 0;
  }

  const totalAmount = cartItem?.data.reduce(
    (total, item) =>
      total + item.product?.price * item.size?.priceSize * item.quantity,
    0
  );

  const totalWithShipping = totalAmount + formData.ship;

  // *----------------------------(onchance)-----------------------------------------
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    if (e.target.name === "district") {
      // Lấy giá trị name và value của option được chọn
      const selectedOption = e.target.options[e.target.selectedIndex].text;
      const ship = Number(e.target.value);

      setFormData({
        ...formData,
        district: selectedOption,
        ship: ship,
        [name]: value,
        // districtName: selectedName, // Lưu giá trị name của option
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  //* ---------------------------(check out )----------------------------
  const handleCheckOut = async () => {
    // const dataCheckOut = CartProduct.map((item: any) => ({
    //   id: user.id,
    //   nameProduct: item.name,
    //   quantity: item.quantity,
    //   images: item.images,
    //   category: item.category,
    //   idProduct: item.id,
    //   size: item.size,
    //   price: item.price,
    //   ship: ship,
    //   phone: formData.phone,
    //   address: formData.address,
    //   district: formData.district,
    //   status: true,
    // }));
    // const putData = await apiPutOrder(dataCheckOut);
    // console.log(putData);
    // setUser({ ...user, cart: [] });
    // const updateUser = await putOneUser(user);
    // setUser(updateUser);
    // user.cart.forEach(async (item: any) => {
    //   const productId = item.id;
    //   const updatedProduct = {
    //     ...item,
    //     purchased: item.purchased + item.quantity,
    //     stock: item.stock - 1,
    //   };
    //   const container = await apiPostOrderProducts(productId, updatedProduct);
    //   console.log(container);
    // });
  };

  return (
    <section className="py-24 bg-gray-100 font-poppins dark:bg-gray-700">
      <div className="px-4 py-6 mx-auto w-full lg:py-4 md:px-6">
        <div>
          <h2 className="mb-8 text-4xl font-bold dark:text-gray-400">
            Your Cart
          </h2>
          <div className="p-6 mb-8 border bg-gray-50 dark:bg-gray-800 dark:border-gray-800">
            <div className="flex-wrap items-center hidden mb-6 -mx-4 md:flex md:mb-8">
              <div className="w-full px-4 mb-6 md:w-4/6 lg:w-4/12 md:mb-0">
                <h2 className="font-bold text-gray-500 dark:text-gray-400">
                  Product name
                </h2>
              </div>
              <div className="hidden px-4 lg:block lg:w-2/12">
                <h2 className="font-bold text-gray-500 dark:text-gray-400">
                  Price
                </h2>
              </div>
              <div className="w-auto px-4 md:w-1/6 lg:w-2/12 ">
                <h2 className="font-bold text-gray-500 dark:text-gray-400">
                  Quantity
                </h2>
              </div>
              <div className="w-auto px-4 text-right md:w-1/6 lg:w-2/12 ">
                <h2 className="font-bold text-gray-500 dark:text-gray-400">
                  Subtotal
                </h2>
              </div>
              <div className="w-auto px-4 text-right md:w-1/6 lg:w-2/12 ">
                <h2 className="font-bold text-gray-500 dark:text-gray-400">
                  Remove
                </h2>
              </div>
            </div>
            <div className="py-4 mb-8 border-t border-b border-gray-200 dark:border-gray-700">
              {cartItem?.data.map((item: any, index: number) => (
                <div
                  key={index}
                  className="flex flex-wrap items-center mb-6 -mx-4 md:mb-8"
                >
                  <div className="w-full px-4 mb-6 md:w-4/6 lg:w-4/12 md:mb-0">
                    <div className="flex flex-wrap items-center -mx-4">
                      <div className="w-full px-4 mb-3 md:w-1/3">
                        <div className="  md:h-24 md:w-24">
                          <img
                            src={item.product?.imageProducts[0]?.src}
                            alt=""
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </div>
                      <div className="w-2/6 px-4">
                        <h2 className="mb-2 text-xl font-bold dark:text-gray-400">
                          {item.product?.nameProduct}
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 ">
                          Size:{""} {item.size.size}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="hidden px-4 lg:block lg:w-2/12">
                    <p className="text-lg font-bold text-blue-500 dark:text-gray-400">
                      {/* {item?.price !== undefined && item?.item.toLocaleString()} */}
                      {item.product?.price.toLocaleString()} VND
                    </p>
                    <span className="text-xs text-gray-500 line-through dark:text-gray-400">
                      {/* $1500 */}
                    </span>
                  </div>
                  <div className="w-auto px-4 md:w-1/6 lg:w-2/12 ">
                    <div className="inline-flex items-center px-4 font-semibold text-gray-500 border border-gray-200 rounded-md dark:border-gray-700 ">
                      <input
                        type="number"
                        className="w-12 px-2 py-4 text-center border-0 rounded-md dark:bg-gray-800 bg-gray-50 dark:text-gray-400 md:text-right"
                        value={item.quantity}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="w-auto px-4 text-right md:w-1/6 lg:w-2/12 ">
                    <p className="text-lg font-bold text-blue-500 dark:text-gray-400">
                      {(
                        item.product?.price *
                        item.size?.priceSize *
                        item.quantity
                      ).toLocaleString()}{" "}
                      VND
                    </p>
                  </div>
                  <div className="w-auto px-4  md:w-1/6 lg:w-2/12 ">
                    <p className="text-lg font-bold text-blue-500 dark:text-gray-400 cursor-pointer hover:text-red-500 ">
                      <FaRegTrashCan
                        className="float-right"
                        onClick={() => handldeDelete(item.id)}
                      />
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap justify-between">
            <div className="w-full px-4 mb-4 lg:w-1/2 ">
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-gray-700 dark:text-gray-400">
                  Apply Coupon
                </span>
                <input
                  type="text"
                  className="w-full px-8 py-4 font-normal placeholder-gray-400 border lg:flex-1 dark:border-gray-700 dark:placeholder-gray-500 dark:text-gray-400 dark:bg-gray-800"
                  placeholder="x304k45"
                />
                <button className="inline-block w-full px-8 py-4 font-bold text-center text-gray-100 bg-blue-500 rounded-md lg:w-32 hover:bg-blue-600">
                  Apply
                </button>
              </div>
              <div className="max-w-[500px] mx-auto p-6 bg-slate-400">
                <div className="mb-4 flex  items-center gap-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="phone"
                  >
                    Phone
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4  flex  items-center gap-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="address"
                  >
                    Address
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="address"
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4 flex  items-center gap-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="district"
                  >
                    Quận/Huyện
                  </label>
                  <select
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="district"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                  >
                    <option value={13000}>Hải Châu</option>
                    <option value={16000}>Thanh Khê</option>
                    <option value={20000}>Ngũ Hành Sơn</option>
                    <option value={15000}>Cẩm Lệ</option>
                    <option value={22000}>Liên Chiểu</option>
                    <option value={30000}>Hòa Vang</option>
                  </select>
                </div>
                <div className="flex items-center justify-between"></div>
              </div>
            </div>
            <div className="w-full px-4 mb-4 lg:w-1/2 ">
              <div className="p-6 border border-blue-100 dark:bg-gray-900 dark:border-gray-900 bg-gray-50 md:p-8">
                <h2 className="mb-8 text-3xl font-bold text-gray-700 dark:text-gray-400">
                  Order Summary
                </h2>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-300 dark:border-gray-700 ">
                  <span className="text-gray-700 dark:text-gray-400">
                    Subtotal
                  </span>
                  <span className="text-xl font-bold text-gray-700 dark:text-gray-400 ">
                    {total.toLocaleString()} VND
                  </span>
                </div>
                <div className="flex items-center justify-between pb-4 mb-4 ">
                  <span className="text-gray-700 dark:text-gray-400 ">
                    Shipping
                  </span>
                  <span className="text-xl font-bold text-gray-700 dark:text-gray-400 ">
                    {(formData.ship - ship).toLocaleString()} VND
                  </span>
                </div>
                <div className="flex items-center justify-between pb-4 mb-4 ">
                  <span className="text-gray-700 dark:text-gray-400">
                    Order Total
                  </span>
                  <span className="text-xl font-bold text-gray-700 dark:text-gray-400">
                    {totalWithShipping.toLocaleString()} VND
                  </span>
                </div>
                <h2 className="text-lg text-gray-500 dark:text-gray-400">
                  We offer:
                </h2>

                <div className="flex items-center justify-between ">
                  <button
                    className="block w-full py-4 font-bold text-center text-gray-100 uppercase bg-blue-500 rounded-md hover:bg-blue-600"
                    onClick={handleCheckOut}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default CartPage;
