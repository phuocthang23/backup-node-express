/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Table } from "flowbite-react";
import HearderAdmin from "../../components/layout/headerAdmin/HearderAdmin";
import { useEffect, useState } from "react";
// import axios from "axios";
import { blockUsersServer, getAllUsersServer } from "../../../../api";
import { ToastContainer, toast } from "react-toastify";
// import { Avatar } from "flowbite-react";
const User: React.FC = () => {
  //* biến chưa data

  const [data1, setData1] = useState<any>();
  const [loading, setLoading] = useState(true);

  const handleSearch = async () => {
    // const params = data1.length > 0 ? { name: data1 } : null;
    // const bb = await getAllUsersServer(params);
    // setData1(bb);
  };
  const handleBlock = async (id: number) => {
    const block = await blockUsersServer(id);
    // console.log(block);
    setLoading(!loading);

    //* thông báo
    if ((block as any).status === 200) {
      toast.success(
        block.data.message.data.status === 0
          ? "Block user successfully"
          : "Unblock user successfully"
      );
    }
  };

  useEffect(() => {
    const data1 = async () => {
      const userAll = await getAllUsersServer(null);
      setData1(userAll);
    };
    data1();
  }, [loading]);

  return (
    <div>
      <HearderAdmin title="User" handleSearch={handleSearch} />
      <div>
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>User name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Avatar</Table.HeadCell>
            <Table.HeadCell>Phone</Table.HeadCell>
            <Table.HeadCell>Address</Table.HeadCell>
            <Table.HeadCell>Role</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {data1?.map((row: any) => {
              return (
                <Table.Row
                  key={row.id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {row.firstName}
                  </Table.Cell>
                  <Table.Cell>{row.email}</Table.Cell>
                  <Table.Cell className="truncate max-w-[200px]">
                    {row.avatar}
                  </Table.Cell>
                  <Table.Cell>{row?.address[0]?.phoneNumber}</Table.Cell>
                  <Table.Cell>{row?.address[0]?.address}</Table.Cell>
                  <Table.Cell>{row.roleId === 1 ? "Admin" : "User"}</Table.Cell>
                  <Table.Cell>
                    <span
                      className={`${
                        row.status === 0 ? "bg-lime-500" : "bg-red-500"
                      } w-2 h-2 rounded inline-block mr-1`}
                    ></span>
                    {row.status === 0 ? "active" : "inactive"}
                  </Table.Cell>

                  <Table.Cell className=" flex gap-2">
                    {row.roleId !== 1 && (
                      <Button
                        className="font-medium bg-cyan-600 hover:bg-cyan-300"
                        onClick={() => handleBlock(row.id)}
                      >
                        Block
                      </Button>
                    )}
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

export default User;
