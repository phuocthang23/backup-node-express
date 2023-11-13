/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useLocation } from "react-router-dom";
import Breadcrumbs from "./BreadCrumbs";
// import { useState } from "react";
import SearchComponent from "../../search";

const HearderAdmin = (props: any) => {
  const { handleGetData } = props;

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
          <SearchComponent slug={props.slug} handleGetData={handleGetData} />
        </div>
      </div>
    </nav>
  );
};

export default HearderAdmin;
