/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { apiPostProducts, getAllCategory } from "../../../../../api";
import { ToastContainer, toast } from "react-toastify";
import { getAllSize } from "../../../../../api/size";
import { useDispatch } from "react-redux";
import Loading from "../../loading";
// import Loading from "../../loading";

export default function Create(propsxx: any) {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const [name, setName] = useState<any>("");
  const [category, setCategory] = useState<any>("");
  const [price, setPrice] = useState<any>("");
  const [images, setImages] = useState<any>([]);
  const [dataCategory, setDataCategory] = useState<any>([]);
  const [stock, setStock] = useState<any>("");
  const [description, setDescription] = useState<any>("");
  const [size, setSize] = useState<any>([]);
  const [spinner, setSpinner] = useState(true);
  const [wrap, setWrap] = useState<any>([]);
  // const [spinner, setSpinner] = useState<boolean>(false);

  const props = { openModal, setOpenModal };
  const dipatch = useDispatch();
  useEffect(() => {
    const category = async () => {
      const response = await getAllCategory();
      const allSize = await getAllSize();
      setDataCategory(response);
      setSize(allSize);
      setSpinner(false);
    };
    category();
  }, []);

  const handleCreate = async () => {
    // Tạo một object chứa tất cả các giá trị
    const data = {
      nameProduct: name,
      categoryId: category,
      price,
      stock,
      description,
      size: JSON.stringify(wrap),
    };

    // console.log(wrap, "wrap");
    // console.log(images);

    const formData = new FormData();

    // Đính kèm dữ liệu hình ảnh vào formData
    for (const img of images) {
      formData.append("images", img);
    }

    // Đính kèm dữ liệu sản phẩm vào formData
    for (const key in data) {
      formData.append(key, data[key]);
    }

    const response = await apiPostProducts(formData);

    if (response.status === 201) {
      propsxx.handleUpdate();
      dipatch({ type: "UPDATE" });
      props.setOpenModal(undefined);
      toast.success("thêm sản phẩm thành công");
    } else {
      toast.error("thêm sản phẩm thất bại");
    }
    setImages([]);
    // setSize([]);
    setCategory("");
    setName("");
    setStock("");
    setPrice("");
    setDescription("");
  };

  const handleChangeImages = (event: any) => {
    setImages(event.target.files);
  };

  const handleSizeChange = (itemId: any) => {
    const updatedWrap = [...wrap];
    const index = updatedWrap.indexOf(itemId);

    if (index > -1) {
      updatedWrap.splice(index, 1);
    } else {
      updatedWrap.push(itemId);
    }

    setWrap(updatedWrap);
    console.log(itemId);
  };

  return (
    <>
      <Button onClick={() => props.setOpenModal("default")}>+ Add</Button>
      <Modal
        show={props.openModal === "default"}
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header>Add Product</Modal.Header>
        {spinner ? <Loading /> : ""}
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
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Stock
                </label>
                <input
                  type="number"
                  name="Stock"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type product name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="category"
                  className=" mb-2 text-sm font-medium text-gray-900 dark:text-white block"
                >
                  Category
                </label>
                <div className="flex flex-wrap gap-2">
                  {dataCategory?.map((item: any) => (
                    <button
                      key={item.id}
                      onClick={() => setCategory(item.id)}
                      className={`px-4 py-2 text-sm text-gray-600 rounded-lg ${
                        item.id === category
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
                <input
                  type="file"
                  multiple
                  onChange={handleChangeImages}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Size
                </label>
                <div className="flex flex-wrap gap-2">
                  {size?.map((item: any) => (
                    <div key={item.id} className="flex items-center">
                      <input
                        type="checkbox"
                        value={item.id}
                        // checked={size.includes(item.id)}
                        onChange={() => handleSizeChange(item.id)} // Thêm sự kiện onChange
                        className="mr-2"
                      />
                      <span>{item.size}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCreate}>I accept</Button>
          <Button color="gray" onClick={() => props.setOpenModal(undefined)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  );
}
