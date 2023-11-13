/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Input } from "@material-tailwind/react";
import { Search } from "../../../../interface/search";
import { getAllProducts, getAllUsersServer } from "../../../../api";

const SearchComponent: React.FC<Search> = (props: any) => {
  const { handleGetData } = props;
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      switch (props.slug) {
        case "PRODUCT":
          const data = await getAllProducts({ data: value });
          handleGetData(data);
          break;
        case "USERS":
          const user = await getAllUsersServer({ data: value });
          handleGetData(user);
          break;
        case "BRANDS":
          // dispatch(getApiBrands({ data: value }));
          break;
        case "CATEGORY":
          // dispatch(getApiCategories({ data: value }));
          break;
        case "PAYMENTS":
          // dispatch(getPayments({ data: value }));
          break;

        default:
          break;
      }
    };
    fetchData();
  }, [value]);

  return (
    <div className="w-[400px] md:w-100 border mt-5 border rounded outline-none border-none">
      <Input
        // label="Search"
        className="outline-none border rounded-[10px] border-gray-600"
        value={value}
        crossOrigin={undefined}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default SearchComponent;
