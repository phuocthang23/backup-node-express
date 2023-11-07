/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import {
  updateProduct,
  getAllCategory,
  getAllImage,
  getOneProducts,
  updateImage,
} from "../../../../../api";
import { ToastContainer, toast } from "react-toastify";
// import category from "./../../../page/categories/category";
import { useEffect } from "react";
import { getAllSize } from "../../../../../api/size";
import { useDispatch } from "react-redux";

export default function Update(propsxx: any) {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const [name, setName] = useState<any>("");
  const [category, setCategory] = useState<any>([]);
  const [price, setPrice] = useState<any>("");
  const [selectedCategory, setSelectedCategory] = useState(category.id);
  const [size, setSize] = useState<any>([]);
  const [sizeChecked, setSizeChecked] = useState<any>([]);
  const [image, setImage] = useState<any>([]);
  const [warp, setWarp] = useState<any>([]);
  const [stock, setStock] = useState<any>("");
  const [imageUpdate, setImageUpdate] = useState<any>();
  const [description, setDescription] = useState<any>("");

  const props = { openModal, setOpenModal };
  const dipatch = useDispatch();

  useEffect(() => {
    const callApi = async () => {
      const response = await getAllCategory();
      const allSize = await getAllSize();
      setCategory(response);
      setSize(allSize);
    };
    callApi();
  }, []);

  const handleUpdateProcut = async () => {
    // Tạo một object chứa tất cả các giá trị
    const data = {
      nameProduct: name,
      categoryId: selectedCategory,
      price,
      stock,
      description,
      // size: JSON.stringify(wrap),
    };

    const response = await updateProduct({ ...data, id: propsxx.id });
    // console.log(response);

    if (response.status === 200) {
      // propsxx.handleUpdate();
      dipatch({ type: "UPDATE" });
      props.setOpenModal(undefined);
      toast.success("thay đổi sản phẩm thành công");
    } else {
      toast.error("thay đổi sản phẩm thất bại");
    }
  };

  //^----------------------------(check category)-----------------
  const handleCategoryClick = (id) => {
    setSelectedCategory(id);
  };

  //^--------------------------(size)---------------------------

  const handleCheckboxChange = async (id: number) => {
    const updateCheckSize = [...sizeChecked];

    const index = updateCheckSize.indexOf(id);

    if (index > -1) {
      updateCheckSize.splice(index, 1);
    } else {
      updateCheckSize.push(id);
    }

    setSizeChecked(updateCheckSize);
  };
  //^ --------------------------(edit)-----------------------------
  const handleClick = async () => {
    props.setOpenModal("default");
    console.log(propsxx.id);
    const data = await getOneProducts(propsxx.id);
    const allImage = await getAllImage(propsxx.id);
    const getOneProduct = data?.data;
    // console.log(getOneProduct);
    setImage(allImage);
    setName(getOneProduct.nameProduct);
    setSelectedCategory(getOneProduct.categoryId);
    setPrice(getOneProduct.price);
    setStock(getOneProduct.stock);
    setWarp(getOneProduct.imageProducts);
    setSizeChecked(getOneProduct.sizes);
    setDescription(getOneProduct.description);
  };

  //^ ---------------------(image)--------------------------
  const handleUpdateImage = async (id: number) => {
    const formData = new FormData();
    formData.append("image", imageUpdate);
    await updateImage(id, formData);
    // dipatch({ type: "UPDATE" });
  };
  return (
    <>
      <Button onClick={handleClick}>Edit</Button>
      <Modal
        show={props.openModal === "default"}
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header>Edit Product</Modal.Header>
        <Modal.Body>
          <form action="#">
            <div className="grid gap-4 mb-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type product name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="brand"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Product brand"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="$2999"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  stock
                </label>
                <input
                  type="text"
                  name="category"
                  id="price"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="$2999"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Category
                </label>
                <div>
                  {category?.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleCategoryClick(item.id)}
                      className={`px-4 py-2 text-sm text-gray-600 rounded-lg ${
                        item.id === selectedCategory
                          ? "text-white bg-blue-500"
                          : "text-black bg-white"
                      }`}
                    >
                      {item.title}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  image
                </label>
                <div className="gap-6">
                  {image?.map((item: any, index: number) => {
                    return (
                      <div key={index} className="flex flex-col mt-4">
                        <div className="flex  gap-6">
                          <img
                            className="w-[70px] ml-2 border border-collapse"
                            src={item?.src}
                            alt=""
                          />
                          <button
                            onClick={() => handleUpdateImage(item?.id)}
                            className="btn btn-success hover:bg-green-300 transition duration-300 ease-in-out transform hover:scale-105 rounded-[10%] px-4 py-2 bg-cyan-50 text-cyan-700"
                          >
                            Update
                          </button>
                        </div>

                        <input
                          className="w-full ml-2 border border-collapse"
                          type="file"
                          onChange={(e) => setImageUpdate(e.target.files[0])}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Size
                </label>
                <div className="flex items-center mb-4">
                  {size?.map((item: any) => {
                    const sizeSelected = sizeChecked?.some(
                      (selectedItem: any) => selectedItem.id === item.id
                    );
                    return (
                      <div key={item.id} className="flex items-center">
                        <input
                          type="checkbox"
                          value={item.id}
                          checked={sizeSelected}
                          onChange={() => handleCheckboxChange(item.id)} // Thêm sự kiện onChange
                          className="mr-2"
                        />
                        <span className="mr-2">{item.size}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleUpdateProcut}>I accept</Button>
          <Button color="gray" onClick={() => props.setOpenModal(undefined)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  );
}
