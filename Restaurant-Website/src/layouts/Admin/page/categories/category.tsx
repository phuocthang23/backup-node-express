/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import HearderAdmin from "../../components/layout/headerAdmin/HearderAdmin";
import { Button, Label, Modal, Table, TextInput } from "flowbite-react";
import { ToastContainer, toast } from "react-toastify";
import {
  createCategory,
  deleteCategory,
  editCategory,
  getAllCategory,
} from "../../../../api";

const category = () => {
  const [cartegory, setcategory] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState(""); // Thêm state để xác định loại modal
  const [inputValue, setInputValue] = useState("");
  const [id, setId] = useState(0);

  function onCloseModal() {
    setOpenModal(false);
    setInputValue("");
    setModalType(""); // Reset loại modal khi đóng
  }

  useEffect(() => {
    const data1 = async () => {
      const All = await getAllCategory();
      setcategory(All);
    };
    data1();
  }, [loading, inputValue]);

  const handleCreateCategory = async () => {
    const response = await createCategory(inputValue);
    if ((response as any).status === 201) {
      setOpenModal(false);
      setInputValue("");
      setLoading(!loading);
      //toast
      toast.success("Create category successfully");
    }
  };

  const handleEditCategory = async (id) => {
    const categoryToEdit = await cartegory.find(
      (category) => category.id === id
    );
    console.log(categoryToEdit);
    setInputValue(categoryToEdit.title);
    setId(categoryToEdit.id);
    setModalType("edit");
    setOpenModal(true);
  };

  const handleUpdate = async () => {
    // handleEditCategory(inputValue);
    const response = await editCategory(id, inputValue);
    if ((response as any).status === 200) {
      setOpenModal(false);
      setInputValue("");
      setLoading(!loading);
      toast.success("Edit category successfully");
    }
  };

  const handleDeleteCategory = async (id: number) => {
    const idNumber = Number(id);

    const response = await deleteCategory(idNumber);
    if ((response as any).status === 200) {
      setLoading(!loading);
      toast.success("Category deleted successfully");
    }
  };

  return (
    <div>
      <div className="flex justify-between justify-center items-center ">
        <div>
          <HearderAdmin title="Category" handleSearch={() => {}} />
        </div>

        <div className="mt-10 mr-10">
          <Button onClick={() => setOpenModal(true)}>Toggle modal</Button>
          <Modal show={openModal} size="md" onClose={onCloseModal} popup>
            <Modal.Header />
            <Modal.Body>
              <div className="space-y-6">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  {modalType === "edit" ? "Edit category" : "Create category"}
                </h3>
                <div>
                  <div className="mb-2 block">
                    <Label value="Category" />
                  </div>
                  <TextInput
                    placeholder="category"
                    defaultValue={inputValue}
                    onChange={(event) => setInputValue(event.target.value)}
                    required
                  />
                </div>

                <div className="w-full">
                  <Button
                    onClick={
                      modalType === "edit" ? handleUpdate : handleCreateCategory
                    }
                  >
                    {modalType === "edit" ? "Edit" : "Create"}
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>

      <div>
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>ID</Table.HeadCell>
            <Table.HeadCell>Title</Table.HeadCell>
            <Table.HeadCell>delete</Table.HeadCell>
            <Table.HeadCell>update</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {cartegory?.map((row: any) => {
              return (
                <Table.Row
                  key={row.id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {row.id}
                  </Table.Cell>
                  <Table.Cell>{row.title}</Table.Cell>
                  <Table.Cell>
                    <button
                      className="px-4 py-2 bg-red-500 text-white border border-red-500 rounded"
                      onClick={() => handleDeleteCategory(row.id)}
                    >
                      Delete
                    </button>
                  </Table.Cell>

                  <Table.Cell>
                    <button
                      className="px-4 py-2 bg-green-500 text-white border border-green-500 rounded"
                      onClick={() => handleEditCategory(row.id)}
                    >
                      Edit
                    </button>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default category;
