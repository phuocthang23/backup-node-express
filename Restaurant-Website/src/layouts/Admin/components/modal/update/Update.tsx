/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { apiPostOneProducts, getOneProducts } from "../../../../../api";
import { ToastContainer, toast } from "react-toastify";

export default function Update(propsxx: any) {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const [name, setName] = useState<any>("");
  const [category, setCategory] = useState<any>("");
  const [purchased, SetPurchased] = useState<any>("");
  const [price, setPrice] = useState<any>("");
  const [image1, setImage1] = useState<any>("");
  const [image2, setImage2] = useState<any>("");
  const [image3, setImage3] = useState<any>("");
  const [stock, setStock] = useState<any>("");
  const [description, setDescription] = useState<any>("");
  const props = { openModal, setOpenModal };

  console.log(
    name,
    category,
    purchased,
    price,
    stock,
    image1,
    image2,
    image3,
    description
  );

  const handleDecline = async () => {
    // Tạo một object chứa tất cả các giá trị
    const data = {
      name,
      price,
      description,
      purchased,
      images: [image1, image2, image3],
      capacity: [
        {
          id: 1,
          name: "M",
          price: 0,
        },
        {
          id: 2,
          name: "L",
          price: 5000,
        },
      ],
      category,
      stock,
      feedback: [
        {
          comment: "",
          rating: 0,
        },
      ],
      totalRating: 0,
    };

    const response = await apiPostOneProducts({ ...data, id: propsxx.id });
    console.log(response);

    if (response.status === 200) {
      propsxx.handleUpdate(response);
      //   const abc = await getAllProducts();
      //   console.log(abc);
      props.setOpenModal(undefined);
      toast.success("thay đổi sản phẩm thành công");
    } else {
      toast.error("thay đổi sản phẩm thất bại");
    }
  };
  const handleClick = async () => {
    props.setOpenModal("default");
    console.log(propsxx.id);
    const data = await getOneProducts(propsxx.id);
    console.log(data);
    setName(data.name);
    setCategory(data.category);
    setPrice(data.price);
    setCategory(data.category);
    setStock(data.stock);
    setImage1(data.image1);
    setImage2(data.image2);
    setImage3(data.image3);
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
                  Brand
                </label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  value={purchased}
                  onChange={(e) => SetPurchased(e.target.value)}
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
                  Category
                </label>
                <input
                  type="text"
                  name="price"
                  id="price"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
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
                  name="price"
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
                  image 1
                </label>
                <input
                  type="text"
                  name="price"
                  id="price"
                  value={image1}
                  onChange={(e) => setImage1(e.target.value)}
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
                  image 2
                </label>
                <input
                  type="text"
                  name="price"
                  id="price"
                  value={image2}
                  onChange={(e) => setImage2(e.target.value)}
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
                  image 3
                </label>
                <input
                  type="text"
                  name="price"
                  id="price"
                  value={image3}
                  onChange={(e) => setImage3(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="$2999"
                  required
                />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleDecline}>I accept</Button>
          <Button color="gray" onClick={() => props.setOpenModal(undefined)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  );
}
