/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { getAllProducts } from "../../../../api";

const SortSeller = () => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getAllProducts(null);
        setData(products);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Sắp xếp giảm dần theo giá trị count
  const sortedData = [...data].sort((a, b) => b.count - a.count);

  // Lấy 5 sản phẩm có count lớn nhất
  const top5Products = sortedData.slice(0, 5);
  console.log(top5Products);

  return top5Products;
};

export default SortSeller;
