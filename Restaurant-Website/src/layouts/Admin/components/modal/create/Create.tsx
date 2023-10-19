/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import {
  apiPostImageProducts,
  apiPostProducts,
  getAllCategory,
} from "../../../../../api";
import { ToastContainer, toast } from "react-toastify";

export default function Create(propsxx: any) {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const [name, setName] = useState<any>("");
  const [category, setCategory] = useState<any>("");
  const [price, setPrice] = useState<any>("");
  const [images, setImages] = useState<any>([]);
  const [dataCategory, setDataCategory] = useState<any>([]);
  const [stock, setStock] = useState<any>("");
  const [description, setDescription] = useState<any>("");
  const props = { openModal, setOpenModal };

  useEffect(() => {
    const category = async () => {
      const response = await getAllCategory();
      setDataCategory(response);
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
    };

    const response = await apiPostProducts(data);
    console.log(response.data.success);

    if (response.data.success) {
      console.log(response.data);
      const dataImage = {
        productId: response.data.data.id,
        images,
      };
      const formData = new FormData();
      for (const i of Object.entries(dataImage)) formData.append(i[0], i[1]);
      for (const img of images) formData.append("images", img);
      await apiPostImageProducts(formData);
      propsxx.handleUpdate();
      // //   const abc = await getAllProducts();
      props.setOpenModal(undefined);
      toast.success("thêm sản phẩm thành công");
    } else {
      toast.error("thêm sản phẩm thất bại");
    }
    setImages([]);
    setCategory("");
    setName("");
    setStock("");
    setPrice("");
    setDescription("");
  };

  const handleChangeImages = (event: any) => {
    setImages(event.target.files);
  };
  console.log(images);
  return (
    <>
      <Button onClick={() => props.setOpenModal("default")}>+ Add</Button>
      <Modal
        show={props.openModal === "default"}
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header>Add Product</Modal.Header>
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
                    <Button
                      onClick={() => setCategory(item.id)}
                      key={item.id}
                      className="w-auto"
                    >
                      {item.title}
                    </Button>
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
