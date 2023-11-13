/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  DeleteCartByUser,
  createOrder,
  getAllCartByUser,
  getLocation,
  getWand,
} from "../../../../api";
import { FaRegTrashCan } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import Distance from "../../components/caculator/caculator";
import PaypalButton from "../../components/buttonPaypal/buttonPaypal";
import { useNavigate } from "react-router-dom";
import Loading from "../../../Admin/components/loading";
import { useDispatch } from "react-redux";

const CartPage: React.FC = () => {
  const [cartItem, setCartItem] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [localtion, setLocation] = useState<any>([]);
  const [valueDistrict, setVauleDistrict] = useState<any>(0);
  const [valueWand, setValueWand] = useState<any>(0);
  const [districtName, setDistrictName] = useState<any>();
  // const [wandName, setWandName] = useState<any>();
  const [data, setData] = useState<any>();
  const [ship, setShip] = useState<number>(0);
  const dispatch = useDispatch();
  const [wand, setWand] = useState<any>([]);
  const [wandName, setWandName] = useState<any>([]);
  const [spinner, setSpinner] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    phone: "",
    address: "", // Mặc định chọn Hải Châu
  });
  const [paymentMethod, setPaymentMethod] = useState<number>(1);
  const navigate = useNavigate();
  //* --------------------------------------(add to cart)--------------------------------------

  useEffect(() => {
    const data = async () => {
      setSpinner(true);
      const response = await getAllCartByUser();
      const locationData = await getLocation();
      setCartItem(response);
      setLocation(locationData);
      setSpinner(false);
    };
    data();
  }, [loading]);

  //* --------------------------------------(delete) --------------------------------------

  const handldeDelete = async (id: any) => {
    const response = await DeleteCartByUser(id);
    if ((response as any).status === 200) {
      dispatch({
        type: "UPDATE",
      });
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
  let shipment = 0;
  if (total >= 200000) {
    if (ship <= 0) {
      shipment = 0;
    }
    shipment = ship - 5000;
  } else {
    shipment = ship;
  }

  const totalAmount = cartItem?.data.reduce(
    (total, item) =>
      total + item.product?.price * item.size?.priceSize * item.quantity,
    0
  );

  const totalWithShipping = totalAmount + shipment;

  // *----------------------------(onchance)-----------------------------------------
  const handleChange = (e: any) => {
    const { value, name } = e.target;

    if (e.target.name === "district") {
      // Lấy giá trị name và value của option được chọn

      setFormData({
        ...formData,
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
    setSpinner(true);
    // * radomCode
    const randomCode = Math.floor(Math.random() * 100000);
    const dataCheckOut = {
      subTotal: totalAmount,
      total: totalWithShipping,
      ship: ship,
      phone: formData.phone,
      street: formData.address,
      districtName: districtName,
      wardName: wandName,
      code: randomCode,
      payment: paymentMethod,
    };

    console.log(dataCheckOut);

    if (
      !dataCheckOut.phone ||
      !dataCheckOut.street ||
      !dataCheckOut.districtName ||
      !dataCheckOut.wardName
    ) {
      toast.error("Xin vui lòng điền đầy đủ thông tin");
      setSpinner(false);
      return; // Ngăn chặn việc tiếp tục khi thông tin không đầy đủ
    }

    const checkOut = await createOrder(dataCheckOut);
    setSpinner(true);
    if ((checkOut as any).status === 201) {
      setSpinner(false);
      dispatch({
        type: "UPDATE",
      });
      toast.success("đã thanh toán phẩm thành công");
      navigate("/history");
    } else {
      setSpinner(false);
      toast.error("thanh toán thất bại");
    }

    setLoading(!loading);
  };
  // * ------------------------------(seclect distric)-----------------------------
  const handleDistrict = async (e: any) => {
    setSpinner(true);
    const localSeclect = e.target.options[e.target.selectedIndex].text;
    setDistrictName(localSeclect);
    setVauleDistrict(e.target.value);
    const wandi = await getWand(e.target.value);
    setWand(wandi);
    setSpinner(false);
  };

  //* --------------------------------(seclect wand) ------------------------------
  const handleWand = async (e: any) => {
    setSpinner(true);
    const wandName = e.target.options[e.target.selectedIndex].text;
    setWandName(wandName);
    setValueWand(e.target.value);
    const data = {
      province: "Thành Phố Đà Nẵng ",
      district: districtName,
      ward: wandName,
    };
    await setData(data);
    setSpinner(false);
  };
  //*--------------------------------------(caculator location)----------------
  const distance = (km) => {
    const ship = +km * 5000;
    setShip(ship);
  };

  //* -------------------------------------(select method) --------------------------------
  const handlePaymentMethodChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPaymentMethod(Number(e.target.value));
  };

  //*-------------------------------(thanh toán payapl)--------------------------
  const handlePaymentSuccess = async () => {
    const randomCode = Math.floor(Math.random() * 100000);
    const dataCheckOut = {
      subTotal: totalAmount,
      total: totalWithShipping,
      ship: ship,
      phone: formData.phone,
      street: formData.address,
      districtName: districtName,
      wardName: wandName,
      code: randomCode,
      method: paymentMethod,
    };
    return dataCheckOut;
  };

  useEffect(() => {
    const randomCode = Math.floor(Math.random() * 100000);
    const dataCheckOut = {
      subTotal: totalAmount,
      total: totalWithShipping,
      ship: ship,
      phone: formData.phone,
      street: formData.address,
      districtName: districtName,
      wardName: wandName,
      code: randomCode,
      method: paymentMethod,
    };

    localStorage.setItem("paypalData", JSON.stringify(dataCheckOut));
  }, [
    districtName,
    wandName,
    formData,
    totalAmount,
    totalWithShipping,
    ship,
    paymentMethod,
  ]);

  return (
    <section className="py-24 bg-gray-100 font-poppins dark:bg-gray-700">
      {spinner ? <Loading /> : ""}
      <div className="px-4 py-6 mx-auto w-full lg:py-4 md:px-6">
        {cartItem?.data?.length > 0 ? (
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
                      <span className="text-xs text-gray-500 line-through dark:text-gray-400"></span>
                    </div>
                    <div className="w-auto px-2 md:w-1/6 lg:w-2/12 ">
                      <div className="inline-flex items-center px-8 font-semibold text-gray-500 border border-gray-200 rounded-md dark:border-gray-700 ">
                        <input
                          type="number"
                          className="w-16 px-2 py-4 text-center border-0 rounded-md dark:bg-gray-800 bg-gray-50 dark:text-gray-400 md:text-right"
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
                      Quận
                    </label>
                    <select
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="district"
                      name="district"
                      value={valueDistrict}
                      onChange={handleDistrict}
                    >
                      <option value="">choose option </option>
                      {localtion.map((item: any, index: any) => (
                        <option key={index} value={item.district_id}>
                          {item.district_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4 flex  items-center gap-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="district"
                    >
                      huyện/phường
                    </label>
                    <select
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="district"
                      name="district"
                      value={valueWand}
                      onChange={handleWand}
                    >
                      <option value="">choose option </option>

                      {wand.map((item: any) => (
                        <option key={item.id} value={item.ward_id}>
                          {item.ward_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* seclect method payment*/}
                  <div className="flex items-center justify-between mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="paymentMethod"
                    >
                      Payment Method
                    </label>
                    <select
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="paymentMethod"
                      value={paymentMethod}
                      onChange={handlePaymentMethodChange}
                    >
                      <option value={1}>Cash on Delivery (COD)</option>
                      <option value={2}>Paypal</option>
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
                      <Distance
                        address={data}
                        distance={distance}
                        className="hidden"
                      />
                      {shipment.toLocaleString()}
                      VND
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
                    {paymentMethod === 1 && (
                      <button
                        className="block w-full py-4 font-bold text-center text-gray-100 uppercase bg-blue-500 rounded-md hover:bg-blue-600"
                        onClick={handleCheckOut}
                      >
                        Checkout
                      </button>
                    )}
                    {paymentMethod === 2 && (
                      <PaypalButton
                        amount={totalWithShipping}
                        handlePaypal={handlePaymentSuccess}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <img
              src="https://newnet.vn/themes/newnet/assets/img/empty-cart.png"
              alt="Empty Cart"
            />
          </div>
        )}
      </div>
      <ToastContainer />
    </section>
  );
};

export default CartPage;
