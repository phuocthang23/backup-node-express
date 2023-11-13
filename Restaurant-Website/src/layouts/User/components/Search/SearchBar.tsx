/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { getAllProducts } from "../../../../api";
import "../Header/index.css";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [product, setProduct] = useState<any>([]);
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [dataSearch, setDataSearch] = useState<any>();
  const [inputValue, setInputValue] = useState<string>("");

  const navigate = useNavigate();
  const handleInputClick = (e: any) => {
    const value = e.target.value;
    setInputValue(value);
    setIsHidden(value.length > 0);
    const searchProduct = product?.filter((item: any) =>
      item.nameProduct
        .toLocaleLowerCase()
        .includes(e.target.value.toLocaleLowerCase())
    );

    setDataSearch(searchProduct);
  };

  useEffect(() => {
    const data = async () => {
      const productData = await getAllProducts(null);
      setProduct(productData);
      setInputValue("");
    };
    data();
  }, []);

  const productDetail = (id: any) => {
    navigate(`/product/${id}`);
    setIsHidden(false);
    setInputValue("");
  };

  return (
    <form>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <BsSearch />
        </div>
        <input
          type="search"
          value={inputValue}
          onChange={handleInputClick}
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 hide-mobile"
        />
        <div
          className={` ${
            isHidden === false ? "hiddenFormSmall" : "form-search-small "
          } `}
        >
          {isHidden === false ? (
            ""
          ) : dataSearch?.length > 0 ? (
            dataSearch?.map((item: any) => {
              return (
                <div
                  className="item-search flex items-center mx-2 my-3"
                  onClick={() => productDetail(item.id)}
                >
                  <img
                    className="w-[100px]"
                    src={`${item.imageProducts[0].src}`}
                    alt=""
                  />
                  <div className="item-search-name mx-3">
                    <p id="name-search">{item.nameProduct}</p>
                    <p id="price-search">{item.price.toLocaleString()} đ</p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className=" pt-5 pl-[110px]">Không có sản phẩm đang tìm kiếm </p>
          )}
        </div>
        <button
          type="submit"
          className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
