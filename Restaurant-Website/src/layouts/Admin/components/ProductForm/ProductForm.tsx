import React from "react";

const ProductForm: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {/* Fields and submit button will be added here */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="product-name"
          >
            Tên sản phẩm
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="product-name"
            type="text"
            placeholder="Nhập tên sản phẩm"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="product-description"
          >
            Mô tả sản phẩm
          </label>
          <textarea
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="product-description"
            placeholder="Nhập mô tả sản phẩm"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="product-price"
          >
            Giá sản phẩm
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="product-price"
            type="number"
            placeholder="Nhập giá sản phẩm"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="product-price"
          >
            Hình ảnh sản phẩm
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="product-price"
            type="number"
            placeholder=" Hình ảnh sản phẩm"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="product-price"
          >
            Hình ảnh sản phẩm
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="product-price"
            type="number"
            placeholder=" Hình ảnh sản phẩm"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="product-price"
          >
            Thể loại
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="product-price"
            type="number"
            placeholder="Thể loại"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="product-price"
          >
            Số lượng
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="product-price"
            type="number"
            placeholder="Số lượng"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="product-price"
          >
            Màu Sắc
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="product-price"
            type="number"
            placeholder="Màu sắc"
          />
        </div>

        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Thêm sản phẩm
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
