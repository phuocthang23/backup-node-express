/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  addTocart,
  getAllSizeProduct,
  getOneProducts,
  getOneUser,
} from "../../../../api";
import { BsFillStarFill, BsStar } from "react-icons/bs";
import { Carousel } from "flowbite-react";
import { ToastContainer, toast } from "react-toastify";
const ProductDetailPage: React.FC = () => {
  const { id } = useParams<any>();
  const isCheck = localStorage.getItem("Auth");
  const [selectedSize, setSelectedSize] = useState<any>();
  // const [sizeProduct, setSizeProduct] = useState<any>("");

  const [size, setSize] = useState(1); //* tên size
  //* product
  const [product, setProduct] = useState<any>();

  useEffect(() => {
    const data = async () => {
      const response = await getOneProducts(id);
      setProduct(response);
      setSelectedSize(response?.sizeProduct[1]?.size?.priceSize);
      setSize(response?.sizeProduct[1]?.size?.id);
    };
    data();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const loginData: any = localStorage.getItem("Auth");

  const [user, setUser] = useState<any>("");

  useEffect(() => {
    const data = async () => {
      const response = await getOneUser(loginData);
      setUser(response);
    };
    data();
  }, []);

  //^---------------------------------------------------------------------
  const handleAddToCart = async () => {
    // console.log(sizeProduct);
    const response: any = await getAllSizeProduct(null);
    // setSizeProduct(response);
    const productSizeArray = response?.data?.data;
    const productId = Number(id);
    const sizeId = Number(size);

    const filteredProducts: any = productSizeArray?.filter((item: any) => {
      return item.productId === productId && item.sizeId === sizeId;
    });

    const idFiltered = filteredProducts[0]?.id;

    const cart = {
      sizeProductId: idFiltered,
      quantity: value,
    };

    console.log(cart);

    const responseCart = await addTocart({ loginData, cart });

    if ((responseCart as any).status === 200) {
      toast.success("đã thêm vào giỏ hàng thành công");
    }

    // console.log(UserId, "user");
    // console.log(productSizeArray, "sizeProduct");
    // console.log(id);
    // console.log(size);
    // console.log(filteredProducts);
    // console.log(idFiltered);
    // console.log(product);
  };

  // ^ -------------------------------------------------------------------------------------
  const [value, setValue] = useState(1);
  const handleIncrement = () => {
    setValue(value + 1);
  };
  const handleDecrement = () => {
    if (value > 1) {
      setValue(value - 1);
    }
  };

  const handleSizeChange = (priceSize: any, id: any) => {
    setSelectedSize(priceSize);
    setSize(id);
  };

  //^----------------------------------------------------------------------------------------------

  //*format
  const formattedNumber =
    product?.price !== undefined && selectedSize !== undefined
      ? (product.price * selectedSize * value).toLocaleString()
      : "";

  // -------------------------------------------------------------------------------

  return (
    <section className="text-gray-700 body-font overflow-hidden bg-gray-200">
      <div className="container py-10 mx-auto mt-[100px] bg-gray-200 my-5">
        <div className="lg:w-[85%]   mx-auto flex flex-wrap bg-white py-20  p-10 gap-[50px]">
          <Carousel className="w-[500px] h-[450px] object-cover ">
            <img
              src={`${product?.image !== undefined && product?.image[0]?.src}`}
              className="w-[500px] h-[450px]"
            />
            <img
              src={`${product?.image !== undefined && product?.image[1]?.src}`}
              className="w-[500px] h-[450px]"
            />
            <img
              src={`${product?.image !== undefined && product?.image[2]?.src}`}
              className="w-[500px] h-[450px]"
            />
          </Carousel>
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 ml-10">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              {product?.category.title}
            </h2>
            <h1 className="text-gray-900 text-[50px] title-font font-medium mb-1">
              {product?.nameProduct}
            </h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                <BsFillStarFill className=" text-red-500" />
                <BsFillStarFill className=" text-red-500" />
                <BsFillStarFill className=" text-red-500" />
                <BsFillStarFill className=" text-red-500" />
                <BsStar className=" text-red-500" />
                <span className="text-gray-600 ml-3">4/5</span>
              </span>
              <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                <span className="text-gray-600 ml-3">4 Reviews</span>
              </span>
            </div>
            <p className="leading-relaxed">{product?.description}</p>
            <p className="title-font font-medium text-4xl text-yellow-700 py-4">
              {formattedNumber}VND
            </p>
            <h2 className="text-lg title-font text-black font-bold">
              Số Lượng - {product?.stock}
            </h2>
            <div className=" mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
              <div className="flex  items-center">
                <span className="mr-3">Size</span>
                <div className="relative">
                  <div className="flex items-center">
                    {product?.sizeProduct !== undefined &&
                      product?.sizeProduct.map((size) => (
                        <button
                          key={size.id}
                          className={`rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10 mx-2 ${
                            selectedSize === size?.size?.priceSize
                              ? "bg-red-500 text-white"
                              : ""
                          }`}
                          onClick={() =>
                            handleSizeChange(
                              size?.size?.priceSize,
                              size?.size?.id
                            )
                          }
                        >
                          {size?.size.size}
                        </button>
                      ))}
                  </div>
                </div>
              </div>
              <div>
                {/* quantity */}
                <p className="my-3">Quantity</p>
                <div className=" w-1/3 border border-gray-600 rounded bg-gray-200">
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
                    value={value}
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
              </div>
            </div>

            <div className="flex">
              {isCheck !== null ? (
                <div className="flex">
                  <button
                    className="flex  text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                    onClick={() => handleAddToCart()}
                  >
                    Add To Cart
                  </button>
                  <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                    </svg>
                  </button>
                </div>
              ) : (
                <p>
                  bạn chưa login vui lòng{" "}
                  <Link className="hover:text-red-500 text-blue-600" to="/auth">
                    bấm vào đây để login
                  </Link>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default ProductDetailPage;
