import Breadcrumbs from "./BreadCrumbs";
import { useEffect, useState } from "react";

interface prop {
  title: string;
  handleSearch(value: string): void;
}
const HearderAdmin = (props: prop) => {
  const [value, setValue] = useState("");
  useEffect(() => {
    props.handleSearch(value);
  }, [value]);

  return (
    <nav className="bg-white border-gray-200 top-0 ">
      <div className="max-w-screen-xl mx-auto p-4">
        {/* breadcrum hiện đường dẫn */}
        <Breadcrumbs />
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white pb-10 pt-3">
          {props.title}
        </span>
        {/* input search */}
        <div className="flex items-center bg-white">
          <input
            type="text"
            value={value}
            className="w-[500px] px-4 py-2 text-gray-700 border-r-0 border rounded-l-lg focus:outline-none"
            placeholder="Search..."
            onChange={(e) => setValue(e.target.value)}
          />
          <button className="px-4 py-[9px] text-white bg-blue-500 rounded-r-lg hover:bg-blue-600 focus:outline-none">
            Search
          </button>
        </div>
      </div>
    </nav>
  );
};

export default HearderAdmin;
