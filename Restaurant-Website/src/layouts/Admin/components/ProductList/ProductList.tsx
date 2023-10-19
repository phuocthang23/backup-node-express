// import React from "react";
// import { IProduct } from "../../redux/type";
// import { useDispatch } from "react-redux";
// import { deleteProduct } from "../../redux/actions/ProductAction";

// interface IProductProps {
//   listProduct: IProduct[];
// }
// const ProductList: React.FC<IProductProps> = (props: IProductProps) => {
//   const { listProduct } = props;
//   console.log("listProduct", listProduct);
//   const dispatch = useDispatch();
//   const onDelete = (id: number) => {
//     dispatch(deleteProduct(id));
//   };
//   return (
//     <>
//       {listProduct?.map((product: IProduct) => (
//         <div
//           className="card w-64 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-lg rounded-lg overflow-hidden"
//           key={product.id}
//         >
//           <div className="card-image">
//             <img
//               src={product.image}
//               alt={product.name}
//               className="w-full h-48 object-cover rounded-t-lg"
//             />
//           </div>
//           <div className="card-content p-4">
//             <h2 className="card-title text-lg font-semibold text-white">
//               {product.name}
//             </h2>
//             <p className="text-gray-100 mt-2">{product.description}</p>
//             <p className="mt-2 text-gray-200 font-medium">
//               ${product.price.toFixed(2)}
//             </p>
//             <div className="flex justify-between mt-4">
//               <button className="btn btn-success hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 rounded-full px-4 py-2 bg-cyan-50 text-cyan-700">
//                 Edit
//               </button>
//               <button
//                 className="btn btn-danger hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105 rounded-full px-4 py-2 bg-white text-red-600"
//                 onClick={() => onDelete(product.id)}
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       ))}
//     </>
//   );
// };

// export default ProductList;
