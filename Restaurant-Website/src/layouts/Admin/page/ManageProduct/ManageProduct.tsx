/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table } from "flowbite-react";
import HearderAdmin from "../../components/layout/headerAdmin/HearderAdmin";
import { Button } from "@material-tailwind/react";
import { deleteProducts, getAllProducts } from "../../../../api";
import { useEffect, useState } from "react";
import Create from "../../components/modal/create/Create";
import { ToastContainer, toast } from "react-toastify";
import Update from "../../components/modal/update/Update";
import { useSelector } from "react-redux";
import Pagination from "../../components/Pagination/Pagination";
import Export from "../../components/export/Export";

const ManageProduct = () => {
  const [products, setProducts] = useState<any>();
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(false);

  const updateUI = useSelector((state: any) => {
    return state.updateReducer;
  });
  useEffect(() => {
    const data = async () => {
      const response = await getAllProducts(null);
      setData(response);
    };
    data();
  }, [updateUI, loading]);

  //^ --------------------------------------------------(delete)----------------------------------
  const handleDelete = (productId: number) => {
    // Gọi API hoặc thực hiện xóa sản phẩm tại đây
    const data = async () => {
      const response = await deleteProducts(productId);
      setLoading(!loading);
      if ((response as any).status === 200) {
        toast.success(
          (response as any).data === "User has been blocked"
            ? "hidden product successfully"
            : "Unhidden product successfully"
        );
      }
    };
    data();
  };
  const handleCreate = async (data: any) => {
    if (data) {
      const bb = await getAllProducts(null);
      bb;
      setLoading(!loading);
    }
  };

  // *--------------------------(pagination)----------------

  const handlePage = (pagination: any) => {
    setProducts(pagination);
  };
  const handleGetData = async (data: any) => {
    const response = await getAllProducts(null);
    setData(data || response);
  };

  return (
    <div>
      <div className="flex items-center justify-between ">
        <HearderAdmin
          slug={"PRODUCT"}
          title="Product"
          handleGetData={handleGetData}
        />
        <div className="mt-4">
          <Create handleUpdate={handleCreate} />
        </div>
      </div>
      <div className="mt-4 mx-3">
        <Export data={data} slug={"products"} />
      </div>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Product name</Table.HeadCell>
          <Table.HeadCell>image</Table.HeadCell>
          <Table.HeadCell>Stock</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Description</Table.HeadCell>
          <Table.HeadCell>Size</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {products?.map((item: any) => {
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
                    src={
                      item?.imageProducts !== undefined &&
                      item?.imageProducts[0]?.src
                    }
                    className="w-20 h-20"
                  />
                </Table.Cell>
                <Table.Cell>{item.stock}</Table.Cell>
                <Table.Cell>{item.category.title}</Table.Cell>
                <Table.Cell>
                  {item.description.length > 20
                    ? `${item.description.substring(0, 20)}...`
                    : item.description}
                </Table.Cell>

                <Table.Cell>
                  <select>
                    <option value="">Size</option>
                    {item.sizes.map((size: any) => (
                      <option key={size.id} value={size.size}>
                        {size.size}
                      </option>
                    ))}
                  </select>
                </Table.Cell>

                <Table.Cell>{item.price}</Table.Cell>
                <Table.Cell className="flex">
                  <Update id={item.id} className="bg-green-300" />
                  <a className="font-medium text-cyan-600 hover:underline dark:text-gray-500">
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
      <Pagination data={data} handlePage={handlePage} />
      <ToastContainer />
    </div>
  );
};

export default ManageProduct;
