/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { getAllCartByUser } from "../../../../api";
import { BiTrash } from "react-icons/bi";

const Cart = () => {
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
  console.log(cartItem);

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
      total +=
        item.sizeProduct.product.price *
        item.sizeProduct.size.priceSize *
        item.quantity;
    });
    return total;
  };

  useEffect(() => {
    if (cartItem) {
      const cartItems = cartItem.data.data;
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

  const totalAmount = cartItem?.data?.data.reduce(
    (total, item) =>
      total +
      item.sizeProduct?.product?.price *
        item.sizeProduct?.size?.priceSize *
        item.quantity,
    0
  );

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

  const totalWithShipping = totalAmount + formData.ship;

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
    <div className="pt-[96px] px-10 mx-auto bg-gray-100 font-poppins">
      <div className="container mx-auto ">
        <div className="flex shadow-md my-10">
          <div className="w-3/4 bg-white px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Shopping Cart</h1>
              <h2 className="font-semibold text-2xl">3 Items</h2>
            </div>
            <div className="flex mt-10 mb-5">
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5">
                Product Details
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                Quantity
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                Price
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                Total
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                Action
              </h3>
            </div>
            <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
            {cartItem?.data?.data.map((item: any) => (
                <div>
                    <div className="flex w-1/5">
                {" "}
                {/* product */}
                <div className="w-20">
                  <img
                    className="h-24"
                    src="https://drive.google.com/uc?id=18KkAVkGFvaGNqPy2DIvTqmUH_nk39o3z"
                  />
                </div>
                <div className="flex flex-col justify-around ml-4 flex-grow">
                  <span className="font-bold text-sm">Iphone 6S</span>
                  <span className="text-red-500 text-xs">Size:</span>
                </div>
              </div>
              <div className="flex justify-center w-1/5">
                <input
                  className="mx-2 border text-center w-8"
                  type="text"
                  defaultValue={1}
                />
              </div>
              <span className="text-center w-1/5 font-semibold text-sm">
                $400.00
              </span>
              <span className="text-center w-1/5 font-semibold text-sm">
                $400.00
              </span>
              <button className="font-semibold hover:text-red-500 text-gray-500 text-[20px] w-1/5 text-center">
                <BiTrash className="w-5 h-5 text-center mx-auto" />
              </button>
            </div>
            ))}
            
              

            <button className="flex justify-center font-semibold text-indigo-600 text-sm mt-10">
              Continue Shopping
            </button>
          </div>
          <div id="summary" className="w-1/4 px-8 py-10">
            <h1 className="font-semibold text-2xl border-b pb-8">
              Order Summary
            </h1>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm uppercase">Items 3</span>
              <span className="font-semibold text-sm">590$</span>
            </div>
            <div>
              <label className="font-medium inline-block mb-3 text-sm uppercase">
                Shipping
              </label>
              <select className="block p-2 text-gray-600 w-full text-sm">
                <option>Standard shipping - $10.00</option>
              </select>
            </div>
            <form action="">
              <div className="py-10">
                <label
                  htmlFor="promo"
                  className="font-semibold inline-block mb-3 text-sm uppercase"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="promo"
                  placeholder="Enter your code"
                  className="p-2 text-sm w-full"
                />
              </div>
              <div className="pb-10">
                <label
                  htmlFor="promo"
                  className="font-semibold inline-block mb-3 text-sm uppercase"
                >
                  Phone
                </label>
                <input
                  type="text"
                  id="promo"
                  placeholder="Enter your code"
                  className="p-2 text-sm w-full"
                />
              </div>
              <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">
                Apply
              </button>
            </form>

            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Total cost</span>
                <span>$600</span>
              </div>
              <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
