// import { useEffect, useState } from "react";
// import { Product } from "../../../../interface/interface";
// import { getAllProducts } from "../../../../api";

// const SortSeller = () => {
//   const [data, setData] = useState<Product[]>([]);
//   //* fetch data
//   useEffect(() => {
//     //* gọi lại data
//     const data = async () => {
//       const userAll = await getAllProducts();
//       setData(userAll);
//     };
//     data();
//   }, []);

//   const dataCopy = [...data];

//   dataCopy.sort((a, b) => b.purchased - a.purchased);

//   // Lấy 5 phần tử đầu tiên sau khi đã sắp xếp
//   return dataCopy.slice(0, 4);
// };

// export default SortSeller;
