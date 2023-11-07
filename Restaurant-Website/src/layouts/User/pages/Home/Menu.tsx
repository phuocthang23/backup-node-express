/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
// import { Product } from "../../../../interface/interface";
import { getAllProducts } from "../../../../api";
import { Link } from "react-router-dom";
const Menu = () => {
  const [data, setData] = useState<any>();

  useEffect(() => {
    const data = async () => {
      const userAll = await getAllProducts(null);
      setData(userAll);
    };
    data();
  }, []);
  console.log(data, "test");

  return (
    <div>
      <div className="max-w-[1400px] mx-auto p-8">
        <h1 className="text-4xl font-bold mb-4 px-4 bg-">Menu</h1>
        <div className="border-b-4 border-solid border-yellow-300"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Card sản */}
          {data?.map((item) => {
            if (item.status === 0) {
              return (
                <div
                  className="max-w-md w-full sm:w-full lg:w-full py-6 px-3"
                  key={item.id}
                >
                  <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    <Link to={`/product/${item.id}`}>
                      <div className="relative">
                        <img
                          src={`${
                            item?.imageProducts !== undefined &&
                            item?.imageProducts[0]?.src
                          }`}
                          alt=""
                          className="h-[250px] w-[450px]"
                        />
                        {/*Tag */}
                        <span className="bg-blue-700 text-white px-2 py-1 rounded-full text-xs font-semibold absolute top-[5px] left-[5px]">
                          New
                        </span>
                      </div>
                    </Link>

                    <div className="p-4">
                      <p className="uppercase tracking-wide text-[20px] font-bold text-gray-700">
                        {item.nameProduct}
                      </p>
                      <p className="text-l text-gray-900 text-red-400">
                        {item?.price !== undefined &&
                          item?.price.toLocaleString()}{" "}
                        VND
                      </p>
                      <p className="text-gray-700">{item?.description}</p>
                    </div>
                    <div className="flex p-4 border-t border-gray-300 text-gray-700">
                      <div className="flex-1 inline-flex items-center">
                        <p>
                          <span className="text-gray-900 ">
                            {item.category?.title}
                          </span>{" "}
                        </p>
                      </div>
                      <div className="flex-1 inline-flex items-center">
                        <p>
                          <span className="text-gray-900 font-bold">
                            {item.stock}
                          </span>{" "}
                          Đã Bán
                        </p>
                      </div>
                    </div>
                    <div className="px-4 pt-3 pb-4 border-t border-gray-300 bg-gray-100">
                      <Link to={`/product/${item.id}`}>
                        <button className="bg-yellow-400 hover:bg-yellow-700 text-white font-bold py-2 px-6 rounded-full text-center">
                          Xem Chi Tiết
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default Menu;
