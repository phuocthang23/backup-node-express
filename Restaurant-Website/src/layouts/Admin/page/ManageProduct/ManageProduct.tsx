/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table } from "flowbite-react";
import HearderAdmin from "../../components/layout/headerAdmin/HearderAdmin";
import { Button } from "@material-tailwind/react";
import { deleteProducts, getAllProducts } from "../../../../api";
import { useEffect, useState } from "react";
import Create from "../../components/modal/create/Create";
import { ToastContainer, toast } from "react-toastify";
import Update from "../../components/modal/update/Update";

const ManageProduct = () => {
  const [data, setData] = useState<any>();
  const [find, setFind] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const data = async () => {
      const response = await getAllProducts(null);
      setLoading(true);
      setData(response);
    };
    data();
  }, [loading]);
  //^ --------------------------------------------------(delete)----------------------------------
  const handleDelete = (productId: number) => {
    // console.log(productId);
    // Gọi API hoặc thực hiện xóa sản phẩm tại đây
    const data = async () => {
      const response = await deleteProducts(productId);
      // console.log(response.data.data, "response");
      setLoading(!loading);
      if ((response as any).status === 200) {
        toast.success(
          response.data.data === 1
            ? "hidden product successfully"
            : "Unhidden product successfully"
        );
      }
    };
    data();
  };
  const handleUpdate = async (data: any) => {
    if (data) {
      const bb = await getAllProducts(null);
      setData(bb);
    }
  };
  const handleSearch = async () => {
    // const params = data.length > 0 ? { name: data } : null;
    const search = await getAllProducts(null);
    setFind(search);
  };
  console.log(find, "search");

  return (
    <div>
      <div className="flex items-center justify-between ">
        <HearderAdmin title="Product" handleSearch={handleSearch} />
        <div className="mt-4">
          <Create handleUpdate={handleUpdate} />
        </div>
      </div>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Product name</Table.HeadCell>
          <Table.HeadCell>image</Table.HeadCell>
          <Table.HeadCell>Stock</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {data?.map((item: any) => {
            console.log(item);
            return (
              <Table.Row
                key={item.id}
                className={
                  item.status === 1
                    ? "line-through bg-blue-400 hover:bg-blue-400"
                    : "bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                }
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {item.nameProduct}
                </Table.Cell>
                <Table.Cell>
                  <img
                    src={item?.image !== undefined && item?.image[0]?.src}
                    className="w-20 h-20"
                  />
                </Table.Cell>
                <Table.Cell>{item.stock}</Table.Cell>
                <Table.Cell>{item.category.title}</Table.Cell>
                <Table.Cell>{item.price}</Table.Cell>
                <Table.Cell className="flex">
                  <Update id={item.id} />
                  <a className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                    <Button
                      className="font-medium bg-red-600 mx-6"
                      onClick={() => {
                        handleDelete(item.id);
                      }}
                    >
                      {item.status === 0 ? "Delete" : "Hidden"}
                    </Button>
                  </a>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
      <ToastContainer />
    </div>
  );
};

export default ManageProduct;
