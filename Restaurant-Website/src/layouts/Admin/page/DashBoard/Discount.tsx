import { Card } from "flowbite-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Discount } from "../../../../interface/interface";

export default function CardWithList() {
  //* tạo biến
  const [data, setData] = useState<Discount[]>([]);
  useEffect(() => {
    axios.get("http://localhost:3000/discount").then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Discount Cart
        </h5>
        <a
          className="text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-500"
          href="#"
        >
          <p>View all</p>
        </a>
      </div>
      <div className="flow-root">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {data.map((item) => (
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                    {item.name}
                  </p>
                  <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  {item.number}%
                </div>
              </div>
            </li>
          ))}
          ;
        </ul>
      </div>
    </Card>
  );
}
