/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { getOneUser } from "../../../../api";

const Profile = () => {
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    const data = async () => {
      const response = await getOneUser();
      setUser((response as any).data);
    };

    data();
  }, []);

  console.log(user);

  return (
    <div className="px-10 py-32">
      <div className="flex justify-center bg-gray-200">
        <div className="w-1/2 p-4">
          <div className="flex flex-col items-center mb-4">
            <img
              src="profile.jpg"
              alt="Profile"
              className="rounded-full w-32 h-32 shadow-lg"
            />
            <input type="file" className="mt-2" />
            <button className="bg-blue-500 text-white p-3 mt-2 rounded shadow-sm hover:bg-blue-600 text-xs">
              Update Avatar
            </button>
          </div>
          <h1 className="text-2xl font-bold mb-4 text-center">
            {user?.firstName + " " + user?.lastName}
          </h1>
          <h1 className="text-2xl font-bold mb-4 text-center">
            Account Settings
          </h1>
          <form>
            <label className="font-semibold">First Name</label>
            <input
              type="text"
              value={user?.firstName}
              className="border p-2 mb-4 w-full rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="font-semibold">Last Name</label>
            <input
              type="text"
              value={user?.lastName}
              className="border p-2 mb-4 w-full rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="font-semibold">Email</label>
            <input
              type="email"
              value={user?.email}
              className="border p-2 mb-4 w-full rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
