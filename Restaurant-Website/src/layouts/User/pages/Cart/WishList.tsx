/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { getOneWishlist } from "../../../../api/wishlist";

const WishList = () => {
  const [wishList, setWishListItem] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const data = async () => {
      const response = await getOneWishlist();
      setWishListItem((response as any).data);
    };
    data();
  }, []);
  console.log(wishList);

  //* --------------------------------------(delete) --------------------------------------

  // const handldeDelete = async (id: any) => {
  //   const response = await DeleteCartByUser(id);
  //   if ((response as any).status === 200) {
  //     toast.success("đã xoá sản phẩm thành công");
  //   } else {
  //     toast.error("xoá thất bại");
  //   }
  //   setLoading(!loading);
  // };

  return (
    <div className="pt-[96px] px-10 mx-auto bg-gray-100 font-poppins">
      <div className="container mx-auto py-10">
        <div className=" bg-white px-10 py-10 ">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
          </div>

          <div className=" items-center hover:bg-gray-100 -mx-8 px-6 py-5">
            {wishList?.map((item: any) => (
              <div key={item.id}>
                <div className="flex items-center rounded bg-white w-full shadow-lg justify-between px-4">
                  <div className="flex items-center mx-4 py-6">
                    <img
                      src={item?.product?.imageProducts[0]?.src}
                      className="mb-2 h-48 w-48 rounded object-cover"
                    />
                    <h2 className="mb-2 text-center text-2xl px-9 font-semibold">
                      {item?.product?.nameProduct}
                    </h2>
                  </div>
                  <div className="text-center">
                    <div className="mb-2 text-lg font-bold text-green-500">
                      {item?.product?.price}
                    </div>
                  </div>
                  <div>
                    <button className="rounded bg-blue-500 px-2 py-1 text-xs text-white shadow-sm hover:bg-blue-600">
                      Add to Cart
                    </button>
                  </div>
                  <div className="text-center">
                    <button className="rounded bg-red-500 px-2 py-1 text-xs text-white shadow-sm hover:bg-red-600">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <button className="flex justify-center font-semibold text-indigo-600 text-sm mt-10">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishList;
